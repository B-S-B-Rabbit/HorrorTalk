<template>
  <q-btn
    v-if="icon"
    no-caps
    :class="
      !iconButton
        ? `main-button ${themed ? 'main-themed-button' : type == 'secondary' ? 'secondary' : ''}`
        : 'icon-button'
    "
    :color="!themed ? `${type == 'primary' ? 'primary' : ''}` : ''"
    :label="label"
    :rounded="iconButton"
    :icon="icon"
  />
  <q-btn
    v-else
    no-caps
    :class="
      !iconButton
        ? `main-button ${themed ? 'main-themed-button' : type == 'secondary' ? 'secondary' : ''}`
        : 'icon-button'
    "
    :color="!themed ? `${type == 'primary' ? 'primary' : ''}` : ''"
    :label="label"
    :rounded="iconButton"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "primary",
  },
  iconButton: {
    type: Boolean,
    default: false,
  },
  themed: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.main-button {
  width: 100%;
  height: 54px;
  border-radius: 16px;
}
.main-themed-button {
  background-color: v-bind(themed);
  border: 1px var(--app-black-5) solid;
  height: 30px;
  width: fit-content;
}
.secondary {
  background-color: transparent;
  border: 1px var(--app-red-1) solid;
}
.icon-button {
  height: 48px;
  width: 48px;
}
</style>
