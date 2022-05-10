import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        themes: {
            light: {
                primary: '#0b5da6',
                secondary: '#ff823b',
                accent: '#6f8c9c',
            },
            dark: {
                primary: '#0b5da6',
                secondary: '#ff823b',
                accent: '#6f8c9c',
            }
        }
    },
});
