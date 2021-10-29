// Style
import './App.css';

// Logic
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import QuestionPage from './pages/question';
import NewQuestionPage from './pages/new';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          /* Default to login page */
          <Route path="/" exact component={() => <LoginPage />} />
          /* Registeration */
          <Route path="/register" exact component={() => <RegisterPage />} />
          /* Login */
          <Route path="/login" exact component={() => <LoginPage />} />
          /* Dashboard */
          <Route path="/dashboard" exact component={() => <DashboardPage />} />
          /* Questions */
          <Route path="/new" exact component={() => <NewQuestionPage />} />
          <Route path="/question/:id" exact component={() => <QuestionPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;