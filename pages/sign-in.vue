<template>
<div class="signin-container">
    <v-tabs v-model="tabActive" centered>
        <v-tab href="#input">
            <v-icon class="mr-1">input</v-icon> Вход
        </v-tab>
        <v-tab href="#registration">
            <v-icon class="mr-1">person_add</v-icon> Регистрация
        </v-tab>
        <v-tabs-items v-model="tabActive">
            <v-tab-item value="input">
                <v-card>
                    <v-container grid-list-md v-if="!$store.state.authAdmin">
                        <v-layout column>
                            <v-flex>
                                <v-layout column align-center>
                                    <v-flex xs12>
                                        <h6 class="tsd-color_black subheading">Вход с помощью: </h6>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn icon nuxt  class="btn-icons-input btn-icon-vk">
                                            <v-icon medium color="blue darken-1">mdi-vk</v-icon></v-btn>
                                        <v-btn icon nuxt class="btn-icons-input btn-icon-fb">
                                            <v-icon medium color="indigo">mdi-facebook</v-icon></v-btn>
                                        <v-btn icon nuxt class="btn-icons-input btn-icon-gl">
                                            <v-icon medium color="red darken-1">mdi-google-plus</v-icon></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex>
                                <v-text-field label="Электронная почта" required v-model="formEmailIn"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field label="Пароль" type="password" required v-model="formPasswordIn"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <h2 v-else>Вход выполнен!</h2>
                    <v-card-actions>
                      <v-layout justify-center>
                        <v-btn color="blue darken-1" flat @click="login">Войти</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="close">На главную</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
            <v-tab-item value="registration">
                <v-card>
                    <v-container grid-list-md>
                        <v-layout column>
                            <v-flex>
                                <v-layout column align-center>
                                    <v-flex xs12>
                                        <h6 class="tsd-color_black subheading">Регистрация с помощью: </h6>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn icon nuxt  class="btn-icons-input btn-icon-vk">
                                            <v-icon medium color="blue darken-1">mdi-vk</v-icon></v-btn>
                                        <v-btn icon nuxt class="btn-icons-input btn-icon-fb">
                                            <v-icon medium color="indigo">mdi-facebook</v-icon></v-btn>
                                        <v-btn icon nuxt class="btn-icons-input btn-icon-gl">
                                            <v-icon medium color="red darken-1">mdi-google-plus</v-icon></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Электронная почта" v-model="formEmailReg" required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Пароль" type="password" required v-model="formPasswordReg"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Повторите пароль" type="password" required v-model="formPasswordRegD"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                      <v-layout justify-center>
                    <v-btn color="blue darken-1" flat @click="login">Регистрация</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="close">На главную</v-btn>
                    </v-layout>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</div>
</template>

<script>
export default {
    data() {
        return {
            formEmailIn: '',
            formPasswordIn: '',
            formEmailReg: '',
            formPasswordReg: '',
            formPasswordRegD: '',
            formError: '',
            tabActive: 'input'
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('login', {
                    login: this.formLogin,
                    password: this.formPassword
                })
                this.formEmailIn = ''
                this.formPasswordIn = ''
                this.formError = null
                if (this.$store.state.authAdmin) this.$nuxt.$router.push('/');
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

<style scoped>
.signin-container {
    min-width: 300px;
    max-width: 400px;
    margin: auto;
}
.btn-icons-input {
    outline: none;
}
.btn-icon-vk:hover {
    border: 2px solid #1E88E5;
}
.btn-icon-fb:hover {
    border: 2px solid #3F51B5;
}
.btn-icon-gl:hover {
    border: 2px solid #E53935;
}
</style>
