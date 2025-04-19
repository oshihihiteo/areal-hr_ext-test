<script>
export default {
  props: ["department", "departments", "organizations", "isEditing", "errors"],
  data() {
    return {
      departmentData: {
        name: "",
        organization_id: "",
        parent_id: "",
        comment: "",
      },
    };
  },
  watch: {
    department: {
      immediate: true,
      handler(newDepartment) {
        this.departmentData = {
          name: newDepartment?.name || "",
          organization_id: newDepartment?.organization_id || null,
          parent_id: newDepartment?.parent_id || null,
          comment: newDepartment?.comment || null,
        };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        name: this.departmentData.name.trim(),
        organization_id: this.departmentData.organization_id,
        parent_id: this.departmentData.parent_id,
        comment: this.departmentData.comment?.trim() || null,
      };

      if (this.isEditing) {
        this.$emit("update", { ...this.departmentData });
      } else {
        this.$emit("create", { ...this.departmentData });
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
    <h3>{{ isEditing ? "Редактировать отдел" : "Создать отдел" }}</h3>

    <input
      type="text"
      v-model="departmentData.name"
      placeholder="Название отдела"
    />
    <p v-if="errors?.name" class="error">{{ errors.name }}</p>

    <select v-model="departmentData.organization_id">
      <option value="" disabled hidden>Выберите организацию</option>
      <option
        v-for="organization in organizations"
        :key="organization.id"
        :value="organization.id"
      >
        {{ organization.name }}
      </option>
    </select>
    <p v-if="errors?.organization_id" class="error">
      {{ errors.organization_id }}
    </p>

    <select v-model="departmentData.parent_id">
      <option value="" disabled hidden>Выберите родительский отдел</option>
      <option :value="null">-</option>
      <option
        v-for="department in departments"
        :key="department.id"
        :value="department.id"
      >
        {{ department.name }}
      </option>
    </select>
    <p v-if="errors?.parent_id" class="error">{{ errors.parent_id }}</p>

    <input
      type="text"
      v-model="departmentData.comment"
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
