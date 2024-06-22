export default defineNuxtRouteMiddleware(async (to, from) => {
  useSetConfig();
  if (!(await useCheckUser()) && to.path == "/profile") {
    return navigateTo("/login");
  }
});
