import { ActionTree } from 'vuex';

import { PlacesState } from './state';
import { StateInterface } from '../index';
import { placesApi } from '../../apis';
import { Feature, PlacesResponse } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
	someAction( /*{ commit }, payload  */ ) {
		// a line to prevent linter errors
	},
	getInitialLocation( { commit } ) {
		navigator.geolocation.getCurrentPosition(
			( { coords } ) => commit( 'setUserLocation', { lng: coords.longitude, lat: coords.latitude } ),
			( error ) => {
				console.error( error );
				throw new Error( "Couldn't get user location" );
			}
		);
	},

	async searchPlacesByTerm( { commit, state }, query: string ): Promise<Feature[]> {

		if ( query.length === 0 ) {
			commit( 'setPlaces', [] );
			return [];
		}


		if ( !state.userLocation ) {
			throw new Error( "User location is not defined" );
		}

		commit( 'setIsLoadingPLaces' );

		const { data } = await placesApi.get<PlacesResponse>( `/${ query }.json`, {
			params: {
				proximity: state.userLocation?.join( ',' )
			}
		} );

		commit( 'setPlaces', data.features );

		return data.features;

	}
};


export default actions;