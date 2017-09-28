var React = require('react');
var ReactDOM = require('react-dom');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

ReactDOM.render(
 //  <div>
 //   <CircularProgress />
 //   <CircularProgress size={60} thickness={7} />
 //   <CircularProgress size={80} thickness={5} />
 // </div>,
  <div>
    <h1>Hello, world</h1>
    <MuiThemeProvider>
      <RaisedButton label="Default" />
    </MuiThemeProvider>
  </div>,
  document.getElementById('content')
);
