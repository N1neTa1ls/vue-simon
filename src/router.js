import Vue from 'vue';
import Router from 'vue-router';
import BoardsList from './components/BoardsList.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BoardsList,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/*',
      component: BoardsList,
    }
  ]
});