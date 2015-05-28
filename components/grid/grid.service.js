(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name test.snGridService
     */
    angular
        .module('test.components.grid')
        .service('snGridService', GridService);

    /** @const */ var GUTTER = 10;
    /** @const */ var ROW = 6;

    GridService.$inject = [];
    function GridService() {

        var _size = {
            width: 0,
            height: 0
        };
        var _unit = 0;
        var _tiles = [];
        var _element = null;

        /**
         * @ngdoc
         * @name test.snGridService#setElement
         * @param {object} grid element
         * @return {void}
         */
        this.setElement = function(e) {
            _element = e
        }

        /**
         * @ngdoc
         * @name test.snGridService#setWidth
         * @param {int} grid width
         * @return {void}
         */
        this.setWidth = function(w) {

            _size.width = w;
            if(_element !== null) {
                _element.style.width = w + 'px';
            }
        };

        /**
         * @ngdoc
         * @name test.snGridService#setHeight
         * @param {int} grid width
         * @return {void}
         */
        this.setHeight = function() {

            if(_element !== null) {
                _size.height = _element.clientHeight;
            }
            _unit = this.calculateUnitSize();
        };

        /**
         * @ngdoc
         * @name test.snGridService#addTile
         * @param {object} tile object
         * @return {void}
         */
        this.add = function(tile) {

            _tiles.push(tile);
        };

        /**
         * @ngdoc
         * @name test.snGridService#delete
         * @param {string} tile id
         * @return {void}
         */
        this.remove = function(id) {

            var index = null;
            for(var i = 0; i < _tiles.length; ++i) {

                var tile = _tiles[i];

                if (id === tile.settings.id) {
                    index = tile.settings.order;
                    _tiles.splice(i, 1);
                }
                if (index !== null && index > tile.settings.order) {
                    tile.settings.order -= 1;
                }
            }
        };

        /**
         * @ngdoc
         * @name test.snGridService#get
         * @param {string} tile id
         * @return {object}
         */
        this.get = function(id) {

            for(var i = 0; i < _tiles.length; ++i) {
                
                var tile = _tiles[i];

                if(tile.settings.id === id) {
                    return tile;
                }
            }
            return null;
        };

        /**
         * @ngdoc
         * @name test.snGridService#list
         * @return {array}
         */
        this.list = function() {

            return _tiles;
        };


        /**
         * @ngdoc
         * @name test.snGridService#sort
         * @return {void}
         */
        this.sort = function() {

            _tiles.sort(function(a, b){
                return a.settings.order - b.settings.order;
            });
        };

        /**
         * @ngdoc
         * @name test.snGridService#change
         * @return {void}
         */
        this.change = function() {

            this.sort();

            var position = {
                x: 0, y: 0
            };

            for(var i = 0; i < _tiles.length; ++i) {

                var tile = _tiles[i];

                if (tile.settings.element !== null) {

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
            this.setWidth(this.calculateSize(position.x + ((position.y) ? 3 : 0)) + 2 * GUTTER);
        };

        /**
         * @ngdoc
         * @name test.snGridService#move
         * @param {string} tile id
         * @param {string} tile id 2
         * @return {void}
         */
        this.move = function(a, b) {

            var tileA = this.get(a),
                tileB = this.get(b);

            if(tileA === null || tileB === null)
                return;

            var tmp = tileA.settings.order;
            tileA.settings.order = tileB.settings.order;
            tileB.settings.order = tmp;

            this.sort();
            this.change();
        };

        /**
         * @ngdoc
         * @name test.snGridService#nextOrder
         * @return {int}
         */
        this.nextOrder = function() {

            var order = 0;

            for(var i = 0; i < _tiles.length; ++i) {

                var tile = _tiles[i];
                if(tile.settings.order > order)
                    order = tile.settings.order;
            }

            return order + 1;
        }

        /**
         * @ngdoc
         * @name test.snGridService#calculateUnitSize
         * @return {int}
         */
        this.calculateUnitSize = function() {

            return (_size.height - (ROW + 1) * GUTTER) / ROW;
        };

        /**
         * @ngdoc
         * @name test.snGridService#change
         * @return {void}
         */
        this.calculateSize = function(size) {

            return (size * _unit) + ((size ? (size - 1) : 0) * GUTTER);
        };
    }
})();
