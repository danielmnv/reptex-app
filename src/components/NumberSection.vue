<template>
    <div class="d-flex align-start">
        <div class="d-flex align-start">
            <span class="countdown-number shrink">{{ section.number }}</span>
        </div>
        <div class="countdown-unit d-flex align-start">
            <span class=" grey--text text--darken-2">{{ section.unit }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface DatePart {
    number: any,
    unit: string
}

@Component
export default class NumberSection extends Vue {
    @Prop({ required: true }) readonly section!: DatePart;
}
</script>

<style lang="scss">
.countdown-number {
    font-weight: 600;
    font-size: 8rem;
    line-height: 7rem;
}

.countdown-unit > span {
    font-size: 1rem !important;
}
</style>
