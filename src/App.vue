<template>
    <v-app>
        <v-app-bar flat app>
            <v-container >
                <v-row dense no-gutters>
                    <div class="d-flex align-center">
                        <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            src="@/assets/logo.png"
                            transition="scale-transition"
                            width="60"
                        />
                    </div>
    
                    <v-spacer></v-spacer>
    
                    <div class="d-flex align-center">
                        <v-hover
                            v-for="platform in social"
                            :key="platform.name"
                            v-slot="{ hover }"
                            open-delay="100"
                            close-delay="100"
                        >
                            <v-btn
                                icon
                                target="_blank"
                                :href="platform.url"
                                :color="hover ? platform.color : 'default'"
                            >
                                <v-icon large>{{ platform.icon }}</v-icon>
                            </v-btn>
                        </v-hover>
                    </div>

                </v-row>
            </v-container>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <!-- Go to top -->
        <!-- <fab-top /> -->
    </v-app>
</template>

<script lang="ts">
import { MetaInfo } from "vue-meta";
import { Component, Vue } from "vue-property-decorator";

// Components
import FabTop from "@/components/FabTop.vue";

@Component({
    metaInfo(): MetaInfo {
        return {
            title: "Coming Soon",
            titleTemplate: '%s | Reptex'
        };
    },

    components: {
        FabTop
    }
})
export default class extends Vue {
    social = [
        { name: 'Facebook', icon: 'mdi-facebook', color: 'blue darken-3', url: 'https://www.facebook.com/ReptexMX/' },
        { name: 'Instagram', icon: 'mdi-instagram', color: 'pink darken-1', url: 'https://www.instagram.com/reptex.mx/' },
    ];
}
</script>

<style lang="scss" scoped>
.v-application--wrap {
    height: 100vh;
    width: 100%;

    .v-main {
        height: 100%;
        .container {
            height: 100%;
        }
    }
}
</style>
