<template>
  <div class="form-container">
    <h3>{{ isEditing ? "Редактировать файл" : "Загрузить файл" }}</h3>
    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="fileData.name"
        id="file-name"
        label="Название"
        :required="true"
        :error="errors?.name"
      />

      <BaseSelect
        v-model="fileData.employee_id"
        id="employee"
        label="Сотрудник:"
        :options="employees"
        :valueKey="'id'"
        :labelKey="
          (employee) =>
            `${employee.lastname} ${employee.firstname} ${employee.patronymic}, отдел - ${employee.department_name}, должность - ${employee.position_name}`
        "
        placeholder="Выберите сотрудника"
        :required="true"
        :error="errors?.employee_id"
      />

      <div class="form-group">
        <label for="file-upload">Файл</label>
        <input
          id="file-upload"
          type="file"
          @change="handleFileChange"
          :required="!isEditing"
        />
        <p v-if="errors?.file" class="error">{{ errors.file }}</p>
      </div>

      <div class="buttons">
        <BaseButton type="submit">
          {{ isEditing ? "Сохранить" : "Загрузить" }}
        </BaseButton>
        <BaseButton type="button" @click="$emit('cancel')">Отмена</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
  },
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
      this.$emit(this.isEditing ? "update" : "create", data);
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
