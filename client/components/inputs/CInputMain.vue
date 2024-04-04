<template>
  <q-input
    ref="inputRef"
    :model-value="modelValue"
    class="text-input"
    :placeholder="placeholder"
    bg-white
    :label="label"
    :type="isPwd ? 'password' : type == 'password' ? 'text' : type"
    borderless
    :style="`height: ${(hint || fieldHasError) && active ? '60px' : '54px'}; 
      ${active ? `border: 1px ${fieldHasError ? 'purple' : '#BC0909'} solid` : ''}`"
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
        v-if="type != 'password' && active && textValidityCheck"
        :size="'12px'"
        class="validity-icon"
        :name="mdiCircle"
        :color="`${fieldHasError ? 'negative' : 'positive'}`"
      ></q-icon>
      <q-icon
        v-else-if="type == 'password'"
        :name="isPwd ? mdiEyeOffOutline : mdiEyeOutline"
        class="cursor-pointer"
        style="margin: 16px; color: var(--app-black-2)"
        @click="isPwd = !isPwd"
      />
      <slot name="appendIcon"></slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import {
  mdiCircle,
  mdiEyeOffOutline,
  mdiEyeOutline,
} from "@quasar/extras/mdi-v6";
import { ref } from "vue";
import type { Ref } from "vue";
import { QInput } from "quasar";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  textValidityCheck: {
    type: Boolean,
    default: true,
  },
  hint: {
    type: String,
    default: "",
  },
  rules: {
    type: Array as () => Rule[],
    default: () => [],
  },
  label: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
interface Rule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}
const isPwd: Ref<boolean> = ref(props.type == "password");
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
  transition: all 0.2s ease;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 16px;
  background-color: var(--app-white-1);
}
</style>
