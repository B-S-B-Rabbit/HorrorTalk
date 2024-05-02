<template>
  <div class="page-container">
    <q-input
      v-model="articleTitle"
      class="title-input"
      placeholder="Введите название статьи"
      color="primary"
      dark
    />
    <div class="short-review-block">
      <div class="main-label">Рецензия:</div>
      <div class="main-text">
        <InputsHTTextArea v-model="articleReviewText"></InputsHTTextArea>
      </div>
    </div>
    <div>
      <div class="main-label">Содержание:</div>
      <div v-for="item in filmss" :key="item.title">
        <div style="position: relative">
          <FilmsFilmCard
            :film-item="item"
            large
            @click="router.push({ path: `/films/${123}` })"
          >
          </FilmsFilmCard>
          <q-icon
            class="replace-film-label"
            :name="mdiPencil"
            @click.stop="selectFilm"
          ></q-icon>
        </div>
        <div class="review-text">
          <InputsHTTextArea v-model="reviewText" clearable></InputsHTTextArea>
        </div>
      </div>
      <HTButton
        themed="var(--app-dark-1)"
        :icon="mdiPlus"
        label="Добавить фильм"
        @click="selectFilm"
      ></HTButton>
    </div>
    <HTDialog
      v-model="openDialog"
      @cancel-action="cleanSelected"
      @accept-action="addReviewBlock"
    >
      <template #main>
        <InputsHTSelect
          v-model="selectedFilm"
          class="films-selector"
          :options="films"
        ></InputsHTSelect>
      </template>
    </HTDialog>
    <HTButton class="publish-button" label="Опубликовать"></HTButton>
  </div>
</template>

<script setup lang="ts">
import { mdiPlus, mdiPencil } from "@quasar/extras/mdi-v7";
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
  .short-review-block {
    margin-top: 16px;
  }
}
.title-input {
  color: var(--app-red-1);
  font-size: 22px;
}
.main-label {
  color: var(--app-black-5);
  margin: 8px 0px;
}
.review-text {
  margin-bottom: 16px;
}
.publish-button {
  margin: 16px 0px;
  margin-top: 64px;
}
.replace-film-label {
  position: absolute;
  right: -4%;
  top: -8%;
  width: 30px;
  height: 30px;
  z-index: 1000;
}
</style>
<style></style>
