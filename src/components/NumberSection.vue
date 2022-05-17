<template>
    <div class="d-flex align-start mb-5 mb-md-0">
        <div>
            <span class="font-weight-bold shrink white--text countdown-number">
                {{ section.number }}
            </span>
        </div>
        <div class="countdown-unit">
            <span class=" grey--text text--lighten-2">
                {{ section.unit }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// DTO
import DatePartDTO from "@/interfaces/DatePart.dto";

@Component
export default class NumberSection extends Vue {
    @Prop({ required: true }) readonly section!: DatePartDTO;
}
</script>

<style lang="scss">
.countdown-number {
    font-weight: 600;
    font-size: 3.7rem;
    line-height: 3.4rem;

    @include media-breakpoint-only(sm) {
        font-size: 7rem;
        line-height: 6rem;
    }

    @include media-breakpoint-only(md) {
        font-size: 4rem;
        line-height: 3.9rem;
    }

    @include media-breakpoint-up(lg) {
        font-size: 5.9rem;
        line-height: 5.4rem;
    }
}

.countdown-unit > span {
    font-size: 1rem !important;
}
</style>
