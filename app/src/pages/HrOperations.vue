<script>
import * as hrOperationsAPI from '../instances/hr-operations.js';
import * as dropdownListAPI from '../instances/dropdown-list-options.js'
import HrOperationForm from "../components/HrOperationForm.vue";
import HrOperationsTable from "../components/HrOperationsTable.vue";
import CreateButton from "@/components/CreateButton.vue";

export default {
  components: { HrOperationsTable, HrOperationForm, CreateButton },
  data() {
    return {
      hrOperations: [],
      employees: [],
      actions: [],
      positions: [],
      departments: [],
      isFormVisible: false,
      isEditing: false,
      selectedHrOperation: null,
      buttonName: "кадровую операцию"
    };
  },
  methods: {
    async getHrOperations() {
      try {
        this.hrOperations = await hrOperationsAPI.getHrOperations();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getEmployees(){
      try{
        this.employees = await dropdownListAPI.getEmployeesWithDepartmentsAndPositions()
      } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getDepartments(){
      try{
        this.departments = await dropdownListAPI.getDepartmentsNames()
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getPositions(){
      try{
        this.positions = await dropdownListAPI.getPositionsNames()
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getActions(){
      try{
        this.actions = await dropdownListAPI.getActionsNames()
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createHrOperation(hrOperationData) {
      console.log(hrOperationData)
      try {
        await hrOperationsAPI.createHrOperation(hrOperationData);
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при добавлении данных:", error.response ? error.response.data : error.message);
      }
    },
    async deleteHrOperation(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await hrOperationsAPI.deleteHrOperation(id);
        await this.getHrOperations();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async updateHrOperation(hrOperationData) {

      try {
        await hrOperationsAPI.updateHrOperation(this.selectedHrOperation.id, hrOperationData)
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },
    handleUpdate() {
      this.getHrOperations();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedHrOperation = null;
      this.isFormVisible = true;
    },
    showEditForm(hrOperation) {
      this.isEditing = true;
      this.selectedHrOperation  = hrOperation;
      this.isFormVisible = true;
    },
  },
  mounted() {
    this.getHrOperations();
    this.getPositions();
    this.getEmployees();
    this.getDepartments();
    this.getActions();
  },
};
</script>

<template>
  <div class="content">
    <h2>Кадровые операции</h2>
    <CreateButton
        :buttonName = buttonName
        @create="showCreateForm"/>
    <HrOperationsTable
        :hrOperations="hrOperations"
        @edit="showEditForm"
        @delete="deleteHrOperation"
    />

    <HrOperationForm
        v-if="isFormVisible"
        :hrOperation="selectedHrOperation"
        :actions = "actions"
        :departments="departments"
        :positions="positions"
        :employees="employees"
        :isEditing="isEditing"
        @update="updateHrOperation"
        @create="createHrOperation"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
</style>
