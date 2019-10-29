// .vuepress/config.js
module.exports = {
  base: '/',
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
        nav: require('./nav/en'),
        sidebar: [
          '/install/',
          {
            title: 'Essentials',
            path: '/essentials/',
            children: [
              {
                title: 'IPFS in a nutshell',
                sidebarDepth: 1,
                collapsable: false,
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
                collapsable: false,
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
                collapsable: false,
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
                collapsable: false,
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
                collapsable: false,
                children: [
                  '/how-tos/configure-node',
                  '/how-tos/modify-peers-list',
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/custom-ipfs-repo',
                    'Customize an IPFS repo'
                  ]
                ]
              },
              {
                title: 'Manage files',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101',
                    'Use js-ipfs as a library'
                  ],
                  [
                    'https://github.com/ipfs/go-ipfs/tree/master/docs/examples/go-ipfs-as-a-library/README.md',
                    'Use go-ipfs as a library'
                  ],
                  '/how-tos/work-with-blocks',
                  '/how-tos/pin-files',
                  [
                    'https://github.com/ipfs/go-ipfs/blob/master/docs/file-transfer.md',
                    'Troubleshoot file transfers'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/traverse-ipld-graphs',
                    'Traverse IPLD graphs'
                  ],
                  '/how-tos/take-snapshot',
                  '/how-tos/store-play-videos',
                  '/how-tos/host-git-style-repo',
                  [
                    'https://github.com/ipfs/archives/tree/master/tutorials/replicating-large-datasets',
                    'Replicate large datasets'
                  ]
                ]
              },
              {
                title: 'Work with peers',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-tos/observe-peers',
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/custom-libp2p',
                    'Customize libp2p bundles'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/circuit-relaying',
                    'Use circuit relay'
                  ]
                ]
              },
              {
                title: 'Host websites',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/how-tos/host-single-page-site']
              },
              {
                title: 'Work with blockchains',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/explore-ethereum-blockchain',
                    'Explore the Ethereum chain'
                  ]
                ]
              },
              {
                title: 'Build apps',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-tos/make-service',
                  [
                    'https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_C',
                    'Build with the IPFS API'
                  ],
                  [
                    'https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_B',
                    'Make a basic libp2p app'
                  ]
                ]
              },
              {
                title: 'IPFS in the browser',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-tos/address-ipfs-on-web',
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/exchange-files-in-browser',
                    'Exchange files between nodes'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/browser-mfs',
                    'Use MFS in the browser'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/browser-add-readable-stream',
                    'Add directories using streams'
                  ],
                  [
                    'https://www.youtube.com/watch?v=Nv_Teb--1zg',
                    'Make a pubsub room'
                  ],
                  [
                    'https://www.youtube.com/watch?v=-kdx8rJd8rQ',
                    'Edit collaboratively with CRDT'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/blob/master/examples/browser-readablestream',
                    'Stream video'
                  ],
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
              ['https://awesome.ipfs.io', 'Awesome IPFS']
            ]
          },
          {
            title: 'Project',
            path: '/project/',
            children: [
              'project/history',
              [
                'https://github.com/ipfs/ipfs/blob/master/REQUIREMENTS.md',
                'Roadmap'
              ],
              [
                'https://github.com/ipfs/ipfs/blob/master/IMPLEMENTATION_STATUS.md',
                'Implementation status'
              ],
              ['https://github.com/ipfs/specs', 'Specifications'],
              ['https://github.com/ipfs/research', 'Research'],
              ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
              '/project/related-projects',
              '/project/contribute',
              [
                'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                'Code of conduct'
              ]
            ]
          }
        ]
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
