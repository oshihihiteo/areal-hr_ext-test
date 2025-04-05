<script>
import axios from "axios";
import * as organizationAPI from '../instances/organizations.js';
import OrganizationForm from "../components/OrganizationForm.vue";
import OrganizationsTable from "../components/OrganizationsTable.vue";
import CreateButton from "@/components/CreateButton.vue";

export default {
  components: {OrganizationForm, OrganizationsTable, CreateButton },
  data() {
    return {
      organizations: [],
      isFormVisible: false,
      isEditing: false,
      selectedOrganization: null,
      buttonName: "организацию"
    };
  },
  methods: {
    async getOrganizations() {
      try {
        this.organizations = await organizationAPI.getOrganizations();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    async deleteOrganization(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await organizationAPI.deleteOrganization(id);
        await this.getOrganizations();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async createOrganization(organizationData) {
      if (!organizationData.name.trim()) return;

      try {
          await organizationAPI.createOrganization(organizationData);
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      }
    },
    async updateOrganization(organizationData) {
      if (!organizationData.name.trim()) return;
      try {
        await organizationAPI.updateOrganization(this.selectedOrganization.id, organizationData)
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      }
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedOrganization = null;
      this.isFormVisible = true;
    },
    showEditForm(organization) {
      this.isEditing = true;
      this.selectedOrganization = organization;
      this.isFormVisible = true;
    },
    handleUpdate() {
      this.getOrganizations();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
  },
  mounted() {
    this.getOrganizations();
  },
};
</script>

<template>
  <div class="content">
    <h2>Организации</h2>
    <CreateButton
        :buttonName = buttonName
        @create="showCreateForm"
    />

    <OrganizationsTable
        :organizations="organizations"
        @edit="showEditForm"
        @delete="deleteOrganization"
    />

    <OrganizationForm
        v-if="isFormVisible"
        :organization="selectedOrganization"
        :isEditing="isEditing"
        @update="updateOrganization"
        @create="createOrganization"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>

</style>
