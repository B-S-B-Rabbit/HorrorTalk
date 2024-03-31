<template>
  <q-option-group
    :model-value="modelValue"
    :options="options"
    type="radio"
    :inline="inline"
    :left-label="leftLabel"
    color="primary"
    @update:model-value="selectRadio"
    dark
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  inline: {
    type: Boolean,
    default: false,
  },
  leftLabel: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
function selectRadio(newValue) {
  emit("update:modelValue", newValue);
}
</script>

<style></style>
