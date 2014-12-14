<!doctype html>
<html lang="en" ng-app="ctf_tracker.admin">
    <head>
        <meta charset="UTF-8">
      
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel PHP Framework</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/sb-admin-2.min.css">
        <link rel="stylesheet" href="/css/admin.min.css">
        <script src="/js/vendor.min.js"></script>
        <script src="/js/admin.min.js"></script>
        <script src="/js/sb-admin-2.min.js"></script>
    </head>
    <body>

    <body>

        <div id="wrapper">
           
            @include('admin.layout.sidebar')
            <div id="page-wrapper">
                <div class="animate-fade-up" ui-view="main"></div>           
            </div>
            
        </div>
        
    </body>
    
</html>