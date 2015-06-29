//the base maps
var imageryTopo = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryTopo/MapServer/WmsServer?", {
  layers: 0,
  attribution: " USGS Hybrid Tile, USGS Image Only Dynamic Map, USGS ImageTopo Tile",
});

var nationalMap = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?", {
  layers: 0,
  attribution: " USGS Topo Basemap Tile, USGS Topo Dynamic Map",
});

var imagery = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryOnly/MapServer/WmsServer?", {
  layers: 0,
  attribution: " USGS Image Only Dynamic Map, USGS Image Only Tile",  
});


var basemaps = {
  "The National Map Base Layer": nationalMap,
  "The Nationap Map + Aerial Imagery": imageryTopo,
  "The National Map Imagery": imagery
}

var southWest = L.latLng(11.232404, -185.885037),
  northEast = L.latLng(72.675988, -50.814728),
  bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  layers: [imageryTopo],
  'zoomControl': false,
  'minZoom': 4,
  'maxBounds': bounds
}).setView([34.8138, -96.06445], 4);
50.970844, -179.515997
//zoom custom position
L.control.zoom({
  position: 'topright'
}).addTo(map);

L.control.layers(basemaps, null, {
  position: 'topleft'
}).addTo(map)

//Create list of users automatic
var suma = 0;
var o = '';
for (var i = 0; i < users.length; i++) {
  o += '<li  id="' + users[i].UserName + '">' +
    '<a class="users" href="#' + users[i].UserName + '"> ' + users[i].UserName + ' - ' + users[i].Count + '</a>' +
    '</li>';
};
$('#userlayers').append(o);

//typeahead set-up
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    // an array that will be populated with substring matches
    matches = [];
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

var sourceArr = [];

for (var i = 0; i < users.length; i++) {
  sourceArr.push(users[i].UserName);
}

$('#searchinput').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
}, {
  name: 'sourceArr',
  source: substringMatcher(sourceArr)
});


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

//style points
function Style(feature) {
  return {
    fillColor: "#d17700",
    stroke: 1,
    opacity: 1,
    color: "#000000",
    fillOpacity: 1,
    weight: 1,
    radius: 5
  };
}
//geojson call from list
var geojson;
$('#userlayers li').click(function() {
  var url = this.id;
  console.log(url);
  if (geojson !== undefined) {
    map.removeLayer(geojson);
  }
  $.getJSON("./data/" + url + ".json", function(data) {
    geojson = L.geoJson(data, {
      pointToLayer: function(feature, latlgn) {
        return L.circleMarker(latlgn, Style(feature));
      }
    });
    map.addLayer(geojson);
    map.fitBounds(geojson.getBounds());
    $("#searchinput").val(""); //this clears the search box
    $("#volunteerName").html("<p>Points edited by " + url + "<p>");
  });
});

//geojson call from search box
var geojson;
$('#searchBoxBtn').click(function() {
  var url = $('#searchinput').val();
  console.log(url);
  if (geojson !== undefined) {
    map.removeLayer(geojson);
  }
  $.getJSON("./data/" + url + ".json", function(data) {
    geojson = L.geoJson(data, {
      pointToLayer: function(feature, latlgn) {
        return L.circleMarker(latlgn, Style(feature));
      }
    });
    map.addLayer(geojson);
    map.fitBounds(geojson.getBounds())
    $("#volunteerName").html("<p>Points edited by " + url + "<p>");
  });
});

//show #progress div when making ajax loads
$(document).ajaxStart(function() {
  $("#progress").show();
});

$(document).ajaxComplete(function() {
  $("#progress").hide();
});

//add x button to clear the search field
$("#searchclear").click(function(evt) {
  evt.preventDefault();
  $("#searchinput").val("");
});
