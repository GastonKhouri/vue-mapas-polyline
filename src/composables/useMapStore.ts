import { useStore } from 'vuex';
import { computed } from 'vue';
import { Map } from 'mapbox-gl';

import { StateInterface } from '@/store';
import { Feature } from '../interfaces/places';
import { LngLat } from '@/store/map/actions';


export const useMapStore = () => {

	const store = useStore<StateInterface>();

	return {
		map: computed( () => store.state.map.map ),
		distance: computed( () => store.state.map.distance ),
		duration: computed( () => store.state.map.duration ),

		// Mutations
		setMap: ( map: Map ) => store.commit( 'map/setMap', map ),
		setPlaceMarkers: ( places: Feature[] ) => store.commit( 'map/setPlaceMarkers', places ),

		// Getters
		isMapReady: computed<boolean>( () => store.getters[ 'map/isMapReady' ] ),

		// Actions
		getRouteBetweenPoints: ( start: LngLat, end: LngLat ) => store.dispatch( 'map/getRouteBetweenPoints', { start, end } )
	};

};
