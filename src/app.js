/*jshint node:true, browser: true*/

var React       = require('react/addons'),
    MainView    = require('./views/mainView.jsx');


React.renderComponent(
    MainView(),
    document.getElementById('todoapp')
); 


