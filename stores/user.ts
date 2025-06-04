import { defineStore } from 'pinia';
import type { user } from '~/types/store.d.ts';

export const useUserStore = defineStore('user', () => {
  const user: Ref<user | null> = ref(null);

  const getUser = () => {
    return user.value
  }
  const setUser = (val: user) => {
    user.value = val
  }
  const clearUser = () => {
    user.value = null
  }
  return {
    user,
    getUser,
    setUser,
    clearUser,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  }
});

