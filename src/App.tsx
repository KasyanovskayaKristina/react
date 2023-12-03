import './App.css';
import { Routes, Route } from 'react-router-dom';
import PageOne from './components/PageOne';
import Header from './components/Header';
import Home from './components/Home';
import UncontrolledForm from './components/PageTwo';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="page1" element={<PageOne />} />
            <Route path="page2" element={<UncontrolledForm />} />
          </Routes>
        </Provider>
      </div>
    </>
  );
}

export default App;
