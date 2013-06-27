$(document).ready(function() {
    $.getJSON('http://blogs.nature.com/stories.json?c=popularity', function (data) {
        var StoriesListModel = ko.mapping.fromJSON(data);
        ko.applyBindings(StoriesListModel);
    });

});


