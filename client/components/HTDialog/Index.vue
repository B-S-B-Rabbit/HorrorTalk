<template>
  <q-dialog
    persistent
    full-width
    :model-value="modelValue"
    @update:model-value="toggleDialog"
  >
    <q-card class="main-dialog">
      <q-card-section>
        <div>Ваш текст диалога</div>
      </q-card-section>

      <q-card-section style="width: 100%">
        <slot name="main"></slot>
      </q-card-section>

      <q-card-actions class="footer-buttons">
        <q-btn v-close-popup color="white" flat label="Закрыть" />
        <q-btn v-close-popup color="primary" flat label="Применить" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue"]);
function toggleDialog(value: boolean) {
  emits("update:modelValue", value);
}
</script>

<style scoped>
.main-dialog {
  background: var(--app-black-2) !important;
  color: var(--app-white-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer-buttons {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
