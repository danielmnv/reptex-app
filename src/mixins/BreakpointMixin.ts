import { Component, Vue } from "vue-property-decorator";

@Component
export default class BrreakpointMixin extends Vue {
    isMobile(): boolean {
        return this.$vuetify.breakpoint.smAndDown;
	}

    isTablet(): boolean {
        return this.$vuetify.breakpoint.mdOnly;
    }

    isNotDesktop(): boolean {
        return this.$vuetify.breakpoint.mdAndDown;
    }

    breakpointCase(values: Array<any>): any {
        if (this.isMobile()) {
            return values[0];
        }

        if (this.isTablet()) {
            return values[1];
        }

        return values[2];
    }
}