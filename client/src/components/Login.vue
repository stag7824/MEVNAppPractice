
<template>
    <div>
      <h2>Login</h2>
      <form @submit="login">
        <label>Email: </label>
        <input v-model="email" type="text">
        <label>Password: </label>
        <input v-model="password" type="password">
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/authenticate', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.data.success) {
            this.$emit('auth', res.data.token);
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => console.log(err));
      }
    }
  };
  </script>
  