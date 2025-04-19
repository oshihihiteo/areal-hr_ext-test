<script>
export default {
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
    <h3>
      {{ isEditing ? "Редактировать сотрудника" : "Добавить сотрудника" }}
    </h3>
    <h5>Личные данные</h5>
    <input v-model="employeeData.lastname" placeholder="Фамилия" required />
    <p v-if="errors?.lastname" class="error">{{ errors.lastname }}</p>
    <input v-model="employeeData.firstname" placeholder="Имя" required />
    <p v-if="errors?.firstname" class="error">{{ errors.firstname }}</p>
    <input v-model="employeeData.patronymic" placeholder="Отчество" />
    <p v-if="errors?.patronymic" class="error">{{ errors.patronymic }}</p>
    <input
      type="date"
      v-model="employeeData.birth_date"
      placeholder="Дата рождения"
      required
    />
    <p v-if="errors?.birth_date" class="error">{{ errors.birth_date }}</p>
    <h5>Адрес</h5>
    <input
      v-model="employeeData.address_region"
      placeholder="Регион"
      required
    />
    <p v-if="errors?.address_region" class="error">
      {{ errors.address_region }}
    </p>
    <input
      v-model="employeeData.address_settlement"
      placeholder="Населённый пункт"
      required
    />
    <p v-if="errors?.address_settlement" class="error">
      {{ errors.address_settlement }}
    </p>
    <input v-model="employeeData.address_street" placeholder="Улица" required />
    <p v-if="errors?.address_street" class="error">
      {{ errors.address_street }}
    </p>
    <input v-model="employeeData.address_house" placeholder="Дом" required />
    <p v-if="errors?.address_house" class="error">{{ errors.address_house }}</p>
    <input v-model="employeeData.address_building" placeholder="Строение" />
    <p v-if="errors?.address_building" class="error">
      {{ errors.address_building }}
    </p>
    <input v-model="employeeData.address_apartment" placeholder="Квартира" />
    <p v-if="errors?.address_apartment" class="error">
      {{ errors.address_apartment }}
    </p>
    <h5>Паспортные данные</h5>
    <input
      v-model="employeeData.passport_series"
      placeholder="Серия"
      required
    />
    <p v-if="errors?.passport_series" class="error">
      {{ errors.passport_series }}
    </p>
    <input
      v-model="employeeData.passport_number"
      placeholder="Номер"
      required
    />
    <p v-if="errors?.passport_number" class="error">
      {{ errors.passport_number }}
    </p>
    <input type="date" v-model="employeeData.passport_issued_date" required />
    <p v-if="errors?.passport_issued_date" class="error">
      {{ errors.passport_issued_date }}
    </p>
    <input
      v-model="employeeData.passport_unit_code"
      placeholder="Код подразделения"
      required
    />
    <p v-if="errors?.passport_unit_code" class="error">
      {{ errors.passport_unit_code }}
    </p>
    <input
      v-model="employeeData.passport_issued_by"
      placeholder="Кем выдан"
      required
    />
    <p v-if="errors?.passport_issued_by" class="error">
      {{ errors.passport_issued_by }}
    </p>
    <button @click="submitForm">
      {{ isEditing ? "Сохранить" : "Добавить" }}
    </button>
    <button @click="cancelForm">Отмена</button>
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
