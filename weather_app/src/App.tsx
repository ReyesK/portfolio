import 'App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationLinks from 'components/NavigationLinks';
import Router from 'router';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          krwx
        </a>
        <div className="navbar-nav mr-auto">
          <NavigationLinks />
        </div>
      </nav>
      <div className="container mt-3">
        <Router/>
      </div>
    </div>
  );
}

export default App;
