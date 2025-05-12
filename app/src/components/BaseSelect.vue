<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :required="required"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option
          v-for="option in options"
          :key="option[valueKey]"
          :value="option[valueKey]"
      >
        {{ typeof labelKey === 'function' ? labelKey(option) : option[labelKey] }}
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    label: String,
    id: String,
    options: Array,
    valueKey: {
      type: String,
      default: "id",
    },
    labelKey: {
      type: String,
      default: "name",
    },
    placeholder: {
      type: String,
      default: "Выберите значение",
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
