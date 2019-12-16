<template></template>

<script>
export default {
  data: function() {
    return {
      searchBox: false,
      queryVal: null
    }
  },
  mounted: function() {
    // track outbound clicks
    document.addEventListener('click', this.trackOutbound)

    let searchBox = document.querySelector('.search-box input')
    if (searchBox) {
      searchBox.addEventListener('keyup', this.captureSearch)
      this.searchBox = searchBox
    }
  },
  beforeDestroy() {
    // remove on unmount
    document.removeEventListener('click', this.trackOutbound)

    if (this.searchBox) {
      this.searchBox.removeEventListener('keyup', this.captureSearch)
    }
  },
  watch: {
    '$route.path': function(path) {
      if (this.queryVal) {
        this.trackQuery(path)
      }
    }
  },
  methods: {
    captureSearch(q) {
      this.queryVal = this.searchBox.value
    },
    trackQuery(path) {
      console.log(this.queryVal, path)
      this.queryVal = null
    },
    trackOutbound(e) {
      if (!window.ga) return
      var link = e.target.closest('a')
      if (link === null || window.location.host === link.host) return
      ga('send', 'event', 'outbound', 'click', href)
    }
  }
}
</script>
