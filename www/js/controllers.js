angular.module('starter.controllers', [])

  .controller('EmployeeListCtrl', function($scope, $ionicModal, $timeout) {
      $scope.emplList = [
        { photo: "1.png", name: 'Reggae Martin', start: "01.02.2004", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "3.png", name: 'John Smith', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "5.png", name: 'Jeff Chill', start: "08.02.2008", position: "QA specialist", department: "IT Department", skills:  ["JavaScript", "HTML", "SQL"]},
        { photo: "5.png", name: 'Davis Tremblay', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "7.png", name: 'Barbara García', start: "01.02.2004", position: "QA specialist", department: "IT Department", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "3.png", name: 'Sarah Brown', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "7.png", name: 'Kevin Martin', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "4.png", name: 'Cowbell Lopez', start: "01.02.2004", position: "QA specialist", department: "IT Department", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "3.png", name: 'King Turner', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "7.png", name: 'Jackson Wilson', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "6.png", name: 'Ruth Tremblay', start: "01.02.2004", position: "QA specialist", department: "IT Department", skills:  ["Java", "HTML", "BPMN"]},
        { photo: "2.png", name: 'Indie Wilson', start: "08.02.2008", position: "QA specialist", department: "IT Department", skills:  ["JavaScript", "HTML", "SQL"]},
        { photo: "1.png", name: 'Anderson Smith', start: "10.12.2010", position: "Software Developer", department: "Customer Service", skills:  ["Java", "Lisp", "BPMN"]},
        { photo: "6.png", name: 'Thomas Brown', start: "31.01.2014", position: "Software Developer", department: "Customer Service", skills:  ["Java", "HTML", "BPMN"]}
      ];

      //search functionality
      $scope.searchFunction = function() {
        $scope.search = {searchText: ""};
        $scope.isSearchVisible = !$scope.isSearchVisible;
        !$scope.isSearchVisible ? $scope.search.searchText = "" : null;
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

      //order functionally
      $scope.order = {
        selected: "name",
        orderList : [
          {id: "name", name: "Name"},
          {id: "start", name: "Started"},
          {id: "department", name: "Department"},
          {id: "position", name: "Position"}
        ],
        reverse: false,
        reverseIcon: "ion-arrow-down-b"
      };
      $scope.changeReverse = function(){
        $scope.order.reverse = !$scope.order.reverse;
        $scope.order.reverse ? $scope.order.reverseIcon = "ion-arrow-up-b" : $scope.order.reverseIcon = "ion-arrow-down-b";
      }
      $scope.orderFunction = function () {
        $scope.isOrderVisible = !$scope.isOrderVisible;
        if (!$scope.isOrderVisible) {
          $scope.order.selected = "name";
          $scope.order.reverse = false;
          $scope.order.reverseIcon = "ion-arrow-down-b";
        }
      }

      //reset search and order parameters
      $scope.clearAll = function(){
        $scope.isSearchVisible = false;
        $scope.search.searchText = "";

        $scope.order.selected = "name";
        $scope.order.reverse = false;
        $scope.order.reverseIcon = "ion-arrow-down-b";
        $scope.isOrderVisible = false;
      }

      $ionicModal.fromTemplateUrl('templates/empl_add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openAddNewWindow = function() {
        $scope.newEmployee = {};

        $scope.verify = "";
        $scope.picsList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
        $scope.changeAvatarVisible = false;

        $scope.department = {
          selected: "it",
          departmentList: [
            {value: "it", name: "IT Department"},
            {value: "hr", name: "HR Department"},
            {value: "fin", name: "Finance Department"}
          ]
        }
        $scope.position = {
          "it": {
            selected: "0",
            positionList: [
              {value: 0, name: "Software Developer"},
              {value: 1, name: "QA Specialist"},
              {value: 2, name: "System Administrator"}
            ]
          },
          "hr": {
            selected: "0",
            positionList: [
              {value: 0, name: "HR Manager"},
              {value: 1, name: "Recruiter"}
            ]
          },
          "fin": {
            selected: "0",
            positionList: [
              {value: 0, name: "Accountant"},
              {value: 1, name: "Finance Director"}
            ]
          }
        };
        $scope.newEmployee.startDate = new Date();
        $scope.skillsList = ["HTML7", "CSS3", "JavaScript", "Ionic", "AngularJS"];

        $scope.modal.show();
      };

      $scope.selectImg = function (selectedImg){
        $scope.changeAvatarVisible = true;
        $scope.picsList = [selectedImg];
      }

      $scope.changeAvatar = function(){
        $scope.changeAvatarVisible = false;
        $scope.picsList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
      }

      $scope.addNewEmployee = function() {
        $scope.picsList.length == 1 ? $scope.newEmployee.photo = $scope.picsList[0] : $scope.newEmployee.photo = "ionic.png";
        if ($scope.newEmployee.name){
          $scope.verify = "";
        } else {
          $scope.verify = "warning";
          return true;
        }
        for (var i = 0;i<$scope.department.departmentList.length;i++){
            if ($scope.department.departmentList[i].value == $scope.department.selected) {
              $scope.newEmployee.department = $scope.department.departmentList[i].name;
              break;
            }
        }
        $scope.newEmployee.position = $scope.position[$scope.department.selected].positionList[$scope.position[$scope.department.selected].selected].name;
        $scope.newEmployee.start = $scope.formatDate($scope.newEmployee.startDate);

        console.log($scope.newEmployee);
        return true;
        $scope.emplList.push($scope.newEmployee);

        $timeout(function() {
          $scope.closeAddNewWindow();
        }, 1000);
      };

      $scope.closeAddNewWindow = function() {
        $scope.modal.hide();
      };

      $scope.formatDate = function (date){
        var result = "";
        if (!date) date = new Date;
        result = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        result += ".";
        result += (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        result += ".";
        result +=  date.getFullYear();
        return result;

      }


  });
