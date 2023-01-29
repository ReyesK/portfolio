import 'App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationLinks from 'components/navigation/NavigationLinks';
import Router from 'router';
import { CssVarsProvider, Sheet } from '@mui/joy';

function App() {
  return (
    <CssVarsProvider>
      <Sheet>
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
      </Sheet>
    </CssVarsProvider>
  );
}

export default App;
