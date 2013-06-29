'use strict';

(function() {
  // use mustache style templating to not interfere with erb style
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  // namespace everything
  window.mapList = window.mapList || {};
}());
