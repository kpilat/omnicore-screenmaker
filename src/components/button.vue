<template>
  <button class="button" :onclick="onClick">{{ text }}</button>
</template>

<script>
  export default {
    name: "button",
    props: {
      text: String,
      onClick: String,
    },
  };
</script>