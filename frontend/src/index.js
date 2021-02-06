import { render } from 'preact';
import { Card } from './components/card';

const App = () => (
  <div>
    Welcome

    <Card number={2} />
  </div>
);

render(<App />, document.body);

