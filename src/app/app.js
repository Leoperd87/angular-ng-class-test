import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

let a = angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

a.filter('myFilter', function () {
  return function (input) {

    let output = [];

    if (Array.isArray(input)) {
      output = input.filter(function (v) {
        return v != undefined;
      });
      let m = [];
      output.forEach(function(v) {
        if (typeof v === 'string') {
          if (v.split(' ').length > 1) {
            v = v.split(' ');
            m = m.concat(v);
          } else {
            m.push(v);
          }
        }
        if (typeof v === 'object') {
          if (Array.isArray(v)) {
            m = m.concat(v.splice(1));
            v = v[0];
          } else {
            Object.keys(v).forEach(function(k) {
              if (v[k]) {
                m.push(k)
              }
            })
          }
        }
      });
      output = m;
    }

    if (typeof input === 'string') {
      output = input.split(' ');
    }

    let trObj = cleanLong2shortCSS;

    return output.map((v) => trObj[v]).join(' ');
  }
});

export default MODULE_NAME;