<template>
  <div class="page-container">
    <q-input
      v-model="articleTitle"
      class="title-input"
      placeholder="Введите название статьи"
      dark
    />
    <div class="short-review-block">
      <div class="main-label">Рецензия:</div>
      <div class="main-text">
        <InputsHTTextArea v-model="articleReviewText"></InputsHTTextArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const articleTitle = ref("");
const articleReviewText = ref("");
</script>

<style lang="scss" scoped>
.page-container {
  padding: 24px;
  width: 100vw;
  height: 100vh;
}
.title-input {
  color: var(--app-red-1);
  font-size: 22px;
}
</style>
<style></style>
