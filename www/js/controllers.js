angular.module('starter.controllers', [])
  .constant('baseUrl', 'http://localhost:2403/hiring-app-db/')
  .config(function ($anchorScrollProvider) {
        $anchorScrollProvider.disableAutoScrolling();
  })
  .controller('EmployeeListCtrl', function($scope, $ionicModal, $http, baseUrl, $location, $anchorScroll) {
    //alternative of using REST (uncomment)
    /*
    $scope.saveToLocalStorage = function(){
      window.localStorage["emplList"] = angular.toJson($scope.emplList);
    }
    if (!angular.isUndefined(window.localStorage["emplList"])){
      $scope.emplList = JSON.parse(window.localStorage["emplList"]);
    } else {
      $scope.emplList = [
        {
          photo: 1,
          name: 'Reggae Martin',
          start: "01.02.2004",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 3,
          name: 'John Smith',
          start: "31.01.2014",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 5,
          name: 'Jeff Chill',
          start: "08.02.2008",
          position: "QA specialist",
          department: "IT Department",
          skills: ["JavaScript", "HTML", "SQL"]
        },
        {
          photo: 5,
          name: 'Davis Tremblay',
          start: "10.12.2010",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "Lisp", "BPMN"]
        },
        {
          photo: 7,
          name: 'Barbara García',
          start: "01.02.2004",
          position: "QA specialist",
          department: "IT Department",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 3,
          name: 'Sarah Brown',
          start: "10.12.2010",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "Lisp", "BPMN"]
        },
        {
          photo: 7,
          name: 'Kevin Martin',
          start: "31.01.2014",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 4,
          name: 'Cowbell Lopez',
          start: "01.02.2004",
          position: "QA specialist",
          department: "IT Department",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 3,
          name: 'King Turner',
          start: "31.01.2014",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 7,
          name: 'Jackson Wilson',
          start: "10.12.2010",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "Lisp", "BPMN"]
        },
        {
          photo: 6,
          name: 'Ruth Tremblay',
          start: "01.02.2004",
          position: "QA specialist",
          department: "IT Department",
          skills: ["Java", "HTML", "BPMN"]
        },
        {
          photo: 2,
          name: 'Indie Wilson',
          start: "08.02.2008",
          position: "QA specialist",
          department: "IT Department",
          skills: ["JavaScript", "HTML", "SQL"]
        },
        {
          photo: 1,
          name: 'Anderson Smith',
          start: "10.12.2010",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "Lisp", "BPMN"]
        },
        {
          photo: 6,
          name: 'Thomas Brown',
          start: "31.01.2014",
          position: "Software Developer",
          department: "Customer Service",
          skills: ["Java", "HTML", "BPMN"]
        }
      ];
      $scope.saveToLocalStorage();
    }
    */

    //filling data by using REST
    ($scope.getEmployeeList = function(){
      $http.get(baseUrl).success(function(response){
        $scope.emplList = response;
      })
    })();

    //scroll to top of list calling Search or Order services
    $scope.showTop = function () {
      $location.hash("topOfPage");
      $anchorScroll();
    }

    //search functionality
    $scope.searchFunction = function() {
      $scope.showTop();
      $scope.search = {searchText: ""};
      $scope.isSearchVisible = !$scope.isSearchVisible;
      !$scope.isSearchVisible ? $scope.search.searchText = "" : null;
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
      $scope.showTop();
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
      $scope.search = {};
      $scope.search.searchText = "";

      $scope.order.selected = "name";
      $scope.order.reverse = false;
      $scope.order.reverseIcon = "ion-arrow-down-b";
      $scope.isOrderVisible = false;
    }

    //calling modal window to HIRE
    $ionicModal.fromTemplateUrl('templates/empl_add.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openAddNewWindow = function() {
      $scope.newEmployee = {};
      $scope.verify = "";
      $scope.picsList = [1, 2, 3, 4, 5, 6, 7];
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
      $scope.skill = [
        {name: "HTML7", exist: false},
        {name: "CSS3", exist: false},
        {name: "JavaScript", exist: false},
        {name: "Ionic", exist: false},
        {name: "AngularJS", exist: false}
      ];

      $scope.modal.show();
    };

    $scope.selectImg = function (selectedImg){
      $scope.changeAvatarVisible = true;
      $scope.picsList = [selectedImg];
    }

    $scope.changeAvatar = function(){
      $scope.changeAvatarVisible = false;
      $scope.picsList = [1, 2, 3, 4, 5, 6, 7];
    }

    $scope.isSkillsVisible = true;
    $scope.changeSkillsVisibility = function(){
      for (var j=0;j<$scope.skill.length;j++){
        $scope.skill[j].exist = false;
      }
      $scope.isSkillsVisible = !$scope.isSkillsVisible;
    }

    $scope.postNewEmployee = function(item){
      //alternative of using REST (uncomment)
      /*
      $scope.saveToLocalStorage();
      $scope.emplList.push(item);
      */

      $http.post(baseUrl, item).success(function(item){
        $scope.emplList.push(item);
        console.log("AddNew function: new record is succesfully added!");
      })
    }

    //adding new employee by pressing SAVE button
    $scope.addNewEmployee = function() {
      $scope.picsList.length == 1 ? $scope.newEmployee.photo = $scope.picsList[0] : $scope.newEmployee.photo = 0;
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
      $scope.newEmployee.skills = [];
      for (var j=0;j<$scope.skill.length;j++){
        if ($scope.skill[j].exist) $scope.newEmployee.skills.push($scope.skill[j].name);
      }
      $scope.postNewEmployee($scope.newEmployee);
      $scope.closeAddNewWindow();
    };

    //hiding of modal window
    $scope.closeAddNewWindow = function() {
      $scope.modal.hide();
    };

    //converting of date to string in format "dd.mm.yyyy"
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
