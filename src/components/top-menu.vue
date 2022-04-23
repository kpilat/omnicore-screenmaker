<template>
    <div class="top-menu-wrapper">
        <div class="container">
            <div class="top-menu">
                <!-- <div class="button" id="build-app">Build app</div>
                <div class="button">Save project</div>
                <div class="button">Open project</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import Utilities from "./../js/modules/utilities";

export default {
    name: "top-menu",
    props: {},
    methods: {
        // saveProject: () => {
        //     const components = [];
        //     window.components?.forEach((item) =>
        //         components.push(Utilities.toJSON(item))
        //     );

        //     window.api.send("save", JSON.stringify(components));
        // },
        // loadProject: async () => {
        //     window.api.send("load");
        // },
    },

    created() {
    },
};
</script>
