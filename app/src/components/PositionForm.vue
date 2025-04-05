<script>
export default {
  props: ["position", "isEditing"],
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
      if (!this.positionData.name.trim()) return;

      if (this.isEditing) {
        this.$emit("update", { ...this.positionData });
      } else {
        this.$emit("create", { ...this.positionData });
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
    <input v-model="positionData.name" placeholder="Название должности"/>
    <button @click="submitForm">{{ isEditing ? "Сохранить" : "Добавить" }}</button>
    <button @click="cancelForm">Отмена</button>
  </div>
</template>

<style scoped>
.form-container {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
