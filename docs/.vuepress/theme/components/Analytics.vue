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
      if (!window.ga) return
      // encode search query to suitable ga format
      let encodedQuery = encodeURIComponent(this.queryVal).replace(/%20/g, '+')
      // send fake page query to track searches
      ga('send', 'pageview', `/search/?q=${encodedQuery}`)
      this.queryVal = null
    },
    trackOutbound(e) {
      if (!window.ga) return
      let link = e.target.closest('a')
      if (link === null || window.location.host === link.host) return
      ga('send', 'event', 'outbound', 'click', link.href)
    }
  }
}
</script>
