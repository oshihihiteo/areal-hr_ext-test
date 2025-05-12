<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  props: ["isAdminOrManager", "departments", "organizations"],
  methods: {
    editDepartment(department) {
      this.$emit("edit", department);
    },
    deleteDepartment(id) {
      this.$emit("delete", id);
    },
    getOrganizationName(orgId) {
      const organization = this.organizations.find((org) => org.id === orgId);
      return organization ? organization.name : "-";
    },
    getDepartmentName(deptId) {
      if (!deptId) return "-";
      const department = this.departments.find((dept) => dept.id === deptId);
      return department ? department.name : "-";
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
          <BaseButton
            v-if="isAdminOrManager"
            class="edit-btn"
            @click="editDepartment(department)"
            size="sm"
          >
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdminOrManager"
            class="delete-btn"
            @click="deleteDepartment(department.id)"
            size="sm"
          >
            Удалить
          </BaseButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
