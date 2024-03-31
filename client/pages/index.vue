<template>
  <div class="main-container">
    <div class="main-container_logo"></div>
    <div class="registration-container">
      <q-form class="registration-form">
        <CInputMain
          v-model="value"
          class="registration-form_input-text"
          hint="Больше 5 символов"
          :rules="validateLogin"
          placeholder="Введите логин"
        >
        </CInputMain>
        <CInputMain
          v-model="value"
          class="registration-form_input-text"
          hint="Больше 5 символов"
          :rules="validateLogin"
          placeholder="Введите логин"
        >
        </CInputMain>
        <CInputMain
          v-model="value"
          class="registration-form_input-text"
          hint="Больше 5 символов"
          :rules="validateLogin"
          placeholder="Введите логин"
        >
        </CInputMain>
        <div class="radio-container">
          <div class="radio-label">Пол</div>
          <HTRadioButtons
            v-model="selectedGender"
            class="radio-buttons"
            inline
            left-label
            :options="options"
          />
        </div>
        <CInputMain
          v-model="value"
          type="password"
          class="registration-form_input-text"
          hint="Больше 5 символов"
          :rules="validateLogin"
          placeholder="Введите логин"
        >
        </CInputMain>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import CInputMain from "~/components/inputs/CInputMain.vue";
import HTRadioButtons from "~/components/inputs/HTRadioButtons.vue";
const value: object = ref("");
interface ValidationRule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}
interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  {
    label: "М",
    value: "M",
  },
  {
    label: "Ж",
    value: "W",
  },
];
const selectedGender: Ref<string> = ref("");

const validateLogin: ValidationRule[] = [
  {
    rule: (value: string) => value.length > 5,
    ruleMessage: "Меньше 5 символов!",
  },
  // Другие правила валидации могут быть добавлены здесь
];
</script>
<style lang="scss">
html,
body,
#__nuxt {
  width: 100vw;
  height: 100vh;
}
.main-container {
  background: #000000;
  width: 100%;
  height: 100%;
  &_logo {
    height: 150px;
    background: rgb(91, 0, 0);
  }
  .registration-container {
    margin: 0 14%;
    .registration-form {
      &_input-text {
        margin-bottom: 10px;
      }
      .radio-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        .radio-label {
          color: rgb(156, 156, 156);
          font-size: 14px;
        }
        .radio-buttons {
          color: white;
        }
      }
    }
  }
}
.q-field__label {
  margin-left: 14px;
}
</style>
