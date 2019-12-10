<template>
  <ParentLayout>
    <template #top>
      <div class="theme-default-content">
        <p>{{ $page }}</p>
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/components/Page.vue'
export default {
  name: 'Page',
  components: {
    ParentLayout
  }
}
</script>
