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
    <h3>{{ isEditing ? "Редактировать отдел" : "Создать отдел" }}</h3>

    <BaseInput
      v-model="departmentData.name"
      id="name"
      label="Название отдела"
      :required="true"
      :error="errors?.name"
    />

    <BaseSelect
      v-model="departmentData.organization_id"
      id="organization"
      label="Организация:"
      :options="organizations"
      valueKey="id"
      labelKey="name"
      placeholder="Выберите организацию"
      :required="true"
      :error="errors?.organization_id"
    />

    <BaseSelect
      v-model="departmentData.parent_id"
      id="parent"
      label="Родительский отдел:"
      :options="departments"
      valueKey="id"
      labelKey="name"
      placeholder="Выберите родительский отдел"
      :error="errors?.parent_id"
    >
      <!-- Добавим опцию "-" вручную, если нужно -->
      <template #before-options>
        <option :value="null">-</option>
      </template>
    </BaseSelect>

    <BaseInput
      v-model="departmentData.comment"
      id="comment"
      label="Комментарий"
      :error="errors?.comment"
    />

    <div class="form-buttons">
      <BaseButton type="submit" @click="submitForm">
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </BaseButton>
      <BaseButton @click="cancelForm">Отмена</BaseButton>
    </div>
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
