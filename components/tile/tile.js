(function() {

    'use strict';

    angular
        .module('test', [])
        .directive('snTile', TileDirective);

    TileDirective.$inject = ['$compile', 'snGridService'];

    function TileDirective($compile, snGridService) {

        return {
            restrict: 'C',
            require: '^snGrid',
            templateUrl: 'components/tile/tile.html',
            controller: TileController,
            link: {
                pre: preLink,
                post: postLink
            },
            scope: {
                settings: "=snSettings",
                data: "=snData",
            }
        };

        function preLink(scope, element, attrs, gridCtrl) {

            // Create tile content
            var tpl = angular.element('<div class="sn-content-' + scope.settings.type + '"></div>');
            $compile(tpl)(scope);
            element.append(tpl);
        
            // Add element in scope
            scope.settings.element = element[0];
            snGridService.change();

            scope.edit = function() {
                console.debug('edit');
            };
            scope.remove = function() {
                console.debug('remove');
                snGridService.remove(scope.settings.id);
                snGridService.change();
            };

            // Drag'n'drop
            element[0].addEventListener("dragstart", function (e) {

                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('Id', scope.settings.id);
                this.classList.add('sn-tile-drag');
            }, false);
            element[0].addEventListener("dragenter", function (e) {

                this.classList.add('sn-tile-drop');
                return false;
            }, false);
            element[0].addEventListener("dragover", function (e) {

                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';

                return false;
            }, false);
            element[0].addEventListener("dragleave", function (e) {
                this.classList.remove('sn-tile-drop');
            }, false);
            element[0].addEventListener("drop", function (e) {

                e.stopPropagation();
                e.preventDefault();

                if(scope.settings.onMove())
                    snGridService.move(scope.settings.id, e.dataTransfer.getData('Id'));

                this.classList.remove('sn-tile-drop');

                return false;
            }, false);
            element[0].addEventListener("dragend", function (e) {

                this.classList.remove('sn-tile-drag');
            }, false);
        }
        
        function postLink() {}
    }

    TileController.$inject = ['$scope', 'snGridService'];
    function TileController($scope, snGridService) {

    }
})();
