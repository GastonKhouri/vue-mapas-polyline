import { defineComponent, ref, onMounted, watch } from 'vue';
import Mapboxgl from 'mapbox-gl';

import { useMapStore, usePlacesStore } from '@/composables';

export default defineComponent( {
	name: 'MapView',
	setup() {

		const mapElement = ref<HTMLDivElement>();

		const { userLocation, isUserLocationReady } = usePlacesStore();

		const { setMap } = useMapStore();

		const initMap = async () => {

			if ( !mapElement.value ) throw new Error( "Map element is not defined" );
			if ( !userLocation.value ) throw new Error( "User location is not defined" );

			await Promise.resolve();

			const map = new Mapboxgl.Map( {
				container: mapElement.value, // container ID
				style: 'mapbox://styles/mapbox/streets-v11', // style URL
				center: userLocation.value, // starting position [lng, lat]
				zoom: 15, // starting zoom
			} );

			const myLocationPopup = new Mapboxgl.Popup()
				.setLngLat( userLocation.value )
				.setHTML( '<h3>My Location</h3>' );

			const myLocationMarker = new Mapboxgl.Marker()
				.setLngLat( userLocation.value )
				.setPopup( myLocationPopup )
				.addTo( map );

			setMap( map );

		};

		onMounted( () => {
			if ( isUserLocationReady.value ) {
				return initMap();
			}
		} );

		watch( isUserLocationReady, ( isReady ) => {
			if ( isReady ) {
				return initMap();
			}
		} );

		return {
			isUserLocationReady,
			mapElement
		};
	}
} );