(function() {

    'use strict';

    angular
        .module('test')
        .directive('snGrid', GridDirective);

    var GUTTER = 10;
    var ROW = 6;

    GridDirective.$inject = ['$window'];
    function GridDirective($window) {

        return {
            restrict: 'C',
            templateUrl: 'components/grid/grid.html',
            controller: GridController,
            scope: {
                tiles: "=snTiles"
            },
            link: {
                pre: preLink,
                post: postLink
            }
        };

        //////////

        function preLink(scope, element, attrs, ctrl) {

            ctrl.setHeight(element[0].clientHeight);
            ctrl.setWidth = function(width) {

                ctrl._size.width = width;
                element[0].style.width = width + 'px';
            };
            
            // Bind to window resize events
            angular.element($window).on('resize', function() {
                ctrl.setHeight(element[0].clientHeight);
                ctrl.change();
            });
        }

        function postLink() {}
    }

    GridController.$inject = ['$scope'];
    function GridController($scope) {

        var self = this;

        this._size = {
            width: 0,
            height: 0
        };

        $scope.$on('GRID_CHANGE', function() {
            self.change();
        });

        this.delete = function(id) {

            for(var i = 0; i < $scope.tiles.length; ++i) {

                if (id === $scope.tiles[i].settings.id) {
                    $scope.tiles.splice(i, 1);
                }
            }
            this.change();
        };

        this.setHeight = function(height) {
            this._size.height = height;
        };

        this.change = function() {

            this.sort();

            var position = {
                x: 0, y: 0
            };
            var unit = this.getUnitSize();

            for(var i = 0; i < $scope.tiles.length; ++i) {

                var tile = $scope.tiles[i];

                if (tile.settings.element != null) {

                    if(position.y + tile.settings.size * 2  > ROW) {
                        position.x += 3;
                        position.y = 0;
                    }

                    tile.settings.element.style.left = this.calculateSize(position.x) + ((position.x) ? 2 : 1) * GUTTER + 'px';
                    tile.settings.element.style.top = this.calculateSize(position.y) + ((position.y) ? 2 : 1) * GUTTER + 'px';
                    tile.settings.element.style.width = this.calculateSize(3) + 'px';
                    tile.settings.element.style.height = this.calculateSize(tile.settings.size * 2) + 'px';
                    position.y += tile.settings.size * 2;
                }
            }
            this.setWidth(this.calculateSize(position.x + ((position.y) ? 3 : 0)) + ((position.x) ? 2 : 1) * GUTTER);
        };

        this.move = function(a, b) {

            var objA = null;
            var objB = null;

            for(var i = 0; i < $scope.tiles.length; ++i) {
                var tile = $scope.tiles[i];
                if(tile.settings.id === a) {
                    objA = tile;
                }
                if(tile.settings.id === b) {
                    objB = tile;
                }
            }

            var tmp = objA.settings.order;
            objA.settings.order = objB.settings.order;
            objB.settings.order = tmp;

            this.change();
        };

        this.sort = function() {

            $scope.tiles.sort(function(a, b) {
                return a.settings.order - b.settings.order;
            });
        };

        this.getUnitSize = function() {

            return (this._size.height - (ROW + 1) * GUTTER) / ROW;
        };

        this.calculateSize = function(size) {

            return (size * this.getUnitSize()) + ((size ? (size - 1) : 0) * GUTTER);
        };
    }
})();
