package docs

import (
	"bytes"

	cmds "github.com/ipfs/go-ipfs-cmds"
)

// Formatter allows to implement generation of docs in different formats.
type Formatter interface {
	GenerateIntro() string
	GenerateStatusIntro(status cmds.Status) string
	GenerateIndex(endp []*Endpoint) string
	GenerateEndpointBlock(endp *Endpoint) string
	GenerateArgumentsBlock(args []*Argument, opts []*Argument) string
	GenerateBodyBlock(args []*Argument) string
	GenerateResponseBlock(response string) string
	GenerateExampleBlock(endp *Endpoint) string
}

// GenerateDocs uses a formatter to generate documentation for every endpoint
func GenerateDocs(api []*Endpoint, formatter Formatter) string {
	buf := new(bytes.Buffer)
	buf.WriteString(formatter.GenerateIntro())

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
			buf.WriteString(formatter.GenerateResponseBlock(endp.Response))
			buf.WriteString(formatter.GenerateExampleBlock(endp))
		}
	}
	return buf.String()
}
