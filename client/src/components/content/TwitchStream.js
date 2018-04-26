import React, { Component, Fragment }  from 'react'
import { Container } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/fontawesome-free-brands'

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';


class TwitchStream extends Component {
  componentDidMount() {
    let embed;
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      EMBED_URL
    );
    script.addEventListener('load', () => {
      embed = new window.Twitch.Embed(this.props.targetID, { ...this.props });
    });
    document.body.appendChild(script);
  }

  render() {

    return (
        <div id={this.props.targetID}></div>
    )
  }
}

TwitchStream.defaultProps = {
  targetID: 'twitch-embed',
  width: '100%',
  height: '900',
  channel: 'wepickheroes',
}

export default TwitchStream;
