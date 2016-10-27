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
        $q.all({countryData: countryRequest, statesData: statesRequest})
            .then(onFieldReuestSuccess)
            .catch(onFieldReuestError);

        function onFieldReuestSuccess (fieldDataArray) {
            var combinedData = combineCountryStateData(fieldDataArray);
            console.log(combinedData);
        }

        function combineCountryStateData (fieldDataArray) {
            //this function should combines country and state data using columnname field.
            //currently not done in ths function
            var fieldData = [];
            var i = 0;
            var len = fieldDataArray.countryData.length;
            for(; i < len; ++i){
                fieldData[i] = {
                    ColumnName: fieldDataArray.countryData[i].ColumnName,
                    FieldValue: fieldDataArray.countryData[i].FieldValue,
                    FlexValueSetId: fieldDataArray.statesData[i].FlexValueSetId,
                    RequiredFlag: fieldDataArray.statesData[i].RequiredFlag,
                    ColumnSeqNum: fieldDataArray.statesData[i].ColumnSeqNum,
                    DropdownFlag: fieldDataArray.statesData[i].DropdownFlag,
                };
            }
            return fieldData;
        }

        function onFieldReuestError (error) {
            console.log('some error occurred...');
            console.log(error);
        }
    }

})();