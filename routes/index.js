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

    request({ uri: 'http://blogs.nature.com/stories.json?c=popularity' }, function (error, response, body) {

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
        }
    })

};