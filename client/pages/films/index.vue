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
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import FilmCard from "~/components/films/FilmCard.vue";
import { mdiMagnify } from "@quasar/extras/mdi-v6";
const searchValue = ref("");
const films = ref([]);
const responseFilms = ref([]);
const router = useRouter();
const currentFilmsPage = ref(1);
const loading = ref(false);
async function getFilms(load = false) {
  responseFilms.value = await useFetch("/api/getFilms", {
    params: { page: currentFilmsPage.value },
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
onMounted(async () => {
  setTimeout(getFilms, 0);
});
function loadMoreFilms() {
  currentFilmsPage.value++;
  if (!searchValue.value) {
    getFilms(true);
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
  .input-search {
    margin-bottom: 32px;
    .input-text {
      padding-right: 8px;
    }
  }
}
</style>
