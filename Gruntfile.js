/* 
 * 
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 * 
 */

 module.exports = function(grunt) {
         //init grunt
         grunt.initConfig({
             
            //common options for package
            options: {
                // Base path to your assets folder
                base: 'assets',
                // Published assets path
                publish: 'public',
                //we use bower as packet manager then all vendor package are under bower_components directory
                vendor: {
                    //our root directory for every vendor package
                    base: 'bower_components',
                    //option for the concat task
                    concat: [
                        "<%= options.vendor.base %>/angularjs/angular.js",
                        "<%= options.vendor.base %>/jquery-legacy/dist/jquery.min.js"
                    ],
                },

            },
            
            // Concatenate multiple js files into one
            concat: {
                    js: {
                        //strip all comments in the source file
                        options: {
                            block: true,
                            line: true,
                            stripBanners: true
                        },
                        files: {
                            
                        }
                    },
                    vendor: {
                        src: '<%= options.vendor.concat %>',
                        dest: '<%= options.publish %>/js/vendor.js'
                    }
               },
               
            //compile and minify less file   
            less: {
                 local: {
                     options: {
                         paths: ["assets/less"],
                     },
                     files: {"public/css/main.css": "assets/less/main.less"}
                 },
                 production: {
                     options: {
                         paths: ["assets/less"],
                         cleancss: true,
                     },
                     files: {"<%= options.publish %>/css/main.css": "<%= options.base %>/less/main.less"},
                 }
             },
             
            // Javascript minification - uglify
            uglify: {
                vendor : {
                    options: {
                            preserveComments: false,
                            mangle: false
                    },
                    js: {
                            files: {
                                  "<%= options.publish %>/js/vendor.min.js": "<%= options.publish %>/js/vendor.js"
                            },
                    },
                }
            },
            
         });
         
         //load tasks
         grunt.loadNpmTasks('grunt-contrib-concat');
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.loadNpmTasks('grunt-contrib-uglify');
         
         //divide our task in subtask for each environment
         //task for production (compile and minify all)
         grunt.registerTask('production', ['concat:vendor', 'uglify', 'less']);
         //task for local env (compile and minify only less file and vendor)
         grunt.registerTask('local', ['concat:vendor', 'uglify:vendor', 'less']);
     };