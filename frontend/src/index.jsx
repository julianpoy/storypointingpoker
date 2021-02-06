import { render } from 'preact';
import { Main } from './components/main.jsx';

const App = () => (
  <div>
    Welcome

    <Main />
  </div>
);

render(<App />, document.body);
