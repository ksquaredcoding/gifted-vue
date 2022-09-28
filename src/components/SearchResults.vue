<template>
  <div class="col-md-3">
    <img :src="giphy.url" alt="" class="img-fluid">
  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { Giphy } from "../models/Giphy.js";
export default {
  props: {
    giphy: { type: Giphy, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>

</style>