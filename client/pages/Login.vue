<template>
  <div class="page-container">
    <div class="registration-wrapper">
      <div class="registration-logo">
        <img src="public/icons/logo.svg" alt="Logo" />
      </div>
      <q-form class="registration-form">
        <!--            margin-text-input что это-->
        <HTInput
          v-model="authData.login"
          margin-text-input
          class="registration-form__input"
          hint="Больше 2 символов"
          :rules="validateLogin"
          label="Логин"
        >
        </HTInput>
        <HTInput
          v-model="authData.password"
          type="password"
          class="registration-form__input"
          label="Пароль"
          hint="Латинница, цифры, спец.символы"
          :rules="validatePassword"
        >
        </HTInput>
      </q-form>
    </div>
    <div class="register-buttons-container">
      <div class="register-buttons-container__text-block">
        <a class="link">Забыли пароль?</a>
      </div>
      <HTButton
        class="register-buttons-container__button"
        label="Войти"
        @click="login"
      />
      <div class="register-buttons-container__text-block">
        Еще нет аккаунта?
        <nuxt-link to="/registration" class="link"
          >Зарегистрироваться</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

interface AuthData {
  login: string;
  password: string;
}
interface ValidationRule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}

const authData = ref<AuthData>({
  login: "",
  password: "",
});
const validateLogin: ValidationRule[] = [
  {
    rule: (value: string) => value.length >= 2,
    ruleMessage: "Меньше 2 символов!",
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
//продумать реализацию валидации на стороне формы
function isRulesPassed(): boolean {
  const loginValid = validateLogin.every((rule) =>
    rule.rule(authData.value.login),
  );
  const passwordValid = validatePassword.every((rule) =>
    rule.rule(authData.value.password),
  );
  return loginValid && passwordValid;
}
//реализовать через апи сервера
async function login() {
  if (isRulesPassed()) {
    const user = useGetUser();
    if (!user) {
      alert("Возможно, вы не зарегистрированы"); //реализовать через компонент HTAlert
    } else {
      if (
        user.login == authData.value.login &&
        user.password == authData.value.password
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
</script>

<style lang="scss">
.link {
  color: var(--app-blue-2);
  text-decoration: none;
}
.page-container {
  width: 100vw;
  height: 100vh;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .registration-wrapper {
    margin: 0 32px;
    display: flex;
    flex-direction: column;
    .registration-logo {
      height: auto;
      width: 100%;
      text-align: center;
      margin: 16px 0;
      img {
        width: 253px;
        height: 259px;
      }
    }
    .registration-form {
      &__input {
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 32px;
        }
      }
    }
  }
  .register-buttons-container {
    width: 100%;
    &__button {
      margin: 24px 0px;
    }
    &__text-block {
      color: var(--app-black-4);
      text-align: center;
      &:last-child {
        margin-bottom: 32px;
      }
    }
  }
}
</style>
