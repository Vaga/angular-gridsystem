(function() {

    'use strict';

    var types = [
        {
            name: 'snContentPage',
            controller: 'ContentPageController',
            template: 'components/content/page/page.html'
        }
    ];

    angular.forEach(types, function(type) {

        angular
            .module('test')
            .directive(type.name, ContentDirective);

        function ContentDirective() {

            return {
                restrict: 'C',
                templateUrl: type.template,
                controller: type.controller
            };
        }
    });
})();
