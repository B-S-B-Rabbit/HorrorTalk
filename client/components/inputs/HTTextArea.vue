<template>
  <InputsHTInputMain
    :model-value="modelValue"
    :text-validity-check="false"
    placeholder="Начните писать свой отзыв"
    main-color="var(--app-dark-1)"
    border-color="var(--app-black-4)"
    persistent-border
    dark
    autogrow
    class="text-area"
    @update:model-value="updateValue"
  >
  </InputsHTInputMain>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
function updateValue(newVal) {
  emit("update:modelValue", newVal);
}
</script>

<style lang="scss" scoped>
.text-area {
  padding: 16px;
}
</style>
