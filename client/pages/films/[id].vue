<template>
  <div class="film-container">
    <div class="film-poster">
      <img src="/film_card_mock-image.webp" alt="" />
    </div>
    <div class="film-info">
      <div class="film-info-title subtitle-text">Название фильма</div>
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
      <div class="film-trailer-video"></div>
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
          <div class="subtitle-text">Режиссёр</div>
          <div>Имя режиссера</div>
          <div class="subtitle-text">Актёры</div>
          <div class="actors-block">
            <div
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="i"
              class="actor-block"
            >
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <div style="text-align: center">
                Matthew<br />
                McConaughey
              </div>
            </div>
          </div>
          <div class="subtitle-text">Краткое описание</div>
          <div>
            Дороги в Эквадоре практически идеальные, хотя населенные пункты
            выглядят очень бедно. На дорогах много интересных машин, например
            очень много грузовиков - древних Фордов, которые я никогда раньше не
            видел. А еще несколько раз на глаза попадались старенькие Жигули :)
            А еще если кого-то обгоняешь и есть встречная машина, она
            обязательно включает фары. На больших машинах - грузовиках и
            автобусах, обязательно красуется
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
      <div class="textarea-block">
        <div class="textarea-input">
          <InputsHTTextArea
            v-model="reviewText"
            @focus="showSendBitton = !showSendBitton"
            @blur="showSendBitton = !showSendBitton"
          ></InputsHTTextArea>
        </div>
        <div
          v-if="showSendBitton && reviewText.length > 10"
          class="send-button"
        >
          <HTButton icon-button :icon="mdiSend" @click="sendJson"></HTButton>
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
  { text: "Фавориты", selected: false },
  { text: "Мой список", selected: false },
]);
const reviewText = ref("");
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
async function sendJson() {
  const jsonData = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    // Добавьте любые другие данные, которые вы хотите отправить
  };

  try {
    const response: any = await $fetch(
      "http://192.168.1.72:5000/receive_json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      },
    );

    if (response.ok) {
      console.log("JSON отправлен успешно!");
    } else {
      console.error("Произошла ошибка при отправке JSON:", response.status);
    }
  } catch (error) {
    console.error("Произошла ошибка при отправке JSON:", error);
  }
}
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
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
