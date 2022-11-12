export async function getJson(url) {
  return await (await fetch(url)).json()
}

export async function getHtml(url) {
  return await fetch(url)
}

const fetcher = {
  getJson,
  getHtml,
}

export default fetcher
