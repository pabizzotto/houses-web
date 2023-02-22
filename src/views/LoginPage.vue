<template>
  <main class="flex justify-center items-center h-screen">
    <form
      action="submit"
      class="container flex flex-col mb-4"
      style="width: 30%"
    >
      <div class="flex flex-col mb-4">
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
          placeholder="example@email.com"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div class="flex flex-col relative mb-5">
        <div class="flex justify-between">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
          >
            Password
          </label>
          <a class="text-xs no-underline"> Forgot password </a>
        </div>

        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="Password"
          id="password"
          placeholder="Enter password"
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
        class="bg-slate-200 text-slate-900 font-semibold rounded py-2 mb-4"
        @click="submit"
      >
        Sign in
      </button>

      <p class="text-center">
        Don't have an account?
        <router-link to="/signup" class="font-bold"> Sign up now! </router-link>
      </p>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import axios from "axios";

interface AccessTokenResponseModel {
  access: string;
  refresh: string;
}

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
    const body = {
      email: email.value,
      password: password.value,
    };

    const response = await axios.post<AccessTokenResponseModel>(
      "http://localhost:8000/api/auth/jwt/create/",
      body
    );
    const { access, refresh } = response.data;

    cookies.set("access-token", access);
    cookies.set("refresh-token", refresh);

    router.push("/");
  } catch (error) {
    console.error(error);
  }
}
</script>
