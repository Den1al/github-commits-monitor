import { readFileSync } from "fs";

interface Config {
  repos: string[];
  slack_webhook_url: string;
  slack_channel: string;
  cron_interval: string;
}

function getConfig(): Config {
  try {
    const config: Config = JSON.parse(
      readFileSync(__dirname + "/../config.json", "utf-8")
    ) as Config;

    if (config?.repos === undefined || config?.slack_webhook_url === undefined || config?.slack_channel === undefined || config?.cron_interval === undefined) {
      console.log('Please populdate "config.json" with "repos", "slack_webhook_url", "cron_interval" and "slack_channel"')
      process.exit(1);
    }

    return config;

  } catch (err) {
    console.log('Please create a "config.json" file first!')
    process.exit(1);
  }
}

export default getConfig();