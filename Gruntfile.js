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
                        "<%= options.vendor.base %>/jquery-legacy/dist/jquery.min.js",
                        "<%= options.vendor.base %>/bootstrap/dist/js/bootstrap.min.js"
                    ],
                    //option for the copy task
                    copy: {
                        css: {
                            //we put the minified vendor css in public/css/vendor
                            publish : '<%= options.publish %>/css/vendor/',
                            //specify the files that you want to copy
                            files : [
                                "<%= options.vendor.base %>/bootstrap/dist/css/bootstrap.min.css",
                            ]
                        }
                    }
                    
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
                },
                // Less compiler options
                less:{
                    paths : ["assets/*"],
                    files : "" //set by the preparefiles task
                },
                // Watch compiler options
                watch:{
                    css:{
                        files : "" //set by the preparefiles task
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
                         paths: '<%= options.less.path %>',
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: "<%= options.less.files %>"
                 },
                 production: {
                     options: {
                         paths: '<%= options.less.path %>',
                         //minify css
                         cleancss: true,
                         //track the date of the last compile task
                         banner: '<%= options.compileBanner %>'
                     },
                     files: "<%= options.less.files %>"
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
                        livereload: true,
                        //prevent the spawn of a child process, with this solution we can set the files option in the watch event and compile only the file that has been changed
                        nospawn: true
                    },
                    css: {
                        files: '<%= options.watch.css.files %>', 
                        tasks: ['less:local', 'notify:css']
                    }, 
                    js: {
                        files: '<%= options.less.files %>', 
                        tasks: ['uglify:vendor', 'notify:js']
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
            },
            //copy the vedor minified files in the public folder
            copy: {
                css: {
                    //copy only the specified file and not its directory structure
                    expand: true,
                    flatten: true,
                    src: '<%= options.vendor.copy.css.files %>',
                    dest: '<%= options.vendor.copy.css.publish %>'
                }
            }
                      
         });
        
        grunt.registerTask('preparefiles', 'Scan the asset subdirectory and compile every less file', function() {
            //publisg root directory
            var publish = grunt.config.get('options.publish');
            //initialize the proper objecys
            var lessFiles = [];
            var watchLessFiles = [];

            // read all subdirectories from assets folder
            grunt.file.expand(grunt.config.get('options.base') + '/*').forEach(function(module){
                //prepare the local object
                var lessFile = {};
                //prepare info
                var taskUnit = {
                      less : {
                          //include every less files of the submodule in the main.less file and save it to es : "public/coss/common.min.css"
                          target : publish + '/css/' + module.split('/').pop() + '.min.css',
                          source : module + '/less/main.less'
                      }
                };
                //check if the source file exist
                if(grunt.file.exists(taskUnit.less.source)){
                     //build the proper object
                     lessFile[taskUnit.less.target] = taskUnit.less.source;
                     //push the object into the general files object
                     lessFiles.push(lessFile);
                     watchLessFiles.push(taskUnit.less.source);
                }

            });
            //set the proper option
            grunt.config.set('options.less.files', lessFiles);
            grunt.config.set('options.watch.css.files', watchLessFiles);
            //DEBUG
            grunt.config.get('options.watch.css.files').forEach(function(value){
                grunt.log.writeln(value);
            });
                       
        });
        
        //catch the watch:css event and set the proper source file that has to be compiled
        grunt.event.on('watch', function(action, filepath){
            //set less src
            if(filepath.split('.').pop() === 'less'){
                //get the root publish directory
                var publish = grunt.config.get('options.publish');
                //set the target of the compilation process 
                var target = publish + '/css/' + filepath.split('/')[1] + '.min.css';
                //create the object
                var lessFile = {};
                //all sub files are included into main.less file of the module, compile it
                var source = filepath.split('/')[0] + '/' +filepath.split('/')[1] + '/less/main.less';
                //set the object
                lessFile[target] = source;
                //set the proper option
                grunt.config.set('options.less.files', lessFile);  
            }
            //set js source
            else{
                //TODO
            }
        });

         
         //load tasks
         grunt.loadNpmTasks('grunt-contrib-concat');
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.loadNpmTasks('grunt-notify');
         grunt.loadNpmTasks('grunt-contrib-watch');
         grunt.loadNpmTasks('grunt-contrib-clean');
         grunt.loadNpmTasks('grunt-contrib-uglify');
         grunt.loadNpmTasks('grunt-contrib-copy');
         
         //divide our task in subtask for each environment
         //task for production (compile and minify all)
         grunt.registerTask('default', ['clean:all', 'preparefiles', 'concat:vendor', 'uglify', 'clean:concat', 'less:production', 'copy', 'notify:all']);
         //task for local env (compile and minify only less file and vendor)
         grunt.registerTask('local', ['clean:all', 'preparefiles', 'concat:vendor', 'uglify:vendor', 'clean:concat', 'less:local', 'copy', 'watch:css']);
       
     };