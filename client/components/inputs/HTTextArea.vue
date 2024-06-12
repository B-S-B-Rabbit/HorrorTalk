<template>
  <InputsHTInputMain
    :model-value="modelValue"
    :text-validity-check="false"
    placeholder="Начните писать свой отзыв"
    main-color="var(--app-dark-1)"
    border-color="var(--app-black-4)"
    persistent-border
    dark
    :clearable="clearable"
    :clear-icon="mdiCloseCircleOutline"
    autogrow
    class="text-area"
    @update:model-value="updateValue"
  >
  </InputsHTInputMain>
</template>

<script setup lang="ts">
import { mdiCloseCircleOutline } from "@quasar/extras/mdi-v6";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: false,
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
