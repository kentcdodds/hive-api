/* eslint no-console:0 */
import axios from 'axios'
import qs from 'qs'
import {copy} from 'copy-paste'
import path from 'path'
import {readFileSync} from 'fs'
import userHome from 'user-home'

export {shorten}

function shorten(url, {key: api, custom}) {
  api = api || getKey()
  const query = qs.stringify({api, custom, url})
  const fullUrl = `https://hive.am/api?${query}`

  return axios
    .get(fullUrl)
    .then((res) => {
      const {data: {error, short}} = res
      const NO_ERROR = 0
      if (error !== NO_ERROR) {
        console.error('There was a failure :-(')
        console.error(res)
        throw res
      }
      return new Promise((resolve) => {
        copy(short, () => {
          console.log(`${short} has been copied to your clipboard`)
          resolve(short)
        })
      })
    })
    .catch(process.exit)
}

function getKey() {
  try {
    const hiveRcPath = path.resolve(userHome, '.hiverc')
    const json = readFileSync(hiveRcPath, 'utf8')
    const hiveRc = JSON.parse(json)
    return hiveRc.apiKey
  } catch (e) {
    console.error(e)
    throw new Error([
      'A Hive API key is required and can be specified via',
      '--key or in a .hiverc file in the home directory:',
      '{"apiKey": "YOUR_KEY"}',
    ].join(' '))
  }
}
