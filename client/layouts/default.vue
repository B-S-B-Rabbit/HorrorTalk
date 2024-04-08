<template>
  <div>
    <q-layout>
      <q-header>
        <q-toolbar style="background: black; justify-content: space-between">
          <div
            class="hamburger"
            :class="{ active: isActive }"
            @click="toggleActive"
          >
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>

          <q-toolbar-title style="display: flex; justify-content: center">
            <img src="/public/icons/navbar_logo.svg" alt="" />
          </q-toolbar-title>
          <q-btn dense flat icon="account_circle" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <slot></slot>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped lang="scss">
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 28px;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  margin: 3px 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.active .line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.active .line:nth-child(2) {
  opacity: 0;
}

.active .line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
