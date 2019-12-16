<template></template>

<script>
export default {
  mounted: function() {
    // track outbound clicks
    document.addEventListener('click', this.trackOutbound)
  },
  beforeDestroy() {
    // remove on unmount
    document.removeEventListener('click', this.trackOutbound)
  },
  methods: {
    trackOutbound(e) {
      if (!window.ga) return
      var link = e.target.closest('a')
      if (link === null || window.location.host === link.host) return
      ga('send', 'event', 'outbound', 'click', href)
    }
  }
}
</script>
