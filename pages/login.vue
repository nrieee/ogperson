<template>
  <div v-show="!redirectFlg" class="fill-height d-flex align-center justify-center">
    <v-container v-if="!redirectFlg"><!--チラツキ防止-->
      <v-card class="pa-4 mx-auto" width="400">
        <v-card-title>ログイン</v-card-title>
        <v-card-text>
          <v-btn @click="login" color="primary">匿名ログインする</v-btn>
          <div v-if="error" class="text-red mt-2">{{ error }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-only',
});
import { useRouter } from 'vue-router';
import { useAuth, redirectFlg } from '#imports';

const router = useRouter();
const { signInAnonymouslyWithProfile, error } = useAuth();

const login = async () => {
  const success = await signInAnonymouslyWithProfile();
  if (success) {
    router.push('/mypage');
  }
}
</script>
