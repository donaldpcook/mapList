'use strict';

mapList.LocationList = Backbone.Collection.extend({
  model: mapList.Location,
  url: '/locations'
});
