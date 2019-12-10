<template>
  <ParentLayout>
    <template #top>
      <div class="theme-default-content">
        <p>{{ $page }}</p>
      </div>
      <div v-if="!isContentStatus">
        <Feedback />
        <LegacyCallout />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/components/Page.vue'
import Feedback from './Feedback.vue'
import LegacyCallout from './LegacyCallout.vue'

export default {
  name: 'Page',
  components: {
    ParentLayout,
    Feedback,
    LegacyCallout
  },
  computed: {
    isContentStatus: function() {
      return !!(this.$frontmatter && this.$frontmatter.issueUrl)
    }
  }
}
</script>
