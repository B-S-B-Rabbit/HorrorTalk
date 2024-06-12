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
        <HTButton
          label="Создать аккаунт"
          themed="var(--app-red-1)"
          @click="navigateTo('/registration')"
        ></HTButton>
        <HTButton
          label="Вход"
          themed="var(--app-dark-1)"
          @click="navigateTo('/login')"
        ></HTButton>
      </div>
    </div>
    <div v-if="loading" class="big-carousel-list">
      <div style="position: relative; top: 12px; left: 5px" class="list-label">
        Популярно сегодня
      </div>
      <div>
        <Carousel :items-to-show="1" :wrap-around="true" :transition="500">
          <Slide v-for="(film, ind) in trendingFilms" :key="ind">
            <div class="carousel__item" @click="navigateTo(`films/${film.id}`)">
              <div class="carousel-image">
                <img :src="film.proxiedPhoto" alt="" />
              </div>
              <div>{{ film.title }}</div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <div class="films-recomendation normal-carousel-list">
      <div class="list-label">Рекомендуем вам</div>
      <div v-if="false" class="no-see">
        <img src="/icons/lock.svg" />
        <div>Создайте акканут чтобы видеть рекомендации</div>
        <q-icon size="xl" :name="mdiChevronRight"></q-icon>
      </div>
      <div v-else class="horizontal-list-wrapper">
        <div class="horizontal-list">
          <div v-for="film in 10" :key="film" class="list-item">
            <img class="film-image" src="/film_card_mock-image.jpg" />
            <div style="text-align: center">Проклятие Аннабель</div>
          </div>
        </div>
        <q-icon
          class="chevron-right"
          size="xl"
          :name="mdiChevronRight"
        ></q-icon>
      </div>
    </div>
    <div class="users-recomendation circle-carousel-list">
      <div class="list-label">Предлагаем пообщаться</div>
      <div v-if="false" class="no-see">
        <img src="/icons/lock.svg" />
        <div>Создайте акканут чтобы видеть рекомендации</div>
        <q-icon size="xl" :name="mdiChevronRight"></q-icon>
      </div>
      <div v-else class="horizontal-list-wrapper">
        <div class="horizontal-list">
          <div v-for="user in 10" :key="user" class="list-item">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <div style="text-align: center">Никнейм</div>
          </div>
        </div>
        <q-icon
          class="chevron-right"
          size="xl"
          :name="mdiChevronRight"
        ></q-icon>
      </div>
    </div>
    <div class="articles-recomendation circle-carousel-list">
      <div style="position: relative; top: 28px; left: 5px">
        <div class="list-label">Популярные статьи</div>
      </div>
      <Carousel :items-to-show="1" :wrap-around="true" :transition="500">
        <Slide v-for="slide in 10" :key="slide">
          <ArticleCard :film-item="films[0]"> </ArticleCard>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiClose, mdiChevronRight } from "@quasar/extras/mdi-v6";
import ArticleCard from "~/components/articles/ArticleCard.vue";
const films = ref([]);
const trendingFilms = ref([]);
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
const loading = ref(false);
function getProxiedPhotoUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(`/api/getImage/${encodeURIComponent(url)}`)
      .then((response) => response.text())
      .then((imageDataBase64) => {
        const proxiedUrl = "data:image/jpeg;base64," + imageDataBase64;
        resolve(proxiedUrl);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке изображения:", error);
        reject(error);
      });
  });
}
async function getTrendingFilms() {
  trendingFilms.value = await useFetch("/api/getTrendingMovies");
  if (trendingFilms.value) {
    trendingFilms.value = JSON.parse(trendingFilms.value.data);
    trendingFilms.value = trendingFilms.value.results.filter((item) =>
      item.genre_ids.includes(27),
    );
    console.log(trendingFilms.value);
    trendingFilms.value.forEach((item, ind) => {
      setTimeout(
        () =>
          getProxiedPhotoUrl(item.poster_path)
            .then((proxiedUrl) => {
              item.proxiedPhoto = proxiedUrl;
            })
            .catch((error) => {
              console.error("Ошибка:", error);
            }),
        100 * ind,
      );
    });
    console.log(trendingFilms.value);
    loading.value = true;
  }
}
onMounted(() => {
  setTimeout(getTrendingFilms, 0);
});
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

  .horizontal-list-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 100%;
    .horizontal-list {
      display: flex;
      align-items: center;
      overflow: hidden;
      gap: 8px;
      .film-image {
        width: 120px;
        object-fit: contain;
      }
      .list-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .chevron-right {
      position: absolute;
      right: -8px;
      height: 100%;
      box-shadow: 8px 0px 8px rgba(0, 0, 0, 0.5);
      background: linear-gradient(
        90deg,
        rgba(18, 12, 10, 0) 0%,
        #120c0a 50%,
        #120c0a 100%
      );
    }
  }
  .no-see {
    height: 96px;
    background: linear-gradient(90deg, var(--app-black-3) 85%, #120c0a 100%);
    display: flex;
    align-items: center;
  }
}
.list-label {
  font-size: 16px;
  margin: 8px 0px;
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
