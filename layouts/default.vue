<!--<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }
</script> -->
<template>
  <v-app class="tsd_bg">
    <v-card nuxt to="/" flat class="img-link">
      <img src="~/assets/img/logo.png" alt="logo" width="500" height="70" class="hidden-xs-only tsd-logo" >
      </v-card>
  <v-toolbar light  flat class="tsd-border_toolbar tsd_bg hidden-sm-and-up menu-forphone" >
      <v-toolbar-side-icon  @click.native.stop="sideNav = !sideNav"> </v-toolbar-side-icon>
         <v-toolbar-title >
              <nuxt-link to="/">
              <img src="~/assets/img/logo_s.png" alt="theSmartestDiet" >
              </nuxt-link>
          <!--<span class="tsd-color_black">The</span><span class="tsd-color_blue">Smartest</span><span class="tsd-color_green">Diet</span><span class="tsd-color_black">.ru</span> -->
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
              <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link" exact="">
                  <v-list-tile-action>
                      <v-icon>{{item.icon}}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>{{item.title}}</v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>
  <v-footer app></v-footer>
</v-app>
</template>

<script>

export default {
    data() {
        return {
            sideNav: false,
            menuItems: [{
                icon:'home',title:'Главная', link:'/'
                },
            {
                icon:'fitness_center', title:'Калькулятор калорий',  link:'/calc/cc_main'
            },
            {
                icon:'restaurant', title:'Диетические рецепты',  link:'/recipes/dr_main'
            }]
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
    background: url(~/assets/img/bg_texture.png) repeat;
    min-width:320px;
}
.tsd-logo{
    margin-top: 20px;
    margin-bottom: 30px;
}
.img-link{
  background-color: rgba(0, 0, 255, 0);
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.main-links {
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom: 15px;
  
}
.links-items{
 padding: 30px 0;
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
</style>

