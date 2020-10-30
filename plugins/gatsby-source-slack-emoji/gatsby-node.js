const crypto = require('crypto')
const { WebClient } = require('@slack/web-api')
const slackClient = new WebClient(global.SLACK_TOKEN || process.env.SLACK_TOKEN)


exports.sourceNodes = async (
  { actions, createNodeId }
) => {
  const { createNode } = actions
  const emoji = await slackClient.emoji.list()
  Object.keys(emoji.emoji).forEach(key => {
    const digest = crypto
      .createHash('md5')
      .update(key+emoji.emoji[key])
      .digest('hex')

    const node = {
      id: createNodeId(`Emoji.${key}`),
      children: [],
      parent: null,
      name: key,
      image: emoji.emoji[key],
      internal: {
        type: 'Emoji',
        contentDigest: digest,
      },
    }

    createNode(node)
  })
}
