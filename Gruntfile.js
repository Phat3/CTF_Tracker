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
                //Name of the application
                name: 'CTF_Tracker',
                //Current Version number
                version : '1.0.0',
                // Base path to your assets folder
                base: 'assets',
                // Published assets path
                publish: 'public',              
                //prepend banner after each compile task
                compileBanner : '/*! <%= options.name %> - v<%= options.version %> - ' +
                               'compiled at <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n',
                //we use bower as packet manager then all vendor package are under bower_components directory
                vendor: {
                    //our root directory for every vendor package
                    base: 'bower_components',
                    //option for the concat task
                    concat: [
                        "<%= options.vendor.base %>/angularjs/angular.js",
                        "<%= options.vendor.base %>/jquery-legacy/dist/jquery.min.js"
                    ]
                },            
                // Notification messages options
                notify: {
                        css: {
                                title: 'Css compiled succesfully!',
                                message: 'Less files were modified, recompiled and copied in public/css/'
                        },
                        js: {
                                title: 'JS minified succesfully!',
                                message: 'JS files were modified, reminified and copied in public/js/'
                        },
                        all: {
                                title: 'CTF_Tracker Reloaded!',
				message: 'Files were modified, recompiled and site reloaded'
                        }
                }
                               
            },
            
            // Concatenate multiple js files into one
            concat: {
                    js: {                       
                        src: '',
                        dest: ''
                    },
                    vendor: {
                        src: '<%= options.vendor.concat %>',
                        dest: '<%= options.publish %>/js/concat.vendor.js'
                    }
             },
               
            //compile and minify less file   
            less: {
                 local: {
                     options: {
                         paths: ["assets/less"],
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: {"public/css/main.css": "assets/less/main.less"}
                 },
                 production: {
                     options: {
                         paths: ["assets/less"],
                         //minify css
                         cleancss: true,
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: {"<%= options.publish %>/css/main.min.css": "<%= options.base %>/less/main.less"}
                 }
             },
                   
            // Display notifications
            notify: {
                    css: {
                            options: {
                                    title: '<%= options.notify.css.title %>',
                                    message: '<%= options.notify.css.message %>'
                            }
                    },
                    js: {
                            options: {
                                    title: '<%= options.notify.js.title %>',
                                    message: '<%= options.notify.js.message %>'
                            }
                    },
                    all: {
                            options: {
                                    title: '<%= options.notify.all.title %>',
                                    message: '<%= options.notify.all.message %>'
                            }
                    }
            },
            
            // Watch for files and folder changes
            watch: {
                    options: {
                        livereload: true
                    },
                    css: {
                        files: '<%= options.base %>/less/main.less', 
                        tasks: ['less:local', 'notify:css']
                    }                  
            },
            
            // Clean files and folders before replacement
            clean: {
                    all: {
                            src: ['<%= options.publish %>/css/', '<%= options.publish %>/js/']
                    },
                    js: {
                            src: '<%= options.publish %>/js/' 
                    },
                    css: {
                            src: '<%= options.publish %>/css/' 
                    },
                    concat: {
                            src: '<%= options.publish %>/js/concat.*' 
                    }
            },
            
            // Javascript minify (run this task only in production)
            uglify: {
                vendor : {
                    options: {
                            //delete all comments
                            preserveComments: false,
                            //prevent changes to variable and function names
                            mangle: false,
                            //drop console.* debug calls
                            compress: {
                                drop_console: true
                            },
                            //track the date of the last compile task
                            banner: '<%= options.compileBanner %>'
                            
                    },                   
                    files: { 
                        "<%= options.publish %>/js/vendor.min.js": ["<%= options.publish %>/js/concat.vendor.js"] 
                    }
                    
                }
            }
            
         });
         
         //load tasks
         grunt.loadNpmTasks('grunt-contrib-concat');
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.loadNpmTasks('grunt-notify');
         grunt.loadNpmTasks('grunt-contrib-watch');
         grunt.loadNpmTasks('grunt-contrib-clean');
         grunt.loadNpmTasks('grunt-contrib-uglify');
         
         //divide our task in subtask for each environment
         //task for production (compile and minify all)
         grunt.registerTask('default', ['clean:all', 'concat:vendor', 'uglify', 'clean:concat', 'less:production', 'notify:all']);
         //task for local env (compile and minify only less file and vendor)
         grunt.registerTask('local', ['clean:all', 'concat:vendor', 'uglify:vendor', 'clean:concat', 'less:local', 'watch:css']);
         //prova notify
         grunt.registerTask('not', ['notify']);
     };