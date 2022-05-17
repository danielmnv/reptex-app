<template>
    <div class="wave-area">
        <div class="wave-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path :fill="$vuetify.theme.currentTheme.background" fill-opacity="1"
                    d="M0,224L34.3,240C68.6,256,137,288,206,261.3C274.3,235,343,149,411,96C480,43,549,21,617,26.7C685.7,32,754,64,823,112C891.4,160,960,224,1029,256C1097.1,288,1166,288,1234,266.7C1302.9,245,1371,203,1406,181.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
                </path>
            </svg>
        </div>

        <div class="wave-wrapper">
            <v-container>
                <div class="d-flex flex-column flex-md-row justify-space-around justify-md-space-between wave-content">
                    <div class="order-md-first d-flex flex-column wave-text">
                        <CountdownArea class="countdown-section" />
                        <h1 :class="`${isNotDesktop() ? 'text-h4' : 'text-h3'} font-weight-bold white--text`">¡Nuestro sitio se lanzará pronto!</h1>
                        <div class="text-body-1 white--text">
                            Estamos trabajando en un sitio moderno y espectacular para ti<br>
                            para conmemorar nuestro decimo noveno aniversario.<br>
                            Sigue en contacto con nosotros a través de nuestros medios de comunicación.
                            <div class="d-flex align-center mt-4">
                                <v-btn 
                                    fab
                                    small
                                    color="green darken1"
                                    href="https://wa.me/5214491469078/?text=Hola%2C%20revisando%20su%20sitio%20web%20encontr%C3%A9%20este%20n%C3%BAmero%20y%20quisiera%20preguntar%20sobre%20informaci%C3%B3n%20de..."
                                >
                                    <v-icon color="white">mdi-whatsapp</v-icon>
                                </v-btn>
                                <span class=" ml-4 text-h6 tel-link"><a href="tel:4491469078">449 146 90 78</a></span>
                            </div>
                            
                        </div>
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

    .wave-svg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;

        background: linear-gradient(-45deg, var(--v-primary-darken4), var(--v-secondary-base), var(--v-primary-base), cyan);
        background-size: 400% 400%;
        animation: gradient 8s ease infinite;

        svg {
            display: block;
        }
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

.tel-link {
    a {
        color: var(--v-background-base) !important;
        text-decoration: none;
    }
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>