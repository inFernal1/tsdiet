<template>
 <v-layout row justify-center>
	<v-tabs slot="extension"
	v-model="tabActive" centered>
	<v-tab>
	<v-icon class="mr-1">input</v-icon> Вход
	</v-tab>
	<v-tab>
	<v-icon class="mr-1">person_add</v-icon> Регистрация
	</v-tab>
	<v-tabs-items v-model="tabActive">
	<v-tab-item>
      <v-card>
        <v-card-text>
          <v-container grid-list-md  v-if="!$store.state.authAdmin">
            <v-layout wrap >
              <v-flex xs12>
                <v-text-field label="Электронная почта" required v-model="formLogin"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Пароль" type="password" required v-model="formPassword"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <h2 v-else>Вход выполнен!</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="login">Войти</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close">На главную</v-btn>
        </v-card-actions>
      </v-card>
      </tab-item>
      <v-tab-item>
      <v-card>
      </v-card>
      </v-tab-item>
      </v-tabs-items>
      </v-tabs>
  </v-layout>
</template>


<script>
export default {
  data() {
      return {
          formLogin:'',
          formPassword:'',
          formError:'',
	  tabActive:''
      }
  },
  methods: {
      async login() {
           try {
        await this.$store.dispatch('login', {
          login: this.formLogin,
          password:this.formPassword
        })
        this.formLogin = ''
        this.formPassword = ''
        this.formError = null
        if(this.$store.state.authAdmin) this.$nuxt.$router.push('/');
      } catch (e) {
        this.formError = e.message
      }
      },
      async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },
      close() {
          this.$nuxt.$router.push('/')
      }
  }
}
</script>
