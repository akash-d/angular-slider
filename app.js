var app = angular.module('app', []);

app.controller("main", function($scope) {
    $scope.maxValue = 100;
    $scope.addedValue = 10;
    $scope.remainingValue = 90;
    $scope.rem = 10;
    $scope.showIt = false;
    $scope.remainingPercent = function(val) {
        if ($scope.addedValue + val <= $scope.maxValue) {
            $scope.addedValue += val;
            $scope.remainingValue = $scope.maxValue - $scope.addedValue;
            $scope.rem = (($scope.addedValue) / $scope.maxValue) * 100;
        } else {
            $scope.showIt = true;
        }
    }
});