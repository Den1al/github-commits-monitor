import { IncomingWebhook } from "@slack/webhook";
import { Commit } from './commit';
import config from './config';

class Slack {
  private webhook: IncomingWebhook;

  constructor() {
    this.webhook = new IncomingWebhook(config.slack_webhook_url);
  }

  private buildMessage(c: Commit) {
    let repoName = c.repo.split('https://github.com/')[1].split('/').join(': ');
    return {
      channel: config.slack_channel,
      text: `New commit on monitored repository ${repoName}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `New commit on monitored repository *${repoName}*:\n*<${c.url}|Go To Commit>*`
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Message:*\n${c.message}`
            },
            {
              type: "mrkdwn",
              text: `*Author:*\n${c.author}`
            },
            {
              type: "mrkdwn",
              text: `*Time:*\n${c.time}`
            }
          ]
        }
      ]
    }
  }

  async send(c: Commit) {
    await this.webhook.send(
      this.buildMessage(c)
    );
  }
}

export default new Slack();