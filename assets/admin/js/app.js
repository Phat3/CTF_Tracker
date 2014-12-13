/* 
 * @author Sebastino Mariani <mariani.sebastiano@gmail.com>
 */

var app = angular.module('ctf_tracker.admin', [
        'ui.router'
])

.config(function( $stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state( 'home', {
            url : '/',
            views : {
                'main' : { templateUrl : 'app/views/news-main-element.html' }
            }
            
        } );
});

//init page
app.run( function(){

} );
