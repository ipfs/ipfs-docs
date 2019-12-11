<template>
  <div class="feedback">
    <h3>{{ titleMsg }}</h3>
    <div v-if="!voteSubmitted" class="feedback-actions">
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
    <div v-if="voteSubmitted" class="feedback-result feedback-show">
      <p>{{ thanksMsg }}</p>
    </div>
    <div v-if="editOrIssueLinks" class="feedback-edit-or-issue">
      <EditOrIssue />
    </div>
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
    titleMsg: {
      type: String,
      default: 'Was this information helpful?'
    },
    thanksMsg: {
      type: String,
      default: 'Thank you for the feedback.'
    },
    evtYes: {
      type: String,
      default: 'yes'
    },
    evtNo: {
      type: String,
      default: 'no'
    },
    editOrIssueLinks: {
      type: Boolean,
      default: true
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

.feedback-edit-or-issue {
  padding: 1em 0;
}

.feedback {
  margin: 2em 0;

  &-result {
    display: none;
  }

  &-show {
    display: block;
    animation: fadein 1s;
  }

  &-hide {
    display: none;
  }

  &-result.feedback-show {
    min-height: 38px;
    display: flex;
    align-items: center;

    * {
      margin: 0;
    }
  }
}
</style>
