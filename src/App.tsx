import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UncontrolledForm from './components/UncontrolledForm/PageTwo';
import { Provider } from 'react-redux';
import { store } from './store';
import PageOne from './components/ControlledForm/PageOne';

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="page2" element={<UncontrolledForm />} />
          </Routes>
        </Provider>
      </div>
    </>
  );
}

export default App;
