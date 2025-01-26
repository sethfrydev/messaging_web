import { reactive } from "vue";

export const authState = reactive({
  isLoggedIn: !!localStorage.getItem("authToken"),
  user: JSON.parse(localStorage.getItem("authUser")) || null, // Store user details
});

export function login(token, user) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
  authState.isLoggedIn = true;
  authState.user = user;
}

export function logout(router) {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  authState.isLoggedIn = false;
  authState.user = null;

  if (router) {
    router.push("/login");
  }
}
