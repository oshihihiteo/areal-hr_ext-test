<script>
import BaseSelect from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseSelect,
    BaseInput,
    BaseButton,
  },
  props: [
    "hrOperation",
    "employees",
    "positions",
    "departments",
    "actions",
    "isEditing",
    "errors",
  ],
  data() {
    return {
      hrOperationData: {
        employee_id: "",
        action_id: "",
        salary: "",
        position_id: "",
        department_id: "",
      },
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
          department_id: newHrOperation?.department_id || "",
        };
      },
    },
  },
  computed: {
    selectedEmployee() {
      const id = parseInt(this.hrOperationData.employee_id);
      return this.employees.find((emp) => emp.id === id);
    },
    selectedEmployeeActionId() {
      return this.selectedEmployee?.action_id ?? null;
    },
    selectedAction() {
      const actionId = parseInt(this.hrOperationData.action_id);
      return this.actions.find((a) => a.id === actionId);
    },
    selectedActionName() {
      return this.selectedAction ? this.selectedAction.name : "";
    },
    isDismissal() {
      return this.selectedActionName === "Уволен(а)";
    },
    isSalaryChange() {
      return this.selectedActionName === "Изменена заработная плата";
    },
    filteredActions() {
      const isDismissed = this.selectedEmployeeActionId === 3;
      const isNotHired = this.selectedEmployeeActionId === null;

      if (isDismissed || isNotHired) {
        return this.actions.filter(
          (action) => action.name === "Принят(а) на должность",
        );
      }

      return this.actions.filter(
        (action) => action.name !== "Принят(а) на должность",
      );
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
    <form @submit.prevent="submitForm">
      <h3>
        {{
          isEditing
            ? "Редактировать кадровую операцию"
            : "Добавить кадровую операцию"
        }}
      </h3>

      <BaseSelect
        v-model="hrOperationData.employee_id"
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

      <BaseSelect
        v-model="hrOperationData.action_id"
        id="action"
        label="Действие:"
        :options="filteredActions"
        valueKey="id"
        labelKey="name"
        placeholder="Выберите действие"
        :required="true"
        :error="errors?.action_id"
      />

      <template v-if="!isDismissal && !isSalaryChange">
        <BaseSelect
          v-model="hrOperationData.department_id"
          id="department"
          label="Отдел:"
          :options="departments"
          valueKey="id"
          labelKey="name"
          placeholder="Выберите отдел"
          :required="true"
          :error="errors?.department_id"
        />
        <BaseSelect
          v-model="hrOperationData.position_id"
          id="position"
          label="Позиция:"
          :options="positions"
          valueKey="id"
          labelKey="name"
          placeholder="Выберите позицию"
          :required="true"
          :error="errors?.position_id"
        />
      </template>

      <template v-if="!isDismissal">
        <BaseInput
          v-model="hrOperationData.salary"
          id="salary"
          type="number"
          label="Зарплата:"
          :required="true"
          :error="errors?.salary"
        />
      </template>

      <div class="form-buttons">
        <BaseButton type="submit">
          {{ isEditing ? "Сохранить" : "Добавить" }}
        </BaseButton>
        <BaseButton type="button" @click="cancelForm"> Отмена</BaseButton>
      </div>
    </form>
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

.form-buttons {
  margin-top: 10px;
}
</style>
