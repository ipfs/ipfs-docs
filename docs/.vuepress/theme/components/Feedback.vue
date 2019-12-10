<template>
  <div class="feedback">
    <h3>Was this information helpful?</h3>
    <div class="feedback--actions">
      <button class="btn btn-primary" title="Helpful" data-title="helpful">
        Yes
      </button>
      <button
        class="btn btn-primary"
        title="Not Helpful"
        data-title="not helpful"
      >
        No
      </button>
    </div>
    <div class="feedback--result">
      <p>Thank you for the feedback.</p>
    </div>
    <p class="feedback--edit-or-open">
      <a
        href="https://github.com/ipfs/docs/blob/master/content/"
        target="_blank"
        >Edit this page</a
      >
      in GitHub or
      <a
        :href="
          `https://github.com/ipfs/docs/issues/new?assignees=&labels=OKR+3%3A+Content+Improvement%2C+docs-ipfs&template=documentation-issue.md&title=%5BDOCS+ISSUE%5D+Page:+${$page.title}`
        "
        target="_blank"
        >open an issue</a
      >
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.feedback {
  margin: 2em 0;

  &--result {
    display: none;
  }

  &--show {
    display: block;
    animation: fadein 1s;
  }

  &--hide {
    display: none;
  }

  &--result.feedback--show {
    min-height: 40px;
    display: flex;
    align-items: center;

    * {
      margin: 0;
    }
  }
}
</style>
