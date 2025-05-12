<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    id: String,
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: String,
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
