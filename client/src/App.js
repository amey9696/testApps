import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./main.scss";
import Store from './store';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import CreatePost from './components/CreatePost';
import Edit from './components/Edit';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/home/:page" component={Dashboard} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/edit/:id" component={Edit} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;