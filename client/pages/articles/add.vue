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
      <div v-for="(item, ind) in filmss" :key="item.id">
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
            @click.stop="(event) => selectFilm(ind)"
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
        @click="(event) => selectFilm(-1)"
      ></HTButton>
    </div>
    <HTDialog
      v-model="openDialog"
      @cancel-action="cleanSelected"
      @accept-action="addReviewBlock"
    >
      <template #main>
        <InputsHTSelect
          ref="filmsSelector"
          :key="upKey"
          v-model="selectedFilm"
          class="films-selector"
          :options="
            films.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })
          "
          @input-change="changeSearchValue"
          @select-item="(val) => (selectedFilmId = val)"
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
const selectedFilmId = ref(0);
const filmss = ref([]);
const searchFilm = ref("");
const films = ref([]);
const openDialog = ref(false);
const upKey = ref(0);
const filmsSelector = ref(null);
const currentReplacedNumber = ref(-1);
function cleanSelected() {
  selectedFilm.value = "";
}

async function getFilms() {
  films.value = await useFetch("/api/getFilms", {
    params: {
      page: 1,
    },
  });
  if (films.value) {
    films.value = JSON.parse(films.value.data).results;
    upKey.value++;
    console.log(films.value);
  }
}

function changeSearchValue(val: string) {
  console.log(val);
  selectedFilm.value = val;
}

function searchFilms() {
  console.log("I WRITING", selectedFilm.value);
  if (selectedFilm.value) {
    setTimeout(async () => {
      // Выполняем запрос с параметром val
      films.value = await useFetch("/api/findByTitle", {
        params: { queryString: selectedFilm.value },
      });

      if (films.value) {
        films.value = JSON.parse(films.value.data).results?.filter((item) => {
          console.log("FILM ITEM", item);
          return Array.isArray(item.genre_ids)
            ? item.genre_ids.includes(27)
            : false;
        });
        console.log("FILMS FROM RESPONSE", films.value);
        upKey.value++;
        console.log(films.value);

        // Открыть список селекта после обновления данных
        nextTick(() => {
          if (filmsSelector.value) {
            filmsSelector.value.$el.click();
            clearTextSelection();
          }
        });
      }
    }, 0);
  } else {
    setTimeout(getFilms, 0);
  }
}
function clearTextSelection() {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection && selection.empty) {
      selection.empty(); // Chrome
    } else if (selection && selection.removeAllRanges) {
      selection.removeAllRanges(); // Firefox
    }
  } else if (document.selection) {
    const selection = document.selection;
    if (selection && selection.empty) {
      selection.empty(); // IE
    }
  }
}
function addReviewBlock() {
  if (selectedFilmId.value) {
    if (currentReplacedNumber.value !== -1) {
      filmss.value[currentReplacedNumber.value] = films.value?.filter(
        (item) => item.id == selectedFilmId.value,
      )[0];
    } else {
      filmss.value.push(
        films.value?.filter((item) => item.id == selectedFilmId.value)[0],
      );
    }
    selectedFilmId.value = 0;
    selectedFilm.value = "";
    currentReplacedNumber.value = -1;
  }
}

function selectFilm(replacedNumber = -1) {
  console.log(
    "replaced number, current",
    replacedNumber,
    currentReplacedNumber.value,
  );
  if (replacedNumber !== -1) {
    currentReplacedNumber.value = replacedNumber;
  }
  openDialog.value = true;
}
const timeout = ref();
watch(
  () => selectedFilm.value,
  () => {
    if (timeout) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => searchFilms(), 3000);
  },
);

onMounted(async () => {
  setTimeout(getFilms, 0);
});
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
.no-pointer-events {
  pointer-events: none;
}
</style>
