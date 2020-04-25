import { readFileSync } from "fs";

interface Config {
  repos: string[];
  slack_webhook_url: string;
}

export function getConfig(): Config {
  try {
    const config = JSON.parse(readFileSync(__dirname + "/../config.json", "utf-8")) as Config;

    if (config?.repos === undefined || config?.slack_webhook_url === undefined) {
      console.log('Please populdate "config.json" with "repos" and "slack_webhook_url"')
      process.exit(1);
    }

    return config;
  } catch (err) {
    console.log('Please create a "config.json" file first!')
    process.exit(1);
  }
}

export function joinURLParts(baseURL: string, path: string) {
  let url = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  return `${url}/${path}`;
}