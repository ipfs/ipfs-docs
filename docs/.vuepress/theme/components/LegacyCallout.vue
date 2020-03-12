<template>
  <div class="legacy-callout">
    <p>
      <b>This docs site is new. Help us improve it!</b>
    </p>
    <section>
      <div class="block">
        <ul>
          <li>
            <a
              href="https://github.com/filecoin-project/filecoin-docs/issues/new?assignees=&labels=Content+Improvement&template=content-request.md&title=%5BCONTENT+REQUEST%5D+%28add+your+title+here%21%29"
              target="_blank"
              >Suggest new content</a
            >
          </li>
          <!-- <li>
            <a href="https://ipfs.canny.io/docs-features" target="_blank"
              >Request features</a
            >
          </li> -->
        </ul>
      </div>
      <div class="block">
        <ul>
          <li>
            <a
              href="https://github.com/filecoin-project/filecoin-docs/issues/new?assignees=&labels=Content+Improvement&template=documentation-issue.md&title=%5BDOCS+ISSUE%5D+%28add+your+title+here%21%29"
              target="_blank"
              >Give general feedback</a
            >
          </li>
          <!-- <li v-if="$site.themeConfig.betaTestFormUrl">
            <a :href="$site.themeConfig.betaTestFormUrl" target="_blank"
              >Become a tester</a
            >
          </li> -->
        </ul>
      </div>
    </section>
    <section v-if="legacyUrl" class="legacy-links">
      <a target="_blank" :href="legacyUrl">View this page on legacy site</a>
    </section>
  </div>
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
  background-color: lighten($badgeTipColor, 95%);
  color: lighten($textColor, 20%);
  border-color: $badgeTipColor;
  padding: 1rem 2rem;
  margin-top: 3rem;
}

.legacy-links a {
  font-weight: 400;
}

section {
  margin: 1rem 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0;
      line-height: 2em;
      padding: 0;
    }
  }
}

@media (min-width: $MQNarrow) {
  section {
    display: flex;

    .block {
      flex: 1;
    }
  }
}
</style>
