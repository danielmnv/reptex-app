<template>
    <countdown :time="time" class="countdown">
        <div slot-scope="props" class="d-flex align-end countdown-wrapper">
            <!-- Days -->
            <NumberSection :section="{ number: props.days, unit: 'días' }"></NumberSection>
            <!-- Hours -->
            <NumberSection :section="{ number: props.hours, unit: 'horas' }"></NumberSection>
            <!-- Minutes -->
            <NumberSection :section="{ number: props.minutes, unit: 'minutos' }"></NumberSection>
            <!-- Seconds -->
            <NumberSection :section="{ number: props.seconds, unit: 'segundos' }"></NumberSection>
        </div>
    </countdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        NumberSection: () => import('./NumberSection.vue')
    }
})
export default class CountdownArea extends Vue {
    props = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };

    time = Math.abs(new Date(2022, 6, 1, 0, 0, 0, 0).getTime() - new Date().getTime());
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