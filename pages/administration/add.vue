<template>
<v-container>
  <dr-add class="container"></dr-add>
  </v-container>
</template>
<script>
  import DrAdd from '~/components/dr_add'
export default {
    components: {
        DrAdd
    }
}
</script>
<style scoped>
.container {
  max-width: 960px;
}
</style>
