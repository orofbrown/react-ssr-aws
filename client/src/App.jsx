import React, { useState } from 'react';
import Html from './Html';

const GREETING1 = 'Hello World from React';
const GREETING2 = 'Alternate Greeting from Client';

function App({ assets }) {
  const [greeting, setGreeting] = useState(GREETING1);

  const toggleGreeting = (ev) => {
    setGreeting((prev) => {
      return prev === GREETING1 ? GREETING2 : GREETING1;
    });
  };

  return (
    <Html assets={assets}>
      <main>
        <h2>{greeting}</h2>
        <button type="button" onClick={toggleGreeting}>
          Change Greeting
        </button>
      </main>
    </Html>
  );
}

export default App;
