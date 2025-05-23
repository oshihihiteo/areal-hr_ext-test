import { defineStore } from 'pinia';
import * as authAPI from '@/instances/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isLoading: false,
    }),
    getters: {
        roleId: (state) => state.user?.role_id || null,
        isAdmin: (state) => state.user?.role_id === 1,
        isAdminOrManager: (state) =>
            state.user?.role_id === 1 || state.user?.role_id === 2,
    },
    actions: {
        async login(login, password) {
            this.isLoading = true;
            try {
                this.user = await authAPI.loginUser(login, password);
            } catch (error) {
                console.error('Ошибка входа', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async getCurrentUser() {
            this.isLoading = true;
            try {
                this.user = await authAPI.getCurrentUser();
            } catch (error) {
                this.user = null;
                console.warn('Пользователь не авторизован');
            } finally {
                this.isLoading = false;
            }
        },
    },
});
