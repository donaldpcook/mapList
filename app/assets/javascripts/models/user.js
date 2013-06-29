'use strict';

mapList.User = Backbone.Model.extend({
  url: function() {
    return this.id ? '/users/' + this.id : '/users'
  }
});

