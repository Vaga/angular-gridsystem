(function() {

    'use strict';

    angular
        .module('test.components.grid')
        .factory('snTileFactory', TileFactory);

    TileFactory.$inject = [];
    function TileFactory() {

        return function Tile(id, type, order, size, data) {

            var self = this;

            this.settings = {
                id: id,
                type: type,
                order: order,
                size: size,
                isEditable: false,
                element: null,
                onEdit: function(tile) {

                    console.debug('Open the panel to edit the tile');
                    console.debug(tile);
                    return true;
                },
                onRemove: function() {

                    console.debug('Call API : tile/delete');
                    return true;
                },
                onMove: function(id1, id2) {

                    console.debug('Call API : tile/move');
                    return true;
                }
            };

            this.data = data;
        }
    }

})();
