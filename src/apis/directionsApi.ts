import axios from 'axios';

const directionsApi = axios.create( {
	baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
	params: {
		alternatives: false,
		geometries: 'geojson',
		steps: false,
		overview: 'simplified',
		access_token: ''
	}
} );

export default directionsApi;