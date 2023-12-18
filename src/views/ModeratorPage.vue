<template>
    <div class="user-profile">
      <h1>Профиль пользователя</h1>
      <div v-if="user">
        <p><strong>Имя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div v-else>
        <p>Загрузка данных пользователя...</p>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        http.get('/user')
          .then(response => {
            this.user = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении данных пользователя:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f0f7ff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .user-profile h1 {
    color: #003366;
  }
  
  .user-profile p {
    color: #003366;
    font-size: 16px;
    margin: 10px 0;
  }
  </style>
  