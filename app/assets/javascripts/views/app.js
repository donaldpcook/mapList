'use strict';

mapList.AppView = Backbone.View.extend({
  el: document.getElementById('app'),

  events: {
    'click .new': 'create',
    'keypress .js-app-input': 'createOnEnter'
  },

  initialize: function() {
    this.listenTo(mapList.Locations, 'reset', this.addAll);
    this.listenTo(mapList.Locations, 'add', this.addOne);

    // get the user's locations
    mapList.Locations.fetch({
      reset: true,
      data: {username: mapList.user.get('name')}
    });

    this.$el.removeClass('is-hidden');

    // when unhiding a map, it needs to redraw or else it will be smaller than the container
    mapList.googleMaper.redraw();
  },

  addOne: function(location) {
    var view = new mapList.LocationView({model: location});

    $('#location-list').append(view.render().el);
  },

  addAll: function() {
    mapList.Locations.each(this.addOne, this);

    mapList.googleMaper.addMarkers(mapList.Locations);
  },

  create: function(evt) {
    evt.preventDefault();

    var name = this.$('input').val();

    // makes a call to google's geocoder...once we get that info, create the locations and add the markers
    mapList.googleMaper.getLatLng(name).done(function(latLng) {
      mapList.googleMaper.addMarkers([
        mapList.Locations.create({
          name: name,
          lat: latLng.lat,
          lng: latLng.lng,
          user: mapList.user.get('name')
        })
      ]);
    }).fail(function() {
      alert('No location found');
    });;

    this.$('input').val('');
  },

  createOnEnter: function(evt) {
    if (evt.keyCode === 13) {
      this.create(evt);
    }
  }
});
