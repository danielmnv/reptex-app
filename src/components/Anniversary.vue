<template>
    <div class="d-flex align-center justify-center">
        <v-avatar size="500">
            <img
                src="@/assets/anniversary-reptex.jpg"
                alt="John"
            >
        </v-avatar>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class Anniversary extends Vue {

    mounted() {
        this.$confetti.start({
            particlesPerFrame: 0.5,
        });
    }
}

</script>