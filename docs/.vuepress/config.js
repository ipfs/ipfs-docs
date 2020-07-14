// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.ipfs.io'

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
  markdown: {
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist')),
        md.use(require('markdown-it-imsize')),
        md.use(require('markdown-it-image-lazy-loading'))
    }
  },
  themeConfig: {
    algolia: {
      apiKey: 'e56fc7c611806522df45191e22ed15ac',
      indexName: 'ipfs-docs'
    },
    defaultImage: '/images/social-card.png',
    author: {
      name: 'IPFS Team',
      twitter: '@ipfsbot'
    },
    keywords:
      'IPFS, dweb, protocol, libp2p, ipld, multiformats, bitswap, decentralized web, InterPlanetary File System, dapp, documentation, docs, Protocol Labs',
    // edit links
    // repo: 'ipfs/ipfs-docs-v2',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'ipfs/ipfs-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    feedbackWidget: {
      docsRepoIssue: 'ipfs/ipfs-docs'
    },
    editLinks: false,
    // page nav
    nextLinks: false,
    prevLinks: false,
    // ui/ux
    logo: '/images/ipfs-logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        sidebar: [
          {
            title: 'Install',
            path: '/install/',
            children: ['/install/command-line-quick-start']
          },
          {
            title: 'Recent releases',
            path: '/recent-releases/',
            children: [
              {
                title: 'Go-IPFS 0.6',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/recent-releases/go-ipfs-0-6/',
                  ['/recent-releases/go-ipfs-0-6/install', 'Install'],
                  '/recent-releases/go-ipfs-0-6/update-procedure',
                  '/recent-releases/go-ipfs-0-6/features'
                ]
              },
              {
                title: 'Go-IPFS 0.5',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/recent-releases/go-ipfs-0-5/',
                  ['/recent-releases/go-ipfs-0-5/install', 'Install'],
                  '/recent-releases/go-ipfs-0-5/update-procedure',
                  '/recent-releases/go-ipfs-0-5/features',
                  '/recent-releases/go-ipfs-0-5/fixes',
                  '/recent-releases/go-ipfs-0-5/troubleshooting'
                ]
              }
            ]
          },
          {
            title: 'Concepts',
            path: '/concepts/',
            children: [
              {
                title: 'IPFS 101',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/what-is-ipfs',
                  '/concepts/how-ipfs-works',
                  ['https://dweb-primer.ipfs.io/', 'IPFS primer'],
                  '/concepts/glossary',
                  '/concepts/faq'
                ]
              },
              {
                title: 'Examples & case studies',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/usage-ideas-examples',
                  '/concepts/case-study-audius'
                ]
              },
              {
                title: 'Content-addressed data',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/content-addressing',
                  '/concepts/hashing',
                  '/concepts/immutability',
                  '/concepts/persistence'
                ]
              },
              {
                title: 'Peer-to-peer sharing',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/dht',
                  '/concepts/merkle-dag',
                  '/concepts/bitswap',
                  '/concepts/ipld',
                  '/concepts/ipns',
                  '/concepts/libp2p',
                  '/concepts/file-systems'
                ]
              },
              {
                title: 'Integrating with the Web',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/concepts/ipfs-gateway', '/concepts/dnslink']
              },
              {
                title: 'Further reading',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/concepts/further-reading/academic-papers']
              }
            ]
          },
          {
            title: 'How-tos',
            path: '/how-to/',
            children: [
              {
                title: 'Quick start',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/how-to/command-line-quick-start']
              },
              {
                title: 'Customize your install',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/configure-node',
                  '/how-to/modify-bootstrap-list',
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
                  '/how-to/work-with-blocks',
                  '/how-to/pin-files',
                  '/how-to/work-with-pinning-services',
                  [
                    'https://github.com/ipfs/go-ipfs/blob/master/docs/file-transfer.md',
                    'Troubleshoot file transfers'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs',
                    'Traverse IPLD graphs'
                  ],
                  '/how-to/take-snapshot',
                  '/how-to/store-play-videos',
                  '/how-to/host-git-style-repo',
                  [
                    'https://github.com/ipfs/archives/tree/master/tutorials/replicating-large-datasets',
                    'Replicate large datasets'
                  ],
                  '/how-to/move-ipfs-installation'
                ]
              },
              {
                title: 'Work with peers',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/observe-peers',
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/custom-libp2p',
                    'Customize libp2p bundles'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/circuit-relaying',
                    'Use circuit relay'
                  ]
                ]
              },
              {
                title: 'Host websites',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/how-to/host-single-page-site']
              },
              {
                title: 'Work with blockchains',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/explore-ethereum-blockchain',
                    'Explore the Ethereum chain'
                  ]
                ]
              },
              {
                title: 'Build apps',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/make-service',
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
                  'how-to/address-ipfs-on-web',
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/exchange-files-in-browser',
                    'Exchange files between nodes'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/browser-mfs',
                    'Use MFS in the browser'
                  ],
                  [
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/browser-add-readable-stream',
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
                    'https://github.com/ipfs/js-ipfs/tree/master/examples/browser-readablestream',
                    'Stream video'
                  ],
                  '/how-to/browser-tools-frameworks'
                ]
              },
              {
                title: 'IPFS Companion',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/companion-node-types',
                  'how-to/dnslink-companion',
                  'how-to/companion-window-ipfs',
                  '/how-to/companion-x-ipfs-path-header'
                ]
              }
            ]
          },
          {
            title: 'API & CLI',
            path: '/reference/',
            children: [
              '/reference/go/api',
              '/reference/js/api',
              '/reference/http/api',
              '/reference/cli'
            ]
          },
          {
            title: 'Community',
            path: '/community/',

            children: [
              {
                title: 'Join the community',
                sidebarDepth: 2,
                collapsable: false,
                children: [
                  [
                    'https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230',
                    'IPFS newsletter'
                  ],
                  '/community/contribute/ways-to-contribute',
                  ['https://discuss.ipfs.io/', 'IPFS forums'],
                  '/community/irc',
                  ['https://proto.school/#/events', 'ProtoSchool workshops'],
                  ['https://www.meetup.com/members/249142444/', 'Meetups'],
                  '/community/social-media',
                  ['https://awesome.ipfs.io', 'Awesome IPFS']
                ]
              },
              {
                title: 'Write the docs',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/community/contribute/grammar-formatting-and-style',
                  '/community/contribute/writing-guide',
                  '/community/contribute/code-persona',
                  '/community/contribute/contribution-tutorial'
                ]
              }
            ]
          },
          {
            title: 'Project',
            path: '/project/',
            children: [
              'project/history',
              ['https://github.com/ipfs/roadmap', 'Roadmap'],
              'project/implementation-status',
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
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-96910779-15'
      }
    ],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404/'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      '@vuepress/html-redirect',
      {
        duration: 0
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-ipfs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
