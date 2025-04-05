<script>
export default {
  props: ["department", "departments",
          "organizations", "isEditing"],
  data() {
    return {
      departmentData: { name: "", organization_id: "",
                      parent_id: "", comment: ""},
    };
  },
  watch: {
    department: {
      immediate: true,
      handler(newDepartment) {
        this.departmentData = { name: newDepartment?.name || "",
                                organization_id: newDepartment?.organization_id || null,
                                parent_id: newDepartment?.parent_id || null,
                                comment: newDepartment?.comment || ""
        };
      },
    },
  },
  methods: {
    async submitForm() {
      if (!this.departmentData.name.trim()) return;

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

    <input type="text" v-model="departmentData.name" placeholder="Название отдела" />

    <select v-model="departmentData.organization_id">
      <option value="" disabled selected hidden>Выберите организацию</option>
      <option v-for="organization in organizations" :key="organization.id" :value="organization.id">
        {{ organization.name }}
      </option>
    </select>

    <select v-model="departmentData.parent_id">
      <option value="" disabled selected hidden>Выберите родительский отдел</option>
      <option :value="null">-</option>
      <option v-for="department in departments" :key="department.id" :value="department.id">
        {{ department.name }}
      </option>
    </select>

    <input type="text" v-model="departmentData.comment" placeholder="Комментарий" />

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
