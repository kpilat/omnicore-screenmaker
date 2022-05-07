<template>
    <div class="input-popup" v-if="rendered">
        <form action="javascript:void(0);" id="c-property-form">
            <div class="input-popup__inner">
                <div class="input-popup__content">
                    <div class="input input-fullWidth">
                        <input v-model="currentValue" placeholder="" type="text" name="component-text" />
                    </div>
                </div>
                <!-- Buttons -->
                <div class="c-property-menu__buttons">
                    <div class="button button--primary" data-btn-type="cancel" @click="this.$props.close">Cancel</div>
                    <button class="button button--primary" data-btn-type="save" @click="save">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'input-popup',
    props: {
        rendered: Boolean,
        id: String,
        value: String,
        returnData: Function,
        close: Function,
    },
    data() {
        return {
            currentValue: '',
        };
    },
    watch: {
        rendered: {
            deep: true,
            // whenever property changes, this handler will run
            handler() {
                if (this.rendered) {
                    this.currentValue = this.$props.value;
                }
            },
        },
    },
    methods: {
        save: function () {
            const data = {
                id: this.$props.id,
                value: this.currentValue,
            };
            this.returnData(data);
            this.$props.close();
        },
    },
};
</script>
