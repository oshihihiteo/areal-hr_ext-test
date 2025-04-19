<script>
export default {
  props: ["departments", "organizations"],
  methods: {
    editDepartment(department) {
      this.$emit("edit", department);
    },
    deleteDepartment(id) {
      this.$emit("delete", id);
    },
    getOrganizationName(orgId) {
      const organization = this.organizations.find((org) => org.id === orgId);
      return organization ? organization.name : "Неизвестно";
    },
    getDepartmentName(deptId) {
      if (!deptId) return "-";
      const department = this.departments.find((dept) => dept.id === deptId);
      return department ? department.name : "Неизвестно";
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Организация</th>
        <th>Родительский отдел</th>
        <th>Комментарий</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="department in departments" :key="department.id">
        <td>{{ department.name }}</td>
        <td>{{ getOrganizationName(department.organization_id) }}</td>
        <td>{{ getDepartmentName(department.parent_id) }}</td>
        <td>{{ department.comment }}</td>
        <td>
          <button class="edit-btn" @click="editDepartment(department)">
            Редактировать
          </button>
          <button class="delete-btn" @click="deleteDepartment(department.id)">
            Удалить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
