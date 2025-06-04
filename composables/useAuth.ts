import { ref } from 'vue';
import { useUserStore } from '#imports';
import { useNuxtApp } from '#app';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const error = ref<string | null>(null);
  const userStore = useUserStore();

  const signInAnonymouslyWithProfile = async () => {
    const { $auth, $db } = useNuxtApp();
    try {
      const result = await signInAnonymously($auth);
      const user = result.user;

      const profile = {
        uid: user.uid,
        name: '名無しのOGP職人',
        iconUrl: 'https://placehold.jp/150x150.png', // デフォルトアイコン
        createdAt: new Date(),
      }

      // Firestoreにユーザー情報保存（初回ログイン時）
      await setDoc(doc($db, 'users', user.uid), profile);
      userStore.setUser(profile);

      return true
    } catch (err: any) {
      error.value = err.message;
      return false
    }
  }

  const logout = async () => {
    const { $auth } = useNuxtApp();
    try {
      await signOut($auth);

      const userStore = useUserStore();
      userStore.clearUser();

      return navigateTo('/login');
    } catch(err: any) {
      error.value = err.message;
      return false
    }
  }

  const checkAuthState = async () => {
    const { $auth, $db } = useNuxtApp();

    return new Promise<void>((resolve) => {
      onAuthStateChanged($auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc($db, 'users', user.uid));
          if (userDoc.exists()) {
            userStore.setUser({
              uid: user.uid,
              ...userDoc.data(),
            });
          } else {
            userStore.clearUser();
          }
        }
        resolve();
      })
    })
  }

  return {
    signInAnonymouslyWithProfile,
    logout,
    checkAuthState,
    error,
  }
}
