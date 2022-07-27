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

    <Analytics />
    <ScrollPatch />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'

import Feedback from './Feedback.vue'
import LegacyCallout from './LegacyCallout.vue'
import Analytics from './Analytics.vue'
import ScrollPatch from './ScrollPatch.vue'

export default {
  name: 'Page',
  components: {
    PageEdit,
    PageNav,
    Feedback,
    LegacyCallout,
    Analytics,
    ScrollPatch
  },
  props: ['sidebarItems'],
  computed: {
    isContentStatus: function () {
      return !!(this.$frontmatter && this.$frontmatter.issueUrl)
    }
  },
  methods: {
    smoothScroll: function () {
      var root = document.getElementsByTagName('html')[0]
      // only enable smooth-scrolling on pages shorter that 15000 px
      return root.scrollHeight < 15000
        ? root.classList.add('smooth-scroll')
        : root.classList.remove('smooth-scroll')
    },
    advancedRedirect: async function () {
      // Advanced redirect that is aware of domain name in different contexts
      const url = window.location.href

      // Move docs.ipfs.io → docs.ipfs.tech
      // https://github.com/ipfs/ipfs-docs/pull/1220
      // https://github.com/protocol/bifrost-infra/issues/178#issuecomment-1195867284
      const { hostname, pathname } = window.location
      // regular docs.ipfs.io
      if (hostname === 'docs.ipfs.io') {
        window.location.replace(url.replace('//docs.ipfs.io/', '//docs.ipfs.tech/'))
      }
      // subdomain gateways (no tls)
      if (hostname.startsWith('docs.ipfs.io.ipns.')) {
        window.location.replace(url.replace('//docs.ipfs.io.ipns.', '//docs.ipfs.tech.ipns.'))
      }
      // subdomain gateways (inlined)
      if (hostname.startsWith('docs-ipfs-io.ipns.')) {
        window.location.replace(url.replace('//docs-ipfs-io.ipns.', '//docs-ipfs-tech.ipns.'))
      }
      // path gateways
      if (pathname.startsWith('/ipns/docs.ipfs.io/')) {
        window.location.replace(url.replace('/ipns/docs.ipfs.io/', '/ipns/docs.ipfs.tech/'))
      }

      // Advanced redirect that is aware of URL #hash
      // https://github.com/ipfs/ipfs-docs/pull/1185
      if (url.includes('/reference/http/api')) {
        if (window.location.hash.startsWith('#api-v0')) {
          window.location.replace(url.replace('/reference/http/api','/reference/kubo/rpc'))
        }
      }
    }
  },
  mounted: function () {
    this.smoothScroll()
    this.advancedRedirect()
  },
  updated: function () {
    this.smoothScroll()
  }
}
</script>

<style lang="stylus" scoped>
.page {
  padding-bottom: 2rem;
  display: block;
}

.content-footer {
  padding-top: 0;
  max-width: $contentWidth;
}

.page-edit {
  max-width: 100%;
  padding: 2rem 2rem;
}

.content-feedback {
  padding: 0 2rem;
}

@media (min-width: $MQMobile) {
  .content-footer {
    padding: 0 2.5rem;
    padding-top: 0;
  }

  .content-feedback {
    padding: 0;
    margin: 0;
  }

  .page-edit {
    padding: 2.5rem 0;
  }

  section {
    display: flex;

    .block {
      flex: 1;
    }
  }
}
</style>
