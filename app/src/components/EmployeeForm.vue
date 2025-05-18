<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  props: ["employee", "isEditing", "errors"],
  data() {
    return {
      employeeData: {
        lastname: "",
        firstname: "",
        patronymic: "",
        birth_date: "",
        address_region: "",
        address_settlement: "",
        address_street: "",
        address_house: null,
        address_building: null,
        address_apartment: null,
        passport_series: "",
        passport_number: "",
        passport_issued_date: "",
        passport_unit_code: "",
        passport_issued_by: "",
      },
    };
  },
  watch: {
    employee: {
      immediate: true,
      handler(newEmployee) {
        this.employeeData = {
          lastname: newEmployee?.lastname || "",
          firstname: newEmployee?.firstname || "",
          patronymic: newEmployee?.patronymic || "",
          birth_date: newEmployee?.birth_date || "",
          address_region: newEmployee?.address_region || "",
          address_settlement: newEmployee?.address_settlement || "",
          address_street: newEmployee?.address_street || "",
          address_house: newEmployee?.address_house || "",
          address_building: newEmployee?.address_building || "",
          address_apartment: newEmployee?.address_apartment || null,
          passport_series: newEmployee?.passport_series || "",
          passport_number: newEmployee?.passport_number || "",
          passport_issued_date: newEmployee?.passport_issued_date || "",
          passport_unit_code: newEmployee?.passport_unit_code || "",
          passport_issued_by: newEmployee?.passport_issued_by || "",
        };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        lastname: this.employeeData.lastname.trim(),
        firstname: this.employeeData.firstname.trim(),
        patronymic: this.employeeData?.patronymic.trim() || null,
        birth_date: this.employeeData.birth_date,
        address_region: this.employeeData.address_region.trim(),
        address_settlement: this.employeeData.address_settlement.trim(),
        address_street: this.employeeData.address_street.trim(),
        address_house: this.employeeData.address_house.trim(),
        address_building: this.employeeData?.address_building.trim() || null,
        address_apartment: this.employeeData?.address_apartment || null,
        passport_series: this.employeeData.passport_series.trim(),
        passport_number: this.employeeData.passport_number.trim(),
        passport_issued_date: this.employeeData.passport_issued_date,
        passport_unit_code: this.employeeData.passport_unit_code.trim(),
        passport_issued_by: this.employeeData.passport_issued_by.trim(),
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
  <form @submit.prevent="submitForm">
  <div class="form-container">
    <h3>
      {{ isEditing ? "Редактировать сотрудника" : "Добавить сотрудника" }}
    </h3>

    <h5>Личные данные</h5>
    <BaseInput
      v-model="employeeData.lastname"
      id="lastname"
      label="Фамилия"
      :required="true"
      :error="errors?.lastname"
    />
    <BaseInput
      v-model="employeeData.firstname"
      id="firstname"
      label="Имя"
      :required="true"
      :error="errors?.firstname"
    />
    <BaseInput
      v-model="employeeData.patronymic"
      id="patronymic"
      label="Отчество"
      :error="errors?.patronymic"
    />
    <BaseInput
      v-model="employeeData.birth_date"
      id="birth_date"
      label="Дата рождения"
      type="date"
      :required="true"
      :error="errors?.birth_date"
    />

    <h5>Адрес</h5>
    <BaseInput
      v-model="employeeData.address_region"
      id="address_region"
      label="Регион"
      :required="true"
      :error="errors?.address_region"
    />
    <BaseInput
      v-model="employeeData.address_settlement"
      id="address_settlement"
      label="Населённый пункт"
      :required="true"
      :error="errors?.address_settlement"
    />
    <BaseInput
      v-model="employeeData.address_street"
      id="address_street"
      label="Улица"
      :required="true"
      :error="errors?.address_street"
    />
    <BaseInput
      v-model="employeeData.address_house"
      id="address_house"
      label="Дом"
      :required="true"
      :error="errors?.address_house"
    />
    <BaseInput
      v-model="employeeData.address_building"
      id="address_building"
      label="Строение"
      :error="errors?.address_building"
    />
    <BaseInput
      v-model="employeeData.address_apartment"
      id="address_apartment"
      label="Квартира"
      :error="errors?.address_apartment"
    />

    <h5>Паспортные данные</h5>
    <BaseInput
      v-model="employeeData.passport_series"
      id="passport_series"
      label="Серия"
      :mask="'####'"
      :placeholder="'1234'"
      :required="true"
      :error="errors?.passport_series"
    />
    <BaseInput
      v-model="employeeData.passport_number"
      id="passport_number"
      label="Номер"
      :mask="'######'"
      :placeholder="'123456'"
      :required="true"
      :error="errors?.passport_number"
    />
    <BaseInput
      v-model="employeeData.passport_issued_date"
      id="passport_issued_date"
      label="Дата выдачи"
      type="date"
      :required="true"
      :error="errors?.passport_issued_date"
    />
    <BaseInput
      v-model="employeeData.passport_unit_code"
      id="passport_unit_code"
      label="Код подразделения"
      :mask="'###-###'"
      :placeholder="'123-456'"
      :required="true"
      :error="errors?.passport_unit_code"
    />
    <BaseInput
      v-model="employeeData.passport_issued_by"
      id="passport_issued_by"
      label="Кем выдан"
      :required="true"
      :error="errors?.passport_issued_by"
    />

    <div class="form-buttons">
      <BaseButton type="submit">{{
        isEditing ? "Сохранить" : "Добавить"
      }}</BaseButton>
      <BaseButton @click="cancelForm">Отмена</BaseButton>
    </div>
  </div>
  </form>
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
