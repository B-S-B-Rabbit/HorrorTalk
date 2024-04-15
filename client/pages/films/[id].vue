<template>
  <div class="film-container">
    <div class="film-poster">
      <img src="/film_card_mock-image.webp" alt="" />
    </div>
    <div class="film-info">
      <div class="film-info-title">Название фильма</div>
      <div style="display: flex">
        <div class="film-info-genre">Триллер</div>
        <div class="film-info-year">2025</div>
      </div>
    </div>
    <div class="film-score">
      <div class="film-score-value">7</div>
      <div class="film-score-stars">
        <img
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :key="i"
          :style="`filter: ${7 >= i ? 'var(--app-yellow-star-filter);' : 'var(--app-default-star-filter)'}`"
          src="/icons/star_score.svg"
          alt=""
        />
      </div>
    </div>
    <div class="first-buttons-container">
      <HTButtonDropdown
        :list-items="scores"
        label="Оценить"
        :icon="mdiThumbsUpDown"
        @choose-item="updateSelected"
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
        :list-items="bookmarks"
        :multiple="true"
        hide-counting
        label="Сохранить"
        :icon="mdiBookmark"
        @choose-item="
          (item) => {
            updateSelected(item, bookmarks, true);
          }
        "
      >
      </HTButtonDropdown>
    </div>
    <div class="film-trailer">
      <div class="subtitle-text">Трейлер</div>
      <div class="film-trailer-video"></div>
    </div>
    <div class="detail-info">
      <div class="detail-info-title">Подробнее</div>
      <div></div>
    </div>
    <div class="alike-films">
      <div class="subtitle-text">Похожие фильмы</div>
      <div>
        <Carousel :items-to-show="3" :wrap-around="true" :transition="500">
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">
              <div class="carousel-image">
                <img src="/film_card_mock-image.webp" alt="" />
              </div>
              <div>Такой-то фильм</div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="comments-block">
      <div class="subtitle-text">Отзывы</div>
      <div>Текстарея</div>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiThumbsUpDown,
  mdiBookmark,
  mdiArrowTopRight,
} from "@quasar/extras/mdi-v7";
const scores = ref([
  { text: "Шедевр!", selected: false },
  { text: "Отлично", selected: false },
  { text: "Хорошо", selected: false },
  { text: "Средненько", selected: false },
  { text: "Так себе", selected: false },
  { text: "Скучно", selected: false },
  { text: "Ни о чем", selected: false },
  { text: "Плохо", selected: false },
  { text: "Ужасно", selected: false },
  { text: "Треш", selected: false },
]);
const bookmarks = ref([
  { text: "В планах", selected: false },
  { text: "Просмотрено", selected: false },
  { text: "Брошено", selected: false },
  { text: "Фавориты", selected: false },
  { text: "Мой список", selected: false },
]);
function updateSelected(item, allItems, multiple) {
  if (!multiple) {
    console.log(item);
  } else {
    allItems.forEach((itemScore) => {
      if (itemScore.text === item.text) {
        itemScore.selected = !itemScore.selected;
        console.log("sdds");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.film-container {
  padding: 0px 16px 0px 16px;
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
    font-size: 12px;
    &-genre::after {
      content: "•";
      margin: 4px;
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
  .film-trailer {
    padding: 0px 16px;
    margin-top: 16px;
    &-head {
      font-size: 16px;
      margin-bottom: 8px;
    }
    &-video {
      width: 100%;
      height: 120px;
      background: var(--app-black-5);
    }
  }
  .detail-info {
    &-title {
      text-align: center;
      text-decoration: underline;
      margin: 16px;
    }
  }
  .alike-films {
    padding-bottom: 8px;
    border-bottom: 2px var(--app-black-5) solid;
  }
  .comments-block {
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
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
