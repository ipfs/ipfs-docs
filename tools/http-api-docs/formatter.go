package docs

import (
	"bytes"

	cmds "github.com/ipfs/go-ipfs-cmds"
)

// Formatter allows to implement generation of docs in different formats.
type Formatter interface {
	GenerateIntro() string
	// GenerateGlobalOptionsBlock documents global options that apply to all
	// endpoints. queryOpts are passed as URL query parameters; authOpt (if
	// non-nil) is the authentication option sent via HTTP header instead.
	GenerateGlobalOptionsBlock(queryOpts []*Argument, authOpt *Argument) string
	GenerateStatusIntro(status cmds.Status) string
	GenerateIndex(endp []*Endpoint) string
	GenerateEndpointBlock(endp *Endpoint) string
	GenerateArgumentsBlock(args []*Argument, opts []*Argument) string
	GenerateBodyBlock(args []*Argument) string
	GenerateResponseBlock(response string, contentType string) string
	GenerateExampleBlock(endp *Endpoint) string
}

// GenerateDocs uses a formatter to generate documentation for every endpoint.
// It first emits the intro and global options sections, then iterates through
// endpoints grouped by status (active, experimental, deprecated, removed).
func GenerateDocs(api []*Endpoint, formatter Formatter) string {
	buf := new(bytes.Buffer)
	buf.WriteString(formatter.GenerateIntro())

	// Document global options from the root command before per-endpoint docs.
	// These are flags like --offline, --timeout, --encoding that apply to
	// every RPC endpoint but were previously missing from the reference.
	// See https://github.com/ipfs/ipfs-docs/issues/1084
	queryOpts, authOpt := GlobalOptions()
	buf.WriteString(formatter.GenerateGlobalOptionsBlock(queryOpts, authOpt))

	for _, status := range []cmds.Status{cmds.Active, cmds.Experimental, cmds.Deprecated, cmds.Removed} {
		endpoints := InStatus(api, status)
		if len(endpoints) == 0 {
			continue
		}
		buf.WriteString(formatter.GenerateStatusIntro(status))
		for _, endp := range endpoints {
			buf.WriteString(formatter.GenerateEndpointBlock(endp))
			buf.WriteString(formatter.GenerateArgumentsBlock(endp.Arguments, endp.Options))
			buf.WriteString(formatter.GenerateBodyBlock(endp.Arguments))
			buf.WriteString(formatter.GenerateResponseBlock(endp.Response, endp.ResponseContentType))
			buf.WriteString(formatter.GenerateExampleBlock(endp))
		}
	}
	return buf.String()
}
