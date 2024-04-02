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
          type="password"
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
        <div class="date-container">
          <div class="date-label">Дата рождения</div>
          <HTInputDate
            v-model="dateOfBirth"
            class="registration-form_input-date"
          >
          </HTInputDate>
        </div>

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
      </q-form>
      <div class="confirm-reg-block">
        Регистрируясь, вы соглашаетесь с Правилами использования и Политикой
        конфиденциальности
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import CInputMain from "~/components/inputs/CInputMain.vue";
import HTRadioButtons from "~/components/inputs/HTRadioButtons.vue";
import HTInputDate from "~/components/inputs/HTInputDate.vue";
const value: Ref<string> = ref("");
const dateOfBirth: Ref<string> = ref("");
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
  box-sizing: border-box;
}
.main-container {
  background: #000000;
  width: 100%;
  height: 100%;
  .confirm-reg-block {
    margin: 31px 0px 11px 0px;
    color: gray;
    text-align: center;
  }
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
      &_input-date {
        width: 55%;
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
      .date-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        .date-label {
          color: rgb(156, 156, 156);
          font-size: 14px;
        }
      }
    }
  }
}
.q-field__label {
  margin-left: 14px;
}
</style>
