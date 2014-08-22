'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);

app.controller('MyCtrl1', ['$scope', 'User', function ($scope, User) {
    $scope.users = User.query();
}]);

app.controller('MyCtrl2', ['$scope', function ($scope) {

}]);
