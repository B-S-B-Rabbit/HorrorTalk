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
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="i"
        :film-item="films.results[i - 1]"
        @click="router.push({ path: `/films/${i}` })"
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
onMounted(async () => {
  setTimeout(async () => {
    films.value = await useFetch("/api/test");
    if (films.value) {
      films.value = JSON.parse(films.value.data);
      console.log(films.value);
      loading.value = true;
    }
  }, 100);
});
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
