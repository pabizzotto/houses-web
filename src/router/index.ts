import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
import axios from "axios";

const routes = [
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue"),
    meta: {
      disabledIfLoggedIn: true,
    },
  },
  {
    path: "/",
    component: () => import("../views/HomePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, _from, next) => {
  const { disabledIfLoggedIn, requiresAuth } = to.meta;
  const { cookies } = useCookies();
  const token = cookies.get("access-token");

  if (disabledIfLoggedIn) {
    if (token) {
      next("/");
    } else {
      next();
    }
  } else if (requiresAuth) {
    const authorized = await verifyToken(token);
    console.log(authorized);

    if (authorized) {
      next();
    } else {
      cookies.remove("access-token", "refresh-token");
      next("/login");
    }
  } else {
    next();
  }
});

async function verifyToken(token: string): Promise<boolean> {
  try {
    const body = {
      token,
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/jwt/verify/",
      body
    );

    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default router;
