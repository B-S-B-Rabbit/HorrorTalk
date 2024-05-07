<template>
  <div class="page-container">
    <div class="account-container">
      <img class="account-image" src="/film_card_mock-image.jpg" />
      <div class="account-short">
        <div class="account-initials">ИМЯ ФАМИЛИЯ</div>
        <div class="account-login">@mycoolnick</div>
      </div>
      <div class="account-detail">
        <div class="account-detail--title">
          <div class="title-text">Подробная информация</div>
          <div class="account-details-edit">
            <q-icon class="edit-icon" :name="mdiPencil"></q-icon>
            <div class="edit-text">Изменить</div>
          </div>
        </div>
        <div class="account-detail--info">
          <div
            v-for="(detail, ind) in accountDetails"
            :key="ind"
            class="account-detail--info_item"
          >
            <div class="text-title">{{ detail.title }}</div>
            <div class="text-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recent-chatting list-container">
      <div class="label-title">
        <div>Недавно общались</div>
        <div class="check-more">
          <div>Еще</div>
          <img src="/icons/chevron-right.svg" />
        </div>
      </div>
      <div class="items-container">
        <q-avatar v-for="friend in 5" :key="friend" size="76px">
          <img src="/film_card_mock-image.jpg" />
        </q-avatar>
      </div>
    </div>
    <div class="list-container your-films">
      <div class="label-title">
        <div>Ваши фильмы</div>
        <div class="check-more">
          <div>Еще</div>
          <img src="/icons/chevron-right.svg" />
        </div>
      </div>
      <div class="items-container">
        <div v-for="film in 5" :key="film" class="film-container">
          <div
            class="film-score"
            :style="
              4 > 5
                ? 'background: var(--app-red-1);'
                : 'background: var(--app-yellow-1)'
            "
          >
            3
          </div>
          <img class="film-image" src="/film_card_mock-image.webp" />
        </div>
      </div>
    </div>
    <div class="list-container recent-watching">
      <div class="label-title">
        <div>Недавно смотрели</div>
        <div class="check-more">
          <div>Еще</div>
          <img src="/icons/chevron-right.svg" />
        </div>
      </div>
      <div class="items-container">
        <div v-for="film in 5" :key="film" class="film-container">
          <div
            class="film-score"
            :style="
              7 > 5
                ? 'background: var(--app-red-1);'
                : 'background: var(--app-yellow-1)'
            "
          >
            7.4
          </div>
          <img class="film-image" src="/film_card_mock-image.webp" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiPencil } from "@quasar/extras/mdi-v6";
interface accointDetal {
  title: string;
  value: string;
}
const accountDetails = ref<accointDetal[]>([
  {
    title: "Имя",
    value: "Журавль",
  },
  {
    title: "Почта",
    value: "mymail@mail.ru",
  },
  {
    title: "Пароль",
    value: "********",
  },
  {
    title: "Пол",
    value: "Женский",
  },
  {
    title: "Дата рождения",
    value: "12.02.2020",
  },
  {
    title: "Фото",
    value: "Загружено",
  },
]);
</script>

<style scoped lang="scss">
.page-container {
  padding: 24px;
  width: 100vw;
  height: 100vh;
  color: var(--app-white-1);
  .account-container {
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
    .account-short {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .account-initials {
        font-size: 18px;
        font-weight: 600;
      }
      .account-login {
        font-size: 16px;
      }
    }
    .account-detail {
      width: 100%;
      &--title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-text {
          font-size: 16px;
        }
        .account-details-edit {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--app-black-4);
          gap: 4px;
          font-size: 16px;
          .edit-icon {
            font-size: 24px;
          }
          .edit-text {
          }
        }
      }
      &--info {
        font-size: 14px;
        margin-top: 16px;
        gap: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-between;
        &_item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
          .text-title {
            min-width: 150px;
          }
        }
      }
    }
  }
  .list-container,
  .recent-chatting {
    overflow-x: hidden;
    margin-top: 24px;
    .label-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      .check-more {
        display: flex;
        color: var(--app-black-3);
        img {
        }
      }
    }
    .items-container {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 12px 0px 20px 0px;
      .film-container {
        position: relative;
        .film-score {
          position: absolute;
          top: 5%;
          left: 10%;
          width: 36px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .film-image {
          width: 120px;
        }
      }
    }
  }
}
</style>
