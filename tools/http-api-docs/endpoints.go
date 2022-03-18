// Package docs can be used to gather go-ipfs commands and automatically
// generate documentation or tests.
package docs

import (
	"fmt"
	"sort"

	jsondoc "github.com/Stebalien/go-json-doc"
	cid "github.com/ipfs/go-cid"
	config "github.com/ipfs/go-ipfs"
	cmds "github.com/ipfs/go-ipfs-cmds"
	corecmds "github.com/ipfs/go-ipfs/core/commands"
	peer "github.com/libp2p/go-libp2p-core/peer"
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
	Name        string
	Status      cmds.Status
	Arguments   []*Argument
	Options     []*Argument
	Description string
	Response    string
	Group       string
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

// Endpoints receives a name and a go-ipfs command and returns the endpoints it
// defines] (sorted). It does this by recursively gathering endpoints defined by
// subcommands. Thus, calling it with the core command Root generates all
// the endpoints.
func Endpoints(name string, cmd *cmds.Command) (endpoints []*Endpoint) {
	var arguments []*Argument
	var options []*Argument

	ignore := cmd.Run == nil || IgnoreEndpoints[name]
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

		res := buildResponse(cmd.Type)

		endpoints = []*Endpoint{
			{
				Name:        name,
				Status:      cmd.Status,
				Description: cmd.Helptext.Tagline,
				Arguments:   arguments,
				Options:     options,
				Response:    res,
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

func buildResponse(res interface{}) string {
	// Commands with a nil type return text. This is a bad thing.
	if res == nil {
		return "This endpoint returns a `text/plain` response body."
	}
	desc, err := JsondocGlossary.Describe(res)
	if err != nil {
		panic(err)
	}
	return desc
}
