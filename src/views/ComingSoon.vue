<template>
    <div class="d-flex flex-column full">
        <CountdownArea class="countdown-section" />
        <h1 class="text-h3" style="font-weight: 600 !important;">Nuestro sitio se lanzara pronto.</h1>
        <p class="text-body-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
            Esse, quis illo tempore cupiditate minus non unde voluptates nulla itaque quas quaerat <br>
            voluptate quia impedit suscipit nisi, quae ex architecto nihil!</p>
    </div>
</template>

<script lang="ts">
import { MetaInfo } from "vue-meta";
import { Component, Vue } from "vue-property-decorator";

@Component({
    metaInfo(): MetaInfo {
        return {
            title: 'Coming Soon'
        };
    },
    
    components: {
        CountdownArea: () => import('@/components/CountdownArea.vue')
    }
})
export default class ComingSoon extends Vue {
}

</script>

<style lang="scss">
.full {
    height: 100%;
    gap: 3rem;
}

.countdown-section {
    flex-basis: 65%;
}
</style>