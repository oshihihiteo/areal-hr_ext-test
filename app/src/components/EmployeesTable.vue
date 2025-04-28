<script>
export default {
  props: ["isAdminOrManager", "employees"],
  methods: {
    editEmployee(employee) {
      this.$emit("edit", employee);
    },
    deleteEmployee(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ФИО</th>
        <th>Отдел</th>
        <th>Должность</th>
        <th>Дата рождения</th>
        <th>Паспортные данные</th>
        <th>Адрес проживания</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee.id">
        <td>
          {{ employee.lastname }} {{ employee.firstname }}
          {{ employee.patronymic }}
        </td>
        <td>{{ employee.department_name }}</td>
        <td>{{ employee.position_name }}</td>
        <td>{{ employee.birth_date }}</td>
        <td>
          {{ employee.passport_series }} {{ employee.passport_number }}, выдан
          {{ employee.passport_issued_date }} {{ employee.passport_issued_by }},
          {{ employee.passport_unit_code }}
        </td>
        <td>
          {{ employee.address_region }}, {{ employee.address_settlement }}, ул.
          {{ employee.address_street }}, д.{{ employee.address_house }}
          <span v-if="employee.address_building"
            >, с.{{ employee.address_building }}</span
          >
          <span v-if="employee.address_apartment"
            >, кв.{{ employee.address_apartment }}</span
          >
        </td>
        <td>
          <button v-if="isAdminOrManager" @click="editEmployee(employee)">Редактировать</button>
          <button v-if="isAdminOrManager" @click="deleteEmployee(employee.id)">Удалить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
