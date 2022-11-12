import fetcher from '../infras/fetch.infra'

const BASE_URL = 'http://localhost:3000'

export async function get(path) {
  if (!(path?.[0] === '/')) {
    path = '/' + path
  }

  return fetcher.getHtml(BASE_URL + path)
}

const public_ = {
  get,
}

export default public_
