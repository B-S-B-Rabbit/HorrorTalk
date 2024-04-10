<template>
  <div class="main-films-container">
    <div class="input-search">
      <HTInputMain
        v-model="searchValue"
        input-class="input-text"
        :text-validity-check="false"
        margin-text-input
        prepend
        placeholder="Введите название фильма"
      >
        <template #prependIcon>
          <div>
            <q-icon>
              <q-icon size="md" :name="mdiMagnify" class="search-icon"></q-icon>
            </q-icon>
          </div>
        </template>
      </HTInputMain>
    </div>
    <FilmCard
      v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :key="i"
      :film-item="films[0]"
    ></FilmCard>
  </div>
</template>

<script setup lang="ts">
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import FilmCard from "~/components/films/FilmCard.vue";
import { mdiMagnify } from "@quasar/extras/mdi-v6";
const searchValue = ref("");
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

<style lang="scss" scoped>
.main-films-container {
  margin: 32px 16px 0px 16px;
  .search-icon {
    color: var(--app-black-1);
  }
  .input-search {
    margin-bottom: 32px;
    .input-text {
      padding-right: 8px;
    }
  }
}
</style>
