<template>
  <div class="container-fluid">
    <div class="row">
      <GiftCard v-for="g in gifts" :key="g.id" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        console.error('[GETTING GIFTS]', error)
        Pop.error(error.message)
      }
    }
    getGifts()
    return {
      gifts: computed(() => AppState.gifts)
    }
  }

}
</script>

<style scoped lang="scss">

</style>
