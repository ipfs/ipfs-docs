<template>
  <div class="feedback">
    <h3>Was this information helpful?</h3>
    <div v-if="!voteSubmitted" class="feedback--actions">
      <button
        class="btn btn-primary"
        :title="evtYes"
        v-on:click="sendFeedback(evtYes)"
      >
        {{ evtYes }}
      </button>
      <button
        class="btn btn-primary"
        :title="evtNo"
        v-on:click="sendFeedback(evtNo)"
      >
        {{ evtNo }}
      </button>
    </div>
    <div v-if="voteSubmitted" class="feedback--result feedback--show">
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
export default {
  data: function() {
    return {
      voteSubmitted: false
    }
  },
  methods: {
    sendFeedback: function(evnType) {
      console.log('hellop', evnType)
      this.voteSubmitted = true
      if (!window.ga) return
      window.ga('send', 'event', {
        eventCategory: evnType,
        eventAction: 'click',
        eventLabel: window.location.href
      })
    }
  },
  props: {
    evtYes: {
      type: String,
      default: 'yes'
    },
    evtNo: {
      type: String,
      default: 'no'
    }
  }
}
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

button {
  text-transform: capitalize;
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
    min-height: 38px;
    display: flex;
    align-items: center;

    * {
      margin: 0;
    }
  }
}
</style>
