# Github Commits Monitor
#### Author: Daniel Abeles

Monitor commits of public Github repositories

[![TypeScript](https://img.shields.io/badge/TS-TypeScript-00a2ed)](https://github.com/ellerbrock/typescript-badges/) [![TypeScript](https://img.shields.io/badge/TS-ts--node-00a2ed)](https://github.com/ellerbrock/typescript-badges/)


## About
This package will let you monitor desired Github commits repositories. It utilizies a cron-ish job that probes your configured Github repos, until the last commit has changed. When that criteria is met - a Slack message will be sent using the Slack web-hook API.

## Download
```bash
git clone https://github.com/Den1al/github-commits-monitor.git
cd github-commits-monitor
```
## Config
First create `config.json`:

```bash
touch config.json
```

Then populate that file with the required fields:

```json
{
    "slack_webhook_url": "https://hooks.slack.com/services/.../.../...",
    "slack_channel": "enter channel here",
    "repos": [
        "https://github.com/Account1/Repo1",
        "https://github.com/Account1/Repo2",
        "https://github.com/Account2/Repo1"
    ]
}
```

## Install
```bash
npm install
```

## Run
```bash
npm start
```