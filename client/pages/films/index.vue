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
        @update:model-value="searchFilms"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import HTInputMain from "~/components/inputs/HTInputMain.vue";
import FilmCard from "~/components/films/FilmCard.vue";
import { mdiMagnify } from "@quasar/extras/mdi-v6";
const searchValue = ref("");
const films = ref({});
const router = useRouter();
const loading = ref(false);
async function getFilms() {
  films.value = await useFetch("/api/test");
  if (films.value) {
    films.value = JSON.parse(films.value.data).results;
    console.log(films.value);
    loading.value = true;
  }
}
onMounted(async () => {
  setTimeout(getFilms, 0);
});
function searchFilms(val: string) {
  if (val) {
    setTimeout(async () => {
      // Выполняем запрос с параметром val
      films.value = await useFetch("/api/findByTitle", {
        params: { queryString: val },
      });

      if (films.value) {
        films.value = JSON.parse(films.value.data).results.filter((item) =>
          item.genre_ids.includes(27),
        );
        console.log(films.value);
        loading.value = true;
      }
    }, 0);
  } else {
    setTimeout(getFilms, 0);
  }
}
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
