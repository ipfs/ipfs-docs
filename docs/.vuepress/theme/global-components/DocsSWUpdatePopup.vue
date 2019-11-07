<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div v-if="enabled" class="docs-sw-update-popup">
      {{ message }}
      <br />
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup }
}
</script>

<style lang="stylus" scoped>
.docs-sw-update-popup {
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  padding: 1em;
  line-height: 2em;
  border: 3px solid $accentColor;
  z-index: 999;
}

.docs-sw-update-popup button {
  border: 1px solid $borderColor;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
