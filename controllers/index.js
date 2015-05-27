(function() {

    'use strict';

    angular
        .module('test')
        .controller('IndexCtrl', IndexController)


    IndexController.$inject = ['$scope', 'snGridService'];
    function IndexController($scope, snGridService) {

        snGridService.add(new Tile('10', 'page', 0, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));
        snGridService.add(new Tile('11', 'page', 1, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));
        snGridService.add(new Tile('13', 'page', 2, 1, {title: 'Content 0', content: 'Lorem ipsum 0'}));

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
            var tile = new Tile('ID-' + pos, 'page', pos, Math.floor(Math.random() * 2) + 1, {title: 'Content ' + pos, content: 'Lorem ipsum ' + pos});
            snGridService.add(tile);
        };
    }
})();
