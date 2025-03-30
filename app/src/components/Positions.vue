<script>
import axios from "axios";

export default {
  data() {
    return {
      positions: [],
      isCreating: false,
      isEditing: false,
      positionData: { name: "" },
      positionId: null,
    };
  },
  methods: {
    async getAllPositions() {
      try {
        const response = await axios.get("http://localhost:5000/positions");
        this.positions = response.data.positions;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    async createPosition() {
      if (!this.positionData.name.trim()) return;

      try {
        await axios.post("http://localhost:5000/positions", {
          positionData: this.positionData,
        });
        await this.getAllPositions();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при добавлении данных:", error.response ? error.response.data : error.message);
      }
    },

    openEditForm(position) {
      this.isEditing = true;
      this.isCreating = false;
      this.positionData = { name: position.name };
      this.positionId = position.id;
    },

    async updatePosition() {
      if (!this.positionData.name.trim()) return;

      try {
        await axios.put(`http://localhost:5000/positions/${this.positionId}`, {
          positionData: this.positionData,
        });
        await this.getAllPositions();
        this.cancelForm();
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },

    async deletePosition(id) {
      if (!confirm("Вы уверены, что хотите удалить эту должность?")) return;

      try {
        await axios.delete(`http://localhost:5000/positions/${id}`);
        await this.getAllPositions();
      } catch (error) {
        console.error("Ошибка при удалении данных:", error.response ? error.response.data : error.message);
      }
    },

    cancelForm() {
      this.isCreating = false;
      this.isEditing = false;
      this.positionData.name = "";
      this.positionId = null;
    },
  },

  mounted() {
    this.getAllPositions();
  },
};
</script>

<template>
  <div>
    <div :class="{ 'blurred': isCreating || isEditing }" class="content">
      <h2>Список должностей</h2>
      <button class="create-btn" @click="isCreating = true">Добавить должность</button>

      <table>
        <thead>
        <tr>
          <th>Название</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(position) in positions" :key="position.id">
          <td>{{ position.name }}</td>
          <td>
            <button class="edit-btn" @click="openEditForm(position)">Редактировать</button>
            <button class="delete-btn" @click="deletePosition(position.id)">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isCreating || isEditing" class="overlay">
      <div class="form-container">
        <h3>{{ isEditing ? "Редактировать должность" : "Создать должность" }}</h3>
        <input type="text" v-model="positionData.name" placeholder="Название должности" />
        <button v-if="isEditing" @click="updatePosition">Сохранить</button>
        <button v-else @click="createPosition">Создать</button>
        <button @click="cancelForm">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
