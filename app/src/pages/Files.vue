<script>
import * as filesAPI from '../instances/files.js';
import CreateButton from "@/components/CreateButton.vue";
import FilesTable from "@/components/FilesTable.vue";
import FileForm from "@/components/FileForm.vue";
import axiosInstance from "@/instances/baseURL.js";
import * as employeesAPI from "@/instances/employees.js";


export default {
  components: { FileForm, FilesTable, CreateButton },
  data() {
    return {
      files: [],
      employees: [],
      isFormVisible: false,
      isEditing: false,
      selectedFile: null,
      buttonName: "файл"
    };
  },
  methods: {
    async getFiles() {
      try {
        this.files = await filesAPI.getFiles();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async getEmployees() {
      try {
        this.employees = await employeesAPI.getEmployees();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    openFile(file) {
      const url = `${axiosInstance.defaults.baseURL}/files/${file.id}/raw`;
      window.open(url, "_blank");
    },
    async createFile(fileData) {
      try {
        const response = await filesAPI.createFile(fileData);
        console.log("Файл успешно загружен:", response.data);
        this.handleUpdate();
      } catch (error) {
        console.error("Ошибка при загрузке файла:", error.response ? error.response.data : error.message);
      }
    },
    async deleteFile(id) {
      if (!confirm("Вы уверены, что хотите удалить?")) return;
      try {
        await filesAPI.deleteFile(id);
        await this.getFiles();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
    async updateFile(fileData) {
      try {
        await filesAPI.updateFile(this.selectedFile.id, fileData)
        this.handleUpdate()
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error.response ? error.response.data : error.message);
      }
    },
    handleUpdate() {
      this.getFiles();
      this.isFormVisible = false;
    },
    handleCancel() {
      this.isFormVisible = false;
    },
    showCreateForm() {
      this.isEditing = false;
      this.selectedFile = null;
      this.isFormVisible = true;
    },
    showEditForm(file) {
      this.isEditing = true;
      this.selectedFile = file;
      this.isFormVisible = true;
    },
  },
  mounted() {
    this.getFiles();
    this.getEmployees()
  },
};
</script>

<template>
  <div class="content">
    <h2>Файлы</h2>
    <CreateButton
        :buttonName = buttonName
        @create="showCreateForm"/>
    <FilesTable
        :files="files"
        @edit="showEditForm"
        @delete="deleteFile"
        @open="openFile"
    />

    <FileForm
        v-if="isFormVisible"
        :file="selectedFile"
        :isEditing="isEditing"
        :employees="employees"
        @update="updateFile"
        @create="createFile"
        @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
</style>
