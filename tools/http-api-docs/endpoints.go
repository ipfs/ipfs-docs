// Package docs can be used to gather go-ipfs commands and automatically
// generate documentation or tests.
package docs

import (
	"fmt"
	"sort"

	jsondoc "github.com/Stebalien/go-json-doc"
	cid "github.com/ipfs/go-cid"
	cmds "github.com/ipfs/go-ipfs-cmds"
	config "github.com/ipfs/kubo"
	corecmds "github.com/ipfs/kubo/core/commands"
	peer "github.com/libp2p/go-libp2p/core/peer"
	multiaddr "github.com/multiformats/go-multiaddr"
)

var JsondocGlossary = jsondoc.NewGlossary().
	WithSchema(new(cid.Cid), jsondoc.Object{"/": "<cid-string>"}).
	WithName(new(multiaddr.Multiaddr), "multiaddr-string").
	WithName(new(peer.ID), "peer-id").
	WithSchema(new(peer.AddrInfo),
		jsondoc.Object{"ID": "peer-id", "Addrs": []string{"<multiaddr-string>"}})

var ignoreOptsPerEndpoint = map[string]map[string]struct{}{
	"/api/v0/add": {
		cmds.RecLong:     struct{}{},
		cmds.DerefLong:   struct{}{},
		cmds.StdinName:   struct{}{},
		cmds.Hidden:      struct{}{},
		cmds.Ignore:      struct{}{},
		cmds.IgnoreRules: struct{}{},
	},
}

// A map of single endpoints to be skipped (subcommands are processed though).
var IgnoreEndpoints = map[string]bool{}

// How much to indent when generating the response schemas
const IndentLevel = 4

// Failsafe when traversing objects containing objects of the same type
const MaxIndent = 20

// Endpoint defines an IPFS RPC API endpoint.
type Endpoint struct {
	Name                string
	Status              cmds.Status
	Arguments           []*Argument
	Options             []*Argument
	Description         string
	HTTPDescription     string // additional HTTP-specific notes, shown after Description
	Response            string
	ResponseContentType string
	Group               string
}

// Argument defines an IPFS RPC API endpoint argument.
type Argument struct {
	Endpoint    string
	Name        string
	Description string
	Type        string
	Required    bool
	Default     string
}

type sorter []*Endpoint

func (a sorter) Len() int           { return len(a) }
func (a sorter) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a sorter) Less(i, j int) bool { return a[i].Name < a[j].Name }

const APIPrefix = "/api/v0"

// AllEndpoints gathers all the endpoints from go-ipfs.
func AllEndpoints() []*Endpoint {
	return Endpoints(APIPrefix, corecmds.Root)
}

func InStatus(endpoints []*Endpoint, status cmds.Status) []*Endpoint {
	var results []*Endpoint
	for _, endpoint := range endpoints {
		if endpoint.Status == status {
			results = append(results, endpoint)
		}
	}
	return results
}

func IPFSVersion() string {
	return config.CurrentVersionNumber
}

// ignoredGlobalOptions lists root-level flags that should not appear in the
// HTTP RPC API reference. This includes:
//   - CLI-only flags (--repo-dir, --config-file, --api, --debug, --help)
//     that refer to local paths or control CLI behavior
//   - --encoding: the HTTP handler defaults to JSON and this is already
//     documented in the "Flags" intro section of the reference
//   - --stream-channels: parsed by the HTTP handler but has no effect;
//     HTTP response streaming is determined by the response type, not this flag
//   - --upgrade-cidv0-in-output: deprecated, --cid-base with a non-base58btc
//     value now automatically upgrades CIDv0 to CIDv1
var ignoredGlobalOptions = map[string]struct{}{
	corecmds.RepoDirOption:    {},
	corecmds.ConfigFileOption: {},
	corecmds.ConfigOption:     {},
	corecmds.DebugOption:      {},
	corecmds.LocalOption:      {}, // deprecated alias for --offline
	corecmds.ApiOption:        {},
	"help":                    {}, // cmds.OptLongHelp
	"h":                       {}, // cmds.OptShortHelp
	cmds.EncLong:              {}, // --encoding: HTTP defaults to JSON, documented in intro
	cmds.ChanOpt:              {}, // --stream-channels: no-op over HTTP
	"upgrade-cidv0-in-output": {}, // deprecated: --cid-base auto-upgrades for non-base58btc
}

