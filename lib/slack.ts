import * as dotenv from 'dotenv';
import { IncomingWebhook } from "@slack/webhook";
import { Commit } from './commit';
import { getConfig } from './utils';

dotenv.config();
let config = getConfig();

export async function send(c: Commit) {
  let url = config.slack_webhook_url;

  if (url === undefined) {
    throw new Error('Must set "slack_webhook_url" in the config.json file!')
  }

  let webhook = new IncomingWebhook(url);
  let repoName = c.repo.split('https://github.com/')[1].split('/').join(': ');

  await webhook.send({
    channel: "art-github-alerts",
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
  })
}