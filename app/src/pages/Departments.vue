<script>
import * as departmentAPI from '../instances/departments.js';
import * as organizationAPI from '../instances/organizations.js';
import DepartmentsTable from "@/components/DepartmentsTable.vue";
import DepartmentForm from "@/components/DepartmentForm.vue";
import CreateButton from "@/components/CreateButton.vue";

export default {
  components: {DepartmentsTable, DepartmentForm, CreateButton},
  data() {
    return {
      departments: [],
      organizations: [],
      isFormVisible: false,
      isEditing: false,
      selectedDepartment: null,
      buttonName: "отдел"
    };
  },
  methods: {
    async getDepartments() {
      try {
        this.departments = await departmentAPI.getDepartments();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getOrganizations() {
      try {
        this.organizations = await organizationAPI.getOrganizations();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async deleteDepartment(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await departmentAPI.deleteDepartment(id);
        await this.getDepartments();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async createDepartment(departmentData) {
      if (!departmentData.name.trim()) return;
      try {
        await departmentAPI.createDepartment(departmentData);
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      }
    },
    async updateDepartment(departmentData) {
      if (!departmentData.name.trim()) return;
      try {
        await departmentAPI.updateDepartment(this.selectedDepartment.id, departmentData)
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      }
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedDepartment = null;
      this.isFormVisible = true;
    },
    showEditForm(department) {
      this.isEditing = true;
      this.selectedDepartment = department;
      this.isFormVisible = true;
    },
    handleUpdate() {
      this.getDepartments();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
  },
  mounted() {
    this.getOrganizations();
    this.getDepartments()
  },
};
</script>

<template>
  <div class="content">
    <h2>Отделы</h2>
    <CreateButton
        :buttonName = buttonName
        @create="showCreateForm"
    />

    <DepartmentsTable
        :departments="departments"
        :organizations="organizations"
        @edit="showEditForm"
        @delete="deleteDepartment"
    />

    <DepartmentForm
        v-if="isFormVisible"
        :department="selectedDepartment"
        :departments="departments"
        :organizations="organizations"
        :isEditing="isEditing"
        @update="updateDepartment"
        @create="createDepartment"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>

</style>
