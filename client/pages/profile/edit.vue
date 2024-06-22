<template>
  <div class="page-container">
    <div class="account-image-container">
      <img class="account-image" src="/film_card_mock-image.jpg" />
      <div class="image-controllers">
        <HTButton class="control-button" :icon="mdiUpload" icon-button />
        <HTButton class="control-button" :icon="mdiDeleteOutline" icon-button />
      </div>
    </div>
    <div class="user-information-container">
      <div v-for="(info, ind) in accountDetails" :key="ind" class="user-info">
        <div>{{ info.title }}</div>
        <HTInputMain
          v-if="info.type != 'date' && info.type != 'radio'"
          v-model="info.value"
          icon-color="var(--app-black-5)"
          :type="info.type"
          style="width: 224px; max-width: 224px"
          input-class="input-text"
          :text-validity-check="false"
          margin-text-input
          themed
          prepend
          :readonly="['gender', 'dateOfBirth', 'photo'].includes(info.key)"
          :placeholder="`Введите ${info.title}`"
          :rules="info.rules"
        />
        <InputsHTInputDate
          v-else-if="info.type == 'date'"
          v-model="info.value"
          icon-color="var(--app-black-5)"
          themed
          min-date="1920/01"
          max-date="2024/01"
          default-date="2017/01"
          @valid-date="setDateValidity"
        />
        <InputsHTRadioButtons
          v-else
          v-model="info.value"
          class="radio-buttons"
          inline
          left-label
          :options="options"
        />
      </div>
    </div>
    <div class="switch-container">
      <div class="switch-label">Включить рекомендацию пользователей</div>
      <InputsHTSwitch v-model="reccommend" size="lg" />
    </div>
    <div class="footer-buttons">
      <HTButton label="Сохранить изменения" @click="saveChanges" />
      <HTButton label="Отмена" type="secondary" @click="cancelChanges" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import HTButton from "~/components/HTButton.vue";
import { mdiUpload, mdiDeleteOutline } from "@quasar/extras/mdi-v6";

interface accointDetal {
  title: string;
  key: string;
  value: string;
  type?: string;
  rules?: ValidationRule[];
}
interface Option {
  label: string;
  value: string;
}
const user = useState<User>("user");
const accountDetails = ref<accointDetal[]>([]);
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
const reccommend = ref(false);

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

function validateField(value: string, rules?: ValidationRule[]): boolean {
  if (!rules) return true;
  return rules.every((rule) => rule.rule(value));
}

function validateForm(): boolean {
  return (
    accountDetails.value.every((field) =>
      validateField(field.value, field.rules),
    ) && isDateValid.value
  );
}

function saveChanges() {
  if (!validateForm()) {
    console.log("Validation failed");
    return;
  }

  const updatedUser: User = {
    name: "",
    password: "",
    login: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  };

  accountDetails.value.forEach((item) => {
    if (item.key != "photo") {
      updatedUser[item.key as keyof User] = item.value;
    }
  });
  useUserSet(updatedUser, true);
  useSetUser(updatedUser);
  navigateTo("/profile");
}
const isDateValid = ref(false);
function setDateValidity(status: boolean) {
  isDateValid.value = status;
}
function cancelChanges() {
  navigateTo("/profile");
}

onMounted(() => {
  accountDetails.value = [
    {
      title: "Имя",
      key: "name",
      value: user.value?.name || "",
      rules: validateName,
    },
    {
      title: "Логин",
      key: "login",
      value: user.value?.login || "",
      rules: validateLogin,
    },
    {
      title: "Почта",
      key: "email",
      value: user.value?.email || "",
      rules: validateEmail,
    },
    {
      title: "Пароль",
      key: "password",
      value: user.value?.password || "",
      rules: validatePassword,
      type: "password",
    },
    {
      title: "Пол",
      key: "gender",
      value: user.value?.gender,
      type: "radio",
    },
    {
      title: "Дата рождения",
      key: "dateOfBirth",
      value: user.value?.dateOfBirth || "",
      type: "date",
    },
    {
      title: "Фото",
      key: "photo",
      value: "Отсутствует",
    },
  ];
});
</script>

<style scoped lang="scss">
.page-container {
  padding: 24px;
  width: 100vw;
  height: 100vh;
  color: var(--app-white-1);
  .account-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .account-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
    .image-controllers {
      display: flex;
      margin-top: 8px;
      gap: 16px;
      .control-button {
        width: 36px;
        height: 36px;
      }
    }
    margin-bottom: 24px;
  }
  .user-information-container {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    gap: 16px;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-text {
        max-width: 150px;
      }
    }
  }
  .switch-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .footer-buttons {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}
</style>
