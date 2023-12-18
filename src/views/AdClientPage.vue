<template>
    <div class="admin-clients">
      <h1>Управление клиентами</h1>
  
      <button @click="showCreateForm" class="add-client-button">Добавить клиента</button>
  
      <div v-if="createFormVisible" class="client-form">
        <input v-model="newClient.name" placeholder="Имя клиента" />
        <button @click="createClient">Создать</button>
      </div>
  
      <ul class="client-list">
        <li v-for="client in clients" :key="client.id">
          {{ client.name }}
          <button @click="showEditForm(client)">Редактировать</button>
          <button @click="deleteClient(client.id)">Удалить</button>
        </li>
      </ul>
  
      <div v-if="editFormVisible" class="client-form">
        <input v-model="editableClient.name" placeholder="Имя клиента" />
        <button @click="updateClient">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/services/http';
  
  export default {
    data() {
      return {
        clients: [],
        createFormVisible: false,
        editFormVisible: false,
        newClient: { name: '' },
        editableClient: null,
      };
    },
    methods: {
      fetchClients() {
        http.get('/clients').then(response => {
          this.clients = response.data;
        });
      },
      showCreateForm() {
        this.createFormVisible = true;
        this.editFormVisible = false;
        this.newClient.name = '';
      },
      createClient() {
        http.post('/clients', this.newClient).then(() => {
          this.createFormVisible = false;
          this.fetchClients();
        });
      },
      showEditForm(client) {
        this.editableClient = { ...client };
        this.editFormVisible = true;
        this.createFormVisible = false;
      },
      updateClient() {
        http.put(`/clients/${this.editableClient.id}`, this.editableClient).then(() => {
          this.editFormVisible = false;
          this.fetchClients();
        });
      },
      deleteClient(id) {
        http.delete(`/clients/${id}`).then(() => {
          this.fetchClients();
        });
      }
    },
    created() {
      this.fetchClients();
    }
  };
  </script>
  
  <style scoped>
  .admin-clients {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f0f7ff;
  }
  
  .admin-clients h1 {
    color: #003366; 
    text-align: center;
  }
  
  .add-client-button {
    background-color: #007bff; 
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .client-form {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .client-form input {
    width: 100%;
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 5px;
    font-size: 16px;
  }

  .client-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .client-form button:hover {
    background-color: #0056b3;
  }

  
  .client-list {
    list-style-type: none;
    padding: 0;
  }
  
  .client-list li {
    background-color: #fff;
    border: 1px solid #007bff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .client-list button {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
  }
  
  .client-list button:hover {
    background-color: #0056b3;
  }
  </style>
  