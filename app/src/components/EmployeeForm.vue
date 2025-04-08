<script>
export default {
  props: ["employee", "isEditing"],
  data() {
    return {
      employeeData: { lastname: "",
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
        passport_unit_code : "",
        passport_issued_by: "" },
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
          address_house: newEmployee?.address_house || null,
          address_building: newEmployee?.address_building || null,
          address_apartment: newEmployee?.address_apartment || null,
          passport_series: newEmployee?.passport_series || "",
          passport_number: newEmployee?.passport_number || "",
          passport_issued_date: newEmployee?.passport_issued_date || "",
          passport_unit_code: newEmployee?.passport_unit_code || "",
          passport_issued_by: newEmployee?.passport_issued_by || ""
        };
      },
    },
  },
  methods: {
    async submitForm() {
      if (this.isEditing) {
        this.$emit("update", { ...this.employeeData });
      } else {
        this.$emit("create", { ...this.employeeData });
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
    <h3>{{ isEditing ? "Редактировать сотрудника" : "Добавить сотрудника" }}</h3>
    <h5>Личные данные</h5>
    <input v-model="employeeData.lastname" placeholder="Фамилия" required/>
    <input v-model="employeeData.firstname" placeholder="Имя" required/>
    <input v-model="employeeData.patronymic" placeholder="Отчество"/>
    <input type="date" v-model="employeeData.birth_date" placeholder="Дата рождения" required/>
    <h5>Адрес</h5>
    <input v-model="employeeData.address_region" placeholder="Регион" required/>
    <input v-model="employeeData.address_settlement" placeholder="Населённый пункт" required/>
    <input v-model="employeeData.address_street" placeholder="Улица" required/>
    <input v-model="employeeData.address_house" placeholder="Дом" required/>
    <input v-model="employeeData.address_building" placeholder="Строение"/>
    <input v-model="employeeData.address_apartment" placeholder="Квартира"/>
    <h5>Паспортные данные</h5>
    <input v-model="employeeData.passport_series" placeholder="Серия" required/>
    <input v-model="employeeData.passport_number" placeholder="Номер" required/>
    <input type="date" v-model="employeeData.passport_issued_date" placeholder="Имя" required/>
    <input v-model="employeeData.passport_unit_code" placeholder="Код подразделения" required/>
    <input v-model="employeeData.passport_issued_by" placeholder="Кем выдан" required/>
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
