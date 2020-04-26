export function joinURLParts(baseURL: string, path: string) {
  let url = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  return `${url}/${path}`;
}