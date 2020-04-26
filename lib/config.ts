import { readFileSync } from "fs";

interface Config {
  repos: string[];
  slack_webhook_url: string;
  slack_channel: string;
}

function getConfig(): Config {
  try {
    const config: Config = JSON.parse(
      readFileSync(__dirname + "/../config.json", "utf-8")
    ) as Config;

    if (config?.repos === undefined || config?.slack_webhook_url === undefined || config?.slack_channel === undefined) {
      console.log('Please populdate "config.json" with "repos", "slack_webhook_url" and "slack_channel"')
      process.exit(1);
    }

    return config;

  } catch (err) {
    console.log('Please create a "config.json" file first!')
    process.exit(1);
  }
}

export default getConfig();