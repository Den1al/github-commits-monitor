import * as cron from 'node-cron';

import { fetchLastCommit } from './lib/github';
import { Commit } from './lib/commit';
import Database from "./lib/db";
import Slack from './lib/slack';
import config from './lib/config';

async function handleRepo(repo: string) {

  let commitFromGithub: Commit = await fetchLastCommit(repo);
  let commitFromDB: Commit = Database.get(repo);

  if (commitFromDB === undefined) {
    Database.set(commitFromGithub);
    return;
  }

  if (!Commit.areTheSame(commitFromGithub, commitFromDB)) {
    Database.set(commitFromGithub);
    await Slack.send(commitFromGithub);
  } else {
    console.log('are the same...')
  }
}

async function cronJob() {
  await Promise.all(
    config.repos.map(repo => handleRepo(repo))
  );
}

async function main() {
  cron.schedule(config.cron_interval, cronJob);
}

main();