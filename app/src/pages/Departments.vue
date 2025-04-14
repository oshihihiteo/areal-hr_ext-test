<script>
import * as departmentAPI from '../instances/departments.js';
import * as dropdownListAPI from '../instances/dropdown-list-options.js'
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
      errors: {},
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
        this.organizations = await dropdownListAPI.getOrganizationsNames();
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
      try {
        await departmentAPI.createDepartment(departmentData);
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка:", error.response ? error.response.data : error.message);
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    async updateDepartment(departmentData) {
      try {
        await departmentAPI.updateDepartment(this.selectedDepartment.id, departmentData)
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка:", error.response ? error.response.data : error.message);
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedDepartment = null;
      this.isFormVisible = true;
      this.errors={};
    },
    showEditForm(department) {
      this.isEditing = true;
      this.selectedDepartment = department;
      this.isFormVisible = true;
      this.errors={};
    },
    handleUpdate() {
      this.getDepartments();
      this.isFormVisible = false;
      this.errors={};
    },
    handleCancel() {
      this.isFormVisible = false;
      this.errors={};
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
        :errors="errors"
        @update="updateDepartment"
        @create="createDepartment"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>

</style>
