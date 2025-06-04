<template>
  <div v-show="!redirectFlg" class="fill-height d-flex align-center justify-center">
    <v-container v-if="!redirectFlg"><!--チラツキ防止-->
      <h1 class="text-center mb-5">OGPersonへようこそ🎉</h1>
      <v-card class="pa-4 mx-auto" width="600">
        <v-card-item>
          <template v-slot:prepend>
            <v-avatar size="40">
              <v-img :src="user?.iconUrl" :alt="user?.name" width="40" />
            </v-avatar>
          </template>
          <v-card-text class="ma-0 pa-0">
            <h2 class="ttl-h2">{{ user?.name }}</h2>
          </v-card-text>
        </v-card-item>
      </v-card>
      <v-btn @click="logout" color="primary" class="d-block mx-auto my-5">ログアウト</v-btn>
      <div v-if="error" class="text-red mt-2">{{ error }}</div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-only',
});
import type { user } from '~/types/store.d.ts';
const userStore = useUserStore();
const user: ComputedRef<user> = computed(() => userStore.user);
const { logout, error } = useAuth();

</script>