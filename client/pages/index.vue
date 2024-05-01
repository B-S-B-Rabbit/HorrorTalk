<template>
  <div class="page-container">
    <div class="suggest-register">
      <div class="block-title">
        Создай аккаунт, чтобы
        <q-icon size="md" class="close-icon" :name="mdiClose"></q-icon>
      </div>
      <div class="block-content">
        <ul class="block-list">
          <li class="block-list-item">Получать рекомендации</li>
          <li class="block-list-item">Общаться с людьми по интересам</li>
          <li class="block-list-item">Сохранять, оценивать и комментировать</li>
          <li class="block-list-item">Создавать свои статьи-подборки</li>
          <li class="block-list-item">И многое другое</li>
        </ul>
      </div>
      <div class="suggest-register-buttons">
        <HTButton label="Создать аккаунт" themed="var(--app-red-1)"></HTButton>
        <HTButton label="Вход" themed="var(--app-dark-1)"></HTButton>
      </div>
    </div>
    <div class="big-carousel-list">
      Популярное
      <div>
        <Carousel :items-to-show="1" :wrap-around="true" :transition="500">
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">
              <div class="carousel-image">
                <img src="/film_card_mock-image.webp" alt="" />
              </div>
              <div>Такой-то фильм</div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <div class="films-recomendation normal-carousel-list">
      Рекомендуем вам
      <div class="no-see">
        <img src="/icons/lock.svg" />
        <div>Создайте акканут чтобы видеть рекомендации</div>
        <q-icon size="lg" :name="mdiChevronRight"></q-icon>
      </div>
    </div>
    <div class="users-recomendation circle-carousel-list">
      Предлагаем пообщаться
      <div class="no-see">
        <img src="/icons/lock.svg" />
        <div>Создайте акканут чтобы видеть рекомендации</div>
        <q-icon size="lg" :name="mdiChevronRight"></q-icon>
      </div>
    </div>
    <div class="articles-recomendation circle-carousel-list">
      <ArticleCard :film-item="films[0]"> </ArticleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiClose, mdiChevronRight } from "@quasar/extras/mdi-v6";
import ArticleCard from "~/components/articles/ArticleCard.vue";
const films = ref([]);
films.value = [
  {
    imageSrc: "/film_card_mock-image.webp",
    score: 7.5,
    title: "Синистер",
    author: "Стенли Кубрик",
    year: "2024",
    country: "Россия",
  },
];
</script>

<style lang="scss">
.page-container {
  padding: 24px;
  width: 100vw;
  height: 100vh;
  color: var(--app-white-1);
  .suggest-register {
    background: var(--app-dark-1);
    color: var(--app-white-1);
    border: 1px var(--app-black-4) solid;
    border-radius: 16px;
    .block-title {
      font-size: 18px;
      font-weight: 600;
      margin-top: 8px;
      display: flex;
      justify-content: center;
      position: relative;
      .close-icon {
        position: absolute;
        right: -16px;
        top: -70%;
      }
    }
    .block-content {
      .block-list {
        list-style: none;
        padding-left: 0;
        padding: 0px 16px;
        &-item {
          font-size: 16px;
          margin-bottom: 8px;
          &::before {
            content: "💀";
            margin-right: 4px;
          }
        }
      }
    }
    &-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
  }
  .films-recomendation {
  }
  .no-see {
    height: 96px;
    background: linear-gradient(90deg, var(--app-black-3) 85%, #120c0a 100%);
    display: flex;
    align-items: center;
  }
}
.carousel__slide {
  margin-top: 8px;
  padding: 5px;
}
.carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .carousel-image {
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}
// .carousel__slide {
//   opacity: 0.9;
//   transform: rotateY(-20deg) scale(0.9);
// }

// .carousel__slide--active ~ .carousel__slide {
//   transform: rotateY(20deg) scale(0.9);
// }

// .carousel__slide--prev {
//   opacity: 1;
//   transform: rotateY(-10deg) scale(0.95);
//   color: white;
// }

// .carousel__slide--next {
//   opacity: 1;
//   transform: rotateY(10deg) scale(0.95);
// }

// .carousel__slide--active {
//   opacity: 1;
//   transform: rotateY(0) scale(1.1);
// }
</style>
<style>
.carousel__prev {
  position: absolute;
  color: white;
  left: -32px;
}
.carousel__next {
  position: absolute;
  right: -32px;
}
</style>
