// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.ipfs.tech'
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''
const pageSuffix = '/'

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
    pageSuffix,
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
    domain: DEPLOY_DOMAIN,
    docsRepo: 'ipfs/ipfs-docs',
    docsDir: 'docs',
    docsBranch: 'main',
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
        //nav: require('./nav/en'),
        nav: [
          { 
            text: 'Get Started', 
            link: '/install/' 
          },
          { 
            text: 'Learn', 
            items: [
              { text: 'Study the Concepts', link: '/concepts/' },
              { text: 'Advanced Tutorials', link: '/how-to/' },
              { text: 'Read the Specs', link: '/implement/specs/' }
            ]
          },
          { 
            text: 'Reference', 
            items: [
              { text: 'Kubo', link: '/reference/kubo/' },
              { text: 'js-ipfs', link: '/reference/js/api' },
              { text: 'HTTP Gateway', link: '/reference/http/gateway' },
              { text: 'Ioro', link: 'reference/ioro/' },
              { text: 'IPFS Desktop', link: '/desktop/' },
            ]
          },
          { 
            text: 'Additional Resources', 
            items: [
              { text: 'Get Involved with the Community', link: '/community/' },
              { text: 'Project History', link: '/project/' }
            ]
          },               
        ],

        //note that a custom sidebar does not seem to work with the nav w/ dropdown setup
        sidebar: 'auto'
        /*
        sidebar: {
          '/': 'auto',
          '/install/': 'auto',
          '/concepts/': [
            {
              children: [
                {
                  title: 'Overview',
                  sidebarDepth: 1,
                  link: '/concepts/',
                  collapsable: false,
                  children: [
                      '/concepts/what-is-ipfs',
                      '/concepts/how-ipfs-works',
                      '/concepts/glossary',
                      '/concepts/comparisons',
                      '/concepts/ipfs-implementations',                    
                      '/concepts/faq',
                  ]
                },
                {
                  title: 'Ideas',
                  sidebarDepth: 1,
                  collapsable: false,
                  children: [
                    '/concepts/content-addressing',
                    '/concepts/hashing',
                    '/concepts/immutability',
                    '/concepts/persistence',
                    '/concepts/privacy-and-encryption',
                  ]
                },
                {
                  title: 'Technology',
                  sidebarDepth: 1,
                  collapsable: false,
                  children: [
                    '/concepts/dht',
                    '/concepts/merkle-dag',
                    '/concepts/bitswap',
                    ['https://ipld.io/docs/intro/primer/', 'IPLD' ],
                    '/concepts/ipns',
                    '/concepts/libp2p',
                    '/concepts/file-systems',
                    '/concepts/ipfs-gateway',
                    '/concepts/dnslink'
                  ]
                },
                {
                  title: 'Further reading',
                  sidebarDepth: 1,
                  collapsable: false,
                  children: ['/concepts/further-reading/academic-papers']
                }
              ]
            },
          ],
          '/how-to/': 'auto',
          '/reference/': 'auto',
          '/community/': [
          {
            text: 'Additional Resources',
            children: [
              {
                title: 'Get involved with the community',
                sidebarDepth: 1,
                collapsable: true,
                children: [
                  [
                    'https://ipfs.us4.list-manage.com/subscribe?u=25473244c7d18b897f5a1ff6b&id=cad54b2230',
                    'IPFS newsletter'
                  ],
                  '/community/contribute/ways-to-contribute',
                  ['https://discuss.ipfs.tech/', 'IPFS forums'],
                  '/community/chat',
                  ['https://proto.school/events', 'ProtoSchool workshops'],
                  ['https://www.meetup.com/members/249142444/', 'Meetups'],
                  '/community/social-media',
                  ['https://awesome.ipfs.tech', 'Awesome IPFS'],
                  [
                    'https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew',
                    'YouTube'
                  ]
                ]
              },
              {
                title: 'Write the docs',
                link: '/project/README',
                sidebarDepth: 1,
                collapsable: true,
                children: [
                  '/community/contribute/grammar-formatting-and-style',
                  '/community/contribute/writing-guide',
                  '/community/contribute/code-persona',
                  '/community/contribute/contribution-tutorial'
                ]
              },
              {
                title: 'Project History',
                sidebarDepth: 1,
                collapsable: true,
                children:
                [
                  '/project/history',
                  '/project/repository-guide',
                  ['https://github.com/ipfs/roadmap', 'Roadmap'],
                  'project/implementation-status',
                  ['https://github.com/ipfs/specs', 'Specifications'],
                  ['https://github.com/ipfs/research', 'Research'],
                  ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
                  '/project/related-projects',
                  [
                    'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                    'Code of conduct'
                  ]
                ]
              },
              {
                title: 'Case studies',
                children: [
                  ['/concepts/case-study-arbol', 'Arbol'],
                  ['/concepts/case-study-audius', 'Audius'],
                  ['/concepts/case-study-fleek', 'Fleek'],
                  ['/concepts/case-study-likecoin', 'LikeCoin'],
                  ['/concepts/case-study-morpheus', 'Morpheus.Network'],
                  ['/concepts/case-study-snapshot', 'Snapshot']
                ]
              }
            ]
          }
        ]
        },
        //
        
        sidebar: [
          {
            title: 'Getting Started',
            path: '/install/',
            children: [
              'install/ipfs-desktop',
              'install/ipfs-companion',
              'install/command-line',
              'install/js-ipfs',
              'install/server-infrastructure'
            ]
          },
          {
            title: 'Concepts',
            path: '/concepts/',
            children: [
              {
                title: 'Overview',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                    '/concepts/what-is-ipfs',
                    '/concepts/how-ipfs-works',
                    '/concepts/glossary',
                    '/concepts/comparisons',
                    '/concepts/ipfs-implementations',                    
                    '/concepts/faq',
                ]
              },
              {
                title: 'Ideas',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/content-addressing',
                  '/concepts/hashing',
                  '/concepts/immutability',
                  '/concepts/persistence',
                  '/concepts/privacy-and-encryption',
                ]
              },
              {
                title: 'Technology',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/concepts/dht',
                  '/concepts/merkle-dag',
                  '/concepts/bitswap',
                  ['https://ipld.io/docs/intro/primer/', 'IPLD' ],
                  '/concepts/ipns',
                  '/concepts/libp2p',
                  '/concepts/file-systems',
                  '/concepts/ipfs-gateway',
                  '/concepts/dnslink'
                ]
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
            title: 'Guides',
            path: '/how-to/',
            children: [
              {
                title: 'Kubo',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/command-line-quick-start',
                  '/how-to/modify-bootstrap-list',
                  '/how-to/nat-configuration',
                  '/how-to/default-profile',
                  '/how-to/take-snapshot',
                  '/how-to/run-ipfs-inside-docker',
                  '/how-to/work-with-blocks',                  
                  '/how-to/pin-files',
                  '/how-to/store-play-videos',
                  '/how-to/host-git-repo',
                  '/how-to/observe-peers',
                  '/how-to/websites-on-ipfs/static-site-generators',
                  '/how-to/websites-on-ipfs/redirects-and-custom-404s',
                  '/how-to/troubleshooting'
                ]
              },
              {
                title: 'js-ipfs',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    'https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/custom-ipfs-repo',
                    'Customize an IPFS repo'
                  ],
                  'how-to/create-simple-chat-app',

                ]
              },
              {
                title: 'Best Practices',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/best-practices-for-ipfs-builders',
                ]
              },
              {
                title: 'Multiple',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/configure-node',                
                  '/how-to/work-with-pinning-services',
                  '/how-to/move-ipfs-installation/move-ipfs-installation',
                  '/how-to/exchange-files-between-nodes',
                  '/how-to/peering-with-content-providers',
                  '/how-to/publish-ipns'                 
                ]
              },
              {
                title: 'IPFS Desktop',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/websites-on-ipfs/single-page-website',
                  '/how-to/websites-on-ipfs/multipage-website',
                  '/how-to/websites-on-ipfs/link-a-domain',
                  '/how-to/websites-on-ipfs/introducing-fleek',
                  '/how-to/websites-on-ipfs/static-site-generators',
                  '/how-to/websites-on-ipfs/redirects-and-custom-404s'
                ]
              },
              {
                title: 'Ecosystem',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/websites-on-ipfs/introducing-fleek',
                ]
              },
              {
                title: 'IPFS in the browser',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/address-ipfs-on-web',
                  '/how-to/browser-tools-frameworks',
                  'how-to/companion-node-types',
                  'how-to/dnslink-companion',
                  'how-to/companion-window-ipfs',
                  '/how-to/companion-x-ipfs-path-header'
                ]
              },
              {
                title: 'NFTs',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  'how-to/mint-nfts-with-ipfs',
                  'how-to/best-practices-for-nft-data'
                ]
              }
            ]
          },
          {
            title: 'Reference ',
            path: '/reference/',
            children: [
              '/reference/http/gateway',
              '/reference/js/api',
              '/reference/go/api',
              '/reference/kubo/cli',
              '/reference/kubo/rpc'
            ]
          },
          {
            title: 'Contribute',
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
                  ['https://discuss.ipfs.tech/', 'IPFS forums'],
                  '/community/chat',
                  ['https://proto.school/events', 'ProtoSchool workshops'],
                  ['https://www.meetup.com/members/249142444/', 'Meetups'],
                  '/community/social-media',
                  ['https://awesome.ipfs.tech', 'Awesome IPFS'],
                  [
                    'https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew',
                    'YouTube'
                  ]
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
            title: 'Project History',
            path: '/project/',
            children: [
              'project/history',
              'project/repository-guide',
              ['https://github.com/ipfs/roadmap', 'Roadmap'],
              'project/implementation-status',
              ['https://github.com/ipfs/specs', 'Specifications'],
              ['https://github.com/ipfs/research', 'Research'],
              ['https://github.com/ipfs/team-mgmt', 'Team org planning'],
              '/project/related-projects',
              [
                'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                'Code of conduct'
              ]
            ]
          }
        ]

        */
      }
    }
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
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
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/ipfs-404.html'
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
        hostname: DEPLOY_DOMAIN,
        exclude: ['/ipfs-404.html']
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
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs',
    'vuepress-plugin-mermaidjs',
    'tabs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
