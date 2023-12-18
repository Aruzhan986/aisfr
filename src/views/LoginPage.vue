<template>
    <div class="custom-login-interface">
      <h1 class="custom-interface-title">Вход</h1>
      <form @submit.prevent="login" class="custom-login-form">
        <div class="custom-input-area">
          <label for="email" class="custom-input-label">Email</label>
          <input id="email" v-model="form.email" type="email" required class="custom-input-box">
        </div>
        <div class="custom-input-area">
          <label for="password" class="custom-input-label">Password</label>
          <input id="password" v-model="form.password" type="password" required class="custom-input-box">
        </div>
        <button type="submit" class="custom-login-button">Log In</button>
      </form>
    </div>
  </template>
  
  <script>
  import authService from '@/services/authenservice';
  
  export default {
    name: "LoginPage",
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
      }
    },
    methods: {
    async login() {
      const response = await authService.login(this.form);
      if (response.success) {
        const userRole = localStorage.getItem('roles');
        if (userRole === 'Admin') { 
          this.$router.push('/adcategory'); 
        } else if (userRole === 'Moderator') {
          this.$router.push('/moderator');
        } else {
          this.$router.push('/profile');
        }
      } else {
        console.error("An error occurred during login.", response.errors);
      }
    },
  }
  
  }
  </script>
  
  <style scoped>
  .custom-login-interface {
    max-width: 400px;
    margin: auto;
    padding: 40px;
    background: #f0f7ff; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .custom-interface-title {
    font-size: 28px;
    color: #003366;
    margin-bottom: 20px;
  }
  
  .custom-login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .custom-input-area {
    display: flex;
    flex-direction: column;
  }
  
  .custom-input-box {
    width: 100%;
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 5px;
    margin: 5px 0;
    font-size: 16px;
  }
  
  .custom-input-label {
    color: #003366; 
    margin-bottom: 5px;
  }
  
  .custom-login-button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .custom-login-button:hover {
    background-color: #0056b3;
  }
  </style>
  
  