// GlobalOptions extracts the options defined on corecmds.Root that are
// relevant to the HTTP RPC API. The Root command itself has Run == nil so
// Endpoints() skips it, but its Options slice contains global flags
// (--offline, --timeout, --cid-base, etc.) that can be passed as query
// parameters to any endpoint. Flags listed in ignoredGlobalOptions are
// filtered out.
//
// The --api-auth flag is a special case: it controls RPC authentication
// but is sent as an HTTP Authorization header, not a query parameter.
// It is returned separately so the formatter can document it differently.
func GlobalOptions() (queryOpts []*Argument, authOpt *Argument) {
	for _, opt := range corecmds.Root.Options {
		name := opt.Names()[0]
		if _, skip := ignoredGlobalOptions[name]; skip {
			continue
		}

		def := fmt.Sprint(opt.Default())
		if def == "<nil>" {
			def = ""
		}

		arg := &Argument{
			Name:        name,
			Type:        opt.Type().String(),
			Description: opt.Description(),
			Default:     def,
		}

		// api-auth is sent as an HTTP header, not a query parameter
		if name == corecmds.ApiAuthOption {
			authOpt = arg
			continue
		}

		queryOpts = append(queryOpts, arg)
	}
	return queryOpts, authOpt
}

// Endpoints receives a name and a go-ipfs command and returns the endpoints it
// defines] (sorted). It does this by recursively gathering endpoints defined by
// subcommands. Thus, calling it with the core command Root generates all
// the endpoints.
func Endpoints(name string, cmd *cmds.Command) (endpoints []*Endpoint) {
	var arguments []*Argument
	var options []*Argument

	ignore := cmd.Run == nil || IgnoreEndpoints[name] || cmd.NoRemote
	if !ignore { // Extract arguments, options...
		for _, arg := range cmd.Arguments {
			argType := "string"
			if arg.Type == cmds.ArgFile {
				argType = "file"
			}
			arguments = append(arguments, &Argument{
				Endpoint:    name,
				Name:        arg.Name,
				Type:        argType,
				Required:    arg.Required,
				Description: arg.Description,
			})
		}

		for _, opt := range cmd.Options {
			if ignoreOpts, ok := ignoreOptsPerEndpoint[name]; ok {
				if _, ok := ignoreOpts[opt.Names()[0]]; ok {
					// skip this option for this endpoint.
					continue
				}
			}

			def := fmt.Sprint(opt.Default())
			if def == "<nil>" {
				def = ""
			}
			options = append(options, &Argument{
				Name:        opt.Names()[0],
				Type:        opt.Type().String(),
				Description: opt.Description(),
				Default:     def,
			})
		}

		// Extract HTTP-specific documentation from Helptext.HTTP if present
		var contentType, httpDescription string
		if cmd.Helptext.HTTP != nil {
			contentType = cmd.Helptext.HTTP.ResponseContentType
			httpDescription = cmd.Helptext.HTTP.Description
		}

		res := buildResponse(cmd.Type, contentType)

		endpoints = []*Endpoint{
			{
				Name:                name,
				Status:              cmd.Status,
				Description:         cmd.Helptext.Tagline,
				HTTPDescription:     httpDescription,
				Arguments:           arguments,
				Options:             options,
				Response:            res,
				ResponseContentType: contentType,
			},
		}
	}

	for n, cmd := range cmd.Subcommands {
		endpoints = append(endpoints,
			Endpoints(fmt.Sprintf("%s/%s", name, n), cmd)...)
	}
	sort.Sort(sorter(endpoints))
	return endpoints
}

func buildResponse(res any, contentType string) string {
	// Commands with a nil type return text or binary content.
	if res == nil {
		if contentType != "" {
			return "This endpoint returns data in the format indicated by the Content-Type header."
		}
		return "This endpoint returns the same output as the CLI command, or the CLI with --enc=json."
	}
	desc, err := JsondocGlossary.Describe(res)
	if err != nil {
		panic(err)
	}
	return desc
}
