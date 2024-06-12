<template>
  <q-input
    ref="inputRef"
    :model-value="modelValue"
    class="text-input"
    :class="themed ? 'themed' : ''"
    :placeholder="placeholder"
    :label="label"
    :type="isPwd ? 'password' : type == 'password' ? 'text' : type"
    borderless
    :clearable="clearable"
    :autogrow="autogrow"
    :style="`height: ${autogrow ? 'auto' : '60px'}; 
      ${active || persistentBorder ? `border: 1px ${fieldHasError ? '#BD7700' : borderColor} solid` : ''}; padding-top: 2px;`"
    :input-style="`${marginTextInput && (fieldHasError || hint) ? 'margin-bottom: 4px;' : ''};
    ${themed ? 'color: var(--app-white-1)' : ''}`"
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
          validateAfterReset = false;
        }
      }
    "
    @update:model-value="updateVal"
  >
    <template v-if="prepend" #prepend>
      <slot name="prependIcon"></slot>
    </template>
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
        :style="`margin: 16px; color: ${iconColor}`"
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
import type { Ref } from "vue";
import { QInput } from "quasar";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  prepend: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  iconColor: {
    type: String,
    default: "var(--app-black-2)",
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
  marginTextInput: {
    type: Boolean,
    default: false,
  },
  mainColor: {
    type: String,
    default: "var(--app-white-1)",
  },
  borderColor: {
    type: String,
    default: "var(--app-red-1)",
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  persistentBorder: {
    type: Boolean,
    default: false,
  },
  themed: {
    type: Boolean,
    default: false,
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
const validateAfterReset: Ref<boolean> = ref(true);
function checkRules(value: string) {
  if (validateAfterReset.value) {
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

<style scoped lang="scss">
.validity-icon {
  padding-right: 15px;
}
.text-input {
  overflow: hidden;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 16px;
  background-color: v-bind(mainColor);
  transition:
    border-color 0.2s ease,
    height 0.2s ease;
  border: 1px solid transparent;
}
.themed {
  background-color: transparent;
  border: 1px solid var(--app-black-4);
}
.text-input input,
.text-input textarea {
  padding-top: 2px;
}
</style>
