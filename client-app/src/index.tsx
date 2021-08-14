import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import dateFnsLocalizer from 'react-widgets-date-fns';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app/layout/styles.css';

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
