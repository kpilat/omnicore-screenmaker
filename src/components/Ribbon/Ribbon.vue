<template>
    <div class="ribbon">
        <SvgIcon name="vite" class="ribbon__logo" color="#000" />
        <div class="ribbon__nav">
            <div class="ribbon__tab">
                <SvgIcon name="settings" />
            </div>
            <div class="ribbon__tab">
                <SvgIcon name="components" class="ribbon__icon" color="#000" />
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
        position: relative;
        display: flex;
        justify-content: space-evenly;
        margin-left: auto;
        width: 290px;

        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 70%;
            background-color: var(--border-color);
        }
    }

    &__tab {
        position: relative;
        width: fit-content;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;

        .icon {
            width: 18px;
            height: 18px;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: max(40%, 35px);
            height: 0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background-color: var(--primary);
            // opacity: 0;
        }
        &:hover:after {
            height: 4px;
            transition: height 0.25s;
        }
    }
}
</style>
