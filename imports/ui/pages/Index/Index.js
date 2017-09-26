import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

let randomGif = `/labs.gif`;

const getRandomGif = () => {
  return fetch(`https://api.giphy.com/v1/gifs/random?api_key=3CumK1Aa3lPU1FixBbf0S778VAvmIfWB&tag=burrito&rating=G&fmt=json`)
    .then((response) => response.json())
    .then(gifObj => {
      return gifObj.data.image_url
    })
}

class Index extends Component {


  componentDidMount() {
    getRandomGif().then(gifUrl => {
      this.gifSrc.setAttribute('src', gifUrl)
    })
  }

  render() {

    return (
      <div className="Index">

        <img
          ref={ (gifSrc) => {this.gifSrc = gifSrc}}
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
    )
  }
}

export default Index;
