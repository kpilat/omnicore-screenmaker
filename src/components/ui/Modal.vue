<template>
    <div class="modal">
        <div class="modal__cross">
            <SvgIcon name="cross"/>
        </div>
        <div class="modal__head">
            <h3 class="modal__title">Payment method</h3>
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
</script>

<style lang="scss" scoped>
.modal {
    position: relative;
    width: 615px;
    height: 460px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: var(--border-radius);

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
        transition: all .25s;

        .icon {
            width: 10px;
            height: 10px;
        }

        &:hover {
            background-color: var(--primary-light);

            .icon {
                // color: #fff;
            }
        }
    }
}
</style>
