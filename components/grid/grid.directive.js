(function() {

    'use strict';

    angular
        .module('test.components.grid')
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
        }

        function postLink(scope, element) {

            // http://lorenzmerdian.blogspot.fr/2013/03/how-to-handle-dom-updates-in-angularjs.html
            $timeout(function () {
                $timeout(function () {
                    snGridService.setHeight();
                    snGridService.change();
                }, 0);
            }, 0);

            // Bind to window resize events
            scope.$watch(
                function() {
                    return element[0].clientHeight;
                },
                function(nv, ov) {
                    if (nv !== ov) {
                        snGridService.setHeight();
                        snGridService.change();
                    }
                }
            );
        }
    }

    GridController.$inject = ['$scope', 'snGridService'];
    function GridController($scope, snGridService) {
        $scope.tiles = snGridService.list();
    }
})();
