<template>
  <div class="modal fade" id="modalGiftForm" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Send New Gift</h5>
          <form @submit.prevent="handleSubmit()">
            <div class="mb-3">
              <label for="tag" class="form-label">Tag Your Gif</label>
              <input type="text" class="form-control" id="tag" aria-describedby="tag" maxlength="50"
                v-model="editable.tag" name="tag">
            </div>
            <div class="mb-3">
              <label for="url" class="form-label">Url</label>
              <input type="text" class="form-control" id="url" aria-describedby="url" maxlength="50"
                v-model="editable.url" name="url">
            </div>
            <div class="mb-3">
              <label for="giphySearchTerm" class="form-label">Search Giphy</label>
              <input type="text" class="form-control" id="giphySearchTerm" required="true" minlength="2" maxlength="50"
                name="search" v-model="editable.term">
              <button class="btn btn-success" @click="search()" type="button">Search</button>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <SearchResults v-for="g in giphys" :giphy="g" v-if="giphys.length > 0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ref, watchEffect } from 'vue';
import { giphyService } from '../services/giphyService.js';
import { AppState } from "../AppState.js";
import { computed } from "@vue/reactivity";
import { giftsService } from "../services/GiftsService.js";

export default {
  setup() {
    const editable = ref({})
    let tag = ''
    watchEffect(() => {
      if (AppState.giftUrl) {
        editable.value.url = AppState.giftUrl
      }
    })
    return {
      tag,
      editable,
      async search() {
        try {
          const giphys = await giphyService.getGifsWithSearch(editable.value.term)
          return giphys
        } catch (error) {
          logger.error('[SEARCH FORM]', error)
          Pop.error(error.message)
        }
      },
      giphys: computed(() => AppState.giphyGifs),
      async handleSubmit() {
        try {
          await giftsService.createGift(editable.value)
        } catch (error) {
          logger.error('[CREATE GIFT]', error)
          Pop.error(error.message)
        }
      },
    }

  },

}
</script>


<style lang="scss" scoped>

</style>