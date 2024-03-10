import Vue from 'vue';
import {BootstrapVue,BootstrapVueIcons } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "vue-select/dist/vue-select.css";

import Category from './components/category.vue';
import Tree from './components/CatTree.vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
import App from './App.vue';


const router = new VueRouter({
  routes: [
    
    { path: '/', component: Category },
    { path: '/tree', component: Tree },
    
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
