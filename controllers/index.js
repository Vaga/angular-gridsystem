(function() {

    'use strict';

    angular
        .module('test')
        .controller('IndexCtrl', IndexController)


    IndexController.$inject = ['$scope'];
    function IndexController($scope) {

        $scope.tiles = [
            {
                settings: {
                    id: '10',
                    type: 'page',
                    order: 1,
                    size: 1,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 1',
                    content: 'Content 1'
                }
            },
            {
                settings: {
                    id: '11',
                    type: 'page',
                    order: 0,
                    size: 2,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 0',
                    content: 'Content 0'
                }
            },
            {
                settings: {
                    id: '12',
                    type: 'page',
                    order: 3,
                    size: 1,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 3',
                    content: 'Content 3'
                }
            },
            {
                settings: {
                    id: '13',
                    type: 'page',
                    order: 2,
                    size: 1,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 2',
                    content: 'Content 2'
                }
            },
            {
                settings: {
                    id: '14',
                    type: 'page',
                    order: 4,
                    size: 1,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 4',
                    content: 'Content 4'
                }
            },
            {
                settings: {
                    id: '15',
                    type: 'page',
                    order: 5,
                    size: 1,
                    isEditable: false,
                    element: null
                },
                data: {
                    title: 'Title 5',
                    content: 'Content 5'
                }
            }
        ];

        $scope.toggleIsEditable = function() {

            for(var i = 0; i < $scope.tiles.length; i++) {
                $scope.tiles[i].settings.isEditable = !$scope.tiles[i].settings.isEditable;
            }
        };
    }
})();
