/*JShint browser: true*/
/*global angular: true*/

(function(){
    'use strict';
    
    angular.module('myApp').directive('container', containerDirective);
    function containerDirective () {
        var directiveObject = {
            replace: true,
            restrict: 'E',
            templateUrl: 'js/container.template.html',
            scope: {
                field : '=field'
            },
            link: containerLink,
            controller: ContainerController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        function containerLink (scope, element, attributes) {
            //sconsole.log(ctrl);
        }
        
        function ContainerController () {
            var vm = this;
        }
        return directiveObject;
    }
    
})();