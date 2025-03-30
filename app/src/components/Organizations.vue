<script>
import axios from "axios";

export default {
  data() {
    return {
      organizations: [],
      isCreating: false,
      isEditing: false,
      organizationData: {
        name: "",
        comment: ""},
      editingOrganizationId: null,
    };
  },
  methods: {
    async getAllOrganizations() {
      try {
        const response = await axios.get("http://localhost:5000/organizations");
        this.organizations = response.data.organizations;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    async createOrganization() {
      if (!this.organizationData.name.trim()) return;

      try {
        await axios.post("http://localhost:5000/organizations", {
          organizationData: this.organizationData,
        });
        await this.getAllOrganizations();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при добавлении данных:", error.response ? error.response.data : error.message);
      }
    },

    openEditForm(organization) {
      this.isEditing = true;
      this.isCreating = false;
      this.organizationData = { name: organization.name,
        comment: organization.comment};
      this.editingOrganizationId = organization.id;
    },

    async updateOrganization() {
      if (!this.organizationData.name.trim()) return;

      try {
        await axios.put(`http://localhost:5000/organizations/${this.editingOrganizationId}`, {
          organizationData: this.organizationData,
        });
        await this.getAllOrganizations();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },

    async deleteOrganization(id) {
      if (!confirm("Вы уверены, что хотите удалить эту организацию?")) return;

      try {
        await axios.delete(`http://localhost:5000/organizations/${id}`);
        await this.getAllOrganizations();
      } catch (error) {
        console.error("Ошибка при удалении данных:", error.response ? error.response.data : error.message);
      }
    },

    cancelForm() {
      this.isCreating = false;
      this.isEditing = false;
      this.organizationData.name = "";
      this.organizationData.comment = "";
      this.editingOrganizationId = null;
    },
  },

  mounted() {
    this.getAllOrganizations();
  },
};
</script>

<template>
  <div>
    <div :class="{ 'blurred': isCreating || isEditing }" class="content">
      <h2>Список организаций</h2>
      <button class="create-btn" @click="isCreating = true">Добавить организацию</button>

      <table>
        <thead>
        <tr>
          <th>Название</th>
          <th>Комментарий</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="organization in organizations" :key="organization.id">
          <td>{{ organization.name }}</td>
          <td>{{organization.comment}}</td>
          <td>
            <button class="edit-btn" @click="openEditForm(organization)">Редактировать</button>
            <button class="delete-btn" @click="deleteOrganization(organization.id)">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isCreating || isEditing" class="overlay">
      <div class="form-container">
        <h3>{{ isEditing ? "Редактировать организацию" : "Создать организацию" }}</h3>
        <input type="text" v-model="organizationData.name" placeholder="Название организации" />
        <input type="text" v-model="organizationData.comment" placeholder="Комменарий" />
        <button v-if="isEditing" @click="updateOrganization">Сохранить</button>
        <button v-else @click="createOrganization">Создать</button>
        <button @click="cancelForm">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
