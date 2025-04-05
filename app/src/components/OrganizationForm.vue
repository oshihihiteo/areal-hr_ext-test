<script>
export default {
  props: ["organization", "isEditing"],
  data() {
    return {
      organizationData: { name: "" , comment: ""},
    };
  },
  watch: {
    organization: {
      immediate: true,
      handler(newOrganization) {
        this.organizationData = { name: newOrganization?.name || "",
          comment: newOrganization?.comment || ""};
      },
    },
  },
  methods: {
    async submitForm() {
      if (!this.organizationData.name.trim()) return;

      if (this.isEditing) {
        this.$emit("update", { ...this.organizationData });
      } else {
        this.$emit("create", { ...this.organizationData });
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
    <h3>{{ isEditing ? "Редактировать организацию" : "Создать организацию" }}</h3>
    <input type="text" v-model="organizationData.name" placeholder="Название организации"/>
    <input type="text" v-model="organizationData.comment" placeholder="Комментарий"/>
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
