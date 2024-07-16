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
    <div v-if="loading">
      <FilmCard
        v-for="i in films.length"
        :key="films[i - 1].id"
        :pos="i"
        :film-item="films[i - 1]"
        @click="router.push({ path: `/films/${films[i - 1].id}` })"
      ></FilmCard>
      <HTIntersectionObserver
        v-if="loading"
        @is-entersected="loadMoreFilms"
      ></HTIntersectionObserver>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilmCard from "~/components/films/FilmCard.vue";
import { mdiMagnify, mdiSort } from "@quasar/extras/mdi-v6";
const searchValue = ref("");
const films = ref([]);
const responseFilms = ref([]);
const router = useRouter();
const currentFilmsPage = ref(1);
const loading = ref(false);
const sortDirection = ref("desc");
const isFocusedSort = ref("");
const sortVariants = ref([
  { text: "По названию", value: "title", selected: false, key: 0 },
  {
    text: "По дате выхода",
    value: "primary_release_date",
    selected: false,
    key: 1,
  },
  {
    text: "По популярности",
    value: "popularity",
    selected: true,
    key: 2,
  },
  { text: "По рейтингу", value: "vote_average", selected: false, key: 3 },
  {
    text: "По количеству оценок",
    value: "vote_count",
    selected: false,
    key: 4,
  },
]);
async function getFilms(load = false, sortOption = "popularity") {
  responseFilms.value = await useFetch("/api/getFilms", {
    params: {
      page: currentFilmsPage.value,
      sortOption: sortOption,
      sortDir: sortDirection.value,
    },
  });
  if (films.value) {
    if (!load) {
      films.value = JSON.parse(responseFilms.value.data).results;
      console.log(films.value);
      loading.value = true;
    } else {
      console.log(responseFilms.value);
      films.value = films.value.concat(
        JSON.parse(responseFilms.value.data).results,
      );
    }
  }
}
function updateSelected(item, allItems, multiple = false) {
  if (!multiple) {
    allItems.forEach((itemScore) => {
      if (itemScore.text === item.text) {
        itemScore.selected = true;
        console.log(selectedSortOpt);
        getFilms(false, itemScore.value);
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
const selectedSortOpt = computed(
  () => sortVariants.value.find((item) => item.selected)?.value,
);
onMounted(async () => {
  setTimeout(getFilms, 0);
});
function loadMoreFilms() {
  currentFilmsPage.value++;
  if (!searchValue.value) {
    getFilms(true, selectedSortOpt.value);
  } else {
    searchFilms(true);
  }
}
async function searchFilms(load = false) {
  console.log(
    "Мы получили ваш запрос и обрабатываем его в строк",
    searchValue.value,
  );
  if (!load) {
    loading.value = false;
  }
  if (searchValue.value) {
    // Выполняем запрос с параметром val
    responseFilms.value = await useFetch("/api/findByTitle", {
      params: {
        queryString: searchValue.value,
        page: currentFilmsPage.value,
      },
    });
    console.log(responseFilms.value, "RESPONSE");
    if (JSON.parse(responseFilms.value.data).results) {
      if (!load) {
        console.log(JSON.parse(responseFilms.value.data).results);
        films.value = JSON.parse(responseFilms.value.data).results.filter(
          (item) => item.genre_ids?.includes(27),
        );
        console.log(films.value);
        if (films.value.length < 10) {
          loadMoreFilms();
        }
        loading.value = true;
      } else {
        console.log(
          "WILL BE LOADED",
          films.value,
          JSON.parse(responseFilms.value.data).results,
        );
        const searchRes = JSON.parse(responseFilms.value.data).results.filter(
          (item) => item.genre_ids?.includes(27),
        );
        momentallyParsedFilmsLength.value += searchRes.length;
        films.value = films.value.concat(searchRes);
        if (momentallyParsedFilmsLength.value < 10) {
          loadMoreFilms();
        } else {
          momentallyParsedFilmsLength.value = 0;
        }
      }
    } else {
      // setTimeout(getFilms, 0);
    }
  }
}
const momentallyParsedFilmsLength = ref();
const searchTimeout = ref();
watch(
  () => searchValue.value,
  () => {
    currentFilmsPage.value = 1;
    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value);
      searchTimeout.value = setTimeout(() => searchFilms(), 3000);
    } else searchTimeout.value = setTimeout(() => searchFilms(), 3000);
  },
);
</script>

<style lang="scss" scoped>
.main-films-container {
  margin: 32px 16px 0px 16px;
  .search-icon {
    color: var(--app-black-1);
  }
  .sort-button {
    height: 30px;
    width: fit-content;
    border-radius: 10px;
    margin-bottom: 16px;
  }
  .input-search {
    margin-bottom: 32px;
    .input-text {
      padding-right: 8px;
    }
  }
}
</style>
