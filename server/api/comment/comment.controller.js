'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var math = require('mathjs');

// Get list of comments
exports.index = function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, comments);
  });
};

// Get a single comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return handleError(res, err);
    }
    if (!comment) {
      return res.send(404);
    }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  // don't include the date, if a user specified it
  delete req.body.date;
  console.log("reqqqqqqqqqqqqqq USERRRRRERRRRRRR");
  console.log(req.user);
  console.log("reqBBBBBBBBBBBBBBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOOOOODDDDDDDDDDDDDYYYYYYYYYYY")
  console.log(req.body)
  console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
  var array = req.body.content.split(',');
  console.log(array);
  var i = 0;
  var text = "";
  for (i = 0; i < 2; i++) {
    text += array[i] + ",";
    console.log(math.sin(parseFloat(array[i])));
    if (i === 1) {
      console.log("CCCCCCCCCCCCCCCCCCCCCOOOOOOOOOOOOOOOOSSSSSSSSSSSSSSSS");
      console.log(math.sin(parseFloat(array[i])));
      text += math.cos(parseFloat(array[i])).toFixed(4);
      break;
    }
    text += math.sin(parseFloat(array[i])).toFixed(4) + ",";
  }
  req.body.content = text;
  console.log(text);
  console.log(req.body);
  //console.log(req.user._id)
  var comment = new Comment(_.merge({
    author: "558194cfe4380850581ba76b"
  }, req.body));
  comment.save(function(err, comment) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, comment);
  });
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return handleError(res, err);
    }
    if (!comment) {
      return res.send(404);
    }
    var updated = _.merge(comment, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return handleError(res, err);
    }
    if (!comment) {
      return res.send(404);
    }
    comment.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
