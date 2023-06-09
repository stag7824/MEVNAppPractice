<template>
    <div>
      <h2>Register</h2>
      <form @submit="register">
        <label>Name: </label>
        <input v-model="name" type="text">
        <label>Email: </label>
        <input v-model="email" type="text">
        <label>Password: </label>
        <input v-model="password" type="password">
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/create', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      }
    }
  };
  </script>
  