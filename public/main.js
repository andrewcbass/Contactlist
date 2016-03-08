'use strict';

angular.module('myApp', [])
  .controller('mainCtrl', function($scope, $http) {
    $scope.conList = [];

    $scope.addContact = function () {
      var contact = angular.copy($scope.newCon);
      $scope.conList.push(contact);
      $scope.newCon = {};
    }

    $scope.deleteCon = function (contact) {
      $scope.conList.splice(this.$index, 1);
    }
  });
