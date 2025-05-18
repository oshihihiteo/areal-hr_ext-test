<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  props: ["position", "isEditing", "errors"],
  data() {
    return {
      positionData: { name: "" },
    };
  },
  watch: {
    position: {
      immediate: true,
      handler(newPosition) {
        this.positionData = { name: newPosition?.name || "" };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        name: this.positionData.name.trim(),
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
    <form @submit.prevent="submitForm">
    <h3>{{ isEditing ? "Редактировать должность" : "Добавить должность" }}</h3>

    <BaseInput
        v-model="positionData.name"
        id="position-name"
        label="Название должности"
        :required="true"
        :error="errors?.name"
    />

    <div class="buttons">
      <BaseButton type="submit">
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </BaseButton>
      <BaseButton @click="cancelForm" type="button">Отмена</BaseButton>
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
</style>
