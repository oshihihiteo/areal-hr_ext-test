<template>
  <div class="form-container">
    <h3>{{ isEditing ? "Редактировать файл" : "Загрузить файл" }}</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="fileData.name" placeholder="Название" required />
      <p v-if="errors?.name" class="error">{{ errors.name }}</p>

      <select v-model="fileData.employee_id" id="employee" required>
        <option disabled value="">Выберите сотрудника</option>
        <option
          v-for="employee in employees"
          :key="employee.id"
          :value="employee.id"
        >
          {{ employee.lastname }} {{ employee.firstname }}
          {{ employee.patronymic }}, отдел - {{ employee.department_name }},
          должность - {{ employee.position_name }}
        </option>
      </select>
      <p v-if="errors?.employee_id" class="error">{{ errors.employee_id }}</p>

      <input type="file" @change="handleFileChange" :required="!isEditing" />
      <p v-if="errors?.file" class="error">{{ errors.file }}</p>

      <div class="buttons">
        <button type="submit">
          {{ isEditing ? "Сохранить" : "Загрузить" }}
        </button>
        <button type="button" @click="$emit('cancel')">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["file", "isEditing", "employees", "errors"],
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
      const data = {
        name: this.fileData.name.trim(),
        employee_id: this.fileData.employee_id,
        file: this.fileData.file,
      };
      if (this.isEditing) {
        this.$emit("update", data);
      } else {
        this.$emit("create", data);
      }
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

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}
</style>
