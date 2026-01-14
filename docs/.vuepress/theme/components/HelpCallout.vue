<template>
  <div class="help-callout">
    <p><b>Help us improve this site!</b></p>
    <p v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">Edit this page</a>
      <span v-if="issueLink">
        or
        <a :href="issueLink" target="_blank" rel="noopener noreferrer">open an issue</a>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelpCallout',
  computed: {
    editLink() {
      const { docsRepo, docsDir = '', docsBranch = 'main' } = this.$site.themeConfig
      if (!docsRepo || !this.$page.relativePath) return null
      const dir = docsDir ? docsDir.replace(/\/$/, '') + '/' : ''
      return `https://github.com/${docsRepo}/edit/${docsBranch}/${dir}${this.$page.relativePath}`
    },
    issueLink() {
      const { docsRepo } = this.$site.themeConfig
      if (!docsRepo) return null
      return `https://github.com/${docsRepo}/issues/new?title=${encodeURIComponent(this.$page.title)}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.help-callout {
  background-color: lighten($badgeTipColor, 95%);
  color: lighten($textColor, 20%);
  border-color: $badgeTipColor;
  padding: 1rem 2rem;
  margin-top: 3rem;

  p {
    margin: 0.5rem 0;
  }
}
</style>
