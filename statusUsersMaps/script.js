imageryTopo = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryTopo/MapServer/WmsServer?", {
  layers: 0,
  attribution: 'Map tiles by <a href="http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer"<USGS</a<'
});

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

$('#searchUser').typeahead({
  hint: true,
 highlight: true,
 minLength: 1
 },
 {
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
    fillColor: "#fff",
    stroke: false,
    opacity: 1,
    color: "#000",
    fillOpacity: 1,
    weight: 1,
    radius: 2
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
  });
});

//geojson call from search box
var geojson;
$('#searchBoxBtn').click(function() {
  var url = $('#searchUser').val();
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
  });
});

$(document).ajaxStart(function () {
    $("#progress").show();
});

$(document).ajaxComplete(function () {
    $("#progress").hide();
});