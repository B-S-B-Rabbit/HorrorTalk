<template>
  <div class="main-container">
    <div class="main-container_logo">
      <img
        class="main-container_logo-img"
        src="public/icons/logo.svg"
        alt="Logo"
      />
    </div>
    <div class="registration-container">
      <q-form class="registration-form">
        <CInputMain
          v-for="(item, index) in formLabels.slice(0, 3)"
          :key="index"
          v-model="item.value"
          class="registration-form_input-text"
          :hint="item.hint"
          :rules="item.validate"
          :label="item.label"
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
        <CInputMain
          v-model="formLabels[3].value"
          type="password"
          class="registration-form_input-text"
          :label="formLabels[3].label"
          :hint="formLabels[3].hint"
          :rules="formLabels[3].validate"
        >
        </CInputMain>
      </q-form>
    </div>
    <div class="register-block">
      <div class="confirm-reg-block">
        Регистрируясь, вы соглашаетесь с
        <a class="link">Правилами использования</a> и
        <a class="link">Политикой конфиденциальности</a>
      </div>
      <HTButton class="registration-button" label="Зарегистрироваться" />
      <div class="confirm-reg-block">
        Уже есть аккаунт? <span class="link">Войти</span>
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
import HTButton from "~/components/HTButton.vue";
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
interface FormLabel {
  label: string;
  value: string;
}

const validateLogin: ValidationRule[] = [
  {
    rule: (value: string) => value.length > 5,
    ruleMessage: "Меньше 5 символов!",
  },
];
const formLabels: Ref<FormLabel[]> = ref([
  {
    label: "Логин",
    value: "",
    validate: validateLogin,
    hint: "Больше 5 символов",
  },
  {
    label: "Почта",
    value: "",
  },
  {
    label: "Имя",
    value: "",
  },
  {
    label: "Пароль",
    value: "",
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
const selectedGender: Ref<string> = ref("");
</script>
<style lang="scss">
html,
body,
#__nuxt {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #000000;
}
.link {
  color: #4874a9;
}
.main-container {
  width: 100%;
  height: 100%;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .registration-button {
    margin: 24px 0px;
  }
  .confirm-reg-block {
    color: gray;
    text-align: center;
  }
  &_logo {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    padding-top: 32px;
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
</style>
