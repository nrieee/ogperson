export const firebaseConfig = () => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    appId: config.public.firebaseAppId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    measurementId: config.public.firebaseMeasurementId
  }

  return firebaseConfig
}