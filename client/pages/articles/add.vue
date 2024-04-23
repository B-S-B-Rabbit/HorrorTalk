<template>
  <div class="page-container">
    <q-input
      v-model="articleTitle"
      class="title-input"
      placeholder="Введите название статьи"
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
      <div>
        <FilmsFilmCard
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :key="i"
          :film-item="filmss[0]"
          large
          @click="router.push({ path: `/films/${i}` })"
        >
        </FilmsFilmCard>
      </div>
      <HTButton
        themed
        :icon="mdiPlus"
        label="Добавить фильм"
        @click="addReviewBlock"
      ></HTButton>
    </div>
    <HTDialog v-model="openDialog">
      <template #main>
        <InputsHTSelect
          v-model="selectedFilm"
          class="films-selector"
          :options="films"
        ></InputsHTSelect>
      </template>
    </HTDialog>
  </div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@quasar/extras/mdi-v7";
const articleTitle = ref("");
const articleReviewText = ref("");
const reviewBlocks = ref([]);
const router = useRouter();
const selectedFilm = ref("");
const filmss = ref({});
filmss.value = [
  {
    imageSrc: "/film_card_mock-image.webp",
    score: 7.5,
    title: "Синистер",
    author: "Стенли Кубрик",
    year: "2024",
    country: "Россия",
  },
];
const films = ref([
  "фильм1",
  "фильм2",
  "фильм3",
  "фильм4",
  "фильм5",
  "фильм6",
  "фильм7",
  "фильм8",
]);
const openDialog = ref(false);
function addReviewBlock() {
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
</style>
<style></style>
