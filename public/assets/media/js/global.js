/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GlobalJS = function () {
    return {
        //main function to initiate the module
        init: function () {
            console.log('%c successfully load global js','color:orange;font-size:14px;');
        }
    };
}();
$(document).ready(function () {
    GlobalJS.init();
});