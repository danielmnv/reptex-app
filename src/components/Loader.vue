<template>
    <div class="loading">
        <div class="dot-animation">
            <div class="dot"></div>
        </div>
        <div class="dot-animation">
            <div class="dot"></div>
        </div>
        <v-img class="loading-img" src="@/assets/logo.png" max-height="75" max-width="75"></v-img>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {

}
</script>

<style lang="scss">
.loading {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--v-background-base);
    z-index: 99;

    .dot-animation {
        &:nth-child(1) {
            --dot-color: var(--v-primary-base);
            transform: translateX(50%);
        }

        &:nth-child(2) {
            --dot-color: var(--v-accent-base);
            transform: translateX(-50%) rotateZ(180deg);
        }

        .dot {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border-width: 5px 5px 5px 5px;
            border-style: solid;
            border-color: transparent;
            border-top-color: var(--dot-color, --v-secondary-base);
            position: relative;
            animation: animate 2s linear infinite;

            &:before {
                position: absolute;
                content: '';
                width: 18px;
                height: 18px;
                border-radius: 16px;
                background-color: var(--dot-color, --v-secondary-base);
                right: 0;
                top: 12px;
                right: 2px;
                box-shadow: 0 0 32px 3px var(--dot-color, --v-secondary-base);
            }
        }
    }

    .loading-img {
        position: absolute;
    }
}

@keyframes animate {
    from {
        transform: rotateZ(0deg);
    }

    to {
        transform: rotateZ(360deg);
    }
}
</style>