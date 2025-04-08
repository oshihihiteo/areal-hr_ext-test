<script>
export default {
  props: ["hrOperation", "employees", "positions", "departments", "actions", "isEditing"],
  data() {
    return {
      hrOperationData:     {
        employee_id: "",
        action_id: "",
        salary: "",
        position_id: "",
        department_id: ""
      }
      };
  },
  watch: {
    hrOperation: {
      immediate: true,
      handler(newHrOperation) {
        this.hrOperationData = {
              employee_id: newHrOperation?.employee_id || "",
              action_id: newHrOperation?.action_id || "",
              salary: newHrOperation?.salary || "",
              position_id: newHrOperation?.position_id || "",
              department_id: newHrOperation?.department_id || ""
        };
      },
    },
  },
  methods: {
    async submitForm() {
      if (this.isEditing) {
        this.$emit("update", { ...this.hrOperationData });
      } else {
        this.$emit("create", { ...this.hrOperationData });
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
    <h3>{{ isEditing ? "Редактировать кадровую операцию" : "Добавить кадровую операцию" }}</h3>

    <form @submit.prevent="submitForm">
      <div>
        <label for="employee">Сотрудник:</label>
        <select v-model="hrOperationData.employee_id" id="employee" required>
          <option disabled value="">Выберите сотрудника</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.lastname }} {{ employee.firstname }} {{ employee.patronymic }},
            отдел - {{ employee.department_name}}, должность - {{ employee.position_name}}
          </option>
        </select>
      </div>

      <div>
        <label for="action">Действие:</label>
        <select v-model="hrOperationData.action_id" id="action" required>
          <option disabled value="">Выберите действие</option>
          <option v-for="action in actions" :key="action.id" :value="action.id">
            {{ action.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="department">Отдел:</label>
        <select v-model="hrOperationData.department_id" id="department" required>
          <option disabled value="">Выберите отдел</option>
          <option v-for="department in departments" :key="department.id" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="position">Позиция:</label>
        <select v-model="hrOperationData.position_id" id="position" required>
          <option disabled value="">Выберите позицию</option>
          <option v-for="position in positions" :key="position.id" :value="position.id">
            {{ position.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="salary">Зарплата:</label>
        <input
            type="number"
            id="salary"
            v-model="hrOperationData.salary"
            required
        />
      </div>

      <div class="form-buttons">
        <button type="submit">{{ isEditing ? "Сохранить" : "Добавить" }}</button>
        <button type="button" @click="cancelForm">Отмена</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.form-container {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
