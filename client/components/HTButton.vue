<template>
  <q-btn
    no-caps
    :class="!iconButton ? 'main-button' : 'icon-button'"
    color="primary"
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
    default: "",
  },
  iconButton: {
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
.icon-button {
  height: 48px;
  width: 48px;
}
</style>
