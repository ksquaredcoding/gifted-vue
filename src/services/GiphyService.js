import { AppState } from "../AppState.js"
import { Giphy } from "../models/Giphy.js"
import { gifServer, GiphyServer } from "./AxiosService.js"

class GiphyService {
  async getGifsWithSearch(term) {
    const res = await GiphyServer.get('/search', {
      params: {
        api_key: 'XhhdJHA8U0uQIiQzXv9OQ6FiZjTzZSTJ',
        rating: 'pg',
        limit: 9,
        q: term
      }
    })
    AppState.giphyGifs = res.data.data.map(g => new Giphy(g))
    console.log('logging giphy', AppState.giphyGifs)
    const giphys = AppState.giphyGifs
    return giphys
  }
}

export const giphyService = new GiphyService()