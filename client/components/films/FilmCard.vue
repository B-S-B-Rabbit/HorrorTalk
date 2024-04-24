<template>
  <div class="film-card-container">
    <div
      class="film-card"
      :class="[large ? 'large' : '', isOverflowed ? 'overflowed' : '']"
    >
      <div class="film-card-image">
        <img :src="filmItem.imageSrc" alt="" />
      </div>
      <div class="film-score">{{ filmItem.score }}</div>
      <div class="film-card-content">
        <div class="film-card-title">{{ filmItem.title }}</div>
        <div class="film-card-info">
          <div class="film-text-info">{{ filmItem.author }}</div>
          <div class="film-text-info">{{ filmItem.year }}</div>
          <div class="film-text-info">{{ filmItem.country }}</div>
        </div>
        <div v-if="large" ref="descriptionRef" class="film-card-description">
          Телефонный звонок раздаётся после просмотра некой загадочной
          видеокассеты. Жертве даётся ровно семь дней, до смерти, поэтому
          помянем епта
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  filmItem: {
    type: Object,
    default: () => {},
  },
  large: {
    type: Boolean,
    default: false,
  },
});
const isOverflowed = ref(false);
const descriptionRef = ref(null);
watch(
  () => descriptionRef.value,
  () => {
    const descriptionElement = descriptionRef.value;
    if (descriptionElement) {
      const style = window.getComputedStyle(descriptionElement);
      const lineHeight = parseFloat(style.lineHeight); // Получаем десятичное значение lineHeight
      const maxHeight = parseFloat(style.height + 8); // Получаем десятичное значение maxHeight
      console.log(lineHeight, maxHeight);
      const lineCount = Math.floor(maxHeight / lineHeight);
      descriptionElement.style.setProperty(
        "-webkit-line-clamp",
        lineCount.toString(),
        "important", // Добавляем important, чтобы переопределить любые существующие стили
      );
    }
  },
);
</script>

<style lang="scss" scoped>
.film-card-container {
  margin-bottom: 16px;
  .film-card {
    width: 100%;
    height: 90px;
    overflow-y: auto;
    display: flex;
    position: relative;
    align-items: center;
    background-color: var(--app-dark-1);
    border-radius: 16px;
    border: 1px var(--app-black-3) solid;
    .film-score {
      background-color: var(--app-red-1);
      z-index: 100;
      color: var(--app-white-1);
      width: 32px;
      height: 24px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 8%;
      right: 4%;
    }
    &-image {
      margin-left: 16px;
      position: relative;
      height: 80%;
      img {
        height: 100%;
      }
    }
    &-content {
      color: var(--app-white-1);
      margin-left: 16px;
      .film-card-title {
        font-size: 16px;
      }
      .film-card-info {
        display: flex;
        align-items: center;
        gap: 4px;
        .film-text-info {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          max-height: 42px;
          &::after {
            margin-left: 4px;
            content: "•";
          }
          &:last-child::after {
            content: "";
          }
        }
      }
    }
  }
  .large {
    height: 150px;
    overflow: hidden;
    .film-card-image {
      display: flex;
      order: 2;
      margin: 0px 16px;
    }
    .film-card-content {
      margin-bottom: 16px;
      height: 100%;
      .film-card-title {
        margin-top: 16px;
      }
    }
    .film-card-description {
      margin-top: 8px;
      overflow: hidden;
      display: -webkit-box; /* Включаем флексбоксы */
      -webkit-box-orient: vertical; /* Вертикальная ориентация */
      height: 20vw;
      line-height: 21px;
      max-height: 90px;
    }
  }
}
</style>
