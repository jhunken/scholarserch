var request = require('request');
exports.index = function (req, res) {
    
    request({ uri: 'http://blogs.nature.com/stories.json?c=popularity' }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //body seems to be array of JSON objects, but array itself is not JSON valid?
            var stories = JSON.parse(body);
            var story1 = JSON.parse(stories[0]);
            console.log(story1.story.created_at);
            res.render('index', { data: story1 });
        }
    })
  
};