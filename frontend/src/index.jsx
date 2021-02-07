import { render } from 'preact';
import { Main } from './components/main.jsx';

import styles from './styles/index.scss';

const App = () => (
  <div style={{ backgroundImage: 'url(./images/welcome-background.jpg)' }}>
    <div className={styles.welcomeTitle}>
      <h2>Welcome to Story Poker</h2>
    </div>
    <Main />
  </div>
);

render(<App />, document.body);
