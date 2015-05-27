(function() {

    'use strict';

    angular
        .module('test.app')
        .controller('IndexCtrl', IndexController)


    IndexController.$inject = ['$scope', 'snGridService', 'snTileFactory'];
    function IndexController($scope, snGridService, snTileFactory) {

        snGridService.add(new snTileFactory('10', 'page', 0, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));
        snGridService.add(new snTileFactory('11', 'page', 1, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));
        snGridService.add(new snTileFactory('13', 'page', 2, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));

        $scope.onMove = function() {
            console.debug('Call API : tile/move');
            return true;
        };

        $scope.toggleIsEditable = function() {

            var tiles = snGridService.list();
            for(var i = 0; i < tiles.length; i++) {
                tiles[i].settings.isEditable = !tiles[i].settings.isEditable;
            }
        };
        $scope.addTile = function() {

            var pos = snGridService.nextOrder();
            console.debug(pos);
            var tile = new snTileFactory('ID-' + pos, 'page', pos, Math.floor(Math.random() * 2) + 1, {title: 'Content ' + pos, content: 'Lorem ipsum ' + pos});
            snGridService.add(tile);
        };
    }
})();
