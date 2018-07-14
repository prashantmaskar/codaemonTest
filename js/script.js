// Code goes here

angular.module("TestApp", ['ngProgress'])
  .config(["$httpProvider", function($httpProvider){
    
    $httpProvider.responseInterceptors.push(function($q, $rootScope){
      
      return function(promise){
        $rootScope.$broadcast("event:startProgress");
        return promise
          .then(
            function(response){
              $rootScope.$broadcast("event:endProgress");
              return response;
            },
            function(response){ //on error
              $rootScope.$broadcast("event:endProgress");
              return $q.reject(response);
            }
          )
          
      }
    })  
  }])
  .service("progress", ["$rootScope", "ngProgress", function($rootScope, ngProgress){
    $rootScope.$on("event:endProgress", function(){
      console.log("End progress");
      ngProgress.complete();
     // ngProgress.reset();
    });
    $rootScope.$on("event:startProgress", function(){
      console.log("Start progress");
      ngProgress.reset();
      ngProgress.start();
    })
  }])
  .controller("IndexCtrl", ["$scope", "$rootScope", "ngProgress", "progress", "$http", function($scope, $rootScope, ngProgress, progress, $http){
    $scope.started = false;

    
    $scope.startAjax = function(fvalue,lvalue){
      
      $scope.fvalue = fvalue;
       $scope.lvalue = lvalue;

       // if(!fvalue || lvalue){

       //     $rootScope.$broadcast("event:startProgress");
       //  console.log('https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name='+$scope.lvalue+'');
       //    $http.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name='+$scope.lvalue+'').success(function(ldata){
       //  console.log("Got reponse");
       //  console.log(ldata);
       //   $rootScope.$broadcast("event:endProgress");
       //  $scope.userdata = ldata;
       // $scope.limit = 20;
       // })
       // }
       // if(fvalue || !lvalue)
       // {

       //     $rootScope.$broadcast("event:startProgress");
       //  console.log('https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name='+$scope.fvalue+' ');
       //    $http.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name='+$scope.fvalue+'').success(function(fdata){
       //  console.log("Got reponse");
       //  console.log(fdata);
       //   $rootScope.$broadcast("event:endProgress");
       //  $scope.userdata = fdata;
       // $scope.limit = 20;
       // })
       // }
      if(!fvalue || !lvalue)
      {

         $rootScope.$broadcast("event:startProgress");
          $http.get("https://data.cityofnewyork.us/resource/5scm-b38n.json").success(function(data){
        console.log("Got reponse");
         $rootScope.$broadcast("event:endProgress");
        $scope.userdata = data;
       $scope.limit = 20;
   })
      
      }
      else{
        
          $rootScope.$broadcast("event:startProgress");
        console.log('https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name='+ $scope.fvalue+'&last_name='+$scope.lvalue+'');
          $http.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name='+ $scope.fvalue+'&last_name='+$scope.lvalue+'').success(function(fldata){
        console.log("Got reponse");
        console.log(fldata);
         $rootScope.$broadcast("event:endProgress");
        $scope.userdata = fldata;
       $scope.limit = 20;
       })
       
     
      }
    
    


      
    }
  }])