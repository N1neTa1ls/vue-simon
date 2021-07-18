<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h3 class="title">Регистрация</h3>
    <div class="items-container">
      <div class="form-field" v-for="(field, index) of fields" :key="index" v-bind:class="{ error: field.errors.length }">
        <input
          class="input"
          v-bind:type="field.type"
          v-bind:placeholder="field.placeholder"
          v-bind:required="field.required"
          v-model="field.value"
          v-on:keyup="clearErrors(field)"
        >
        <div v-show="field.errors.length" class="error-container">
          <p v-for="error in field.errors" :key="error">{{ error }}</p>
        </div>

      </div>
      <div v-show="nonFieldErrors.length" class="error-container">
        <p v-for="error in nonFieldErrors" :key="error">{{ error }}</p>
      </div>
      <button class="button" type="submit" v-bind:disabled="buttonDisabled">Регистрация</button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Register',
    data() {
      return {
        nonFieldErrors: [],
        buttonDisabled: false,
        fields: [{
          name: 'username',
          type: 'text',
          placeholder: 'Имя',
          required: true,
          sended: true,
          value: '',
          errors: []
        }, {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail',
          required: false,
          sended: true,
          value: '',
          errors: []
        }, {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
          required: true,
          sended: true,
          value: '',
          errors: []
        }, {
          name: 'password_confirm',
          type: 'password',
          placeholder: 'Повторите пароль',
          required: false,
          sended: false,
          value: '',
          errors: []
        }]
      }
    },
    methods: {
      clearErrors(field) {
        this.buttonDisabled = this.fields.some(el => el.errors.length);
        field.errors = [];
        this.nonFieldErrors = [];
      },
      async handleSubmit() {
        const password = this.fields.find(el => el.name === 'password');
        const password_confirm = this.fields.find(el => el.name === 'password_confirm');

        if (password.value !== password_confirm.value) {
          password_confirm.errors.push('Пароли не совпадают');
          this.buttonDisabled = true;
          return;
        }

        const data = {};
        this.fields.forEach(el => {
          el.errors.length = 0;
          if (el.sended) {
            data[el.name] = el.value;
          }
        });

        const response = await axios.post('users/create/', data).catch(err => {
          if (err.response.status === 400) {
            for (const key in err.response.data) {
              if (Object.hasOwnProperty.call(err.response.data, key)) {
                const errors = err.response.data[key];
                const field = this.fields.find(el => el.name === key);
                if (field) {
                  field.errors = errors;
                } else {
                  this.nonFieldErrors = errors;
                }
                this.buttonDisabled = true;
              }
            }
          }
        });

        if (response) {
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('token', response.data.token);
          this.$router.push('/');
        }
      },
    },
  }
</script>

<style>
</style>