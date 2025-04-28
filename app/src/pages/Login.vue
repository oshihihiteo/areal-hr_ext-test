<template>
  <div>
    <form @submit.prevent="loginUser">
      <input v-model="login" placeholder="Логин" />
      <input v-model="password" type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      login: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async loginUser() {
      const userStore = useUserStore();
      try {
        await userStore.login(this.login, this.password);
        console.log('Успешный вход!', userStore.user);
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || err.message || 'Ошибка авторизации';
      }
    }
  },
};
</script>
