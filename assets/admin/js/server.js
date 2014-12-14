/* 
 * @author Sebastino Mariani <mariani.sebastiano@gmail.com>
 */

angular.module('ctf_tracker.admin.server', [])

//service that comunicate with ApiServerController
.service('ServerEndPoint', function($http) {
    
    this.getErrorLog = function(){
         return $http.get('/admin/server/error-log/');
    } 
})

.controller('ServerController', function($scope, ServerEndPoint) {
    
        ServerEndPoint.getErrorLog().success(function(data){ parseErrorLog(data) });

        function parseErrorLog(errors){
            $scope.errorLogs = errors.data;
            console.log( $scope.errorLogs)
        }
})

