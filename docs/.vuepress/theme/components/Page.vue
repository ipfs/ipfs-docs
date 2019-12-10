<template>
  <ParentLayout>
    <template #top>
      <div class="theme-default-content">
        <p>{{ $page }}</p>
      </div>
      <Feedback />
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/components/Page.vue'
import Feedback from './Feedback.vue'
export default {
  name: 'Page',
  components: {
    ParentLayout,
    Feedback
  }
}
</script>
