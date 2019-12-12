<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <div class="content-footer" v-if="!isContentStatus">
      <Feedback evtYes="information_helpful" evtNo="information_not_helpful" />
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

<style lang="stylus">
.page {
  padding-bottom: 2rem;
  display: block;
}

.content-footer{
  padding: 2rem 2.5rem;
  padding-top: 0;
}
</style>
