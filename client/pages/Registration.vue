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
            v-for="(item, index) in formFields.slice(0, 3)"
            :key="index"
            v-model="item.value"
            margin-text-input
            class="registration-form_input-text"
            :hint="item.hint"
            :rules="item.rules"
            :label="item.label"
          >
          </HTInputMain>
          <div class="date-container">
            <div class="date-label">Дата рождения</div>
            <HTInputDate
              v-model="dateOfBirth"
              class="registration-form_input-date"
              min-date="1920/01"
              max-date="2024/01"
              default-date="2017/01"
              @valid-date="setDateValidity"
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
          <HTInputMain
            v-model="formFields[3].value"
            type="password"
            class="registration-form_input-text"
            :label="formFields[3].label"
            :hint="formFields[3].hint"
            :rules="formFields[3].rules"
          >
          </HTInputMain>
        </q-form>
      </div>
      <div class="register-block">
        <div class="text-block">
          Регистрируясь, вы соглашаетесь с
          <a class="link">Правилами использования</a> и
          <a class="link">Политикой конфиденциальности</a>
        </div>
        <HTButton
          class="registration-button"
          label="Зарегистрироваться"
          @click="register"
        />
        <div class="text-block">
          Уже есть аккаунт?
          <nuxt-link to="/login" class="link">Войти</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const dateOfBirth: Ref<string> = ref("");
const selectedGender: Ref<string> = ref("");

interface ValidationRule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}

interface Option {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  key: string;
  value: string;
  hint?: string;
  rules?: ValidationRule[];
}

const validateLogin: ValidationRule[] = [
  {
    rule: (value: string) => value.length >= 5,
    ruleMessage: "Меньше 5 символов!",
  },
];

const validateEmail: ValidationRule[] = [
  {
    rule: (value: string) => /^\S+@\S+\.\S+$/.test(value),
    ruleMessage: "Неверный формат почты!",
  },
];

const validateName: ValidationRule[] = [
  {
    rule: (value: string) => value.length >= 2,
    ruleMessage: "Имя слишком короткое!",
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

const formFields: Ref<FormField[]> = ref([
  {
    label: "Логин",
    key: "login",
    value: "",
    rules: validateLogin,
    hint: "Больше 5 символов",
  },
  {
    label: "Почта",
    key: "email",
    value: "",
    rules: validateEmail,
    hint: "example@mail.com",
  },
  {
    label: "Имя",
    key: "name",
    value: "",
    rules: validateName,
    hint: "Ваше имя",
  },
  {
    label: "Пароль",
    key: "password",
    value: "",
    rules: validatePassword,
    hint: "Латинница, цифры, спец.символы",
  },
]);

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
const isDateValid = ref(false);
function setDateValidity(status: boolean) {
  isDateValid.value = status;
}
function validateField(value: string, rules?: ValidationRule[]): boolean {
  if (!rules) return true;
  return rules.every((rule) => rule.rule(value));
}

function validateForm(): boolean {
  return (
    formFields.value.every((field) =>
      validateField(field.value, field.rules),
    ) &&
    isDateValid.value &&
    !!selectedGender.value
  );
}

async function register() {
  if (validateForm()) {
    const response = await useFetch("/api/sessions/getGuestSession");
    const result: GuestSessionToken = JSON.parse(response.data.value as string);
    useSetToken(result);
    const user: User = {
      login: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      name: "",
      email: "",
    };
    formFields.value.forEach((item) => {
      user[item.key as keyof User] = item.value;
    });
    user.dateOfBirth = dateOfBirth.value;
    user.gender = selectedGender.value;
    useSetUser(user);
    useUserSet(user, true);
    navigateTo("/");
  } else {
    console.log("Validation failed");
  }
}
</script>

<style scoped lang="scss">
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
