<template>
  <div class="article-card-container">
    <div class="article-card">
      <div class="article-card-header">
        <div class="article-card-header_score">7.3</div>
        <div class="article-card-header_title">Название статьи</div>
      </div>
      <div class="article-card-author">Автор: я автор</div>
      <div class="article-card-films-caruosel">
        <Carousel :items-to-show="2.5" :wrap-around="true">
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">Звонок, 2002</div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="article-card-description">
        Главный герой — 27-летний Илья Горюнов, семь лет отсидевший в тюрьме по
        ложному обвинению в распространении наркотиков. Когда Илья выходит на
        свободу, он понимает, что прежняя жизнь, по которой он тосковал,
        разрушена, и вернуться к ней он больше не сможет. Хотя он не собирался
        мстить человеку, котор…
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
});
</script>

<style lang="scss" scoped>
.article-card-container {
  margin: 16px 0px;
  .article-card {
    height: 200px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--app-dark-1);
    padding: 0px 24px 12px 24px;
    border-radius: 16px;
    border: 1px var(--app-black-3) solid;
    color: var(--app-white-1);
    &-header {
      margin: 10px 0px 6px 0px;
      width: 100%;
      display: flex;
      &_score {
        background-color: var(--app-red-1);
        color: var(--app-white-1);
        width: 32px;
        height: 24px;
        margin-right: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &_title {
        font-size: 16px;
      }
    }
    &-author {
      width: 100%;
    }
    &-films-caruosel {
      margin: 8px 0px 8px 0px;
      width: 100%;
    }
    &-description {
      margin-top: 8px;
      overflow: auto;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.carousel__slide {
  height: 40px;
  border: 1px var(--app-black-3) solid;
  border-radius: 10px;
  margin-right: 8px;
}
.carousel__icon {
  fill: var(--app-white-1) !important;
  width: 30px;
  height: 30px;
}
.carousel__prev {
  position: absolute;
  left: -36px;
}
.carousel__next {
  position: absolute;
  right: -36px;
}
</style>
