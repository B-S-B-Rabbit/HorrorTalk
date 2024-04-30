<template>
  <q-btn
    no-caps
    :class="
      !iconButton
        ? `main-button ${themed ? 'main-themed-button' : ''}`
        : 'icon-button'
    "
    :color="!themed ? 'primary' : ''"
    :label="label"
    :rounded="iconButton"
    :icon="icon"
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
  },
  iconButton: {
    type: Boolean,
    default: false,
  },
  themed: {
    type: Boolean,
    default: false,
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
  background-color: var(--app-dark-1);
  border: 1px var(--app-black-5) solid;
  height: 30px;
  width: fit-content;
}
.icon-button {
  height: 48px;
  width: 48px;
}
</style>
