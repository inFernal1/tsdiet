<template>
  <v-app class="tsd_bg">
    <v-card nuxt to="/" flat class="img-link">
      <img src="/img/logo.png" alt="logo"  class="hidden-xs-only tsd-logo" >
      </v-card>
  <v-toolbar light  flat class="tsd-border_toolbar tsd_bg hidden-sm-and-up menu-forphone" >
      <v-toolbar-side-icon  @click.native.stop="sideNav = !sideNav"> </v-toolbar-side-icon>
         <v-toolbar-title >
              <nuxt-link to="/">
              <img src="/img/logo_s.png" alt="theSmartestDiet" >
              </nuxt-link>
      </v-toolbar-title>
  </v-toolbar>
  
    <nav class="hidden-xs-only tsd-border_toolbar main-links">
          <v-btn flat v-for="item in menuItems" router :to="item.link" :key="item.title" exact class="links-items">
              <v-icon left>{{item.icon}}</v-icon>
              {{item.title}}
              </v-btn>
      </nav>
  <v-content>
        <nuxt />
  </v-content>
   <v-navigation-drawer temporary fixed v-model="sideNav">
          <v-list>
              <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link" exact>
                  <v-list-tile-action>
                      <v-icon>{{item.icon}}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>{{item.title}}</v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>
  <v-footer height="auto" class="footer-container py-2 mt-5">
      <v-layout class="text-xs-center footer-card_container" column>
          <v-flex class="pt-0">
             <a href="/tsdiet-soglashenie.pdf">Соглашение</a> 
          </v-flex>
          <v-flex class="pt-1">
              Сайт предназначен для информационных целей и не является заменой медицинской консультации.
          </v-flex>
          <v-flex class=" pt-1">
             Копирование и распространение информации разрешено при условии активной ссылки.
          </v-flex>
          <v-flex class=" pt-1">
             <span>По любым вопросам, касаемых работы данного сайта, пишите нам на <a href="mailto:info@tsdiet.ru">info@tsdiet.ru</a></span> 
          </v-flex>
          <v-flex class="pt-1">
             &copy; 2018 TheSmartestDiet
          </v-flex>
      </v-layout>
  </v-footer>
</v-app>
</template>

<script>

export default {
    data() {
        return {
            sideNav: false,
            menuItems: [
            {
                icon:'restaurant', title:'Диетические рецепты',  link:'/'
            },
             {
                icon:'fitness_center', title:'Калькулятор калорий',  link:'/calc/cc_main'
            },
	    {
	    icon:'input', title:'Вход',  link:'/calc/cc_main'
	    },
	    {
            icon:'person_add', title:'Регистрация',  link:'/calc/cc_main'
	    }
            ]
        }
    }
}
</script>
<style scoped>
.tsd-color_blue {
    color:#009cff;
}

.tsd-border_toolbar {
    border-bottom: 3px solid #009cff; 
    border-top: 3px solid #0ca600;
}
.tsd-color_green {
    color: #0ca600
}
.tsd-color_black {
    color:#383838
}
.tsd_bg{
    background: url(/img/bg_texture.png) repeat;
    min-width:320px;
}
.tsd-logo{
    margin-top: 20px;
    margin-bottom: 30px;
}
.img-link{
  background-color: rgba(0, 0, 255, 0);
  margin: 0 auto;
}
.main-links {
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom: 15px;
  
}
.links-items{
 padding: 30px 10px;
 margin:0;

}
.menu-forphone {
  display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}
</style>
<style>
    .calc-caption{
        font-size: calc( (100vw - 480px)/(1280 - 480) * (22 - 14) + 18px);
        text-align:center;
        font-weight:300;
        border-left: 4px solid #009cff;
        border-right: 4px solid #009cff;
        border-bottom: 2px solid  #0ca600;
        border-top:2px solid #0ca600;
        padding:5px;
        margin:0 0 40px 0;
    }
.page-enter-active, .page-leave-active {
  transition: all .25s ease-out;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
.footer-card_container {
    margin: auto;
    max-width: 960px;
    color: #383838;
    font-size: 1em;
}
.footer-container {
     background: url(/img/bg_texture.png) repeat !important;
    border-top: 3px solid #009cff;
    border-bottom: 3px solid #0ca600;
}
</style>

