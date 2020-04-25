import * as lowdb from "lowdb";
import * as FileSync from 'lowdb/adapters/FileSync';
import { Commit } from "./commit";

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({ commits: {} }).write();

export function getLastCommitFromDB(repo: string): Commit {
  let commits = db.get('commits').value();

  if (repo in commits) {
    return commits[repo];
  }

  return undefined;
}

export function setLastCommitFromDB(repo: string, commit: Commit) {
  let commits = db.get('commits').value();
  commits[repo] = commit;
  db.set('commits', commits).write();
}