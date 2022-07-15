<template>
    <div class="ribbon">
        <SvgIcon name="vite" class="ribbon__logo" color="#000" />
        <div class="ribbon__nav">
            <div class="ribbon__tab">
                <SvgIcon name="vite" />
            </div>
            <div class="ribbon__tab">
                <SvgIcon name="vite" class="ribbon__icon" color="#000" />
            </div>
            <div class="ribbon__tab">
                <SvgIcon name="vite" class="ribbon__icon" color="#000" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import SvgIcon from '@components/SvgIcon.vue'
</script>

<style lang="scss" scoped>
.ribbon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: var(--ribbon-height);
    background-color: var(--bg-color);
    border-bottom: 2px solid var(--border-color);

    // electron window behavior
    -webkit-user-select: none;
    -webkit-app-region: drag;

    &__logo {
        height: 100%;
    }

    &__nav {
        display: flex;
        margin-left: auto;
        width: 290px;
    }

    &__tab {
        position: relative;
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:first-child:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 70%;
            background-color: var(--border-color);
        }

        .icon {
            height: 25px;
        }
    }
}
</style>
