import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

let randomGif = `/labs.gif`;

const Index = () => (
  <div className="Index">

    <img
      src={randomGif}
      alt="Clever Beagle"
    />

    <h1>Vaultoro</h1>
    <p>The exchange that you always needed</p>
    <div>
      <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
    <footer>
      <p>Need help and want to stay accountable building your product? <a href="http://cleverbeagle.com?utm_source=pupappindex&utm_campaign=oss">Check out Clever Beagle</a>.</p>
    </footer>
  </div>
);

export default Index;
