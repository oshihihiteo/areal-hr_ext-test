<template>
  <div class="form-container">
    <h3>{{ isEditing ? 'Редактировать файл' : 'Загрузить файл' }}</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="fileData.name" placeholder="Название" required />
        <select v-model="fileData.employee_id" id="employee" required>
          <option disabled value="">Выберите сотрудника</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.lastname }} {{ employee.firstname }} {{ employee.patronymic }},
            отдел - {{ employee.department_name}}, должность - {{ employee.position_name}}
          </option>
        </select>
            <input type="file" @change="handleFileChange" required />

      <div class="buttons">
        <button type="submit">{{ isEditing ? 'Сохранить' : 'Загрузить' }}</button>
        <button type="button" @click="$emit('cancel')">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["file", "isEditing", "employees"],
  data() {
    return {
      fileData: {
        name: "",
        employee_id: "",
        file: null,
      },
    };
  },
  watch: {
    file: {
      immediate: true,
      handler(newFile) {
        this.fileData = {
          name: newFile?.name || "",
          employee_id: newFile?.employee_id || "",
          file: null,
        };
      },
    },
  },
  methods: {
    handleFileChange(event) {
      this.fileData.file = event.target.files[0];
    },
    handleSubmit() {
      if (!this.fileData.file && !this.isEditing) {
        alert("Сначала выберите файл");
        return;
      }
      this.$emit(this.isEditing ? 'update' : 'create', this.fileData);
    },
  },
};
</script>

<style scoped>
.form-container {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 400px;
}
.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
