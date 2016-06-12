/**
 * Created by D on 29.4.2016 ã..
 */
var express = require('express');

var routes = function (Project) {
    var router = express.Router();
    router.post('/create', isAuthenticated, function (req, res, next) {
        var project = Project(req.body);
        project.save(function (err, project) {
            console.log(project);
            console.log('Project saved!');
            res.json(project);
        });
    });
    router.post('/update/:id', isAuthenticated, function (req, res, next) {
        console.log(req.body.tasks);
        Project.findById(req.params.id, function (err, project) {
            //var prj = req.body;
            //var tasks = prj.tasks;
            project.tasks = req.body.tasks;
            project.description = req.body.description;
            project.name = req.body.name;
            project.overallTime = req.body.overallTime;
            project.save(function (err, project) {

                console.log('Saved  project');

                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json({
                        _id: project._id
                    });
                    //res.send('Project updated!');
                }
            });
        });
    });
    router.get('/', function (req, res, next) {
        Project.find({}, function (err, projects) {
            res.json(projects);
        }).populate('participants');

    });
    router.get('/:id', function (req, res, next) {
        Project.findOne({_id: req.params.id}, function (err, project) {
            res.json(project);
        }).populate('participants');
    });

    router.delete('/:id', function (req, res, next) {
        console.log(req.params.id);
        Project.remove({_id: req.params.id}, function (err) {
            res.send('deleted!');
        });
    });

    router.post('/update/:id/task/:taskId/progress/:progress', isAuthenticated, function (req, res, next) {
        console.log(req.params);
        Project.findOne({
            _id: req.params.id, 'tasks._id': req.params.taskId
        }, function (err, project) {
            if (err) {
                console.log(err);
            }
            for (var i = 0, len = project.tasks.length; i < len; i++) {
                if (project.tasks[i]._id == req.params.taskId) {
                    project.tasks[i].completion = req.params.progress;
                    project.save(function (err, project) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Project saved!');
                        console.log(project);

                    });
                    break;
                }

            }
            res.send('ok');
        });
    });
    router.get('/:profile/projects', isAuthenticated, function (req, res) {
        console.log(req.params.profile);
        Project.find({participants: req.params.profile}, function (err, projects) {
            res.json(projects);
        }).populate('participants');

    });


    function isAuthenticated(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    return router;
};


module.exports = routes;
