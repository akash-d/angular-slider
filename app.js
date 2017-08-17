var app = angular.module('app', ['ui.router', "chart.js", "ngTouch"]);

app.controller("DoughnutCtrl", function($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
});

app.controller("main", function($scope) {
    $scope.array = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'];
    $scope.value = 0;
    $scope.addP = function() {
        if ($scope.value < ($scope.array.length - 1)) {
            $scope.value++;
        } else {
            $scope.value = 0;
        }
    }
    $scope.subP = function() {
        if ($scope.value > 0) {
            $scope.value--;
        } else {
            $scope.value = ($scope.array.length - 1);
        }
    }
    $scope.directClick = function(val) {
            $scope.value = val;
        }
        // setInterval(function() {
        //     $scope.addP();
        // }, 4000);
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
        url: '/home',
        title: 'home',
        templateUrl: 'home.html',
        controller: 'homeController'
    }).state("error", {
        url: '/error',
        title: 'error',
        templateUrl: 'error.html'
    }).state("about", {
        url: '/about',
        title: 'about',
        params: { type: null, name: null },
        templateUrl: 'about.html',
        controller: 'about'
    }).state("about.right", {
        url: '/right',
        title: 'right',
        template: '<h1>Hello</h1>'
    });
    $urlRouterProvider.otherwise('/error');
});

app.controller("homeController", function($scope, $rootScope, $http, GIT, $state) {
    $scope.home = "This is home page";
    GIT.getUser().then(function(response) {
        console.log(response)
    });
    $scope.goTo = function(data) {
        $state.go('about', { name: data });
    }
    $rootScope.activeNav = "home";
});
app.controller("about", function($scope, $stateParams, $http, $rootScope, GIT) {
    $scope.home = "This is home page";
    GIT.getUser().then(function(response) {
        console.log(response)
    });
    $scope.data = $stateParams.name;
    $rootScope.activeNav = "about";
});
app.factory('GIT', function($http, $q) {
    function getUser() {
        var deferred = $q.defer();
        $http({
            url: 'https://api.github.com/users/akash-d',
            method: "GET",
        }).then(function(response) {
            // console.log(response.data);
            deferred.resolve({
                sds: response.data
            })
        })
        return deferred.promise;
    }
    return {
        getUser: getUser
    }
});
app.directive("test", function() {
    return {
        restrict: 'E',
        template: '<h2>My first directive</h2>'
    }
})