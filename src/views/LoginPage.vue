<template>
  <main class="flex justify-center items-center h-screen">
    <form action="submit" class="flex flex-col gap-8">
      <div class="flex flex-col">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Email
        </label>

        <input
          v-model="email"
          type="email"
          name="Email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div class="flex flex-col relative">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Password
        </label>

        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="Password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <component
          :is="showPassword ? EyeSlashIcon : EyeIcon"
          @click="toggleShowPassword"
          class="h-6 w-6 text-slate-200 absolute top-9 right-2 hover:cursor-pointer z-40"
        ></component>
      </div>

      <button
        type="button"
        class="bg-slate-200 text-slate-900 rounded py-2"
        @click="submit"
      >
        Sign in
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";

const router = useRouter();
const { cookies } = useCookies();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

async function submit() {
  try {
    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const response = await fetch(
      "http://localhost:8000/api/auth/jwt/create/",
      requestOptions
    );
    const { access, refresh } = await response.json();

    cookies.set("access-token", access);
    cookies.set("refresh-token", refresh);

    router.push("/");
  } catch (error) {
    console.error(error);
  }
}
</script>
