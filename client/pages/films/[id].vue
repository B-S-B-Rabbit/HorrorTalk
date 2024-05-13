<template>
  <div class="film-container">
    <div class="film-poster">
      <img
        v-if="imageLoading"
        :src="mainImageUrl"
        alt="Проксированное изображение"
      />
    </div>
    <div class="film-info">
      <div class="film-info-title subtitle-text">
        {{ film ? film.title : "loading" }}
      </div>
      <div style="display: flex">
        <div class="film-info-genre">
          {{
            film ? film.genres.map((item) => item.name).join(", ") : "loading"
          }}
        </div>
        <div class="dot-divider">•</div>
        <div class="film-info-year">
          {{ film ? format(new Date(film?.release_date), "P") : "loading" }}
        </div>
        <div class="dot-divider">•</div>
        <div class="film-info-runtime">
          {{
            film
              ? format(
                  new Date(
                    0,
                    0,
                    0,
                    Math.floor(film.runtime / 60),
                    film.runtime % 60,
                  ),
                  "H 'h' m 'm'",
                )
              : "loading"
          }}
        </div>
      </div>
      <div class="film-info-tagline">
        {{ film ? film.tagline : "loading" }}
      </div>
    </div>
    <div class="film-score">
      <div class="film-score-value">{{ film?.vote_average.toFixed(1) }}</div>
      <div class="film-score-stars">
        <img
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :key="i"
          :style="`filter: ${film?.vote_average.toFixed(0) >= i ? 'var(--app-yellow-star-filter);' : 'var(--app-default-star-filter)'}`"
          src="/icons/star_score.svg"
          alt=""
        />
      </div>
    </div>
    <div class="first-buttons-container">
      <HTButtonDropdown
        v-model="myScore"
        :list-items="scores"
        :label="myScore ? 'Оценено' : 'Оценить'"
        :icon="mdiThumbsUpDown"
        @choose-item="
          (item) => {
            updateSelected(item, scores);
          }
        "
      >
        <template #custom-label>
          <img
            style="filter: var(--app-yellow-star-filter)"
            width="16"
            src="/icons/star_score.svg"
            alt=""
          />
        </template>
      </HTButtonDropdown>
      <HTButtonDropdown
        v-model="isBookmarks"
        :list-items="bookmarks"
        :multiple="true"
        hide-counting
        :label="isBookmarks ? 'Сохранено' : 'Сохранить'"
        :icon="mdiBookmark"
        @choose-item="
          (item) => {
            updateSelected(item, bookmarks, true);
          }
        "
      >
      </HTButtonDropdown>
    </div>
    <div v-if="myScore" class="my-score">
      <span class="subtitle-text">Ваша оценка:</span>
      <span class="score-text">{{ myScore }}</span>
    </div>
    <div class="film-trailer">
      <div class="subtitle-text">Трейлер</div>
      <div class="film-trailer-video">
        <!-- <iframe
          v-if="trailerId"
          :src="`https://www.youtube.com/embed/${trailerId}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          width="100%"
          height="240px"
        ></iframe> -->
        <YouTube
          v-if="trailerId"
          ref="youtube"
          :src="`https://www.youtube.com/embed/${trailerId}?autoplay=1`"
          height="240px"
          width="100%"
          :vars="{ rel: 0, modestbranding: 1, controls: 2 }"
        />
        <div v-else>Трейлер недоступен</div>
      </div>
    </div>
    <div class="detail-info">
      <div
        v-if="!showDetails"
        class="detail-info-title"
        @click="showDetails = true"
      >
        Подробнее
      </div>
      <Transition name="slide-down">
        <div v-if="showDetails">
          <div class="subtitle-text">Режиссеры и сценаристы</div>
          <div>
            {{
              [
                ...new Set(
                  filmCredits.crew
                    .filter(
                      (crewMember) =>
                        crewMember.known_for_department === "Directing" ||
                        crewMember.known_for_department === "Writing",
                    )
                    .map((crewMember) => crewMember.name),
                ),
              ].join(", ")
            }}
          </div>
          <div class="subtitle-text">Актёры</div>
          <Carousel :items-to-show="3" :wrap-around="true">
            <Slide v-for="actor in filmCredits.cast" :key="actor.id">
              <div class="carousel__actor-item">
                <q-avatar size="56px">
                  <img :src="actor.proxiedPhoto" />
                </q-avatar>
                <div style="text-align: center">{{ actor.name }}</div>
              </div>
            </Slide>
          </Carousel>
          <div class="subtitle-text">Краткое описание</div>
          <div>
            {{ film?.overview }}
          </div>
        </div>
      </Transition>
      <div
        v-if="showDetails"
        class="detail-info-title"
        @click="showDetails = false"
      >
        Скрыть
      </div>
    </div>
    <div class="alike-films">
      <div class="subtitle-text">Похожие фильмы</div>
      <div>
        <Carousel :items-to-show="3" :wrap-around="true">
          <Slide v-for="slide in similarFilms" :key="slide">
            <div
              class="carousel__item"
              @click="navigateTo(`/films/${slide.id}`)"
            >
              <div class="carousel-image">
                <img :src="slide.proxiedPhoto" alt="" />
              </div>
              <div>{{ slide.title }}</div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="comments-block">
      <div class="subtitle-text">Отзывы</div>
      <div class="textarea-block">
        <div class="textarea-input">
          <InputsHTTextArea
            v-model="reviewText"
            @focus="showSendBitton = !showSendBitton"
            @blur="showSendBitton = !showSendBitton"
          ></InputsHTTextArea>
        </div>
        <div
          v-if="showSendBitton || reviewText.length > 10"
          class="send-button"
        >
          <HTButton icon-button :icon="mdiSend" @click=""></HTButton>
        </div>
      </div>
      <div class="comments-block-reviews">
        <div class="user-review">
          <div class="user-review-header">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <div>Пользователь</div>
          </div>
          <div class="user-review-body">
            <div class="film-score-stars">
              <img
                v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="i"
                :style="`filter: ${1 >= i ? 'var(--app-yellow-star-filter);' : 'var(--app-default-star-filter)'}`"
                src="/icons/star_score.svg"
                alt=""
              />
            </div>
            <div>
              Ну короче мне понравилось классный фильм жду продолжения,
              актерская игра на уровне, сюжет продуман до мелочей, смотрится
              хорошо, и я даже хз что еще написать чтобы было дохуя текста,
              вроде бы он и так нормально ужимается и читается, но над
              оформлением нужно подумать мб
            </div>
          </div>
          <div class="replay-button">
            Ответить <q-icon size="sm" :name="mdiArrowTopRight"></q-icon>
          </div>
        </div>
        <div class="user-review">
          <div class="user-review-header">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <div>Пользователь</div>
          </div>
          <div class="user-review-body">
            <div class="film-score-stars">
              <img
                v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="i"
                :style="`filter: ${1 >= i ? 'var(--app-yellow-star-filter);' : 'var(--app-default-star-filter)'}`"
                src="/icons/star_score.svg"
                alt=""
              />
            </div>
            <div>
              Ну короче мне понравилось классный фильм жду продолжения,
              актерская игра на уровне, сюжет продуман до мелочей, смотрится
              хорошо, и я даже хз что еще написать чтобы было дохуя текста,
              вроде бы он и так нормально ужимается и читается, но над
              оформлением нужно подумать мб
            </div>
          </div>
          <div class="replay-button">
            Ответить <q-icon size="sm" :name="mdiArrowTopRight"></q-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiThumbsUpDown,
  mdiBookmark,
  mdiArrowTopRight,
  mdiSend,
} from "@quasar/extras/mdi-v7";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import YouTube from "vue3-youtube";
const route = useRoute();
const loading = ref(false);
const scores = ref([
  { text: "Шедевр!", selected: false, key: 10 },
  { text: "Отлично", selected: false, key: 9 },
  { text: "Хорошо", selected: false, key: 8 },
  { text: "Средненько", selected: false, key: 7 },
  { text: "Так себе", selected: false, key: 6 },
  { text: "Скучно", selected: false, key: 5 },
  { text: "Ни о чем", selected: false, key: 4 },
  { text: "Плохо", selected: false, key: 3 },
  { text: "Ужасно", selected: false, key: 2 },
  { text: "Треш", selected: false, key: 1 },
]);
const showSendBitton = ref(false);
const myScore = ref("");
const isBookmarks = ref("");
const bookmarks = ref([
  { text: "В планах", selected: false },
  { text: "Просмотрено", selected: false },
  { text: "Брошено", selected: false },
  { text: "Избранное", selected: false },
]);
const film = ref();
const reviewText = ref("");
const mainImageUrl = ref();
const imageLoading = ref(false);
function getFilmPhoto() {
  setTimeout(
    () =>
      fetch(`/api/getImage/${encodeURIComponent(film.value.poster_path)}`)
        .then((response) => response.text())
        .then((imageDataBase64) => {
          mainImageUrl.value = "data:image/jpeg;base64," + imageDataBase64;
          console.log("wtf");
          imageLoading.value = true;
        })
        .catch((error) => {
          console.error("Ошибка при загрузке изображения:", error);
        }),
    100,
  );
}
function getProxiedPhotoUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(`/api/getImage/${encodeURIComponent(url)}`)
      .then((response) => response.text())
      .then((imageDataBase64) => {
        const proxiedUrl = "data:image/jpeg;base64," + imageDataBase64;
        resolve(proxiedUrl);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке изображения:", error);
        reject(error);
      });
  });
}
const showDetails = ref(false);
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
const filmCredits = ref();
function getFilmCredits() {
  setTimeout(async () => {
    filmCredits.value = await useFetch("/api/getFilmCredits", {
      params: { movieId: route.params.id },
    });

    if (filmCredits.value) {
      filmCredits.value = JSON.parse(filmCredits.value.data);
      filmCredits.value.cast.forEach((item, ind) => {
        setTimeout(
          () =>
            getProxiedPhotoUrl(item.profile_path)
              .then((proxiedUrl) => {
                item.proxiedPhoto = proxiedUrl;
                // Вы можете использовать proxiedUrl здесь
              })
              .catch((error) => {
                console.error("Ошибка:", error);
              }),
          100 * ind,
        );
      });
      console.log(filmCredits.value);
    }
  }, 0);
}
const filmVideos = ref();
const trailerId = ref();
function getFilmVideo() {
  setTimeout(async () => {
    filmVideos.value = await useFetch("/api/getFilmVideos", {
      params: { movieId: route.params.id },
    });

    if (filmVideos.value) {
      filmVideos.value = JSON.parse(filmVideos.value.data);
      console.log(filmVideos.value);
      const trailer = filmVideos.value.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );
      if (trailer) {
        trailerId.value = trailer.key;
      }
    }
  }, 0);
}
const similarFilms = ref();
async function getSimilarFilms() {
  setTimeout(async () => {
    similarFilms.value = await useFetch("/api/getSimilarFilms", {
      params: { movieId: route.params.id },
    });

    if (similarFilms.value) {
      similarFilms.value = JSON.parse(similarFilms.value.data).results.filter(
        (item) => item.genre_ids.includes(27),
      );
      similarFilms.value.forEach((item, ind) => {
        setTimeout(
          () =>
            getProxiedPhotoUrl(item.poster_path)
              .then((proxiedUrl) => {
                item.proxiedPhoto = proxiedUrl;
                // Вы можете использовать proxiedUrl здесь
              })
              .catch((error) => {
                console.error("Ошибка:", error);
              }),
          100 * ind,
        );
      });
      console.log(similarFilms.value, "that is milirs");
    }
  }, 0);
}
function getFilm() {
  setTimeout(async () => {
    film.value = await useFetch("/api/getFilmById", {
      params: { movieId: route.params.id },
    });

    if (film.value) {
      film.value = JSON.parse(film.value.data);
      console.log(film.value);
      getFilmPhoto();
      getFilmCredits();
      getSimilarFilms();
      getFilmVideo();
      loading.value = true;
    }
  }, 0);
}
onMounted(async () => {
  setTimeout(getFilm, 0);
});
</script>

