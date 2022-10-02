import { MutationTree } from 'vuex';
import { PlacesState } from './state';


const mutation: MutationTree<PlacesState> = {
	someMutation( /* state: ExampleStateInterface */ ) {
		// a line to prevent linter errors
	},
	setUserLocation( state, { lng, lat }: { lng: number, lat: number; } ) {
		state.userLocation = [ lng, lat ];
		state.isLoading = false;
	},
	setIsLoadingPLaces( state ) {
		state.isLoadingPlaces = true;
	},
	setPlaces( state, places ) {
		state.places = places;
		state.isLoadingPlaces = false;
	}
};


export default mutation;