package docs

import (
	"slices"
	"testing"
)

func TestEndpoints(t *testing.T) {
	AllEndpoints()
}

func TestGlobalOptions(t *testing.T) {
	queryOpts, authOpt := GlobalOptions()

	// Verify we got some query parameter options
	if len(queryOpts) == 0 {
		t.Fatal("expected at least one global query parameter option")
	}

	// Collect names for easier assertions
	names := make([]string, len(queryOpts))
	for i, opt := range queryOpts {
		names[i] = opt.Name
	}

	// Key RPC-relevant flags should be present
	for _, expected := range []string{"offline", "cid-base", "timeout"} {
		if !slices.Contains(names, expected) {
			t.Errorf("expected global option %q not found in %v", expected, names)
		}
	}

	// Ignored flags should be filtered out: CLI-only flags, plus encoding
	// (HTTP defaults to JSON, documented in intro), stream-channels
	// (no-op over HTTP), and upgrade-cidv0-in-output (deprecated).
	for _, excluded := range []string{
		"repo-dir", "config-file", "config", "debug", "local", "api", "help", "h",
		"encoding", "stream-channels", "upgrade-cidv0-in-output",
	} {
		if slices.Contains(names, excluded) {
			t.Errorf("ignored option %q should not appear in global RPC options", excluded)
		}
	}

	// api-auth should be returned as the separate auth option
	if authOpt == nil {
		t.Fatal("expected api-auth to be returned as authOpt")
	}
	if authOpt.Name != "api-auth" {
		t.Errorf("expected authOpt.Name == \"api-auth\", got %q", authOpt.Name)
	}

	// api-auth should not appear in the query parameter list
	if slices.Contains(names, "api-auth") {
		t.Error("api-auth should not appear in query parameter options")
	}
}
