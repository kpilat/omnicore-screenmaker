<template>
    <div ref="componentWrapperRef" class="fp-component">
        <!-- Button -->
        <div v-if="type === 'button'"
             class="fp-button"
             ref="draggableRef"
             :style="style"
        >
            <span class="fp-button__text">{{ componentText }}</span>
        </div>

        <!-- Digital -->
        <div v-if="type === 'digital'"
             class="fp-digital"
             ref="draggableRef"
             :style="style"
        >
            <div class="fp-digital__value">0</div>
            <div class="fp-digital__text">{{ componentText }}</div>
        </div>

        <!-- Input -->
        <div v-if="type === 'input'"
             class="fp-input"
             ref="draggableRef"
             :style="style"
        >
            <div class="fp-input__inner">
                <p>{{ componentText }}</p>
            </div>
        </div>

        <!-- Label -->
        <div v-if="type === 'label'"
             class="fp-label"
             ref="draggableRef"
             :style="style"
        >
            <div>{{ componentText }}</div>
        </div>

        <!-- Radio -->
        <div v-if="type === 'radio'"
             class="fp-radio"
             ref="draggableRef"
             :style="style"
        >
            <div class="fp-radio__value">
                <div></div>
            </div>
            <span class="fp-radio__text">{{ componentText }}</span>
        </div>

        <!-- Switch -->
        <div v-if="type === 'switch'"
             class="fp-switch"
             ref="draggableRef"
             :style="style"
        >
            <div class="fp-switch__button">
                <div></div>
            </div>
        </div>

        <!-- Toggle TODO: value logic + app build + styles -->
        <div v-if="type === 'toggle'"
             class="fp-components-base fp-components-toggle"
        >
            <div class="fp-components-toggle-on" style="padding: 12px 32px 12px 8px">
                <div
                    class="fp-components-toggle-icon"
                    style="background-image: none"
                ></div>
                <div>Value 0</div>
            </div>
            <div class="" style="padding: 12px 32px 12px 8px">
                <div
                    class="fp-components-toggle-icon"
                    style="background-image: none"
                ></div>
                <div>Value 1</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// imports
import { onUpdated, ref } from 'vue'
import { useDraggable } from '@vueuse/core'

// props
const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value: string) => {
            return ['button', 'digital', 'input', 'label', 'radio', 'switch', 'toggle'].includes(value)
        }
    },
    componentText: {
        String,
        default: (props: any): string => props.type
    }
})

// draggable
const componentWrapperRef = ref<HTMLElement | null>(null)
const draggableRef = ref<HTMLElement | null>(null)
const {x, y, style} = useDraggable(draggableRef, {
    onStart: () => {
        if (!draggableRef.value || !componentWrapperRef.value) return
        componentWrapperRef.value.style.height = draggableRef.value.offsetHeight + 'px'
        draggableRef.value.classList.add('dragging')
    },
    onEnd: () => {
        if (!draggableRef.value || !componentWrapperRef.value) return
        componentWrapperRef.value.removeAttribute('style')
        draggableRef.value.classList.remove('dragging')
        draggableRef.value.removeAttribute('style')
    }
})
</script>

<style lang="scss" scoped>
.fp-component {
    font-family: "Segoe UI", "Verdana", "sans-serif";
    font-size: 16px;
    position: relative;

    & > * {
        width: fit-content;
        user-select: none;

        &.dragging {
            position: fixed;
        }
    }
}

// button
.fp-button {
    background-color: var(--fp-color-GRAY-20);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 18px;
    transition: transform 0.03s linear;
    font-size: 1.0em;
    border-radius: 4px;
    min-width: 90px;
    height: 40px;
    box-sizing: border-box;
    border-style: solid;
    border-color: var(--fp-color-GRAY-20);
    border-width: 2px;
    color: var(--fp-color-PRIMARY-TEXT);

    &__text {
        flex: 1 0 auto;
        text-align: center;
    }
}

// digital
.fp-digital {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__value {
        box-sizing: content-box;
        margin: 3px;
        width: 24px;
        height: 24px;

        font-weight: bold;
        font-size: 17.5px;
        text-align: center;

        color: white;
        background-color: #b2b2b2;

        border-radius: 13px;
        border-style: solid;
        border-color: #f0f0f0;
        border-width: 2px;

        transition: all 0.15s linear;
    }

    &__text {
        margin-left: 10px;
        white-space: nowrap;
        font-size: inherit;
    }
}

// input
.fp-input {

    &__inner {
        box-sizing: border-box;
        min-width: fit-content;
        width: 220px;
        min-height: 40px;
        display: flex;
        color: black;
        background-color: white;
        border-style: solid;
        border-width: 2px;
        border-color: rgb(153, 153, 153);
        padding: 6px;
        transition: all 0.15s linear;

        & > p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
        }
    }
}

// label
.fp-label {

    & > div {
        white-space: nowrap;
    }
}

// radio
.fp-radio {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__value {
        display: flex;
        background-color: white;
        border-style: solid;
        border-width: 2px;
        border-radius: 16px;
        width: 20px;
        height: 20px;
        margin: 0;
        padding: 0;
        transition: all 0.2s linear;

        & > div {
            width: 10px;
            height: 10px;
            border-radius: 10px;
            margin-left: 3px;
            margin-top: 3px;
            transition: all 0.2s linear;
        }
    }

    &__text {
        margin-left: 10px;
        white-space: nowrap;
        font-size: inherit;
    }
}

// switch
.fp-switch {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__button {
        box-sizing: content-box;
        display: inline-block;
        background-color: white;
        border-style: solid;
        border-color: black;
        border-width: 2px;
        border-radius: 10px;
        height: 16px;
        width: 40px;

        & > div {
            background-color: black;
            border-radius: 10px;
            height: 10px;
            width: 10px;
            padding: 0;
            margin: 3px 3px 0 3px;
        }
    }
}
</style>