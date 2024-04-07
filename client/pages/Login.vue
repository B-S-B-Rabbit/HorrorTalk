<template>
  <div class="main-container">
    <div class="registration-wrapper">
      <div class="registration-wrapper_logo">
        <img
          class="registration-wrapper-img"
          src="public/icons/logo.svg"
          alt="Logo"
        />
      </div>
      <div class="registration-container">
        <q-form class="registration-form">
          <CInputMain
            v-model="authDataRef.login"
            margin-text-input
            class="registration-form_input-text"
            hint="Больше 5 символов"
            :rules="validateLogin"
            label="Логин"
          >
          </CInputMain>
          <CInputMain
            v-model="authDataRef.password"
            type="password"
            class="registration-form_input-text"
            label="Пароль"
            hint="Больше 5 символов"
            :rules="validateLogin"
          >
          </CInputMain>
        </q-form>
      </div>
      <div class="register-block">
        <div class="confirm-reg-block">
          <a class="link">Забыли пароль?</a>
        </div>
        <HTButton class="registration-button" label="Зарегистрироваться" />
        <div class="confirm-reg-block">
          Еще нет аккаунта? <span class="link">Зарегистрироваться</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CInputMain from "~/components/inputs/CInputMain.vue";
import HTRadioButtons from "~/components/inputs/HTRadioButtons.vue";
import HTInputDate from "~/components/inputs/HTInputDate.vue";
import HTButton from "~/components/HTButton.vue";
import type { Ref } from "vue";

interface AuthDataType {
  login: string;
  password: string;
}
interface ValidationRule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}
const validateLogin: ValidationRule[] = [
  {
    rule: (value: string) => value.length > 5,
    ruleMessage: "Меньше 5 символов!",
  },
];
const authDataRef: Ref<AuthDataType> = ref({
  login: "",
  password: "",
});
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body,
#__nuxt {
  width: 100vw;
  height: 100vh;
  background: var(--app-black-1);
  font-family: Inter, sans-serif;
}
.link {
  color: var(--app-blue-2);
}
.main-container {
  width: 100%;
  height: 100%;
  padding: 0 5%;
  display: flex;
  .registration-wrapper {
    margin: auto;
    .registration-button {
      margin: 24px 0px;
    }
    .confirm-reg-block {
      color: var(--app-black-4);
      text-align: center;
      &:last-child {
        margin-bottom: 32px;
      }
    }
    &_logo {
      height: auto;
      width: 100%;
      text-align: center;
      margin: 16px 0;
      img {
        width: 253px;
        height: 259px;
      }
    }
    .registration-container {
      margin: 0 calc(14% - 5%);
      display: flex;
      flex-direction: column;
      .registration-form {
        &_input-text {
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 32px;
          }
        }
        &_input-date {
          width: 55%;
          margin-bottom: 7px;
        }
        .radio-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-left: 15px;
          margin-bottom: 13px;
          .radio-label {
            color: var(--app-black-4);
            font-size: 14px;
          }
          .radio-buttons {
            color: var(--app-white-1);
            margin: 8px 0px 12px 0px;
          }
        }
        .date-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-left: 15px;
          .date-label {
            color: var(--app-black-4);
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
