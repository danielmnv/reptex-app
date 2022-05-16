<template>
    <div class="d-flex align-center justify-center">
        <v-avatar 
            size="250"
            class="elevation-10 hover cursor-pointer"
            @click="startCongrats"
        >
            <img src="@/assets/anniversary-reptex.jpg" alt="REPTEX Anniversary">
        </v-avatar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Anniversary extends Vue {
    animationTimeout = 0;

    mounted() {
        this.startCongrats();
    }

    startCongrats() {
        clearTimeout(this.animationTimeout);
        this.animationTimeout = setTimeout(() => this.stopCongrats(), 8000);

        this.$confetti.start({
            particlesPerFrame: 0.6,
        });
    }

    stopCongrats() {
        this.$confetti.stop();
    }
}

</script>

<style lang="scss">
.cursor-pointer {
    cursor: pointer;
}
</style>