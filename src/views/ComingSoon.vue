<template>
    <div class="wave-area">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 1440 310">
            <path :fill="$vuetify.theme.currentTheme.primary" fill-opacity="1"
                d="M0,0L48,21.3C96,43,192,85,288,90.7C384,96,480,64,576,53.3C672,43,768,53,864,96C960,139,1056,213,1152,224C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
        </svg>

        <div class="wave-text">
            <v-container>
                <div class="d-flex flex-column full">
                    <CountdownArea class="countdown-section" />
                    <h1 class="text-h3 white--text" style="font-weight: 600 !important;">Nuestro sitio se lanzara pronto.</h1>
                    <p class="text-body-1 white--text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
                        Esse, quis illo tempore cupiditate minus non unde voluptates nulla itaque quas quaerat <br>
                        voluptate quia impedit suscipit nisi, quae ex architecto nihil!
                    </p>
                </div>
            </v-container>
        </div>
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
.wave-area {
    height: 100%;
    position: relative;

    svg {
        display: block;
    }

    .wave-text {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        .container {
            height: 100%;

            .full {
                height: 100%;
                gap: 3rem;

                .countdown-section {
                    flex-basis: 55%;
                }
            }
        }
    }
}
</style>