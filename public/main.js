'use strict';

var indexEdit;

angular.module('myApp', [])
  .controller('mainCtrl', function($scope, $http) {
    $scope.getConList = function() {
      $http({
        method: "GET",
        url: 'http://localhost:12345/contacts',
      })
      .then(function(res) {
        console.log('RES', res);
        $scope.conList = res.data;
      },
      function(err) {
        console.log('ERR', err);
    })
  }
    $scope.getConList();

    $scope.addContact = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:12345/contacts',
        data: $scope.newCon
      })
      .then(function(res) {
        //only if success, add to DOM
        var contact = angular.copy($scope.newCon);
        $scope.conList.push(contact);
        $scope.newCon = {};
      },
      function(err) {
        console.log('ERR', err);
      })
    }

    $scope.editContactIndex = function (contact) {
      indexEdit = this.$index;
      var editedcontact = angular.copy(this.contact);
      $scope.edit = editedcontact;
    }

    $scope.editContact = function () {
      $http({
        method: 'PUT',
        url: `http://localhost:12345/contacts/${indexEdit}`,
        data: $scope.edit
      })
      .then(function(res) {
        $scope.conList[indexEdit] = $scope.edit;
      })
    }

    $scope.deleteCon = function (contact) {
      var index = this.$index;

      $http({
        method: 'DELETE',
        url: `http://localhost:12345/contacts/${index}`,
      })
      .then(function(res) {
        //only if success, remove from DOM
        $scope.conList.splice(index, 1);
      },
      function(err) {
        console.log(err);
      })
    }


  });
