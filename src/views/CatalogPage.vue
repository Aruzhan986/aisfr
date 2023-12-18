<template>
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="`http://localhost:8000/storage/photo_path/${product.photo_path}`" alt="product.name" class="product-image"/>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Категория: {{ product.category.name }}</p>
          <p>Цена: {{ product.price }} тг.</p>
          <button @click="addToCart(product)">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        products: []
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        http.get('/products')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => console.error('Ошибка при получении товаров:', error));
      },
      addToCart(product) {
      http.post('/cart/add', {
        product_id: product.id,
        quantity: 1
      })
      .then(() => {
        alert('Товар добавлен в корзину');
      })
      .catch(error => {
        console.error('Ошибка при добавлении товара в корзину:', error);
      });
    }
    }
  };
  </script>
  
  <style scoped>
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f4f7fc; 
  }
  
  .product-card {
    width: 300px;
    margin: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #007bff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .product-info {
    margin-top: 10px;
  }
  
  .product-info h3 {
    color: #003366; 
    margin-bottom: 5px;
  }
  
  .product-info p {
    color: #333333; 
    margin-bottom: 5px;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff; 
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3; 
  }
  </style>
  
  