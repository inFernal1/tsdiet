<template>
<v-container>
  <dr-add class="container"></dr-add>
  </v-container>
</template>
<script>
  import DrAdd from '~/components/dr_add'
export default {
  middleware: 'auth',
    components: {
        DrAdd
    }
}
</script>
<style scoped>

</style>
