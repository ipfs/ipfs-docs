const fs = require('fs')
const path = require('path')

// RFC 9116 requires an Expires field and recommends keeping it under a year
// out, so it is derived from the build rather than hardcoded and left to rot.
// Rounding to the first of the month keeps repeat builds within a month
// byte-identical, which matters because the deployed CID covers this output.
function securityTxt (domain) {
  const now = new Date()
  const expires = new Date(
    Date.UTC(now.getUTCFullYear() + 1, now.getUTCMonth(), 1)
  )

  return `# Security contact for docs.ipfs.tech, in the format defined by RFC 9116.
# https://www.rfc-editor.org/rfc/rfc9116

Contact: mailto:security@ipfs.io
Expires: ${expires.toISOString().replace('.000Z', 'Z')}
Policy: https://github.com/ipfs/community/blob/master/SECURITY.md
Canonical: ${domain}/.well-known/security.txt
Preferred-Languages: en

# Content reachable through a public IPFS gateway is not a vulnerability in
# IPFS software. Report gateway abuse to whoever runs that gateway:
# https://docs.ipfs.tech/concepts/public-utilities/#abuse-policy
`
}

module.exports = (params = {}, ctx) => ({
  name: 'vuepress-plugin-security-txt',
  async generated () {
    const file = path.join(ctx.outDir, '.well-known', 'security.txt')
    await fs.promises.mkdir(path.dirname(file), { recursive: true })
    await fs.promises.writeFile(file, securityTxt(params.domain))
  }
})
