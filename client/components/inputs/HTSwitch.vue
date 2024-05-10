<template>
  <q-toggle
    :model-value="modelValue"
    color="primary"
    :label="label"
    @update:model-value="setValue"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:modelValue"]);
function setValue(newVal: boolean) {
  emits("update:modelValue", newVal);
}
</script>

<style scoped lang="scss"></style>
