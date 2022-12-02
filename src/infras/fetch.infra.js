export async function getJson(url) {
  return await (await fetch(url)).json()
}

export async function postJson(url, data) {
  return await (
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
  ).json()
}

export async function getHtml(url) {
  return await fetch(url)
}

const fetcher = {
  getJson,
  postJson,
  getHtml,
}

export default fetcher
