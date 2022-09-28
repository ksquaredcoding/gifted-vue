import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const gifServer = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 5000
})

export const GiphyServer = Axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  timeout: 5000
})
