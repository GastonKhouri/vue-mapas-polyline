import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/store';


export const usePlacesStore = () => {

	const store = useStore<StateInterface>();

	onMounted( () => {
		if ( !store.getters[ 'places/isUserLocationReady' ] ) {
			store.dispatch( 'places/getInitialLocation' );
		}
	} );

	return {
		// State
		userLocation: computed( () => store.state.places.userLocation ),
		isLoding: computed( () => store.state.places.isLoading ),
		isLoadingPlaces: computed( () => store.state.places.isLoadingPlaces ),
		places: computed( () => store.state.places.places ),

		// Getters
		isUserLocationReady: computed<boolean>( () => store.getters[ 'places/isUserLocationReady' ] ),

		// Actions
		searchPlacesByTerm: ( query: string ) => store.dispatch( 'places/searchPlacesByTerm', query ),

		// Mutations
	};

};
