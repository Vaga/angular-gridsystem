(function() {

    'use strict';

    angular
        .module('test.components.grid', [])
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

            // Drag'n'drop
            element[0].addEventListener("dragstart", dragStart, false);
            element[0].addEventListener("dragenter", dragEnter, false);
            element[0].addEventListener("dragover", dragOver, false);
            element[0].addEventListener("dragleave", dragLeave, false);
            element[0].addEventListener("drop", drop, false);
            element[0].addEventListener("dragend", dragEnd, false);

            //////////

            function dragStart(e) {

                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('Id', scope.settings.id);
                this.classList.add('sn-tile-drag');
            }

            function dragEnter(e) {

                this.classList.add('sn-tile-drop');
                return false;
            }
            
            function dragOver(e) {

                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                return false;
            }

            function dragLeave(e) {
                this.classList.remove('sn-tile-drop');
            }

            function drop(e) {

                e.stopPropagation();
                e.preventDefault();

                if(scope.settings.onMove()){
                    snGridService.move(scope.settings.id, e.dataTransfer.getData('Id'));
                    console.debug('moved');
                }

                this.classList.remove('sn-tile-drop');
                return false;
            }

            function dragEnd(e) {
                this.classList.remove('sn-tile-drag');
            }
        }
        
        function postLink() {}
    }

    TileController.$inject = ['$scope', 'snGridService'];
    function TileController($scope, snGridService) {

        $scope.edit = function() {
            if($scope.settings.onEdit($scope.settings, $scope.data))
                console.debug('edited');
        };

        $scope.remove = function() {
            if($scope.settings.onRemove()) {
                snGridService.remove($scope.settings.id);
                snGridService.change();
                console.debug('removed');
            }
        };
    }
})();
