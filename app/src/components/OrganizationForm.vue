<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  props: ["organization", "isEditing", "errors"],
  data() {
    return {
      organizationData: {
        name: "",
        comment: null,
      },
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
      this.$emit(this.isEditing ? "update" : "create", data);
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

    <BaseInput
      v-model="organizationData.name"
      id="org-name"
      label="Название организации"
      :required="true"
      :error="errors?.name"
    />

    <BaseInput
      v-model="organizationData.comment"
      id="org-comment"
      label="Комментарий"
      :error="errors?.comment"
    />

    <div class="buttons">
      <BaseButton @click="submitForm">
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </BaseButton>
      <BaseButton @click="cancelForm" type="button">Отмена</BaseButton>
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
