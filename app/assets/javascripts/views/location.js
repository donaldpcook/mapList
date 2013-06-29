'use strict';

mapList.LocationView = Backbone.View.extend({
  tagName: 'li',

  template: _.template(document.getElementById('location-template').innerHTML),

  events: {
    'click .edit': 'edit',
    'click .js-update': 'update',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  edit: function(evt) {
    evt.preventDefault();

    this.$('.normal-mode').addClass('is-hidden');
    this.$('.edit-mode').removeClass('is-hidden');
  },

  update: function(evt) {
    evt.preventDefault();

    var name = this.$('.js-user-input').val();
    var model = this.model;

    if (name) {
      mapList.googleMaper.removeMarker(this.model.get('marker'));
      // remove old marker from model to prevent circular structure
      model.set('marker', '');


      mapList.googleMaper.getLatLng(name).done(function(latLng) {
        model.save({
          name: name,
          lat: latLng.lat,
          lng: latLng.lng
        })

        mapList.googleMaper.addMarkers([model]);
      }).fail(function() {
        alert('No location found');
      });
    } else {
      this.destroy(evt);
    }
  },

  destroy: function(evt) {
    evt.preventDefault();

    mapList.googleMaper.removeMarker(this.model.get('marker'));
    this.model.destroy();
  }
});
