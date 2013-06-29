'use strict';

// initialize namespace in case it doesn't exist yet
window.mapList = window.mapList || {};

mapList.googleMaper = (function() {
  var mapOptions = {
      center: new google.maps.LatLng(41.878114, -87.629798),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  var geo = new google.maps.Geocoder();
  var bounds = new google.maps.LatLngBounds();
  var map;

  google.maps.event.addDomListener(window, 'load', function() {
      map = new google.maps.Map(document.getElementById("map"),
          mapOptions);
  });

  return {
    getLatLng: function(address) {
      // async call to get latlng from gmaps
      return $.Deferred(function(p) {
        geo.geocode({address: address}, function(result) {
          var latLng = {
            lat: result[0] && result[0].geometry.location.jb,
            lng: result[0] && result[0].geometry.location.kb
          }

          latLng.lat && latLng.lng ? p.resolve(latLng) : p.reject();
        });
      });
    },

    addMarkers: function(locations) {
      this.locations = locations;

      var latLngs = locations.map(function(location) {
        return new google.maps.LatLng(location.get('lat'), location.get('lng'));
      });

      _.each(latLngs, function(latLng, index) {
        // locations may be models or collections
        var model = this.locations.models && this.locations.models[index] || this.locations[index];

        // save the marker to the model
        model.set('marker',
                    new google.maps.Marker({
                      position: latLng,
                      map: map,
                      title: model.get('name')
                    })
                  );

        // allows map to be resized so markers fit
        bounds.extend(latLng);
      }, this);

      // resize map once all markers have been bound
      map.fitBounds(bounds);
    },

    removeMarker: function(marker) {
      marker.setVisible(false);

      // true if success (marker is not visible)
      return !marker.visible;
    },

    redraw: function() {
      google.maps.event.trigger(map, 'resize');
    }
  }
}());
