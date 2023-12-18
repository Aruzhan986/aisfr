<template>
    <div class="admin-products">
      <h1>Управление товарами</h1>
  
      <button @click="showCreateForm" class="add-product-button">Добавить товар</button>
  
      <div v-if="createFormVisible" class="product-form">
        <input v-model="newProduct.name" placeholder="Название товара" />
        <textarea v-model="newProduct.description" placeholder="Описание товара"></textarea>
        <select v-model="newProduct.category_id">
      <option v-for="category in categories" :value="category.id" :key="category.id">
        {{ category.name }}
      </option>
    </select>
        <button @click="createProduct">Создать</button>
      </div>
  
      <ul class="product-list">
        <li v-for="product in products" :key="product.id">
          {{ product.name }}
          <button @click="showEditForm(product)">Редактировать</button>
          <button @click="deleteProduct(product.id)">Удалить</button>
        </li>
      </ul>
  
      <div v-if="editFormVisible" class="product-form">
        <input v-model="editableProduct.name" placeholder="Название товара" />
        <textarea v-model="editableProduct.description" placeholder="Описание товара"></textarea>
        <select v-model="editableProduct.category_id">
      <option v-for="category in categories" :value="category.id" :key="category.id">
        {{ category.name }}
      </option>
    </select>
        <button @click="updateProduct">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        categories: [],
        products: [],
        createFormVisible: false,
        editFormVisible: false,
        newProduct: { name: '', description: '' },
        editableProduct: null,
      };
    },
    methods: {
      fetchCategories() {
      http.get('/categories').then(response => {
        this.categories = response.data;
      });
    },
      fetchProducts() {
        http.get('/products').then(response => {
          this.products = response.data;
        });
      },
      showCreateForm() {
        this.createFormVisible = true;
        this.editFormVisible = false;
      },
      createProduct() {
        http.post('/products', this.newProduct).then(() => {
          this.newProduct = { name: '', description: '' };
          this.createFormVisible = false;
          this.fetchProducts();
        });
      },
      showEditForm(product) {
        this.editableProduct = { ...product };
        this.editFormVisible = true;
        this.createFormVisible = false;
      },
      updateProduct() {
        http.put(`/products/${this.editableProduct.id}`, this.editableProduct).then(() => {
          this.editFormVisible = false;
          this.fetchProducts();
        });
      },
      deleteProduct(id) {
        http.delete(`/products/${id}`).then(() => {
          this.fetchProducts();
        });
      },
    },
    created() {
      this.fetchProducts();
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .admin-products {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f0f7ff; 
  }
  
  .admin-products h1 {
    color: #003366;
    text-align: center;
  }
  
  .add-product-button {
    background-color: #007bff; 
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .product-form {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-form input, .product-form textarea, .product-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
}

.product-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-form button:hover {
  background-color: #0056b3;
}
  
  .product-list {
    list-style-type: none;
    padding: 0;
  }
  
  .product-list li {
    background-color: #fff;
    border: 1px solid #007bff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .product-list button {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
  }
  
  .product-list button:hover {
    background-color: #0056b3;
  }
  </style>
  