<template>
    <div class="modal" :style="style" ref="modal">
        <div class="modal__cross">
            <SvgIcon name="cross" />
        </div>
        <div class="modal__head" ref="draggable">
            <h3 class="modal__title">Payment method I am at {{ x }}, {{ y }}</h3>
        </div>
        <div class="modal__content">
            <div class="field">
                <label class="label">App name</label>
                <input class="text-field" type="text" />
            </div>
            <div class="field">
                <label class="label">App name</label>
                <input class="text-field" type="text" />
            </div>
            <div class="field">
                <label class="label">App name</label>
                <input class="text-field" type="text" />
            </div>
        </div>
        <div class="modal__footer">
            <Button variant="ghost">Cancel</Button>
            <Button>Save Changes</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import Button from '@components/ui/Button.vue'
import SvgIcon from '@components/SvgIcon.vue'
import { ref } from 'vue'
import { useDraggable, useElementBounding } from '@vueuse/core'
import usePositionConstraint from '@use/usePositionConstraint'

const draggable = ref<HTMLElement | null>(null)
const modal = ref(null)
const { width, height } = useElementBounding(modal)

const onMove = (position: { x: number; y: number }) => {
    const modalSize = {
        width: width.value,
        height: height.value,
    }
    usePositionConstraint(position, modalSize)
}

const { x, y, style } = useDraggable(draggable, {
    // * Only start the dragging when click on the element directly
    exact: true,
    initialValue: { x: 100, y: 100 },
    onMove: onMove,
})
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    width: 615px;
    height: 460px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: var(--border-radius);
    overflow: hidden;
    z-index: 1000;
    background-color: var(--bg-color);

    &__head {
        padding: 40px 30px 0;
    }

    &__content {
        padding: 30px;
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
}
</style>
