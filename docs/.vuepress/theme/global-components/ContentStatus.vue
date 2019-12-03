<template>
  <main class="content-status">
    <div>
      <div class="illustration">
        <img src="../assets/pencil-rocket.svg" />
      </div>
      <h2>{{ title }}</h2>
      <div v-if="issueNum" class="content-status-status">
        <a
          target="_blank"
          :href="`https://github.com/${repo}/issue/${issueNum}`"
          >Check the status</a
        >
        of this page on GitHub.
      </div>
      <div class="section content-status-vote">
        <h4>Is this topic important to you?</h4>
        <button>Yes</button>
        <button>Not really</button>
      </div>
      <div class="section content-status-info">
        <h3>Give us a hand</h3>
        <ul>
          <li v-if="issueNum">
            <a :href="`https://github.com/${repo}/issue/${issueNum}`"
              >Help write this page</a
            >
          </li>
          <li v-if="$site.themeConfig.betaTestFormUrl">
            <a :href="$site.themeConfig.betaTestFormUrl" target="_blank"
              >Sign up to be a beta tester</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="section content-status-info" style="clear: both">
      <div v-if="related" class="content-other-resources">
        <h3>Other resources to try</h3>
        <ul>
          <li v-for="(item, title) in related">
            <a :href="item" :alt="title" target="_blank">{{ title }}</a>
          </li>
        </ul>
      </div>
    </div>
    {{ $site.themeConfig.betaTestFormUrl }}
  </main>
</template>

<script>
export default {
  computed: {
    issueNum: function() {
      return this.$frontmatter && this.$frontmatter.issueNum
    },
    repo: function() {
      return this.$site && this.$site.themeConfig && this.$site.themeConfig.repo
    },
    related: function() {
      return this.$frontmatter.related
    }
  },
  props: {
    title: {
      type: String,
      default: 'This content is still preparing for liftoff!'
    }
  }
}
</script>

<style lang="stylus" scoped>
h2, h3 {
  border-bottom: none;
}

.section {
  margin-bottom: 3rem;
}

.content-status-vote {
  margin-top: 3rem;
}

.illustration {
  width: 40%;
  float: right;
}

.content-status-vote {
  // display: none;
  button {
    padding: 10px;
    background-color: darken($accentColor, 30%);
    border: none;
    font-size: 1em;
    color: white;
    margin-right: 10px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: $accentColor;
    }

    outline: none;
  }
}

@media (min-width: $MQNarrow) {
  .illustration {
    width: 30%;
    float: right;
  }
}

.content-status {
  border: 1px red;
}
</style>
