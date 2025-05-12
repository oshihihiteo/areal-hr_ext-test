<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
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
      this.$emit(this.isEditing ? "update" : "create", data);
    },
    cancelForm() {
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div class="form-container">
    <h3>{{ isEditing ? "Редактировать пользователя" : "Добавить пользователя" }}</h3>

    <BaseInput
        v-model="userData.lastname"
        label="Фамилия"
        id="user-lastname"
        :required="true"
        :error="errors?.lastname"
    />

    <BaseInput
        v-model="userData.firstname"
        label="Имя"
        id="user-firstname"
        :required="true"
        :error="errors?.firstname"
    />

    <BaseInput
        v-model="userData.patronymic"
        label="Отчество"
        id="user-patronymic"
        :error="errors?.patronymic"
    />

    <BaseInput
        v-model="userData.login"
        label="Логин"
        id="user-login"
        :required="true"
        :error="errors?.login"
    />

    <BaseInput
        v-model="userData.password"
        label="Пароль"
        id="user-password"
        type="password"
        :required="true"
        :error="errors?.password"
    />

    <div class="buttons">
      <BaseButton @click="submitForm">
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </BaseButton>
      <BaseButton type="button" @click="cancelForm">Отмена</BaseButton>
    </div>
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
