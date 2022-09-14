<template>
    <!-- Button -->
    <div v-if="type === 'button'"
         class="fp-components-button"
    >
        <span class="fp-components-button-text text">{{ componentText }}</span>
    </div>

    <!-- Digital -->
    <div v-if="type === 'digital'"
         class="fp-components-digital-a-container"
    >
        <div class="fp-components-digital-a">0</div>
        <div class="fp-components-digital-a-desc text">{{ componentText }}</div>
    </div>

    <!-- Input -->
    <div v-if="type === 'input'"
         class="fp-components-input-container"
    >
        <div class="fp-components-input">
            <p>{{ componentText }}</p>
        </div>
    </div>

    <!-- Label -->
    <div v-if="type === 'label'" style="font-size: 18px;" data-type="label" data-text="Label">
        <div style="white-space:nowrap;" class="text">{{ componentText }}</div>
    </div>

    <!-- Radio -->
    <div v-if="type === 'radio'"
         class="fp-components-radio-container"
    >
        <div class="fp-components-radio">
            <div></div>
        </div>
        <span class="fp-components-radio-desc text">{{ componentText }}</span>
    </div>

    <!-- Switch -->
    <div v-if="type === 'switch'"
        class="fp-components-switch-container"
    >
        <div class="fp-components-switch-button">
            <div></div>
        </div>
    </div>

    <!-- Toggle TODO: value logic + app build -->
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
</template>

<script lang="ts" setup>
// imports

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
</script>

<style lang="scss" scoped>

</style>