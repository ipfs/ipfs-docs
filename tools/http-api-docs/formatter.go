package docs

import "bytes"

// Formatter allows to implement generation of docs in different formats.
type Formatter interface {
	GenerateIntro() string
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
	// In docs.ipfs.io this is handled by the TOC.
	// buf.WriteString(formatter.GenerateIndex(api))
	for _, endp := range api {
		buf.WriteString(formatter.GenerateEndpointBlock(endp))
		buf.WriteString(formatter.GenerateArgumentsBlock(endp.Arguments, endp.Options))
		buf.WriteString(formatter.GenerateBodyBlock(endp.Arguments))
		buf.WriteString(formatter.GenerateResponseBlock(endp.Response))
		buf.WriteString(formatter.GenerateExampleBlock(endp))
	}
	return buf.String()
}
