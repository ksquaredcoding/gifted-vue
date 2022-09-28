<template>
  <div class="modal fade" id="modalGiftForm" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Send New Gift</h5>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Tag Your Gif</label>
              <input type="text" class="form-control" id="gifTag" aria-describedby="gifTag" maxlength="50">
            </div>
            <div class="mb-3">
              <label for="giphySearchTerm" class="form-label">Search Giphy</label>
              <input type="text" class="form-control" id="giphySearchTerm" required="true" minlength="2" maxlength="50"
                name="search" v-model="editable.term">
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
import { ref } from 'vue';
import { giphyService } from '../services/giphyService.js';
import { AppState } from "../AppState.js";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          const giphys = await giphyService.getGifsWithSearch(editable.value.term)
          return giphys
        } catch (error) {
          logger.error('[SEARCH FORM]', error)
          Pop.error(error.message)
        }
      },
      giphys: computed(() => AppState.giphyGifs)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>