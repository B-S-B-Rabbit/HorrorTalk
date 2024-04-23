<template>
  <q-select
    :model-value="modelValue"
    class="text-select"
    borderless
    :options="options"
    label="Фильм для рецензии"
    @update:model-value="selectItems"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:modelValue"]);
function selectItems(item: string) {
  emits("update:modelValue", item);
}
</script>

<style scoped>
.text-select {
  overflow: hidden;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 16px;
  background-color: var(--app-white-1);
  transition:
    border-color 0.2s ease,
    height 0.2s ease;
  border: 1px solid transparent; /* Устанавливаем прозрачную рамку */
}
</style>
