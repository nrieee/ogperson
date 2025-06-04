import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '~/utils/firebaseConfig';

export default defineNuxtPlugin(() => {
  const app = initializeApp(firebaseConfig());
  const auth = getAuth(app);
  const db = getFirestore(app);

  return {
    provide: {
      auth,
      db
    }
  }
})
