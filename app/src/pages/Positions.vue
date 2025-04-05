<script>
import axios from "axios";
import * as positionAPI from '../instances/positions.js';
import PositionForm from "../components/PositionForm.vue";
import PositionsTable from "../components/PositionsTable.vue";
import CreateButton from "@/components/CreateButton.vue";

export default {
  components: { PositionForm, PositionsTable, CreateButton },
  data() {
    return {
      positions: [],
      isFormVisible: false,
      isEditing: false,
      selectedPosition: null,
      buttonName: "должность"
    };
  },
  methods: {
    async getPositions() {
      try {
        this.positions = positionAPI.getPositions();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createPosition(positionData) {
      if (!positionData.name.trim()) return;
      try {
        await positionAPI.createPosition(positionData);
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при добавлении данных:", error.response ? error.response.data : error.message);
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
      if (!positionData.name.trim()) return;

      try {
        await positionAPI.updatePosition(this.selectedPosition.id, positionData)
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },
    handleUpdate() {
      this.getPositions();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedPosition = null;
      this.isFormVisible = true;
    },
    showEditForm(position) {
      this.isEditing = true;
      this.selectedPosition = position;
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
  <CreateButton
    :buttonName = buttonName
    @create="showCreateForm"/>
    <PositionsTable
        :positions="positions"
        @edit="showEditForm"
        @delete="deletePosition"
    />

    <PositionForm
        v-if="isFormVisible"
        :position="selectedPosition"
        :isEditing="isEditing"
        @update="updatePosition"
        @create="createPosition"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
</style>
