import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { gifServer } from "./AxiosService.js"

class GiftsService {
  async getGifts() {
    const res = await gifServer.get('/gifts')
    AppState.gifts = res.data.map(g => new Gift(g))
  }
  async removeGift(id) {
    let gift = await this.getGiftById(id)
    await gifServer.delete(`/gifts/${gift.id}`)
    AppState.gifts = AppState.gifts.filter(g => g.id !== gift.id)
  }
  getGiftById(id) {
    let gift = AppState.gifts.find(g => g.id == id)
    if (!gift) { throw new Error('Bad Id') }
    return gift
  }
  async unwrapGift(id) {
    let gift = await this.getGiftById(id)
    gift.opened = true
    await gifServer.put(`/gifts/${gift.id}`, gift)
    let giftIndex = AppState.gifts.findIndex(gift)
    AppState.gifts.splice(giftIndex, 1, gift)
  }
}

export const giftsService = new GiftsService()