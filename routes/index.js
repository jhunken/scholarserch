var request = require('request');
var htmlEscape = function (html) {
    return String(html)
    //.replace(/&(?!\w+;)/g, '&amp;')
    //.replace(/</g, '&lt;')
    //.replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
        //newlines
    .replace(/(\r\n|\n|\r)/gm, "");
};
exports.index = function (req, res) {

    request({ uri: 'http://blogs.nature.com/stories.json' }, function (error, response, body) {
    //request({ uri: 'http://blogs.asdf.com/stories.json?c=popularity' }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //body seems to be array of JSON objects, but array itself is not JSON valid?
            var stories = JSON.parse(body);
            var storiesArray = new Array();
            for (var i = 0; i < stories.length; i++) {
                var story = JSON.parse(stories[i]);
                story.story.posts[0].body = htmlEscape(story.story.posts[0].body);
                storiesArray.push(story);
            }

            //console.log(story1.story.created_at);
            res.render('index', { stories: storiesArray });
        } else {
            res.render('index', { stories: [] });
        }
    })

};
exports.about = function (req, res) {
    res.render('about', {});
};
exports.category = function (req, res) {

    request({ uri: 'http://www.nature.com/opensearch/request?query='+req.query.cat+'&httpAccept=application/json' }, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            //body seems to be array of JSON objects, but array itself is not JSON valid?
            var stories = JSON.parse(body).feed.entry;
            for (var i = 0; i < stories.length; i++) {

                for (var propertyName in stories[i]) {
                    if (propertyName == 'sru:recordData') {
                        var test = htmlEscape(stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description']);
                        stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description'] = test;

                    }
                }
            }
            //var stories = body.replace(/(\r\n|\n|\r)/gm, "");
            //console.log(story1.story.created_at);
            res.render('category', { stories: stories });
        } else {
            res.render('category', { stories: {} });
        }
    })

};
exports.stanford = function (req, res) {

    request({ uri: 'http://www.nature.com/opensearch/request?query=stanford&httpAccept=application/json' }, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            //body seems to be array of JSON objects, but array itself is not JSON valid?
            var stories = JSON.parse(body).feed.entry;
            for (var i=0; i< stories.length; i++) {

                for (var propertyName in stories[i]) {
                    if (propertyName == 'sru:recordData') {
                        var test = htmlEscape(stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description']);
                        stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description'] = test;
                        
                    }
                }
            }
            //var stories = body.replace(/(\r\n|\n|\r)/gm, "");
            //console.log(story1.story.created_at);
            res.render('stanford', { stories: stories });
        } else {
            res.render('stanford', { stories: {} });
        }
    })

};
exports.search = function (req, res) {

    request({ uri: 'http://www.nature.com/opensearch/request?query='+req.body.query+'&httpAccept=application/json' }, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            //body seems to be array of JSON objects, but array itself is not JSON valid?
            var stories = JSON.parse(body).feed.entry;
            for (var i = 0; i < stories.length; i++) {

                for (var propertyName in stories[i]) {
                    if (propertyName == 'sru:recordData') {
                        var test = htmlEscape(stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description']);
                        stories[i][propertyName]['pam:message']['pam:article']['xhtml:head']['dc:description'] = test;

                    }
                }
            }
            //var stories = body.replace(/(\r\n|\n|\r)/gm, "");
            //console.log(story1.story.created_at);
            res.render('search', { stories: stories });
        } else {
            res.render('search', { stories: {} });
        }
    })

};