<script>
export default {
  props: ["user", "isEditing", "errors"],
  data() {
    return {
      userData: {
        lastname: "",
        firstname: "",
        patronymic: "",
        login: "",
        password: "",
      },
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.userData = {
          lastname: newUser?.lastname || "",
          firstname: newUser?.firstname || "",
          patronymic: newUser?.patronymic || "",
          login: newUser?.login || "",
          password: newUser?.password || "",
        };
      },
    },
  },
  methods: {
    async submitForm() {
      const data = {
        lastname: this.userData.lastname.trim(),
        firstname: this.userData.firstname.trim(),
        patronymic: this.userData?.patronymic.trim() || null,
        login: this.userData.login.trim(),
        password: this.userData.password.trim(),
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
      {{ isEditing ? "Редактировать пользователя" : "Добавить пользователя" }}
    </h3>
    <input v-model="userData.lastname" placeholder="Фамилия" required />
    <p v-if="errors?.lastname" class="error">{{ errors.lastname }}</p>
    <input v-model="userData.firstname" placeholder="Имя" required />
    <p v-if="errors?.firstname" class="error">{{ errors.firstname }}</p>
    <input v-model="userData.patronymic" placeholder="Отчество" />
    <p v-if="errors?.patronymic" class="error">{{ errors.patronymic }}</p>
    <input v-model="userData.login" placeholder="Логин" required />
    <p v-if="errors?.login" class="error">{{ errors.login }}</p>
    <input v-model="userData.password" placeholder="Пароль" required />
    <p v-if="errors?.password" class="error">{{ errors.password }}</p>
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
