<script>
import * as employeesAPI from '../instances/employees.js';
import CreateButton from "@/components/CreateButton.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
export default {
  components: {EmployeeForm, EmployeesTable, CreateButton },
  data() {
    return {
      employees: [],
      isFormVisible: false,
      isEditing: false,
      selectedEmployee: null,
      buttonName: "сотрудника"
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
      console.log(employeeData)
      try {
        await employeesAPI.createEmployee(employeeData);
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при добавлении данных:", error.response ? error.response.data : error.message);
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
      console.log(employeeData);
         try {
        await employeesAPI.updateEmployee(this.selectedEmployee.id, employeeData)
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },
    handleUpdate() {
      this.getEmployees();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedEmployee = null;
      this.isFormVisible = true;
    },
    showEditForm(employee) {
      this.isEditing = true;
      this.selectedEmployee = employee;
      this.isFormVisible = true;
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
    <CreateButton
        :buttonName = buttonName
        @create="showCreateForm"/>

    <EmployeesTable
        :employees="employees"
        @edit="showEditForm"
        @delete="deleteEmployee"
    />

    <EmployeeForm
        v-if="isFormVisible"
        :employee="selectedEmployee"
        :isEditing="isEditing"
        @update="updateEmployee"
        @create="createEmployee"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
</style>
