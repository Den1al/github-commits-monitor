import Axios from 'axios';
import * as cheerio from 'cheerio';
import { joinURLParts } from './utils';
import { Commit } from './commit';

async function getCommitsPage(repo: string): Promise<string> {
  let url = joinURLParts(repo, "/commits/master")
  let response = await Axios.get(url);
  return response.data;
}

export async function getLastCommit(repo: string): Promise<Commit> {
  let html = await getCommitsPage(repo);
  let $ = cheerio.load(html);

  let commit = $('li.commit').first();

  let path = commit.find('a.message').attr('href')
  let url = joinURLParts('https://github.com', path);

  let message = commit.find('a.message').text().trim();
  let author = commit.find('span.commit-author').text().trim();
  let time = commit.find('relative-time').attr('datetime');

  return {
    repo,
    url,
    message,
    author,
    time
  }
}