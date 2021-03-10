import got from "got"
import { internal_api_address, internal_api_port } from '../../config'

const ping_url = `http://${internal_api_address}:${internal_api_port}/ping`
console.log(ping_url)

const ping = async () => {
  try{
    const response = await got.post(ping_url)
    return response.body;
  } catch (exception) {
    console.log(exception)
  }
}

module.exports = {
  ping
}
