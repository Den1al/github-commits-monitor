import { readFileSync } from "fs";

class Config {
  repos: string[] = [];
  slack_webhook_url: string = "";
  slack_channel: string = "";
  cron_interval: string = "";
}

function getConfig(): Config {
  try {
    const config: Config = JSON.parse(
      readFileSync(__dirname + "/config.json", "utf-8")
    ) as Config;

    let fields = Object.keys(new Config());

    if (
      !fields.every(field => field in config && config[field] !== undefined)
    ) {
      let fieldsMsg = fields.slice(0, -1).map(field => `"${field}"`).join(", ");
      console.log(`Please populate "config.json" with ${fieldsMsg} and "${fields.slice(-1)}"!`);
      process.exit(1);
    }

    return config;

  } catch (err) {
    console.log('Please create a "config.json" file first!')
    process.exit(1);
  }
}

export default getConfig();