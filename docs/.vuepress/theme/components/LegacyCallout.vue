<template>
  <main class="content-status">
    <div>
      <div class="tip custom-block legacy-callout">
        <p>
          <b>This site is in beta. Help us improve it!</b>
        </p>
        <p>
          <a
            href="https://github.com/ipfs/docs/issues/new?assignees=&labels=OKR+3%3A+Content+Improvement%2C+docs-ipfs&template=content-request.md&title=%5BCONTENT+REQUEST%5D+%28add+your+title+here%21%29"
            target="_blank"
            >Suggest new content</a
          >
          <br />
          <a href="https://ipfs.canny.io/docs-features" target="_blank"
            >Request features</a
          >
          <br />
          <a
            href="https://github.com/ipfs/docs/issues/new?assignees=&labels=OKR+3%3A+Content+Improvement%2C+docs-ipfs&template=documentation-issue.md&title=%5BDOCS+ISSUE%5D+%28add+your+title+here%21%29"
            target="_blank"
            >Give general feedback</a
          >
          <br />
          <span v-if="$site.themeConfig.betaTestFormUrl">
            <a :href="$site.themeConfig.betaTestFormUrl" target="_blank"
              >Become a tester</a
            >
          </span>
          <br />
          <span v-if="legacyUrl" class="content-status-status">
            <br />
            <a target="_blank" :href="legacyUrl"
              >View this page on legacy site</a
            >
          </span>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    legacyUrl: function() {
      return this.$frontmatter && this.$frontmatter.legacyUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
.legacy-callout {
  background-color: #f6f9fa;
  color: #737681;
  border-color: #5db5be;
}

@media (min-width: $MQNarrow) {
}
</style>
