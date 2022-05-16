<template>
    <div class="d-flex flex-column align-center justify-center">
        <v-avatar class="elevation-10" :size="size">
            <img src="@/assets/anniversary-reptex.jpg" alt="REPTEX Anniversary">
        </v-avatar>
        <v-btn class="mx-2 mt-4" fab dark small color="background" @click="toggleParty">
            <v-icon dark color="primary">
                mdi-party-popper
            </v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BrreakpointMixin from "@/mixins/BreakpointMixin";

@Component
export default class Anniversary extends Mixins(BrreakpointMixin) {
    rain = false;

    mounted() {
        this.start();
    }

    start() {
        this.rain = true;
        this.$confetti.start({
            particlesPerFrame: 0.8,
        });
    }

    stop() {
        this.rain = false;
        this.$confetti.stop();
    }

    toggleParty() {
        if (this.rain) {
            this.stop();
        }
        else {
            this.start();
        }
    }

    get size(): number {
        return this.breakpointCase([150, 200, 250]);
    }
}

</script>