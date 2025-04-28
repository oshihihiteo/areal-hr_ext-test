<script>
import * as employeesAPI from "../instances/employees.js";
import CreateButton from "@/components/CreateButton.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import {useUserStore} from "@/stores/userStore.js";

export default {
  components: { EmployeeForm, EmployeesTable, CreateButton },
  data() {
    return {
      employees: [],
      isFormVisible: false,
      isEditing: false,
      errors: {},
      selectedEmployee: null,
      buttonName: "сотрудника",
    };
  },
  setup() {
    const userStore = useUserStore();

    return {
      isAdminOrManager: userStore.isAdminOrManager,
    };
  },
  methods: {
    async getEmployees() {
      try {
        this.employees = await employeesAPI.getEmployees();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createEmployee(employeeData) {
      try {
        await employeesAPI.createEmployee(employeeData);
        this.handleUpdate();
      } catch (error) {
        console.error(
          "Ошибка:",
          error.response ? error.response.data : error.message,
        );
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    async deleteEmployee(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await employeesAPI.deleteEmployee(id);
        await this.getEmployees();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async updateEmployee(employeeData) {
      try {
        await employeesAPI.updateEmployee(
          this.selectedEmployee.id,
          employeeData,
        );
        this.handleUpdate();
      } catch (error) {
        console.error(
          "Ошибка:",
          error.response ? error.response.data : error.message,
        );
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    handleUpdate() {
      this.getEmployees();
      this.isFormVisible = false;
      this.errors = {};
    },
    handleCancel() {
      this.isFormVisible = false;
      this.errors = {};
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedEmployee = null;
      this.isFormVisible = true;
      this.errors = {};
    },
    showEditForm(employee) {
      this.isEditing = true;
      this.selectedEmployee = employee;
      this.isFormVisible = true;
      this.errors = {};
    },
  },
  mounted() {
    this.getEmployees();
  },
};
</script>

<template>
  <div class="content">
    <h2>Сотрудники</h2>
    <CreateButton v-if="isAdminOrManager" :buttonName="buttonName" @create="showCreateForm" />

    <EmployeesTable
      :employees="employees"
      @edit="showEditForm"
      @delete="deleteEmployee"
      :isAdminOrManager="isAdminOrManager"
    />

    <EmployeeForm
      v-if="isFormVisible"
      :employee="selectedEmployee"
      :isEditing="isEditing"
      :errors="errors"
      @update="updateEmployee"
      @create="createEmployee"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped></style>
