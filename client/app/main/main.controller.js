'use strict';

angular.module('angularTubeApp')
  .controller('MainCtrl', function($scope, $http, socket) {

    $scope.newComment = '';
    $scope.fnewComment = '';



    // Grab the initial set of available comments
    $http.get('/api/comments').success(function(comments) {
      $scope.comments = comments;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('comment', $scope.comments, function(event, comment, comments) {
        // This callback is fired after the comments array is updated by the socket listeners

        // sort the array every time its modified
        comments.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      });
    });

    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('comment');
    });

    var i = 0;
    var textmax = '';

    function myTimer() {
      console.log('inmyTimer');
      console.log(i);
      textmax = parseFloat(i / 10) + ',' + parseFloat(i / 10);
      console.log('Textmax');
      console.log(textmax);
      $scope.newComment = textmax;
      $http.post('/api/comments', {
        content: $scope.newComment
      });
      i = i + 1;
      console.log(i);


    }
    var intervalPost;
    // Use our rest api to post a new comment
    $scope.addComment = function() {

      intervalPost = setInterval(function() {
        myTimer();
      }, 1000);
      if (i > 180) {
        clearInterval(intervalPost);
        intervalPost = 0;
      }

    };

    $scope.faddComment = function() {
      console.log($scope.fnewComment);
      $http.post('/api/comments', {
        content: $scope.fnewComment
      });

    };

    $scope.stopsimulation = function() {
      clearInterval(intervalPost);
      intervalPost = 0;
    };


  });
