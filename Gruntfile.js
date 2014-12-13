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
                    baseBower: 'bower_components',
                    //option for the concat task
                    concat: [
                        "<%= options.vendor.baseBower %>/angularjs/angular.js",
                        "<%= options.vendor.baseBower %>/jquery-legacy/dist/jquery.min.js",
                        "<%= options.vendor.baseBower %>/bootstrap/dist/js/bootstrap.min.js",
                        "<%= options.vendor.baseBower %>/angular-ui-router/release/angular-ui-router.min.js"
                    ],
                    //option for the copy task
                    copy: {
                        css: {
                            //we put the minified vendor css in public/css/vendor
                            publish : '<%= options.publish %>/css/',
                            //specify the files that you want to copy
                            files : [
                                "<%= options.vendor.baseBower %>/bootstrap/dist/css/bootstrap.min.css",
                                "<%= options.vendor.baseBower %>/font-awesome/css/font-awesome.min.css",
                            ]
                        },
                        fonts: {
                            //we put the minified vendor css in public/css/vendor
                            publish : '<%= options.publish %>/fonts/',
                            //specify the files that you want to copy
                            files : [
                                "<%= options.vendor.baseBower %>/font-awesome/fonts/*",
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
                    },
                    js:{
                        files : "" //set by the preparefiles task
                    }
                },
                // Concat task options
                concat:{                  
                    files : "" //set by the preparefiles task
                },
                // Copy task options
                copy:{                  
                    files : "" //set by the preparefiles task
                },
                // Copy task options
                uglify:{                  
                    files : "" //set by the preparefiles task
                }
            },
            
            // Concatenate multiple js files into one
            concat: {
                    js: {                       
                        files: '<%= options.concat.files %>'
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
            
            // Watch for files and folder changes (only local env)
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
                        files: '<%= options.watch.js.files %>', 
                        tasks: ['concat:js', 'copy:js', 'clean:concat','notify:js']
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
                vendor : {                                    
                    files: { 
                        "<%= options.publish %>/js/vendor.min.js": ["<%= options.publish %>/js/concat.vendor.js"] 
                    }                   
                },
                js : {
                   files: '<%= options.uglify.files %>' 
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
                },
                fonts: {
                    //copy only the specified file and not its directory structure
                    expand: true,
                    flatten: true,
                    src: '<%= options.vendor.copy.fonts.files %>',
                    dest: '<%= options.vendor.copy.fonts.publish %>'
                },
                js : {
                    files: '<%= options.copy.files %>'
                }
            }
                      
         });
        
        grunt.registerTask('preparefiles', 'Scan the asset subdirectory and compile every less file', function() {
            //publisg root directory
            var publish = grunt.config.get('options.publish');
            //initialize the proper objecys
            var lessFiles = [];
            var jsCopyFiles = [];
            var jsConcatFiles = [];
            var watchLessFiles = [];
            var watchJsFiles = [];

            // read all subdirectories from assets folder
            grunt.file.expand(grunt.config.get('options.base') + '/*').forEach(function(module){
                //prepare the local object
                var lessFile = {};
                //prepare the local object
                var jsCopyFile = {};
                //prepare the local object
                var jsConcatFile = {};
                //prepare info
                var taskUnit = {
                      less : {
                          //include every less files of the submodule in the main.less file and save it to es : "public/coss/common.min.css"
                          target : publish + '/css/' + module.split('/').pop() + '.min.css',
                          source : module + '/less/main.less'
                      },
                      js : {
                          targetConcat : publish + '/js/' + 'concat.' + module.split('/').pop() + '.min.js',
                          targetCopy : publish + '/js/' + module.split('/').pop() + '.min.js',
                          source : module + '/js/*.js'
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
                //check if exist at least one file in the source pattern
                if(grunt.file.expand(taskUnit.js.source).length > 0){
                    //build the proper object
                    jsConcatFile[taskUnit.js.targetConcat] = taskUnit.js.source;
                    jsCopyFile[taskUnit.js.targetCopy] = taskUnit.js.targetConcat;
                    //push the object into the general files object
                    jsCopyFiles.push(jsCopyFile);
                    //push the object into the general files object
                    jsConcatFiles.push(jsConcatFile);
                    watchJsFiles.push(taskUnit.js.source);
                }
               
            });
            //set the proper option
            grunt.config.set('options.less.files', lessFiles);
            grunt.config.set('options.watch.css.files', watchLessFiles);
            grunt.config.set('options.concat.files', jsConcatFiles);
            grunt.config.set('options.copy.files', jsCopyFiles);
            grunt.config.set('options.uglify.files', jsCopyFiles);
            grunt.config.set('options.watch.js.files', watchJsFiles);
            //DEBUG
            grunt.config.get('options.uglify.files').forEach(function(value){
                grunt.log.writeln(value);
            });
                       
        });
        
        //catch the watch:css event and set the proper source file that has to be compiled
        grunt.event.on('watch', function(action, filepath){
            //get the root publish directory
            var publish = grunt.config.get('options.publish');
            //set less src
            if(filepath.split('.').pop() === 'less'){                
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
                //set the target of the compilation process 
                var targetConcat = publish + '/js/' + 'concat.' + filepath.split('/')[1] + '.min.js';
                //set the target of the compilation process 
                var targetCopy = publish + '/js/' + filepath.split('/')[1] + '.min.js';
                //create the object
                var jsCopyFile = {};
                var jsConcatFile = {};
                //all sub files are included into main.less file of the module, compile it
                var source = filepath.split('/')[0] + '/' +filepath.split('/')[1] + '/js/*.js';
                //set the object
                jsCopyFile[targetCopy] = targetConcat;
                jsConcatFile[targetConcat] = source;
                //set the proper option
                grunt.config.set('options.copy.files', jsCopyFile);
                grunt.config.set('options.concat.files', jsConcatFile);
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
         grunt.registerTask('default', ['clean:all', 'preparefiles', 'concat', 'uglify', 'less:production', 'copy:css', 'copy:fonts', 'clean:concat', 'notify:all']);
         //task for local env (compile and minify only less file and vendor)
         grunt.registerTask('local', ['clean:all', 'preparefiles', 'concat', 'uglify:vendor', 'less:local', 'copy', 'clean:concat', 'watch']);
       
     };