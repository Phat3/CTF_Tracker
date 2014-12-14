/* 
 * @author Sebastino Mariani <mariani.sebastiano@gmail.com>
 */

angular.module('ctf_tracker.admin', [
        'ui.router',
        'ngAnimate',
        'ctf_tracker.admin.server'
])

.config(function( $stateProvider, $urlRouterProvider){
           
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state( 'home', {
            url : '/',
            views : {               
                main : { templateUrl : 'views/admin/main.html'}   
            }
            
        } )
        .state( 'serverlogs', {
            url : '/server/logs',
            views : {
               
                main : { templateUrl : 'views/admin/server_logs.html', controller : 'ServerController'}   
            }
            
        } );
})

//init page
.run( function(){
    console.log('ciao')
} );
