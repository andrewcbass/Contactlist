'use strict';

var indexEdit;

angular.module('myApp', [])
  .controller('mainCtrl', function($scope, $http) {

    //get stored contacts and load to page on visit
    $http.get('/contacts').then(function(res){
      console.log('RES', res);
      $scope.conList = res.data;
    }, function(err) {
      console.log('ERR', err);
    })

    //add new contacts
    $scope.addContact = function () {
      $http.post('/contacts', $scope.newCon)
      .then(function(res){
        //only if success, load to DOM
        var contact = angular.copy($scope.newCon);
        $scope.conList.push(contact);
        $scope.newCon = {};
      },
      function(err){
        console.log('ERR', err);
      })
    }

    //grab contact idex on click of edit button
    $scope.editContactIndex = function (contact) {
      indexEdit = this.$index;
      var editedcontact = angular.copy(this.contact);
      $scope.edit = editedcontact;
    }

    //edit contact info in JSON on click save edit, then in DOM
    $scope.editContact = function () {
      $http.put(`/contacts/${indexEdit}`, $scope.edit)
      .then(function(res) {
        $scope.conList[indexEdit] = $scope.edit;
      },
      function(err) {
        console.log('ERR', err);
      })
    }

    //delete contact from JSON, then from DOM
    $scope.deleteCon = function (contact) {
      var index = this.$index;

      $http.delete(`/contacts/${index}`)
      .then(function(res) {
        $scope.conList.splice(index, 1);
      },
      function(err) {
        console.log('ERR', err);
      })
    }

  })
