imageryTopo = L.tileLayer.wms("http://basemap.nationalmap.gov/arcgis/services/USGSImageryTopo/MapServer/WmsServer?", {
  layers: 0,
  attribution: 'Map tiles by <a href="http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer">USGS</a>'
});

var map = L.map('map', {
  layers: [imageryTopo]
}).setView([34.8138, -96.06445], 4);

//the base map
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer">USGS</a>'
});




$.getJSON("./data/gridEditedPts.json",  function(data){
  L.geoJson(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.pts);
  }
}).addTo(map);
});
