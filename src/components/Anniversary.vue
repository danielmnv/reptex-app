<template>
    <div class="d-flex align-center justify-center">
        <v-avatar 
            class="elevation-10 hover cursor-pointer"
            :size="size"
            @click="startCongrats"
        >
            <img src="@/assets/anniversary-reptex.jpg" alt="REPTEX Anniversary">
        </v-avatar>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BrreakpointMixin from "@/mixins/BreakpointMixin";

@Component
export default class Anniversary extends Mixins(BrreakpointMixin) {
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

    get size(): number {
        return this.breakpointCase([150, 200, 250]);
    }
}

</script>

<style lang="scss">
.cursor-pointer {
    cursor: pointer;
}
</style>