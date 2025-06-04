import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '~/utils/firebaseConfig';
import { useNuxtApp, useUserStore, redirectFlg } from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return

  if (getApps().length === 0) {
    initializeApp(firebaseConfig());
  }

  redirectFlg.value = true;
  const userStore = useUserStore();
  const { $db } = useNuxtApp();

  const authCheck = () =>
    new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc($db, 'users', user.uid));
          if (userDoc.exists()) {
            userStore.setUser({
              uid: user.uid,
              ...userDoc.data(),
            })
            resolve(true);
          } else {
            userStore.clearUser();
            resolve(false);
          }
        } else {
          userStore.clearUser();
          resolve(false);
        }
      });
    });

  const isLoggedIn = await authCheck();
  // 未ログインはログイン画面へ遷移
  if (!isLoggedIn && to.path === '/mypage') {
    return navigateTo('/login');
  }
  // ログイン済みはマイページ画面へ遷移
  if (isLoggedIn && to.path === '/login') {
    return navigateTo('mypage');
  }
  redirectFlg.value = false;
})
