<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
        v-if="mask && mask.length > 0"
        v-mask="mask"
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :placeholder="placeholder"
    />
    <input
        v-else
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :placeholder="placeholder"
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
    mask: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
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
