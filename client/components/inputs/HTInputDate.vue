<template>
  <HTInputMain
    input-style="width: 100px; text-align: center;"
    type="text"
    mask="##.##.####"
    :text-validity-check="false"
    :model-value="modelValue"
    placeholder="01.01.2024"
    :rules="validateDate"
    @update:model-value="updateDate"
  >
    <template #appendIcon>
      <q-icon
        style="left: -12px; color: #4c4b4b"
        :name="mdiCalendarMonthOutline"
      >
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            mask="DD.MM.YYYY"
            :model-value="modelValue"
            :locale="myLocale"
            :navigation-min-year-month="minDate"
            :navigation-max-year-month="maxDate"
            :default-year-month="defaultDate"
            @update:model-value="updateDate"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </HTInputMain>
</template>

<script lang="ts" setup>
import HTInputMain from "@/components/inputs/HTInputMain.vue";
import { mdiCalendarMonthOutline } from "@quasar/extras/mdi-v6";
import { isValid, isAfter, isBefore } from "date-fns"; // Импортируем методы isValid и isAfter из библиотеки date-fns

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  minDate: {
    type: String,
    default: "1920/01",
  },
  maxDate: {
    type: String,
    default: "",
  },
  defaultDate: {
    type: String,
    default: "",
  },
});
interface Rule {
  rule: (value: string) => boolean;
  ruleMessage: string;
}
// Опции для календаря
const myLocale: object = {
  /* начиная с воскресенья */
  days: "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split(
    "_",
  ),
  daysShort: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
  months:
    "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split(
      "_",
    ),
  monthsShort: "Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек".split("_"),
  firstDayOfWeek: 1, // 0-6, 0 - воскресенье, 1 - понедельник, ...
  format24h: true,
  pluralDay: "дня",
};

const emit = defineEmits(["update:modelValue"]);
function updateDate(val: string) {
  emit("update:modelValue", val);
}

// Правило валидации даты
// Правило валидации даты
const validateDate: Rule[] = [
  {
    rule: (value: string) => {
      const [day, month, year] = value.split(".").map(Number); // Разделяем строку и преобразуем компоненты в числа
      // Проверяем, что месяц не превышает 12 и что введенная дата не больше 2017 года
      if (day > 31 || month > 12 || year > 2024) {
        return false;
      }
      const enteredDate = new Date(year, month - 1, day); // Создаем объект Date с правильным форматом
      console.log(enteredDate);
      const minDate = new Date(1920, 0, 1); // Минимальная дата (01.01.1920)
      return (
        isValid(enteredDate) && !isBefore(enteredDate, minDate) // Проверяем не меньше 1920 года дату с помощью date-fns
      );
    },
    ruleMessage: "Неверная дата",
  },
];
</script>

<style></style>
