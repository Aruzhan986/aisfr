<template>
    <div class="cart">
      <h2>Корзина</h2>
      <div v-if="cartItems.length">
        <div v-for="cartItem in cartItems" :key="cartItem.id" class="cart-item">
            <div>{{ cartItem.product?.name || 'Название продукта неизвестно' }}</div>
      <div>{{ cartItem.quantity }}</div>
          <div>
            <input type="number" v-model.number="cartItem.quantity" @change="updateCartItem(cartItem)" min="1">
          </div>
          <button @click="removeFromCart(cartItem.id)">Удалить</button>
        </div>
      </div>
      <div v-else>
        <p>Ваша корзина пуста</p>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        cartItems: []
      };
    },
    methods: {
      fetchCartItems() {
        http.get('/cart/view')
          .then(response => {
            this.cartItems = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении товаров в корзине:', error);
          });
      },
      updateCartItem(cartItem) {
        http.put(`/cart/update/${cartItem.id}`, {
          quantity: cartItem.quantity
        })
        .catch(error => {
          console.error('Ошибка при обновлении товара в корзине:', error);
        });
      },
      removeFromCart(cartItemId) {
        http.delete(`/cart/remove/${cartItemId}`)
          .then(() => {
            this.fetchCartItems();
          })
          .catch(error => {
            console.error('Ошибка при удалении товара из корзины:', error);
          });
      }
    },
    created() {
      this.fetchCartItems();
    }
  };
  </script>
  
  <style scoped>
  .cart {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #f0f7ff; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cart h2 {
    color: #003366; 
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    background: #ffffff; 
    border: 1px solid #007bff; 
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .cart-item div {
    margin: 0 10px;
  }
  
  input[type="number"] {
    width: 60px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #007bff;
  }
  
  button {
    padding: 8px 12px;
    background-color: #007bff; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3; 
  }
  
  .cart-item button {
    margin-left: auto; 
  }
  </style>
  
  