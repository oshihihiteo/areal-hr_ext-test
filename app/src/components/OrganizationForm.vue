<script>
export default {
  props: ["organization", "isEditing", "errors"],
  data() {
    return {
      organizationData: { name: "", comment: null },
    };
  },
  watch: {
    organization: {
      immediate: true,
      handler(newOrganization) {
        this.organizationData = {
          name: newOrganization?.name || "",
          comment: newOrganization?.comment || null,
        };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        name: this.organizationData.name.trim(),
        comment: this.organizationData.comment?.trim() || null,
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
    <h3>
      {{ isEditing ? "Редактировать организацию" : "Создать организацию" }}
    </h3>
    <input
      type="text"
      v-model="organizationData.name"
      placeholder="Название организации"
    />
    <p v-if="errors?.name" class="error">{{ errors.name }}</p>
    <input
      type="text"
      v-model="organizationData.comment"
      placeholder="Комментарий"
    />
    <p v-if="errors?.comment" class="error">{{ errors.comment }}</p>
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
