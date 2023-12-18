<template>
    <div class="admin-categories">
      <h1>Управление категориями</h1>
      
      <div class="navigation-buttons">

        <button @click="goToPage('/adproduct')">Товары</button>
        <button @click="goToPage('/adclient')">Пользователи</button>
      </div>
  

      <button @click="showCreateForm">Добавить категорию</button>
  

      <div v-if="createFormVisible" class="category-form">
        <input v-model="newCategoryName" placeholder="Название категории">
        <button @click="createCategory">Создать</button>
      </div>
  

      <ul class="category-list">
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
          <button @click="showEditForm(category)">Редактировать</button>
          <button @click="deleteCategory(category.id)">Удалить</button>
        </li>
      </ul>
  

      <div v-if="editFormVisible" class="category-form">
        <input v-model="editableCategory.name" placeholder="Название категории">
        <button @click="updateCategory">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        categories: [],
        createFormVisible: false,
        editFormVisible: false,
        newCategoryName: '',
        editableCategory: null,
      };
    },
    methods: {
      fetchCategories() {
        http.get('/categories').then(response => {
          this.categories = response.data;
        });
      },
      showCreateForm() {
        this.createFormVisible = true;
        this.editFormVisible = false;
      },
      createCategory() {
        http.post('/categories', { name: this.newCategoryName })
          .then(() => {
            this.newCategoryName = '';
            this.createFormVisible = false;
            this.fetchCategories();
          });
      },
      showEditForm(category) {
        this.editableCategory = { ...category };
        this.editFormVisible = true;
        this.createFormVisible = false;
      },
      updateCategory() {
        http.put(`/categories/${this.editableCategory.id}`, { name: this.editableCategory.name })
          .then(() => {
            this.editFormVisible = false;
            this.fetchCategories();
          });
      },
      deleteCategory(id) {
        http.delete(`/categories/${id}`).then(() => {
          this.fetchCategories();
        });
      },
      goToPage(path) {
        this.$router.push(path);
      }
    },
    created() {
      this.fetchCategories();
    }
  };
  </script>

<style scoped>
.admin-categories {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f0f7ff;
}

.admin-categories h1 {
  color: #003366;
  text-align: center;
}

.navigation-buttons, .action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.navigation-buttons button, .action-buttons button {
  background-color: #007bff;
  color: white;
  margin: 0 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.navigation-buttons button:hover, .action-buttons button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-list li {
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-list button {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.category-list button:hover {
  background-color: #0056b3;
}

.category-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
}

.category-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.category-form button:hover {
  background-color: #0056b3;
}
</style>

