<template>
  <div>
    <Register />
    <Login @auth="handleAuth" />
  </div>
</template>

<script>
import Register from './components/Register';
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    Register,
    Login
  },
  methods: {
    handleAuth(token) {
      console.log(token);
      // store the token somewhere safe and include it in the headers of subsequent requests
    }
  }
};
</script>
