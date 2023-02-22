<template>
  <main class="flex justify-center items-center h-screen">
    <form
      action="submit"
      class="container flex flex-col mb-4"
      style="width: 30%"
    >
      <div class="flex flex-col mb-4">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Name
        </label>

        <input
          v-model="name"
          type="text"
          name="Name"
          id="name"
          placeholder="John Doe"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
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

      <div class="flex flex-col relative mb-4">
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
          placeholder="Enter password"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <component
          :is="showPassword ? EyeSlashIcon : EyeIcon"
          @click="toggleShowPassword"
          class="h-6 w-6 text-slate-200 absolute top-9 right-2 hover:cursor-pointer z-40"
        ></component>
      </div>

      <div class="flex flex-col relative mb-5">
        <label
          for="repeatPassword"
          class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Confirm Password
        </label>

        <input
          v-model="repeatPassword"
          :type="showRepeatPassword ? 'text' : 'password'"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Confirm password"
          class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <component
          :is="showRepeatPassword ? EyeSlashIcon : EyeIcon"
          @click="toggleShowRepeatPassword"
          class="h-6 w-6 text-slate-200 absolute top-9 right-2 hover:cursor-pointer z-40"
        ></component>
      </div>

      <button
        type="button"
        class="bg-slate-200 text-slate-900 font-semibold rounded py-2 mb-4"
        @click="submit"
      >
        Sign up
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import axios from "axios";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const showPassword = ref(false);
const showRepeatPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function toggleShowRepeatPassword() {
  showRepeatPassword.value = !showRepeatPassword.value;
}

async function submit() {
  try {
    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
      repeat_password: repeatPassword.value,
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/users/",
      body
    );

    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}
</script>
