import Axios from 'axios';
import * as cheerio from 'cheerio';
import { joinURLParts } from './utils';
import { Commit } from './commit';

async function getCommitsPage(repo: string): Promise<string> {
  let url = joinURLParts(repo, "/commits/master")
  let response = await Axios.get(url);
  return response.data;
}

export async function fetchLastCommit(repo: string): Promise<Commit> {
  let html = await getCommitsPage(repo);
  let $ = cheerio.load(html);

  let lastCommit = $('li.commit').first();
  return Commit.fromCheerio(lastCommit, repo);
}
