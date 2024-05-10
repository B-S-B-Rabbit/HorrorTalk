<template>
  <div class="page-container">
    <div class="page-title">Название статьи</div>
    <Carousel :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">Звонок, 2002</div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
    <div class="short-review-block">
      <div class="main-label">Рецензия:</div>
      <div class="main-text">
        Здесь будет короткая рецензия на статью от автора
      </div>
      <div class="main-label">Автор статьи: максимка123</div>
    </div>
    <div>
      <div v-for="item in filmss" :key="item.title" class="review-item">
        <div style="position: relative">
          <FilmsFilmCard
            :film-item="item"
            large
            @click="router.push({ path: `/films/${123}` })"
          >
          </FilmsFilmCard>
        </div>
        <div class="review-text">
          Никто не читает длинные тексты без картинок.Сегодня все смотрят Тикток
          и Ютуб.Все русские — пьяницы.Все китайцы — расисты.В Америке одни геи
          и трансгендеры. Все фразы выше — обобщения или генерализации. Это
          приём, когда из нескольких похожих частных случаев формируется
          утверждение, некое правило. В большинстве случаев оно формируется на
          базе личного опыта, частного случая, а не большого массива данных.
        </div>
      </div>
    </div>
    <div class="score-block">
      Поставьте оценку статье:
      <div class="scores-line">
        <div
          v-for="score in 10"
          :key="score"
          class="score-item"
          @click="setArticleScore(score)"
        >
          <q-icon
            :class="{ 'pulse-animation': score === articleScore }"
            :color="score <= articleScore ? 'primary' : ''"
            size="md"
            :name="mdiHeart"
          ></q-icon>
          <div style="font-size: 16px">{{ score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiPlus, mdiPencil, mdiHeart } from "@quasar/extras/mdi-v7";
const articleTitle = ref("");
const articleReviewText = ref("");
const reviewBlocks = ref([]);
const router = useRouter();
const reviewText = ref("");
const selectedFilm = ref("");
const filmss = ref([
  {
    imageSrc: "/film_card_mock-image.webp",
    score: 7.5,
    title: "Синистер",
    author: "Стенли Кубрик",
    year: "2024",
    country: "Россия",
  },
  {
    imageSrc: "/film_card_mock-image.webp",
    score: 7.5,
    title: "Синистер",
    author: "Стенли Кубрик",
    year: "2024",
    country: "Россия",
  },
]);

const films = ref([
  "фильм1",
  "фильм2",
  "фильм3",
  "фиaaaaaaaaaaaaaльм4",
  "фильм5",
  "фильм6",
  "фильм7",
  "фильм8",
]);
const openDialog = ref(false);
const articleScore = ref(0);
function cleanSelected() {
  selectedFilm.value = "";
}
function addReviewBlock() {
  if (selectedFilm.value) {
    filmss.value.push({
      imageSrc: "/film_card_mock-image.webp",
      score: 7.5,
      title: "Синистер",
      author: "Стенли Кубрик",
      year: "2024",
      country: "Россия",
    });
    selectedFilm.value = "";
  }
}
function setArticleScore(score: number) {
  // Если ставим оценку на уже выбранную
  if (score === articleScore.value) return;

  // Устанавливаем новую оценку
  articleScore.value = score;
}

function selectFilm() {
  openDialog.value = true;
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 24px;
  width: 100vw;
  height: 100vh;
  color: var(--app-white-1);
  .page-title {
    font-size: 22px;
    border-bottom: 1px var(--app-black-4) solid;
    margin-bottom: 12px;
  }
  .short-review-block {
    margin-top: 16px;
  }
}
.main-label {
  color: var(--app-black-5);
  margin: 8px 0px;
}
.review-text {
  margin-bottom: 16px;
}
.score-block {
  .scores-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .score-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
.pulse-animation {
  animation: pulse 0.5s ease-in-out;
}

.score-item .q-icon {
  transition: transform 0.5s ease-in-out;
}

.publish-button {
  margin: 16px 0px;
  margin-top: 64px;
}
.review-item {
  border-bottom: 1px var(--app-black-4) solid;
  margin-bottom: 16px;
}
.replace-film-label {
  position: absolute;
  right: -4%;
  top: -8%;
  width: 30px;
  height: 30px;
  z-index: 1000;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
<style scoped lang="scss">
.carousel__slide {
  height: 40px;
  border: 1px var(--app-black-3) solid;
  border-radius: 10px;
  margin-right: 8px;
}
</style>
<style>
.carousel__icon {
  fill: var(--app-white-1) !important;
  width: 30px;
  height: 30px;
}
.carousel__prev {
  position: absolute;
  left: -32px;
}
.carousel__next {
  position: absolute;
  right: -32px;
}
</style>
