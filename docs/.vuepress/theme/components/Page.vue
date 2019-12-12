<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <div class="content-footer" v-if="!isContentStatus">
      <Feedback
        class="content-feedback"
        evtYes="information_helpful"
        evtNo="information_not_helpful"
      />
      <LegacyCallout />
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'

import Feedback from './Feedback.vue'
import LegacyCallout from './LegacyCallout.vue'

export default {
  name: 'Page',
  components: {
    PageEdit,
    PageNav,
    Feedback,
    LegacyCallout
  },
  props: ['sidebarItems'],
  computed: {
    isContentStatus: function() {
      return !!(this.$frontmatter && this.$frontmatter.issueUrl)
    }
  }
}
</script>

<style lang="stylus" scoped>
.page {
  padding-bottom: 2rem;
  display: block;
}
.content-footer{
  padding-top: 0;
}

.content-feedback {
  padding: 0 2rem;
}

@media (min-width: $MQNarrow) {
  .content-footer {
    padding: 0 2rem;
    padding-top: 0;
  }
  .content-feedback {
    padding: 0;
    margin: 0;
  }
  section {
     display: flex;
     .block {
       flex: 1;
      }
  }
}
</style>
