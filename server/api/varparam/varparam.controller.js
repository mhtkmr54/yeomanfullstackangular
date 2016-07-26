'use strict';

var _ = require('lodash');
var Varparam = require('./varparam.model');

// Get list of varparams
exports.index = function(req, res) {
  Varparam.find(function (err, varparams) {
    if(err) { return handleError(res, err); }
    return res.json(200, varparams);
  });
};

// Get a single varparam
exports.show = function(req, res) {
  Varparam.findById(req.params.id, function (err, varparam) {
    if(err) { return handleError(res, err); }
    if(!varparam) { return res.send(404); }
    return res.json(varparam);
  });
};

// Creates a new varparam in the DB.
exports.create = function(req, res) {
  Varparam.create(req.body, function(err, varparam) {
    if(err) { return handleError(res, err); }
    return res.json(201, varparam);
  });
};

// Updates an existing varparam in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Varparam.findById(req.params.id, function (err, varparam) {
    if (err) { return handleError(res, err); }
    if(!varparam) { return res.send(404); }
    var updated = _.merge(varparam, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, varparam);
    });
  });
};

// Deletes a varparam from the DB.
exports.destroy = function(req, res) {
  Varparam.findById(req.params.id, function (err, varparam) {
    if(err) { return handleError(res, err); }
    if(!varparam) { return res.send(404); }
    varparam.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}