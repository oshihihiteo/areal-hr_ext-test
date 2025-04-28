<script>
import * as userAPI from "../instances/users.js";
import UserForm from "../components/UserForm.vue";
import UsersTable from "../components/UsersTable.vue";
import CreateButton from "@/components/CreateButton.vue";
import { useUserStore } from "@/stores/userStore.js";

export default {
  components: { UserForm, UsersTable, CreateButton },
  setup() {
    const userStore = useUserStore();

    return {
      isAdmin: userStore.isAdmin,
      isAdminOrManager: userStore.isAdminOrManager,
    };
  },
  data() {
    return {
      users: [],
      isFormVisible: false,
      isEditing: false,
      selectedUser: null,
      errors: {},
      buttonName: "пользователя",
    };
  },
  methods: {
    async getUsers() {
      try {
        this.users = await userAPI.getUsers();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async createUser(userData) {
      try {
        await userAPI.createUser(userData);
        this.handleUpdate();
      } catch (error) {
        console.error(
            "Ошибка:",
            error.response ? error.response.data : error.message,
        );
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    async deleteUser(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await userAPI.deleteUser(id);
        await this.getUsers();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async updateUser(userData) {
      try {
        await userAPI.updateUser(this.selectedUser.id, userData);
        this.handleUpdate();
      } catch (error) {
        console.error(
            "Ошибка:",
            error.response ? error.response.data : error.message,
        );
        const rawErrors = error.response?.data?.errors || [];
        this.errors = rawErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
      }
    },
    async limitUserAccess(id) {
      try {
        await userAPI.limitUser(id);
        alert("Права доступа пользователя изменены.");
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    handleUpdate() {
      this.getUsers();
      this.isFormVisible = false;
      this.errors = {};
    },
    handleCancel() {
      this.isFormVisible = false;
      this.errors = {};
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedUser = null;
      this.errors = {};
      this.isFormVisible = true;
    },
    showEditForm(user) {
      this.isEditing = true;
      this.selectedUser = user;
      this.errors = {};
      this.isFormVisible = true;
    },
  },
  mounted() {
    this.getUsers();
    console.log(this.isAdminOrManager);
    console.log(this.isAdmin)
  },
};
</script>


<template>
  <div class="content">
    <h2>Пользователи</h2>
    <CreateButton
      v-if="isAdmin"
      :buttonName="buttonName"
      @create="showCreateForm"
    />
    <UsersTable
      :users="users"
      @edit="showEditForm"
      @delete="deleteUser"
      @limit="limitUserAccess"
      :isAdminOrManager="isAdminOrManager"
      :isAdmin="isAdmin"
    />
    <UserForm
      v-if="isFormVisible"
      :user="selectedUser"
      :isEditing="isEditing"
      :errors="errors"
      @update="updateUser"
      @create="createUser"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped></style>
