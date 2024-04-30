<template>
  <q-select
    borderless
    :model-value="modelValue"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    autocomplete="Фильм"
    :options="stringOptions"
    behavior="menu"
    menu-self="top middle"
    menu-anchor="bottom middle"
    clearable
    class="text-select"
    input-style="padding-left: 20px"
    popup-content-style="text-align: center; font-size: 16px"
    placeholder="Ваш текст"
    @filter="filterFn"
    @input-value="setModel"
    @update:model-value="selectItems"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  options: string[];
}
const props: Props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array as () => string[],
    default: () => [],
  },
});
const model = ref("");
const stringOptions = ref<string[]>([]);
function filterFn(val: string, update: Function) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    stringOptions.value = props.options.filter(
      (v) => v.toLocaleLowerCase().indexOf(needle) > -1,
    );
  });
}
const emits = defineEmits(["update:modelValue"]);
function selectItems(item: string) {
  emits("update:modelValue", item);
}
function setModel(val: string) {
  model.value = val;
}
onMounted(() => {
  stringOptions.value = props.options;
  model.value = props.modelValue;
});
</script>

<style scoped lang="scss">
.text-select {
  overflow: hidden;
  font-size: 16px;
  border-radius: 16px;
  background-color: var(--app-white-1);
  transition:
    border-color 0.2s ease,
    height 0.2s ease;
  border: 1px solid transparent; /* Устанавливаем прозрачную рамку */
}
</style>
