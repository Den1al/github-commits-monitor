import * as cron from 'node-cron';

import { getLastCommit } from './lib/github';
import { getLastCommitFromDB, setLastCommitFromDB } from "./lib/db";
import { Commit } from './lib/commit';
import { send } from './lib/slack';
import { getConfig } from './lib/utils';

const every10Minutes = '*/10 * * * *';
const config = getConfig();
const repos: string[] = config.repos;

async function notify(c: Commit) {
  console.log(`found new commit!`);
  await send(c);
}

function areTheSame(c1: Commit, c2: Commit) {
  let fields = ['url', 'author', 'message', 'time'];
  return fields.every(field => c1[field] === c2[field]);
}

async function handleRepo(repo: string) {

  let currentLastCommit = await getLastCommit(repo);
  let dbLastCommit = getLastCommitFromDB(repo);

  if (dbLastCommit === undefined) {
    setLastCommitFromDB(repo, currentLastCommit);
    return;
  }

  if (!areTheSame(currentLastCommit, dbLastCommit)) {
    setLastCommitFromDB(repo, currentLastCommit);
    await notify(currentLastCommit);
  } else {
    console.log('are the same...')
  }
}

async function cronJob() {
  await Promise.all(
    repos.map(repo => handleRepo(repo))
  );
}

async function main() {
  cron.schedule(every10Minutes, cronJob);
}

main();