<template>
    <div
        class="modal"
        v-if="modelValue"
        :style="style"
        ref="modalRef"
        :class="{ 'modal--no-select': isUserSelect }"
    >
        <div class="modal__cross" @click="closeModal">
            <SvgIcon name="cross" />
        </div>
        <div class="modal__draggable" ref="draggableRef"></div>
        <div class="modal__header" v-if="activeSlots.header">
            <slot name="header"/>
        </div>
        <div class="modal__content">
            <slot />
        </div>
        <div class="modal__footer">
            <Button variant="ghost" @click="closeModal">Cancel</Button>
            <Button>Save Changes</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import Button from '@components/ui/Button.vue'
import SvgIcon from '@components/SvgIcon.vue'
import { onMounted, onUnmounted, ref, useSlots, computed } from 'vue'
import { useDraggable, useElementBounding } from '@vueuse/core'
import { useDraggableConstraint, Offset } from '@use/useDraggableConstraint'

// * props
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
})

// * slots
const slots: any = useSlots()
const activeSlots = computed(() => {
    return { header: slots['header'], content: slots['content'] }
})

// * emits
const emit = defineEmits(['update:modelValue'])

// * close
const closeModal = () => emit('update:modelValue', false)

// * handleKeyboard
const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
}

onMounted(() => document.addEventListener('keyup', handleKeyboard))
onUnmounted(() => document.removeEventListener('keyup', handleKeyboard))

// * on window resize
// onMounted(() =>   window.addEventListener("resize", windowResizeHandler))
// onUnmounted(() =>   window.removeEventListener("resize", windowResizeHandler))

// const windowResizeHandler = () => useDraggableConstraint(position, modalSize, offset)

// * draggable
const offset: Offset = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
}
const draggableRef = ref<HTMLElement | null>(null)
const modalRef = ref(null)
const { width, height } = useElementBounding(modalRef)
const isUserSelect = ref<boolean>(false)

const onMove = (position: { x: number; y: number }) => {
    const modalSize = {
        width: width.value,
        height: height.value,
    }
    useDraggableConstraint(position, modalSize, offset)
}

const { x, y, style } = useDraggable(draggableRef, {
    // * Only start the dragging when click on the element directly
    exact: true,
    initialValue: { x: 300, y: 150 },
    onStart: () => {
        isUserSelect.value = true
    },
    onMove: onMove,
    onEnd: () => {
        isUserSelect.value = false
    },
})
</script>

<style lang="scss" scoped>
.modal {
    --padding-top: 40px;
    position: fixed;
    width: 550px;
    min-height: 460px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: var(--border-radius);
    overflow: hidden;
    z-index: 1000;
    background-color: var(--bg-color);

    &__draggable {
        position: absolute;
        width: 100%;
        height: var(--padding-top);
    }

    &__header {
        @include heading;
        @include h3;
        padding: var(--padding-top) 30px 0;

        & + .modal__content {
            padding-top: 10px;
        }
    }

    &__content {
        padding: var(--padding-top) 30px 30px;
        height: 100%;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
        padding: 15px 20px;
        background-color: var(--gray-light);

        & > *:not(:last-child) {
            margin-right: 15px;
        }
    }

    &__cross {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 10px;
        border-radius: 6px;
        background-color: var(--gray-light);
        cursor: pointer;
        transition: all 0.25s;
        z-index: +1;

        .icon {
            width: 10px;
            height: 10px;
        }

        &:hover {
            background-color: var(--primary);

            .icon {
                color: #fff;
            }
        }
    }

    &--no-select {
        user-select: none;
    }
}
</style>
