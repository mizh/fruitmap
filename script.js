var mymap = L.map('mapid').setView([53.544, -113.491], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWl6aCIsImEiOiJjajZqcjhjdHcxOHA1MnltcWtrNG5pcWgzIn0.OBBHFGPlu9LpDJkWC6sPQg'
}).addTo(mymap);

mymap.locate({setView: true, maxZoom: 14});

var geojsonMarkerOptions = {
    radius: 7.6,
    fillColor: "black",
    weight: 0,
    opacity: 1,
    fillOpacity: 0.6
};

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(mymap)
    L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);




var customLayer = L.geoJson(null, {
    
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    
    onEachFeature: function(feature, layer) {
    	if (feature.properties.CULTIVAR=='Apricot') {
    		layer.bindPopup(feature.properties.CULTIVAR);
    	}
    	else if (feature.properties.CULTIVAR!='NaNN') {
	        layer.bindPopup(feature.properties.SPECIES_COMMON.concat(' (Cultivar: ', feature.properties.CULTIVAR, ')'));
    	}
    	else {
   		 	layer.bindPopup(feature.properties.SPECIES_COMMON);
    	}
    },
    
    style: function(feature) {
    if (feature.properties.SPECIES_COMMON=='Crabapple') {
    		return { fillColor: "orange" };
    	}
    	else if (feature.properties.SPECIES_COMMON=='Cherry, Sour') {    	
    		return { fillColor: "red" };
		}
    	else if (feature.properties.SPECIES_COMMON=='Saskatoon, Tree Form') {    	
    		return { fillColor: "purple" };
		}
    	else if (feature.properties.SPECIES_COMMON=='Apple') {    	
    		return { fillColor: "pink" };
		}
    	else if ((feature.properties.SPECIES_COMMON=='Plum, Chinese') | (feature.properties.SPECIES_COMMON=='Plum, Hybrid')) {    	
    		return { fillColor: "yellow" };
		}
    	else if (feature.properties.SPECIES_COMMON=='Pear, Ussurian') {    	
    		return { fillColor: "green" };
		}
    	else if (feature.properties.CULTIVAR=='Apricot') {    	
    		return { fillColor: "blue" };
		}
   	 	else {
    		return { fillColor: "white" };
    	}
	}
	
}).addTo(mymap);

var runLayer = omnivore.csv('edibleFruits.csv', null, customLayer);
