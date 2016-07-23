angular.module('starter.controllers', [])

  .controller('EmployeeListCtrl', function($scope, $ionicModal, $timeout, $location, $anchorScroll) {
      $scope.emplList = [
        { photo: "1.png", name: 'Reggae Chill', start: "01.02.2004", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "2.png", name: 'Indie Chill', start: "08.02.2008", position: "QA specialist", department: "IT Department", skills:  ["JavaScript", "HTML", "SQL"]},
        { photo: "5.png", name: 'Dubstep Rap', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "3.png", name: 'Rap Dubstep', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "4.png", name: 'Cowbell Indie', start: "01.02.2004", position: "QA specialist", department: "IT Department", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "3.png", name: 'Rap Dubstep', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "5.png", name: 'Dubstep Rap', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "6.png", name: 'Reggae Chill', start: "01.02.2004", position: "QA specialist", department: "IT Department", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "2.png", name: 'Indie Chill', start: "08.02.2008", position: "QA specialist", department: "IT Department", skills:  ["JavaScript", "HTML", "SQL"]},
        { photo: "5.png", name: 'Dubstep Rap', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]}
      ];
      $scope.orderList = ["Name", "Started"];
      $scope.picsList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
      $scope.departmentsList = ["IT Department", "HR Department", "Finance Department"];
      $scope.positionsList = {0: ["Software Developer", "QA Specialist", "System Administrator"],
                              1: ["HR Manager", "Recruiter"],
                              2: ["Accountant", "Finance Director"]};
      $scope.skillsList = ["HTML7", "CSS3", "JavaScript", "Ionic", "AngularJS"];

      //search functionality
      $scope.search = {searchText: ""};
      $scope.searchFunction = function() {
        $scope.isSearchVisible = !$scope.isSearchVisible;
        $scope.isOrderVisible = false;
        $scope.search.searchText = "";
        /*
        $location.hash('test');
        $anchorScroll();
        */
      };
      $scope.backSpace = function () {
        $scope.search.searchText = $scope.search.searchText.substr(0, $scope.search.searchText.length-1);
      }
      $scope.cleanSearch = function () {
        $scope.search.searchText = "";
      };

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/empl_add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;

        $scope.startdate = new Date;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.addEmployee = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };
  });
