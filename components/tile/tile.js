(function() {

    'use strict';

    angular
        .module('test', [])
        .directive('snTile', TileDirective);

    function TileDirective($compile) {

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
            var container = angular.element(element.children()[2]);
            container.append(tpl);
        
            // Add element in scope
            scope.settings.element = element[0];
            scope.delete = function() {

                if(scope.settings.onDelete())
                    gridCtrl.delete(scope.settings.id);
            }
            scope.edit = function() {

                scope.settings.onEdit(scope);
            }
            gridCtrl.change();

            // Drag'n'drop
            element[0].addEventListener("dragstart", function (e) {

                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('Id', scope.settings.id);
                this.style.opacity = 0.5;
            }, false);
            element[0].addEventListener("dragenter", function (e) {

                this.style.opacity = 0.5;
                return false;
            }, false);
            element[0].addEventListener("dragover", function (e) {

                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';

                return false;
            }, false);
            element[0].addEventListener("dragleave", function (e) {

                this.style.opacity = 1;
            }, false);
            element[0].addEventListener("drop", function (e) {

                e.stopPropagation();
                e.preventDefault();

                if(scope.settings.onMove())
                    gridCtrl.move(scope.settings.id, e.dataTransfer.getData('Id'));

                this.style.opacity = 1;

                return false;
            }, false);
            element[0].addEventListener("dragend", function (e) {

                this.style.opacity = 1;
            }, false);
        }
        
        function postLink() {}
    }

    TileController.$inject = ['$scope'];
    function TileController($scope) {

    }
})();
