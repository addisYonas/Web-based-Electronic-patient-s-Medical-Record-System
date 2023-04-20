import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#1697F6',
    success: '#82C4F7',
    info: '#ffaa2c',
    error: '#f83e70',
    accent: '#84ffff'
  }
})
