<template>
    <countdown tag="div" :time="time" :transform="transform" class="countdown">
        <div slot-scope="props" class="d-md-flex align-md-end countdown-wrapper">
            <div v-for="section in dateParts(props)" :key="section.unit" class="d-inline-block mr-7 mr-md-0">
                <NumberSection :section="section"></NumberSection>
            </div>
        </div>
    </countdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// DTO
import DatePartDTO from "@/interfaces/DatePart.dto";
import CountdownDTO from "@/interfaces/Countdown.dto";

@Component({
    components: {
        NumberSection: () => import('./NumberSection.vue')
    }
})
export default class CountdownArea extends Vue {
    props: CountdownDTO = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        totalMilliseconds: 0,
    };

    time = Math.abs(new Date(2022, 6, 1, 0, 0, 0, 0).getTime() - new Date().getTime());

    dateParts(props: CountdownDTO): Array<DatePartDTO> {
        return [
            { number: props.days, unit: 'días' },
            { number: props.hours, unit: 'horas' },
            { number: props.minutes, unit: 'minutos' },
            { number: props.seconds, unit: 'segundos' },
        ];
    }

    transform(props: CountdownDTO) {
        Object.entries(props).forEach(([key, value]) => {
            // Adds leading zero
            const digits = value < 10 ? `0${value}` : value;

            (props as any)[key] = digits;
        });

        return props;
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