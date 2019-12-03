import axios from 'axios'
export default async function request ({ url, body = null, method = null }) {
  if (!url.startsWith('http')) {
    url = url.startsWith('/') ? url : `/${url}`
  }

  const options = {
    method: method || body ? 'POST' : 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    url
  }

  if (body) {
    options.data = JSON.stringify(body)
  }

  try {
    return await axios(options)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}
