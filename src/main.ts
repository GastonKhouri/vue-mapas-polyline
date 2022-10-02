import { createApp } from 'vue';
import mapboxgl from 'mapbox-gl';

import App from './App.vue';
import router from './router';
import store from './store';

mapboxgl.accessToken = '';

if ( !navigator.geolocation ) {

	alert( 'Geolocation is not supported by your browser' );
	throw new Error( 'Geolocation is not supported by your browser' );

}

createApp( App ).use( store ).use( router ).mount( '#app' );
