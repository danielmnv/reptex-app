<template>
    <p class="text-center">Coming Soon</p>
</template>

<script lang="ts">
import { MetaInfo } from "vue-meta";
import { Component, Vue } from "vue-property-decorator";

@Component({
    metaInfo(): MetaInfo {
        return {
            title: 'Coming Soon'
        };
    }
})
export default class ComingSoon extends Vue {

}

</script>