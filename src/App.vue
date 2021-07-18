<template>
  <div class="app">
    <header class="header">
      <div v-if="!token" >
        <router-link class="link" to="/login">Вход</router-link>
        <router-link class="link" to="/register">Регистрация</router-link>
      </div>
      <span v-if="token" class="link" v-on:click="logout">Выйти</span>
    </header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    name: 'App',
    created() {
      const token = localStorage.getItem('token');
      this.setToken(token);

      if (this.$router.currentRoute.path !== '/' && this.token) {
        this.$router.push('/');
      }
    },
    beforeUpdate() {
      this.setToken();
    },
    methods: {
      logout() {
        this.$store.dispatch('token', null);
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      setToken(token) {
        if (token) {
          this.$store.dispatch('token', token);
        }
        axios.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
      }
    },
    computed: {
      ...mapGetters(['token'])
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 130%;
    font-family: 'Roboto', sans-serif;
  }
  *::-webkit-scrollbar {
    width: 5px;
    background-color: #3c3d41;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #18aaaa;
  }
  .app {
    background: #35383e;
    min-height: 100vh;
  }
  .header {
    height: 40px;
    background: #eee;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px;
  }
  .link {
    margin: 5px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.8;
  }
  .link:hover {
    opacity: 1;
    text-decoration: underline;
  }
  .container {
    padding: 20px 10px;
  }
  .title {
    text-transform: uppercase;
    font-weight: 300;
    padding: 5px 10px;
    background: #50ad66;
    color: #fff;
    font-size: 20px;
  }
  .form {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  .items-container {
    background: #2f3135;
    padding: 7px;
  }
  .input {
    height: 40px;
    padding: 10px;
    margin-bottom: 15px;
    width: 100%;
    background: #505050;
    border: 1px solid #3c3d41;
    color: #eee;
    outline: none;
  }
  .input::placeholder {
    color: #949494;
  }
  .form-field.error .input {
    background: #eee;
    border: 1px solid red;
    color: #35383e;
    margin-bottom: 10px;
  }
  .error-container {
    border: 1px solid red;
    margin-bottom: 10px;
    padding: 5px;
    background: #ff000054;
    color: #eee;
    font-size: 14px
  }
  .error-container p {
    margin: 5px 10px;
  }
  .button {
    height: 40px;
    width: 100%;
    width: 100%;
    background: #5f6163;
    border: 1px solid #525458;
    color: #c3c5c7;
    cursor: pointer;
    font-size: 14px;
  }
  .button.small {
    height: auto;
    max-width: 160px;
  }
  .button:not(:disabled):hover {
    background: #525355;
    color: #eee;
  }
  .button:disabled {
    cursor: default;
  }
</style>
