(function() {

    'use strict';

    angular
        .module('test')
        .directive('snGrid', GridDirective);

    GridDirective.$inject = ['$window', '$timeout', 'snGridService'];
    function GridDirective($window, $timeout, snGridService) {

        return {
            restrict: 'C',
            transclude: true,
            templateUrl: 'components/grid/grid.html',
            controller: GridController,
            scope: {
            },
            link: {
                pre: preLink,
                post: postLink
            }
        };

        //////////

        function preLink(scope, element, attrs, ctrl) {

            snGridService.setElement(element[0]);
            // Bind to window resize events
        }

        function postLink(scope, element) {

            // http://lorenzmerdian.blogspot.fr/2013/03/how-to-handle-dom-updates-in-angularjs.html
            $timeout(function () {
                $timeout(function () {
                    snGridService.setHeight();
                    snGridService.change();
                }, 0);
            }, 0);

            angular.element($window).bind('resize', function() {
                snGridService.setHeight();
                snGridService.change();
                scope.$apply();
            });
        }
    }

    GridController.$inject = ['$scope', 'snGridService'];
    function GridController($scope, snGridService) {
        $scope.tiles = snGridService.list();
    }
})();
