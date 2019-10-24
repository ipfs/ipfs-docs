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
    editLinks: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en')
        // sidebar: 'auto'
      }
    },
    sidebar: {
      '/': [
        '/install/',
        {
          title: 'Essentials',
          path: '/essentials/',
          children: [
            {
              title: 'IPFS in a nutshell',
              sidebarDepth: 1,
              children: [
                '/essentials/what-is-ipfs',
                '/essentials/how-ipfs-works',
                '/essentials/usage-ideas-examples',
                '/essentials/glossary',
                '/essentials/faq'
              ]
            },
            {
              title: 'Content-addressed storage',
              sidebarDepth: 1,
              children: [
                '/essentials/content-addressing',
                '/essentials/hashing',
                '/essentials/immutability',
                '/essentials/persistence'
              ]
            },
            {
              title: 'Peer-to-peer sharing',
              sidebarDepth: 1,
              children: [
                '/essentials/merkle-dags',
                '/essentials/bitswap',
                '/essentials/ipld',
                '/essentials/ipns',
                '/essentials/libp2p',
                '/essentials/file-systems'
              ]
            },
            {
              title: 'Integrating with the Web',
              sidebarDepth: 1,
              children: ['/essentials/ipfs-gateway', '/essentials/dnslink']
            }
          ]
        },
        {
          title: 'How-tos',
          path: '/how-tos/',
          children: [
            {
              title: 'Customize your install',
              sidebarDepth: 1,
              children: [
                '/how-tos/configure-node',
                '/how-tos/modify-peers-list',
                ['http://ipfs.io', 'Customize an IPFS repo']
              ]
            },
            {
              title: 'Manage files',
              sidebarDepth: 1,
              children: [
                [
                  'https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101',
                  'Spawn a node (JS)'
                ],
                [
                  'https://github.com/ipfs/go-ipfs/tree/master/docs/examples/go-ipfs-as-a-library/README.md',
                  'Spawn a node (Go)'
                ],
                '/how-tos/work-with-blocks',
                '/how-tos/pin-files',
                ['http://ipfs.io', 'Troubleshoot file transfers'],
                ['http://ipfs.io', 'Traverse IPLD graphs'],
                '/how-tos/take-snapshot',
                '/how-tos/store-play-videos',
                '/how-tos/host-git-style-repo',
                ['http://ipfs.io', 'Replicate large datasets']
              ]
            },
            {
              title: 'Work with peers',
              sidebarDepth: 1,
              children: [
                '/how-tos/observe-peers',
                ['http://ipfs.io', 'Customize libp2p bundles'],
                ['http://ipfs.io', 'Use circuit relay']
              ]
            },
            {
              title: 'Host websites',
              sidebarDepth: 1,
              children: ['/how-tos/host-single-page-site']
            },
            {
              title: 'Work with blockchains',
              sidebarDepth: 1,
              children: [['http://ipfs.io', 'Explore the Ethereum chain']]
            },
            {
              title: 'Build apps',
              sidebarDepth: 1,
              children: [
                '/how-tos/make-service',
                ['http://ipfs.io', 'Use the IPFS API'],
                ['http://ipfs.io', 'Build a basic libp2p app']
              ]
            },
            {
              title: 'IPFS in the browser',
              sidebarDepth: 1,
              children: [
                [
                  'http://ipfs.io-addressinginbrowsers',
                  'Address IPFS on the Web'
                ],
                ['http://ipfs.io', 'Exchange files between nodes'],
                ['http://ipfs.io', 'Use MFS in the browser'],
                ['http://ipfs.io', 'Add directories using streams'],
                ['http://ipfs.io', 'Make a pubsub room'],
                ['http://ipfs.io', 'Edit collaboratively with CRDT'],
                ['http://ipfs.io', 'Stream video'],
                '/how-tos/browser-tools-frameworks'
              ]
            }
          ]
        },
        {
          title: 'API & CLI',
          path: '/reference/',
          children: [
            '/reference/js/api',
            '/reference/go/api',
            '/reference/http/api',
            '/reference/cli'
          ]
        },
        {
          title: 'Support & community',
          path: '/support-community/',
          children: [
            ['https://discuss.ipfs.io/', 'IPFS forums'],
            '/support-community/irc',
            [
              'https://calendar.google.com/calendar/embed?src=ipfs.io_eal36ugu5e75s207gfjcu0ae84@group.calendar.google.com',
              'Community video calls'
            ],
            ['https://proto.school/#/chapters', 'ProtoSchool chapters'],
            ['https://www.meetup.com/members/249142444/', 'Meetups'],
            '/support-community/social-media',
            ['http://ipfs.io', 'Awesome IPFS']
          ]
        },
        {
          title: 'Project',
          path: '/project/',
          children: [
            ['http://ipfs.io', 'History'],
            ['http://ipfs.io', 'Roadmap'],
            ['http://ipfs.io', 'Implementation status'],
            ['http://ipfs.io', 'Specifications'],
            ['http://ipfs.io', 'Research'],
            ['http://ipfs.io', 'Team org planning'],
            '/project/related-projects',
            '/project/contribute',
            ['http://ipfs.io', 'Code of conduct']
          ]
        }
      ]
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
