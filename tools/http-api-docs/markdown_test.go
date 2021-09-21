package docs

import "testing"

func TestMarkdown(t *testing.T) {
	endpoints := AllEndpoints()
	formatter := new(MarkdownFormatter)
	GenerateDocs(endpoints, formatter)
}