<style lang="scss" scoped>
.film-container {
  padding: 0px 32px;
  color: var(--app-white-1);
  .subtitle-text {
    font-size: 18px;
    margin: 12px 0px 8px 0px;
  }

  .film-poster {
    img {
      width: 100%;
      max-height: 50vh;
      object-fit: contain;
    }
  }
  .film-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    &-title {
      font-size: 28px;
      font-family: "Permanent Marker";
      color: var(--app-red-1);
    }
    &-genre,
    &-year,
    &-runtime {
      display: flex;
      flex: 1 1 0;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .dot-divider {
      margin: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-tagline {
      margin-top: 8px;
      font-size: 28px;
      font-family: "Jersey 10 Charted";
      color: var(--app-red-1);
    }
  }
  .film-score {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    &-value {
      font-size: 22px;
      font-weight: 700;
      color: var(--app-red-1);
      margin-right: 8px;
      padding-top: 3px;
    }
    &-stars {
      display: flex;
      gap: 4px;
      padding-bottom: 2px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .first-buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  }
  .my-score {
    display: flex;
    justify-content: center;
    align-items: center;
    .score-text {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--app-red-1);
      font-size: 22px;
      font-weight: 700;
      margin-left: 16px;
      margin-top: 4px;
    }
  }
  .film-trailer {
    margin-top: 16px;
    &-head {
      font-size: 16px;
      margin-bottom: 8px;
    }
    &-video {
      width: 100%;
      height: auto;
    }
  }
  .detail-info {
    overflow: hidden;
    &-title {
      text-align: center;
      text-decoration: underline;
      margin: 16px;
    }
    .actors-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      .actor-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 4px;
      }
    }
  }
  .alike-films {
    padding-bottom: 8px;
    border-bottom: 2px var(--app-black-5) solid;
  }
  .comments-block {
    .textarea-block {
      margin: 8px 0px 16px 0px;
      display: flex;
      width: 100%;
      .textarea-input {
        width: 100%;
      }
      .send-button {
        display: flex;
        align-self: end;
        margin: 8px;
      }
    }
    &-reviews {
      .user-review {
        &-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          margin-bottom: 8px;
        }
        &-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .replay-button {
          text-align: end;
          margin: 12px;
          font-size: 16px;
        }
      }
    }
  }
}
.carousel__slide {
  margin-top: 8px;
  padding: 5px;
}
.carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .carousel-image {
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
.carousel__viewport {
  perspective: 2000px;
  .carousel__track {
    li {
      display: flex;
      align-items: start;
    }
  }
}

// .carousel__track {
//   transform-style: preserve-3d;
// }

// .carousel__slide--sliding {
//   transition: 0.5s;
// }

// .carousel__slide {
//   opacity: 0.9;
//   transform: rotateY(-20deg) scale(0.9);
// }

// .carousel__slide--active ~ .carousel__slide {
//   transform: rotateY(20deg) scale(0.9);
// }

// .carousel__slide--prev {
//   opacity: 1;
//   transform: rotateY(-10deg) scale(0.95);
// }

// .carousel__slide--next {
//   opacity: 1;
//   transform: rotateY(10deg) scale(0.95);
// }

// .carousel__slide--active {
//   opacity: 1;
//   transform: rotateY(0) scale(1.1);
// }
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
