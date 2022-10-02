import axios from 'axios';

const placesApi = axios.create( {
	baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
	params: {
		language: 'es',
		limit: 4,
		access_token: ''
	}
} );

export default placesApi;