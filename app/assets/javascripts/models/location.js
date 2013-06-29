'use strict';

mapList.Location = Backbone.Model.extend({
  url: function() {
    return this.id ? '/locations/' + this.id : '/locations';
  }
});
