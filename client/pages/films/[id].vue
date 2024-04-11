<template>
  <div class="film-container">
    <div class="film-poster">
      <img src="/film_card_mock-image.webp" alt="" />
    </div>
    <div class="film-info">
      <div class="film-info-title">Название фильма</div>
      <div style="display: flex">
        <div class="film-info-genre">Триллер</div>
        <div class="film-info-year">2025</div>
      </div>
    </div>
    <div class="film-score">
      <div class="film-score-value">7</div>
      <div class="film-score-stars">
        <img
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :key="i"
          :style="`filter: ${7 >= i ? 'var(--app-yellow-star-filter);' : 'var(--app-default-star-filter)'}`"
          src="/icons/star_score.svg"
          alt=""
        />
      </div>
    </div>
    <div class="first-buttons-container">
      <HTButton label="Оценить" :icon="mdiThumbsUpDown"> </HTButton>
      <HTButton label="Сохранить" :icon="mdiBookmark"></HTButton>
    </div>
    <div class="film-trailer">
      <div class="film-trailer-head">Трейлер</div>
      <div class="film-trailer-video"></div>
    </div>
    <div class="detail-info"></div>
    <div class="alike-films"></div>
    <div class="comments-block"></div>
  </div>
</template>

<script lang="ts" setup>
import { mdiThumbsUpDown, mdiBookmark } from "@quasar/extras/mdi-v7";
</script>

<style lang="scss" scoped>
.film-container {
  padding: 0px 16px 0px 16px;
  color: var(--app-white-1);
  .film-poster {
    img {
      width: 100%;
      max-height: 50vh;
      object-fit: contain;
    }
  }
  .film-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    &-title {
      font-size: 18px;
    }
    &-genre::after {
      content: "•";
      margin: 4px;
    }
  }
  .film-score {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    &-value {
      font-size: 22px;
      font-weight: 700;
      color: var(--app-red-1);
      margin-right: 8px;
      padding-top: 3px;
    }
    &-stars {
      display: flex;
      gap: 4px;
      padding-bottom: 2px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .first-buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  }
  .film-trailer {
    padding: 0px 16px;
    margin-top: 16px;
    &-head {
      font-size: 16px;
      margin-bottom: 8px;
    }
    &-video {
      width: 100%;
      height: 120px;
      background: var(--app-black-5);
    }
  }
}
</style>
