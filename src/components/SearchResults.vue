<template>
  <div class="col-md-3">
    <img :src="giphy.url" alt="" class="img-fluid selectable" @click="setUrl(giphy.id)">
  </div>
</template>


<script>
import { watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { Giphy } from "../models/Giphy.js";
export default {
  props: {
    giphy: { type: Giphy, required: true }
  },
  setup(props) {

    return {
      setUrl(id) {
        const giphy = AppState.giphyGifs.find(g => g.id == id)
        const urlGift = giphy.url
        AppState.giftUrl = urlGift
      },
    }
  }
}
</script>


<style lang="scss" scoped>

</style>