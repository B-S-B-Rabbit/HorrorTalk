<template>
  <div class="page-container">
    <div class="account-image-container">
      <img class="account-image" src="/film_card_mock-image.jpg" />
      <div class="image-controllers">
        <HTButton
          class="control-button"
          :icon="mdiUpload"
          icon-button
        ></HTButton>
        <HTButton
          class="control-button"
          :icon="mdiDeleteOutline"
          icon-button
        ></HTButton>
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
          placeholder="Введите название статьи"
        >
        </HTInputMain>
        <InputsHTInputDate
          v-else-if="info.type == 'date'"
          v-model="info.value"
          icon-color="var(--app-black-5)"
          themed
          min-date="1920/01"
          max-date="2024/01"
          default-date="2017/01"
        >
        </InputsHTInputDate>
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
      <InputsHTSwitch v-model="reccommend" size="lg"></InputsHTSwitch>
    </div>
    <div class="footer-buttons">
      <HTButton label="Сохранить изменения"></HTButton>
      <HTButton label="Отмена" type="secondary"></HTButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import { mdiUpload, mdiDeleteOutline } from "@quasar/extras/mdi-v6";
interface accointDetal {
  title: string;
  value: string;
  type?: string;
}
interface Option {
  label: string;
  value: string;
}
const accountDetails = ref<accointDetal[]>([
  {
    title: "Логин",
    value: "maxvell300",
  },
  {
    title: "Пароль",
    type: "password",
    value: "********",
  },
  {
    title: "Почта",
    value: "mymail@mail.ru",
  },
  {
    title: "Пол",
    type: "radio",
    value: "Женский",
  },
  {
    title: "Дата рождения",
    type: "date",
    value: "12.02.2020",
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
const reccommend = ref(false);
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
