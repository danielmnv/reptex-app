<template>
    <countdown tag="div" :time="time" class="countdown">
        <div 
            slot-scope="props"
            class="d-md-flex align-md-end countdown-wrapper"
        >
            <div v-for="section in dateParts(props)" :key="section.unit" class="d-inline-block mr-7 mr-md-0">
                <NumberSection :section="section"></NumberSection>
            </div>
        </div>
    </countdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// DTO
import DatePart from "@/interfaces/DatePart.dto";

@Component({
    components: {
        NumberSection: () => import('./NumberSection.vue')
    }
})
export default class CountdownArea extends Vue {
    props = {};

    time = Math.abs(new Date(2022, 6, 1, 0, 0, 0, 0).getTime() - new Date().getTime());

    dateParts(props: any): Array<DatePart> {
        return [
            { number: props.days, unit: 'días' },
            { number: props.hours, unit: 'horas' },
            { number: props.minutes, unit: 'minutos' },
            { number: props.seconds, unit: 'segundos' },
        ];
    }
}

</script>

<style lang="scss">
.countdown {
    height: 100%;
    width: 100%;

    .countdown-wrapper {
        height: 100%;
        width: 100%;
        gap: 2rem;
    }
}
</style>