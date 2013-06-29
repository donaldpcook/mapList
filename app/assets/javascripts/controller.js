'use strict';

mapList.controller = function() {
  if (mapList.user) {
    mapList.Locations = new mapList.LocationList;
    mapList.App = new mapList.AppView;
  } else {
    mapList.userView = new mapList.UserView;
  }
};

// on doc.ready start everything off with a call to the controller
$(function() { mapList.controller() });
