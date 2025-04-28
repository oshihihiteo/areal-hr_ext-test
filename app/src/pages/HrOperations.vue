<script>
import * as hrOperationsAPI from "../instances/hr-operations.js";
import * as dropdownListAPI from "../instances/dropdown-list-options.js";
import HrOperationForm from "../components/HrOperationForm.vue";
import HrOperationsTable from "../components/HrOperationsTable.vue";
import CreateButton from "@/components/CreateButton.vue";
import { useUserStore } from "@/stores/userStore.js";

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
      errors: {},
      buttonName: "кадровую операцию",
    };
  },
  setup() {
    const userStore = useUserStore();

    return {
      isAdminOrManager: userStore.isAdminOrManager,
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
    async getEmployees() {
      try {
        this.employees =
          await dropdownListAPI.getEmployeesWithDepartmentsAndPositions();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getDepartments() {
      try {
        this.departments = await dropdownListAPI.getDepartmentsNames();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getPositions() {
      try {
        this.positions = await dropdownListAPI.getPositionsNames();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getActions() {
      try {
        this.actions = await dropdownListAPI.getActionsNames();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createHrOperation(hrOperationData) {
      console.log(hrOperationData);
      try {
        await hrOperationsAPI.createHrOperation(hrOperationData);
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
        await hrOperationsAPI.updateHrOperation(
          this.selectedHrOperation.id,
          hrOperationData,
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
      this.getHrOperations();
      this.isFormVisible = false;
      this.errors = {};
    },
    handleCancel() {
      this.isFormVisible = false;
      this.errors = {};
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedHrOperation = null;
      this.isFormVisible = true;
      this.errors = {};
    },
    showEditForm(hrOperation) {
      this.isEditing = true;
      this.selectedHrOperation = hrOperation;
      this.isFormVisible = true;
      this.errors = {};
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
      v-if="isAdminOrManager"
      :buttonName="buttonName"
      @create="showCreateForm"
    />
    <HrOperationsTable
      :hrOperations="hrOperations"
      @edit="showEditForm"
      @delete="deleteHrOperation"
      :isAdminOrManager="isAdminOrManager"
    />

    <HrOperationForm
      v-if="isFormVisible"
      :hrOperation="selectedHrOperation"
      :actions="actions"
      :departments="departments"
      :positions="positions"
      :employees="employees"
      :isEditing="isEditing"
      :errors="errors"
      @update="updateHrOperation"
      @create="createHrOperation"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped></style>
