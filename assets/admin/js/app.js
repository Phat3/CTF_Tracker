/* 
 * @author Sebastino Mariani <mariani.sebastiano@gmail.com>
 */

angular.module('ctf_tracker.admin', [
        'ui.router',
        'ngAnimate'
])

.config(function( $stateProvider, $urlRouterProvider){
           
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state( 'home', {
            url : '/',
            views : {               
                main : { templateUrl : 'views/admin/main.html', controller: 'main1Controller' }   
            }
            
        } )
        .state( 'page2', {
            url : '/page2',
            views : {
               
                main : { templateUrl : 'views/admin/main2.html', controller: 'main2Controller'  }   
            }
            
        } );
})

.controller('main1Controller', function($scope) {
    $scope.pageClass = 'page-home';
})

.controller('main2Controller', function($scope) {
    $scope.pageClass = 'page-home';
})
//init page
.run( function(){
    console.log('ciao')
} );
