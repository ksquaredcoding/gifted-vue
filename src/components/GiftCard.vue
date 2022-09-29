<template>
  <div class="col-md-3 my-2">
    <div class="card">
      <img :src="gift.url" :alt="gift.tag" class="img-fluid img-fit rounded-top" v-if="gift.opened == true">
      <img :src="unopenedGift" alt="" class="img-fluid unopened img-fit rounded-top" v-else="gift.opened == false"
        @click="unwrapGift(gift.id)">
      <div class="card-body">
        <p><b>{{gift.tag}}</b></p>
      </div>
      <div class="card-footer d-flex text-end">
        <button class="btn btn-dark" @click="removeGift(gift.id)">Remove Gift</button>
      </div>
    </div>
  </div>



</template>


<script>
import { Gift } from "../models/Gift.js";
import { giftsService } from "../services/GiftsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    gift: { type: Gift, required: true }
  },
  setup(props) {
    return {
      unopenedGift: 'https://st4.depositphotos.com/16122460/20108/i/1600/depositphotos_201089970-stock-photo-beautifully-wrapped-gift-box-white.jpg',
      async removeGift(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this gift?')
          if (!yes) { return }
          await giftsService.removeGift(id)
        } catch (error) {
          console.error('[REMOVING GIFT]', error)
          Pop.error(error.message)
        }
      },
      async unwrapGift(id) {
        const gift = await giftsService.unwrapGift(id)
        gift.opened = true
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.unopened:hover {
  border: 0.5rem solid red;
  cursor: pointer;
  padding: 1rem;
}

.img-fit {
  height: 25rem;
  width: 25rem;
  object-fit: cover;
}
</style>