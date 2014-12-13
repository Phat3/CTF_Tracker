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
                'side' : { templateUrl : 'views/admin/side.html' },
                'main' : { template : '<h1>Ciao</h1>' }
            }
            
        } );
})

//init page
.run( function(){
    console.log('ciao')
} );
