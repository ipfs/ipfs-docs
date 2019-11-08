<template>
  <main>
    <h1>This content is still preparing for liftoff!</h1>
    <img src="../assets/pencil-rocket.svg" />
    {{ $page }}
  </main>
</template>

<script>
export default {
  name: 'ContentStatus',
  props: {
    test: String
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
