// .vuepress/config.js
module.exports = {
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'IPFS Docs',
      description: 'IPFS Documentation'
    }
  },
  themeConfig: {
    logo: '/images/ipfs-logo.svg',
    smoothScroll: true,
    sidebar: 'auto',
    editLinks: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: 'auto'
      }
    }
  },
  plugins: [
    ['@vuepress/plugin-back-to-top', true],
    '@vuepress/plugin-last-updated',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404/'
      }
    ]
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
