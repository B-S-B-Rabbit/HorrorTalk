<template>
  <div>
    <q-header class="nav-header">
      <q-toolbar
        style="background: var(--app-dark-1); justify-content: space-between"
      >
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
          <img :src="logoSrc" alt="" />
        </q-toolbar-title>
        <q-btn
          size="lg"
          style="width: 40px; height: 40px"
          :icon="mdiAccountCircleOutline"
        />
      </q-toolbar>
    </q-header>
    <div class="menu-container" :style="`left:${isActive ? '0px' : '-100%'}`">
      <q-btn
        v-for="(item, index) in menuItems"
        :key="index"
        no-caps
        align="left"
        class="menu-item"
        :label="item.label"
        :icon="item.icon"
        button-style="height: 20px !important"
        :to="item.route"
        @click="toggleActive"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiAccountCircleOutline } from "@quasar/extras/mdi-v6";
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}
const router = useRouter();
const props = defineProps({
  logoSrc: {
    type: String,
    default: "",
  },
  menuItems: {
    type: Array as () => MenuItem[],
    default: () => [],
  },
});

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};
</script>
<style scoped lang="scss">
.nav-header {
  border-bottom: 1px var(--app-black-3) solid;
  z-index: 10001;
}
.menu-container {
  position: fixed;
  z-index: 10000;
  width: 85%;
  height: 100%;
  top: 50px;
  background: var(--app-dark-1);
  transition: all 0.5s ease;
  .menu-item {
    position: relative;
    z-index: 20000;
    text-align: start;
    display: block;
    width: auto;
    margin-top: 16px;
    margin-left: 24px;
    color: var(--app-white-1);
    font-size: 16px;
    font-weight: 500;
  }
  .menu-item:nth-child(1) {
    margin-top: 32px;
  }
}
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
  background-color: var(--app-white-1);
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
