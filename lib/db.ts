import * as lowdb from "lowdb";
import * as FileSync from 'lowdb/adapters/FileSync';
import { Commit } from "./commit";

class Database {
  private db: lowdb.LowdbSync<any>;
  private key: string = 'commits';

  constructor() {
    const adapter = new FileSync('db.json');
    this.db = lowdb(adapter);

    this.db.defaults({ commits: {} }).write();
  }

  public get(repo: string) {
    let commits = this.db.get(this.key).value();

    if (repo in commits) {
      return commits[repo];
    }

    return undefined;
  }

  public set(commit: Commit) {
    let commits = this.db.get(this.key).value();
    commits[commit.repo] = commit;
    this.db.set(this.key, commits).write();
  }
}

export default new Database();