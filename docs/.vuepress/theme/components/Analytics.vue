<template></template>

<script>
export default {
  mounted: function() {
    if (!window.ga) return

    // track outbound clicks
    document.addEventListener(
      'click',
      function(e) {
        var link = e.target.closest('a')
        if (link === null || window.location.host === link.host) return
        ga('send', 'event', 'outbound', 'click', href)
      },
      false
    )
  }
}
</script>
