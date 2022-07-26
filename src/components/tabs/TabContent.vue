<template>
    <div v-show="selectedTitle === title">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// * props
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
})

// * tabs content
const selectedTitle = inject<string>('selectedTitle')
</script>

<style lang="scss" scoped></style>
