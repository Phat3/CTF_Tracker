/* 
 * @author Sebastino Mariani <mariani.sebastiano@gmail.com>
 */

angular.module('ctf_tracker.admin', [
        'ui.router'
])

.config(function( $stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state( 'home', {
            url : '/',
            views : {
               
                main : { templateUrl : 'views/admin/main.html' }   
            }
            
        } )
        .state( 'page2', {
            url : '/page2',
            views : {
               
                main : { templateUrl : 'views/admin/main2.html' }   
            }
            
        } );
})

//init page
.run( function(){
    console.log('ciao')
} );
