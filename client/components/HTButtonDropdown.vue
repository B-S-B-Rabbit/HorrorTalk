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
        v-close-popup="!multiple"
        class="dropdown-item"
        :class="item.selected && !multiple ? 'active' : ''"
        clickable
        @click="chooseItem(item)"
      >
        <q-item-section>
          <q-item-label class="dropdown-label">
            <div v-if="multiple">
              <q-checkbox
                :model-value="item.selected"
                dark
                @update:model-value="chooseItem(item)"
              />
            </div>
            <div v-if="!hideCounting" style="width: 20px">{{ item.key }}</div>
            <slot name="custom-label"></slot>
            <div>{{ item.text }}</div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
interface ListItem {
  text: string;
  selected: boolean;
  key?: number;
}
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  listItems: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  hideCounting: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["chooseItem", "update:modelValue"]);
const isActive = ref(false);

function setActive() {
  isActive.value = !isActive.value;
}

function chooseItem(item: ListItem) {
  emit("chooseItem", item);
  if (!props.multiple) {
    emit("update:modelValue", item.key?.toString());
  } else {
    const items = props.listItems.filter((item) => item.selected);
    console.log(items);
    if (items.length == 0) {
      emit("update:modelValue", "");
    } else emit("update:modelValue", "true");
  }
}
</script>

<style lang="scss" scoped>
.main-dropdown-button {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  color: var(--app-white-1);
}

.dropdown-list {
  background-color: var(--app-dark-1);
  color: var(--app-white-1);
  width: 100%;

  .dropdown-item {
    padding: 8px;
  }
  .dropdown-item.active {
    border: 1px var(--app-red-1) solid;
    border-radius: 16px;
  }
  .dropdown-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    font-size: 16px;
  }
}
</style>
