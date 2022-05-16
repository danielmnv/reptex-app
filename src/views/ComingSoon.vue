<template>
    <div class="wave-area">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 1440 310">
            <path :fill="$vuetify.theme.currentTheme.primary" fill-opacity="1"
                d="M0,0L48,21.3C96,43,192,85,288,90.7C384,96,480,64,576,53.3C672,43,768,53,864,96C960,139,1056,213,1152,224C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
        </svg>

        <div class="wave-wrapper">
            <v-container>
                <div class="d-flex flex-column flex-md-row justify-space-around justify-md-space-between wave-content">
                    <div class="order-md-first d-flex flex-column wave-text">
                        <CountdownArea class="countdown-section" />
                        <h1 :class="`${isNotDesktop() ? 'text-h4' : 'text-h3'} font-weight-bold white--text`">Nuestro sitio se lanzará pronto.</h1>
                        <p class="text-body-1 white--text">
                            Estamos trabajando en un sitio moderno y espectacular para ti<br>
                            para conmemorar nuestro decimo noveno aniversario.<br>
                            Sigue en contacto con nosotros a través de nuestros medios de comunicación.
                        </p>
                    </div>

                    <Anniversary class="order-first" />
                </div>
            </v-container>
        </div>

    </div>
</template>

<script lang="ts">
import { MetaInfo } from "vue-meta";
import { Component, Mixins } from "vue-property-decorator";

// Mixins
import BreakpointMixin from "@/mixins/BreakpointMixin";

@Component({
    metaInfo(): MetaInfo {
        return {
            title: 'Coming Soon'
        };
    },

    components: {
        CountdownArea: () => import('@/components/CountdownArea.vue'),
        Anniversary: () => import('@/components/Anniversary.vue')
    }
})
export default class ComingSoon extends Mixins(BreakpointMixin) {
}

</script>

<style lang="scss">
.wave-area {
    height: 100%;
    position: relative;

    svg {
        display: block;
    }

    .wave-wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 12px;

        .container {
            height: 100%;
            
            .wave-content {
                height: 100%;

                @include media-breakpoint-up(md) {
                    gap: 3rem;
                }

                .wave-text {
                    height: auto;
                    gap: 2rem;

                    @include media-breakpoint-up(md) {
                        height: 100%;
                        gap: 3rem;
                        padding-left: 0;
                    }

                    .countdown-section {
                        flex-basis: 30%;
                        @include media-breakpoint-up(md) {
                            flex-basis: 55%;
                        }
                    }
                }
            }
        }
    }
}
</style>