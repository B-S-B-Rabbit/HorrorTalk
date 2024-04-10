<template>
  <div>
    <q-layout>
      <menu-h-t-navbar-mobile
        logo-src="/icons/navbar_logo.svg"
        :menu-items="menuItems"
      />
      <q-page-container>
        <slot></slot>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import {
  mdiAccountCircleOutline,
  mdiFilm,
  mdiHome,
  mdiHeartBox,
  mdiNewspaper,
} from "@quasar/extras/mdi-v6";

const menuItems = ref([
  { label: "Мой профиль", icon: mdiAccountCircleOutline, route: "/profile" },
  { label: "Главная", icon: mdiHome, route: "/" },
  { label: "Фильмы", icon: mdiFilm, route: "/films" },
  { label: "Статьи", icon: mdiNewspaper, route: "/articles" },
  { label: "Для вас", icon: mdiHeartBox, route: "/for-you" },
]);
</script>

<style scoped lang="scss"></style>
