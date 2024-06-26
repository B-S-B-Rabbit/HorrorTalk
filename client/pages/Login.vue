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
          <HTInputMain
            v-model="authDataRef.login"
            margin-text-input
            class="registration-form_input-text"
            hint="Больше 5 символов"
            :rules="validateLogin"
            label="Логин"
          >
          </HTInputMain>
          <HTInputMain
            v-model="authDataRef.password"
            type="password"
            class="registration-form_input-text"
            label="Пароль"
            hint="Латинница, цифры, спец.символы"
            :rules="validatePassword"
          >
          </HTInputMain>
        </q-form>
      </div>
      <div class="register-block">
        <div class="text-block">
          <a class="link">Забыли пароль?</a>
        </div>
        <HTButton class="registration-button" label="Войти" @click="login" />
        <div class="text-block">
          Еще нет аккаунта?
          <nuxt-link to="/registration" class="link"
            >Зарегистрироваться</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import HTButton from "~/components/HTButton.vue";
import type { Ref } from "vue";

definePageMeta({
  layout: false,
});

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
    rule: (value: string) => value.length >= 5,
    ruleMessage: "Меньше 5 символов!",
  },
];

const validatePassword: ValidationRule[] = [
  {
    rule: (value: string) => !/[а-яА-ЯЁё]/.test(value),
    ruleMessage: "Русские буквы не допускаются!",
  },
  {
    rule: (value: string) => value.length >= 8,
    ruleMessage: "Меньше 8 символов!",
  },
  {
    rule: (value: string) => /[A-Z]/.test(value),
    ruleMessage: "Нет заглавной буквы!",
  },
  {
    rule: (value: string) => /[a-z]/.test(value),
    ruleMessage: "Нет строчной буквы!",
  },
  {
    rule: (value: string) => /\d/.test(value),
    ruleMessage: "Нет цифр!",
  },
  {
    rule: (value: string) => /[!@#$%^&*]/.test(value),
    ruleMessage: "Нет символов !@#$%^&*",
  },
];

function validateForm(): boolean {
  const loginValid = validateLogin.every((rule) =>
    rule.rule(authDataRef.value.login),
  );
  const passwordValid = validatePassword.every((rule) =>
    rule.rule(authDataRef.value.password),
  );
  return loginValid && passwordValid;
}

async function login() {
  if (validateForm()) {
    const user = useGetUser();
    if (!user) {
      alert("Возможно, вы не зарегистрированы");
    } else {
      if (
        user.login == authDataRef.value.login &&
        user.password == authDataRef.value.password
      ) {
        console.log("Login successful");
        useUserSet(user, true);
        const response = await useFetch("/api/sessions/getGuestSession");
        const result: GuestSessionToken = JSON.parse(
          response.data.value as string,
        );
        useSetToken(result);
        navigateTo("/");
      } else {
        alert("Неверный логин или пароль");
      }
    }
  } else {
    console.log("Validation failed");
  }
}

const authDataRef: Ref<AuthDataType> = ref({
  login: "",
  password: "",
});
</script>

<style lang="scss">
.link {
  color: var(--app-blue-2);
  text-decoration: none;
}
.main-container {
  width: 100vw;
  height: 100vh;
  padding: 0 5%;
  display: flex;
  .registration-wrapper {
    margin: auto;
    .registration-button {
      margin: 24px 0px;
    }
    .text-block {
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
      margin: 0 32px;
      display: flex;
      flex-direction: column;
      .registration-form {
        &_input-text {
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 32px;
          }
        }
      }
    }
  }
}
</style>
