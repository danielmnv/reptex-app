<template>
    <div class="map-section">

        <gmap-map 
            :center="center"
            :zoom="11"
            :options="{
                // disableDefaultUI: true,
                styles: defaultStyle
            }"
            :style="`width:100%;  height: 100vh`"
        >
            <gmap-marker
                v-for="marker in markers"
                :key="marker.id"
                :position="marker.coords"
                :icon="{
                    // url: require('@/assets/marker.svg'),
                    scaledSize: { width: 55, height: 55 }
                }"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Map extends Vue {
    center = { lat: 21.717158732253438, lng: -102.34607996563899 };

    markers = [
        { id: 1, coords: { lat: 21.884585196546155, lng: -102.29538159685822 } },
        { id: 2, coords: { lat: 21.87547992379967, lng: -102.31237591207008 } },
        { id: 3, coords: { lat: 21.885929549689468, lng: -102.25085171005303 } },
        { id: 4, coords: { lat: 21.51276222660816, lng: -102.23605538324759 } },
        { id: 5, coords: { lat: 21.676609425867426, lng: -102.58922294081896 } },
    ];

    defaultStyle = [
        /** ALL */
        { elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
        { elementType: 'geometry', stylers: [{ color: '#f5f8f8' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#000000' }] },
        /** ADMINISTRATIVE */
        // Country
        {
            featureType: 'administrative.country',
            elementType: 'geometry',
            stylers: [{ weight: '2' }, { color: '#89a6b7' /* accent lighten1 */ }]
        },
        {
            featureType: 'administrative.country',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#1d1d1d' }]
        },
        // Province
        {
            featureType: 'administrative.province',
            elementType: 'geometry',
            stylers: [{ color: '#78a9fa' /* primary lighten3 */ }, { weight: '3' }]
        },
        {
            featureType: 'administrative.province',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#2d2d2d' }]
        },
        // Locality
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#000000' }]
        },
        // Neighborhood
        {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f4f6f9' }]
        },
        /** LANDSCAPE */
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#b3e0ff' /* primary lighten5 */ }]
        },
        /** ROAD */
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#96c4ff' /* primary lighten4 */ }]
        },
        /** POI */
        {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
        },
        /** ROAD */

        /** TRANSIT */
        {
            featureType: 'transit',
            elementType: 'all',
            styles: [{ visibility: 'off' }]
        }
    ];

}
</script>

<style lang="scss">
.map-section {
    position: absolute;
    top: -64px;
    left: 0;
    height: 100%;
    width: 100%;
}
</style>