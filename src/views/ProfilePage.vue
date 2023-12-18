<template>
    <div class="profile-interface">
      <h1 class="interface-title">Личный кабинет</h1>
      <div v-if="user" class="profile-details">
        <p><strong>Имя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div v-else class="loading">
        <p>Загрузка данных пользователя...</p>
      </div>
      <button @click="goToCart" class="action-btn cart-btn">Корзина</button>
      <button @click="goToShop" class="action-btn shop-btn">Магазин</button>
      <button @click="logout" class="action-btn logout-btn">Выход</button>
    </div>
  </template>
  
  
  <script>
  import http from '@/services/http';
  import authService from '@/services/authenservice'; 
  
  export default {
    data() {
      return {
        user: null
      };
    },
    methods: {
      async fetchUser() {
        try {
          const response = await http.get('/user');
          this.user = response.data;
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
        }
      },
      goToShop() {
        this.$router.push({ name: 'CatalogPage' }); 
      },
      goToCart() {
        this.$router.push({ name: 'KorzinaPage' }); 
      },
      logout() {
        authService.logout();
        this.$router.push({ name: 'LoginPage' });
      }
    },
    created() {
      this.fetchUser();
    }
  };
  </script>
  <style scoped>
  .profile-interface {
    max-width: 600px;
    margin: auto;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333;
  }
  
  .interface-title {
    color: #007bff;
    margin-bottom: 20px;
  }
  
  .profile-details {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .loading {
    margin-bottom: 20px;
  }
  
  .action-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
    color: #fff;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  
  .cart-btn {
    background-color: #28a745;
  }
  
  .cart-btn:hover {
    background-color: #218838;
  }
  
  .shop-btn {
    background-color: #17a2b8;
  }
  
  .shop-btn:hover {
    background-color: #138496;
  }
  
  .logout-btn {
    background-color: #007bff;
  }
  
  .logout-btn:hover {
    background-color: #0056b3;
  }
  </style>