<template>
    <div>
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user._id">
          {{ user.name }} - {{ user.email }}
          <button @click="deleteUser(user._id)">Delete</button>
        </li>
      </ul>
      <form @submit="createUser">
        <label>Name: </label>
        <input v-model="name" type="text">
        <label>Email: </label>
        <input v-model="email" type="text">
        <label>Password: </label>
        <input v-model="password" type="password">
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Users',
    data() {
      return {
        users: [],
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      getUsers() {
        axios.get('http://localhost:5000/api')
          .then(res => {
            this.users = res.data;
          })
          .catch(err => console.log(err));
      },
      createUser(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/create', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.name = '';
          this.email = '';
          this.password = '';
          this.getUsers();
        })
        .catch(err => console.log(err));
      },
      deleteUser(id) {
        axios.delete(`http://localhost:5000/api/delete/${id}`)
          .then(() => this.getUsers())
          .catch(err => console.log(err));
      }
    },
    created() {
      this.getUsers();
    }
  };
  </script>
  