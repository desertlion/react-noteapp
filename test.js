'use strict';

var React = require('react');

var Hello = React.createClass({
    render: function(){
        return React.createElement('div', {}, 'Hello World');
    }
});

React.render(Hello(), document.body);
