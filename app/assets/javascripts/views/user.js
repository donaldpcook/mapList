'use strict';

mapList.UserView = Backbone.View.extend({
  el: document.getElementById('user'),

  events: {
    'click .js-submit-user': 'enter',
    'keypress .js-user-input': 'enterOnEnter'
  },

  enter: function(evt) {
    evt.preventDefault();

    mapList.user = new mapList.User({name: this.$('input').val()});

    // call the controller again to switch views
    mapList.controller();

    this.$el.addClass('is-hidden');
  },

  enterOnEnter: function(evt) {
    if (evt.keyCode === 13) {
      this.enter(evt);
    }
  }
});
