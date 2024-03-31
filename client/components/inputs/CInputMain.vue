<template>
  <q-input
    ref="inputRef"
    :model-value="modelValue"
    class="text-input"
    :placeholder="placeholder"
    bg-white
    borderless
    :style="`height: ${(hint || fieldHasError) && active ? '60px' : '54px'}; 
      ${active ? `border: 2px ${fieldHasError ? 'purple' : '#BC0909'} solid` : ''}`"
    :hint="hint"
    :rules="[(val: string) => checkRules(val)]"
    no-error-icon
    hide-hint
    @focus="
      () => {
        active = true;
        validateAfterReset = true;
      }
    "
    @blur="
      () => {
        active = false;
        if (!modelValue.trim()) {
          inputRef?.resetValidation();
          fieldHasError = false;
          validateAfterReset = false; // Устанавливаем флаг в false, чтобы предотвратить валидацию после сброса
        }
      }
    "
    @update:model-value="updateVal"
  >
    <template #append>
      <q-icon
        v-if="active"
        :size="'12px'"
        class="validity-icon"
        :name="mdiCircle"
        :color="`${fieldHasError ? 'negative' : 'positive'}`"
      ></q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { mdiCircle } from "@quasar/extras/mdi-v6";
import { ref } from "vue";
import type { Ref } from "vue";
import { QInput } from "quasar";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  rules: {
    type: Array as () => Rule[],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
});
interface Rule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}
const inputRef: Ref<InstanceType<typeof QInput> | null> = ref(null);
const emit = defineEmits(["update:modelValue"]);
const fieldHasError: Ref<boolean> = ref(false);
const active: Ref<boolean> = ref(false);
const validateAfterReset: Ref<boolean> = ref(true); // Флаг для контроля валидации после сброса
function checkRules(value: string) {
  if (validateAfterReset.value) {
    // Проверяем флаг, чтобы предотвратить валидацию после сброса
    for (const rule of props.rules) {
      if (!rule.rule(value)) {
        fieldHasError.value = true;
        return rule.ruleMessage;
      }
    }
    fieldHasError.value = false;
  }
  return true;
}
function updateVal(value: string) {
  emit("update:modelValue", value);
}
</script>

<style scoped>
.validity-icon {
  padding-right: 15px;
}
.text-input {
  overflow: hidden;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 16px;
  background-color: white;
}
</style>
