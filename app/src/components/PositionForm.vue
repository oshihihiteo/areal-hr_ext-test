<script>
export default {
  props: ["position", "isEditing", "errors"],
  data() {
    return {
      positionData: { name: "" },
    };
  },
  watch: {
    position: {
      immediate: true,
      handler(newPosition) {
        this.positionData = { name: newPosition?.name || "" };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        name: this.positionData.name.trim(),
      };

      if (this.isEditing) {
        this.$emit("update", data);
      } else {
        this.$emit("create", data);
      }
    },
    cancelForm() {
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div class="form-container">
    <h3>{{ isEditing ? "Редактировать должность" : "Добавить должность" }}</h3>
    <input v-model="positionData.name" placeholder="Название должности" />
    <p v-if="errors?.name" class="error">{{ errors.name }}</p>
    <button @click="submitForm">
      {{ isEditing ? "Сохранить" : "Добавить" }}
    </button>
    <button @click="cancelForm">Отмена</button>
  </div>
</template>

<style scoped>
.form-container {
  padding: 10px;
  border: 1px solid #ddd;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}
</style>
