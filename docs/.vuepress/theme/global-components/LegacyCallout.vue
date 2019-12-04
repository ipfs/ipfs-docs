<template>
  <main class="content-status">
    <div>
      <div class="tip custom-block legacy-callout">
        <p>
          This site is in beta.
          <a
            href="https://github.com/ipfs/docs/issues/new?assignees=&labels=OKR+3%3A+Content+Improvement%2C+docs-ipfs&template=documentation-issue.md&title=%5BDOCS+ISSUE%5D+Beta+Site+Feedback"
            target="_blank"
            >Submit feedback</a
          >
          <span v-if="$site.themeConfig.betaTestFormUrl"
            >or
            <a :href="$site.themeConfig.betaTestFormUrl" target="_blank"
              >become a tester</a
            ></span
          >
          to help us improve it!
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
  background-color:#f6f9fa;
  color: #737681;
  border-color: #5db5be;
}
@media (min-width: $MQNarrow) {
}
</style>
