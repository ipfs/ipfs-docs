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
      <EditOrIssue />
    </p>
  </div>
</template>

<script>
import EditOrIssue from './EditOrIssue.vue'

export default {
  data: function() {
    return {
      voteSubmitted: false,
      currentPath: this.$route.path
    }
  },
  methods: {
    sendFeedback: function(evnType) {
      this.voteSubmitted = true

      // bail if ga is not enabled
      if (!window.ga) return

      window.ga('send', 'event', {
        eventCategory: evnType,
        eventAction: 'click',
        eventLabel: window.location.href
      })
    }
  },
  watch: {
    '$route.path': function(path) {
      this.voteSubmitted = false
      this.currentPath = path
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
  },
  components: {
    EditOrIssue
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
