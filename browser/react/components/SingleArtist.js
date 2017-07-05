import React, {Component} from 'react';
import axios from 'axios';

export default class SingleArtist extends Component {
  constructor(){
    super();
    this.state = {
      artist: {},
      artistAlbums: [],
      artistSongs: []
    }
  }

  componentDidMount() {
  //  console.log(this.props.match.params.artistId)
   axios.get(`/api/artists/${this.props.match.params.artistId}`)
      .then(res => res.data)
      .then(artist => {

         this.setState({artist})
       })
  }
  render() {
    console.log(this.state.artist.name)
    return (
      <div>
        <h3></h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>
    )
  }
}
