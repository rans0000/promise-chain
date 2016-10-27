/*JShint browser: true*/
/*global angular: true*/

(function(){
    'use strict';
    var myApp = angular.module('myApp', []);

    myApp.controller('MainController', MainController);
    MainController.$inject = ['$q', '$http'];
    function MainController ($q, $http) {
        var vm = this;
        vm.val = 3;

        //load country list
        var countryRequest = $http.get('data/countries.json')
        .then(function (response) {
            var data = response.data.AddressRec;
            //console.log(data);
            return data;
        });

        //load states list
        var statesRequest = $http.get('data/states.json')
        .then(function (response) {
            var data = response.data.Response.responseObject.AddressFieldResponse.AddressFields.AddressFieldsRec;
            //console.log(data);
            return data;
        });

        //combine the data when fields fields and their options are available
        $q.all([countryRequest, statesRequest])
            .then(onFieldReuestSuccess)
            .catch(onFieldReuestError);

        function onFieldReuestSuccess (fieldDataArray) {
            //console.log(fieldDataArray);
            var fieldData = [];
            var i = 0;
            var len = fieldDataArray[0].length;
            for(; i < len; ++i){
                fieldData[i] = {
                    ColumnName: fieldDataArray[0][i].ColumnName,
                    FieldValue: fieldDataArray[0][i].FieldValue,
                    FlexValueSetId: fieldDataArray[1][i].FlexValueSetId,
                    RequiredFlag: fieldDataArray[1][i].RequiredFlag,
                    ColumnSeqNum: fieldDataArray[1][i].ColumnSeqNum,
                    DropdownFlag: fieldDataArray[1][i].DropdownFlag,
                };
            }
            console.log(fieldData);
        }
        
        function onFieldReuestError (error) {
            console.log('some error occurred...');
            console.log(error);
        }
    }

})();