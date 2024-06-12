<template>
  <div ref="intersectionRef" style="height: 1px"></div>
</template>

<script setup>
const intersectionRef = ref(null);
const emit = defineEmits(["isEntersected"]);
onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        emit("isEntersected", true);
      }
    });
  }, options);

  if (intersectionRef.value) {
    observer.observe(intersectionRef.value);
  }
});
</script>
