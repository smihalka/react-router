import React, {Component} from 'react';
import axios from 'axios';
const Promise = require('bluebird');

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
  const artistNames = axios.get(`/api/artists/${this.props.match.params.artistId}`);
  const artistAlbums = axios.get(`/api/artists/${this.props.match.params.artistId}/albums`);
  const artistSongs = axios.get(`/api/artists/${this.props.match.params.artistId}/songs`);

  // console.log(this);

   Promise.all([artistNames, artistAlbums, artistSongs])
   .spread((name, albums, songs) => {
    //  console.log(this)
     return [name.data, albums.data, songs.data]
   })
   .spread((dbName, dbAlbums, dbSongs) => {
    // console.log(this);
     this.setState({
       artist: dbName,
       artistAlbums: dbAlbums,
       artistSongs: dbSongs
     })
    //  console.log(this.state);
   })
      // .then(res => res.data)
      // .then(artist => {
      //    console.log(artist.name);
      //    this.setState({
      //      artist: artist.name
      //    })
      //  })

  }

  render() {
    console.log(this.state.artist.name)
    return (
      <div>
        <h3>{this.state.artist.name}</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>
    )
  }
}
