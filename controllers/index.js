(function() {

    'use strict';

    angular
        .module('test')
        .controller('IndexCtrl', IndexController)


    IndexController.$inject = ['$scope'];
    function IndexController($scope) {

        $scope.tiles = [
            new Tile('10', 'page', 0, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}),
            new Tile('11', 'page', 1, 2, {title: 'Content 1', content: 'Lorem ipsum 1'}),
            new Tile('12', 'page', 2, 2, {title: 'Content 2', content: 'Lorem ipsum 2'}),
        ];

        $scope.onMove = function() {
            console.debug('Call API : tile/move');
            return true;
        };

        $scope.toggleIsEditable = function() {

            for(var i = 0; i < $scope.tiles.length; i++) {
                $scope.tiles[i].settings.isEditable = !$scope.tiles[i].settings.isEditable;
            }
        };
    }
})();
