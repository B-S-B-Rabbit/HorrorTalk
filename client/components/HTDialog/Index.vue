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
        <q-btn
          v-close-popup
          color="white"
          flat
          label="Закрыть"
          @click="cancelAction"
        />
        <q-btn
          v-close-popup
          color="primary"
          flat
          label="Применить"
          @click="acceptAction"
        />
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
const emits = defineEmits([
  "update:modelValue",
  "cancelAction",
  "acceptAction",
]);
function toggleDialog(value: boolean) {
  emits("update:modelValue", value);
}
function cancelAction() {
  emits("cancelAction");
}
function acceptAction() {
  emits("acceptAction");
}
</script>

<style scoped>
.main-dialog {
  background: var(--app-dark-1) !important;
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
