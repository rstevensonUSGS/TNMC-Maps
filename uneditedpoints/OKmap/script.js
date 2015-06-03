//the base maps
var imageryTopo = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryTopo/MapServer/WmsServer?", {
  layers: 0
});

var nationalMap = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?", {
  layers: 0
});

var imagery = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryOnly/MapServer/WmsServer?", {
  layers: 0
});

var southWest = L.latLng(33.656464, -103.671392),
  northEast = L.latLng(37.601827, -93.761725),
  bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  'zoomControl': false,
  'maxBounds': bounds,
  'minZoom': 7,
  layers: [nationalMap]
}).setView([35.501597, -98.222174], 7);

var basemaps = {
  "The National Map Base Layer": nationalMap,
  "The Nationap Map + Aerial Imagery": imageryTopo,
  "The National Map Imagery": imagery
}

L.control.layers(basemaps, null, {
  position: 'topleft'
}).addTo(map);


//nice progress bar
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');

function updateProgressBar(processed, total, elapsed, layersArray) {
  if (elapsed > 100) {
    // if it takes more than a second to load, display the progress bar:
    progress.style.display = 'block';
    progressBar.style.width = Math.round(processed / total * 100) + '%';
  }

  if (processed === total) {
    // all markers processed - hide the progress bar:
    progress.style.display = 'none';
  }
}

var pointStyle = {
  radius: 5,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

//begin filter and add data to layers
var all = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
  var geoJson = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
      var customIcon = L.icon({
        iconUrl: './src/icon/' + feature.properties.FCode + '.png',
        iconSize: [24, 24],
      });
      return L.marker(latlng, {
        icon: customIcon
      }).bindPopup(popupContent);
    }
  });
  all.addLayer(geoJson).addTo(map);
});

var school = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "School";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
school.addLayer(geoJson);
});

var ambulance = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Ambulance Services";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
ambulance.addLayer(geoJson);
});

var college = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "College / University";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
college.addLayer(geoJson);
});

var fire = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Fire Station / EMS Station";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
fire.addLayer(geoJson);
});

var hospital = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Hospital / Medical Center";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
hospital.addLayer(geoJson);
});

var law = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Law Enforcement";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
law.addLayer(geoJson);
});

var post = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Post Office";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
post.addLayer(geoJson);
});

var prison = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Prison / Correctional Facility";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
prison.addLayer(geoJson);
});

var cemetery = new L.markerClusterGroup({
  chunkedLoading: true,
  chunkProgress: updateProgressBar,
  showCoverageOnHover: false
});
$.getJSON("../data/OK.json", function(data) {
var geoJson = L.geoJson(data, {
  filter: function(feature, layer) {
    return feature.properties.Feature == "Cemetery";
  },
  pointToLayer: function(feature, latlng) {
    var popupContent = '<a href=' + feature.properties.OSM_LINK + ' target="_blank">Edit this point</a>';
    var customMarker = L.icon({
      iconUrl: './src/icon/' + feature.properties.FCode + '.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: customMarker
    }).bindPopup(popupContent);
  }
});
cemetery.addLayer(geoJson);
});
//end filter and add data to layers


//reset button
$("#reset").click(function() {
  if (map.hasLayer(school)) {
    map.removeLayer(school);
  }
  if (map.hasLayer(ambulance)) {
    map.removeLayer(ambulance)
  }
  if (map.hasLayer(college)) {
    map.removeLayer(college)
  }
  if (map.hasLayer(fire)) {
    map.removeLayer(fire)
  }
  if (map.hasLayer(hospital)) {
    map.removeLayer(hospital)
  }
  if (map.hasLayer(law)) {
    map.removeLayer(law)
  }
  if (map.hasLayer(post)) {
    map.removeLayer(post)
  }
  if (map.hasLayer(prison)) {
    map.removeLayer(prison)
  }
  if (map.hasLayer(cemetery)) {
    map.removeLayer(cemetery)
  }
  $("button").removeClass('active');
  $("button").find('span').removeClass('glyphicon glyphicon-ok');
});

//add and remove layers trough buttons
$("button").click(function(event) {
  layerClicked = window[event.target.id];
  if (map.hasLayer(all)) {
    map.removeLayer(all);
  }
  if (map.hasLayer(layerClicked)) {
    map.removeLayer(layerClicked);
  } else {
    map.addLayer(layerClicked);
  }
});

//add checkmark to each button
$("button").click(function() {
  if ($(this).children().hasClass('glyphicon glyphicon-ok')) {
    $(this).find('span').removeClass('glyphicon glyphicon-ok');
  } else {
    $(this).find('span').addClass('glyphicon glyphicon-ok');
  }
});
