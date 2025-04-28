<script>
import * as positionAPI from "../instances/positions.js";
import PositionForm from "../components/PositionForm.vue";
import PositionsTable from "../components/PositionsTable.vue";
import CreateButton from "@/components/CreateButton.vue";
import {useUserStore} from "@/stores/userStore.js";

export default {
  components: { PositionForm, PositionsTable, CreateButton },
  data() {
    return {
      positions: [],
      isFormVisible: false,
      isEditing: false,
      selectedPosition: null,
      errors: {},
      buttonName: "должность",
    };
  },
  setup() {
    const userStore = useUserStore();

    return {
      isAdminOrManager: userStore.isAdminOrManager,
    };
  },
  methods: {
    async getPositions() {
      try {
        this.positions = await positionAPI.getPositions();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createPosition(positionData) {
      try {
        await positionAPI.createPosition(positionData);
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
    async deletePosition(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await positionAPI.deletePosition(id);
        await this.getPositions();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async updatePosition(positionData) {
      try {
        await positionAPI.updatePosition(
          this.selectedPosition.id,
          positionData,
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
      this.getPositions();
      this.isFormVisible = false;
      this.errors = {};
    },
    handleCancel() {
      this.isFormVisible = false;
      this.errors = {};
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedPosition = null;
      this.errors = {};
      this.isFormVisible = true;
    },
    showEditForm(position) {
      this.isEditing = true;
      this.selectedPosition = position;
      this.errors = {};
      this.isFormVisible = true;
    },
  },
  mounted() {
    this.getPositions();
  },
};
</script>

<template>
  <div class="content">
    <h2>Должности</h2>
    <CreateButton v-if="isAdminOrManager" :buttonName="buttonName" @create="showCreateForm" />
    <PositionsTable
      :positions="positions"
      @edit="showEditForm"
      @delete="deletePosition"
      :isAdminOrManager="isAdminOrManager"
    />
    <PositionForm
      v-if="isFormVisible"
      :position="selectedPosition"
      :isEditing="isEditing"
      :errors="errors"
      @update="updatePosition"
      @create="createPosition"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped></style>
