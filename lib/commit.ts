import { joinURLParts } from "./utils";

export class Commit {
  constructor(
    public url: string,
    public message: string,
    public author: string,
    public time: string,
    public repo: string,
  ) { }

  public static fromCheerio(commit: Cheerio, repo: string) {
    let path = commit.find('a.message').attr('href')
    let url = joinURLParts('https://github.com', path);

    let message = commit.find('a.message').text().trim();
    let author = commit.find('.commit-author').text().trim();
    let time = commit.find('relative-time').attr('datetime');

    return new Commit(url, message, author, time, repo);
  }

  public static areTheSame(c1: Commit, c2: Commit) {
    let fields = ['url', 'author', 'message', 'time'];
    return fields.every(field => c1[field] === c2[field]);
  }
}