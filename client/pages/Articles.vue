<template>
  <div class="main-articles-container">
    <div class="button-create">
      <HTButton :icon="mdiPlus" label="Написать статью"></HTButton>
    </div>
    <div class="input-search">
      <HTInputMain
        v-model="searchValue"
        input-class="input-text"
        :text-validity-check="false"
        margin-text-input
        prepend
        placeholder="Введите название статьи"
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
    <div>
      <HTButtonDropdown
        v-model="isFocusedSort"
        class="sort-button"
        :list-items="sortVariants"
        :multiple="false"
        hide-counting
        label="Сортировать"
        :icon="mdiSort"
        @choose-item="
          (item) => {
            updateSelected(item, sortVariants);
          }
        "
      >
      </HTButtonDropdown>
    </div>
    <div class="articles-list">
      <ArticleCard :film-item="films[0]"> </ArticleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import ArticleCard from "~/components/articles/ArticleCard.vue";
import { mdiMagnify, mdiPlus, mdiSort } from "@quasar/extras/mdi-v6";
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
const isFocusedSort = ref("");
const sortVariants = ref([
  { text: "По названию", selected: false, key: 0 },
  { text: "По дате выхода", selected: false, key: 1 },
  { text: "По популярности", selected: false, key: 2 },
  { text: "По автору", selected: false, key: 3 },
]);
function updateSelected(item, allItems, multiple = false) {
  if (!multiple) {
    allItems.forEach((itemScore) => {
      if (itemScore.text === item.text) {
        itemScore.selected = true;
      } else {
        itemScore.selected = false;
      }
    });
  } else {
    allItems.forEach((itemScore) => {
      if (itemScore.text === item.text) {
        itemScore.selected = !itemScore.selected;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.main-articles-container {
  margin: 32px 16px 0px 16px;
  .button-create {
    margin-bottom: 14px;
  }
  .search-icon {
    color: var(--app-black-1);
  }
  .sort-button {
    height: 30px;
    width: fit-content;
    border-radius: 10px;
  }
  .input-search {
    margin-bottom: 16px;
    .input-text {
      padding-right: 8px;
    }
  }
}
</style>
