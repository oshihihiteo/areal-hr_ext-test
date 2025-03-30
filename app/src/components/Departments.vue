<script>
import axios from "axios";

export default {
  data() {
    return {
      departments: [],
      organizations: [],
      isCreating: false,
      isEditing: false,
      departmentData: {
        name: "",
        organization_id: "",
        parent_id: "",
        comment: "",
      },
      departmentId: null,
    };
  },
  methods: {
    async getDepartments() {
      try {
        const response = await axios.get("http://localhost:5000/departments");
        this.departments = response.data.departments;
      } catch (error) {
        console.error("Ошибка при загрузке отделов:", error);
      }
    },

    async getOrganizations() {
      try {
        const response = await axios.get("http://localhost:5000/organizations");
        this.organizations = response.data.organizations;
      } catch (error) {
        console.error("Ошибка при загрузке организаций:", error);
      }
    },

    async createDepartment() {
      if (!this.departmentData.name.trim()) return;
      try {
        await axios.post("http://localhost:5000/departments", {departmentData: this.departmentData});
        await this.getDepartments();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при добавлении отдела:", error.response?.data || error.message);
      }
    },

    openEditForm(department) {
      this.isEditing = true;
      this.isCreating = false;
      this.departmentData = { ...department };
      this.departmentId = department.id;
    },

    async updateDepartment() {
      if (!this.departmentData.name.trim()) return;

      console.log(this.departmentData)

      try {
        await axios.put(`http://localhost:5000/departments/${this.departmentId}`,
            {departmentData: this.departmentData});
        await this.getDepartments();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при обновлении отдела:", error.response?.data || error.message);
      }
    },

    async deleteDepartment(id) {
      if (!confirm("Вы уверены, что хотите удалить этот отдел?")) return;

      try {
        await axios.delete(`http://localhost:5000/departments/${id}`);
        await this.getDepartments();
      } catch (error) {
        console.error("Ошибка при удалении отдела:", error.response?.data || error.message);
      }
    },

    cancelForm() {
      this.isCreating = false;
      this.isEditing = false;
      this.departmentData = { name: "", organization_id: "", parent_id: "", comment: "" };
      this.departmentId = null;
    },

    getOrganizationName(orgId) {
      const organization = this.organizations.find(org => org.id === orgId);
      return organization ? organization.name : "Неизвестно";
    },

    getDepartmentName(deptId) {
      if (!deptId) return "-";
      const department = this.departments.find(dept => dept.id === deptId);
      return department ? department.name : "Неизвестно";
    }
  },


  async mounted() {
    await this.getDepartments();
    await this.getOrganizations();
  },
};
</script>

<template>
  <div>
    <div :class="{ 'blurred': isCreating || isEditing }" class="content">
      <h2>Список отделов</h2>
      <button class="create-btn" @click="isCreating = true">Добавить отдел</button>

      <table>
        <thead>
        <tr>
          <th>Название</th>
          <th>Организация</th>
          <th>Родительский отдел</th>
          <th>Комментарий</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="department in departments" :key="department.id">
          <td>{{ department.name }}</td>
          <td>{{ getOrganizationName(department.organization_id) }}</td>
          <td>{{ getDepartmentName(department.parent_id) }}</td>
          <td>{{ department.comment }}</td>
          <td>
            <button class="edit-btn" @click="openEditForm(department)">Редактировать</button>
            <button class="delete-btn" @click="deleteDepartment(department.id)">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isCreating || isEditing" class="overlay">
      <div class="form-container">
        <h3>{{ isEditing ? "Редактировать отдел" : "Создать отдел" }}</h3>

        <input type="text" v-model="departmentData.name" placeholder="Название отдела" />

        <select v-model="departmentData.organization_id">
          <option value="" disabled selected hidden>Выберите организацию</option>
          <option v-for="organization in organizations" :key="organization.id" :value="organization.id">
            {{ organization.name }}
          </option>
        </select>

        <select v-model="departmentData.parent_id">
          <option value="" disabled selected hidden>Выберите родительский отдел</option>
          <option :value="null">-</option>
          <option v-for="department in departments" :key="department.id" :value="department.id">
            {{ department.name }}
          </option>
        </select>



        <input type="text" v-model="departmentData.comment" placeholder="Комментарий" />

        <button v-if="isEditing" @click="updateDepartment">Сохранить</button>
        <button v-else @click="createDepartment">Создать</button>
        <button @click="cancelForm">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
