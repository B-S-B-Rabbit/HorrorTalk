<template>
  <q-btn no-caps class="main-button" color="primary" :label="label" />
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
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
</style>
