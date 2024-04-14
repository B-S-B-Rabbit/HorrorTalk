<template>
  <q-btn-dropdown
    :style="`${isActive ? 'background-color: transparent; border: 1px var(--app-red-1) solid;' : 'background-color: var(--app-red-1)'}`"
    no-caps
    class="main-dropdown-button"
    :label="label"
    content-style="border-radius: 16px;"
    @before-show="setActive"
    @before-hide="setActive"
  >
    <q-list class="dropdown-list">
      <q-item
        v-for="(item, ind) in listItems"
        :key="ind"
        v-close-popup
        class="dropdown-item"
        clickable
        @click="chooseItem(item)"
      >
        <q-item-section>
          <q-item-label class="dropdown-label">
            <div style="width: 20px">{{ 10 - ind }}</div>
            <slot name="icon"></slot>
            <div>{{ item }}</div></q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
const props = defineProps({
  listItems: {
    type: Array<string>,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["chooseItem"]);
const isActive = ref(false);
function setActive() {
  isActive.value = !isActive.value;
}
function chooseItem(item: string) {
  console.log(item);
  emit("chooseItem", item);
}
</script>

<style lang="scss" scoped>
.main-dropdown-button {
  width: 100%;
  height: 54px;
  border-radius: 16px;
}
.dropdown-list {
  background-color: var(--app-dark-1);
  color: var(--app-white-1);
  width: 100%;
  .dropdown-item {
    padding: 8px;
  }
  .dropdown-label {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
    font-size: 16px;
  }
}
</style>
