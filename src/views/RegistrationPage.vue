<template>
    <div class="signup-page">
      <h1 class="signup-title">Регистрация</h1>
      <form @submit.prevent="registerUser" class="signup-form">
        <div class="input-group">
          <input id="name" v-model="name" type="text" required placeholder="Имя" class="input-field">
        </div>
        <div class="input-group">
          <input id="email" v-model="email" type="email" required placeholder="Email" class="input-field">
        </div>
        <div class="input-group">
          <input id="password" v-model="password" type="password" required placeholder="Пароль" class="input-field">
        </div>
        <button type="submit" class="register-button">Зарегистрироваться</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      registerUser() {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.$http.post('/register', userData)
          .then(response => {
            localStorage.setItem('authToken', response.data.token); 
            this.$router.push('/login'); 
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-page {
    max-width: 400px;
    margin: auto;
    padding: 40px;
    background: #f0f7ff; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .signup-title {
    font-size: 28px;
    color: #003366;
    margin-bottom: 20px;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 5px;
    margin: 5px 0;
    font-size: 16px;
  }
  
  .register-button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .register-button:hover {
    background-color: #0056b3; 
  }
  </style>