import React, {Component} from 'react';
import axios from 'axios';
const Promise = require('bluebird');
import Songs from './Songs';
import AllAlbums from './AllAlbums';
import { HashRouter, Route, Link } from 'react-router-dom';


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
   })


  }

  render() {
    console.log(this.state.artist.name)
    return (
      <HashRouter>

        <div>
          <Route exact path="/albumsfromaplace" render={()=> <AllAlbums albums={this.state.artistAlbums}/>}/>
          <h3>{this.state.artist.name}</h3>
          <ul className="nav nav-tabs">
            <li><Link to="/albumsfromaplace">ALBUMS</Link></li>
            <li><Link to="">SONGS</Link></li>
          </ul>
          <h4>ALBUMS</h4>



          {/*
              <AllAlbums albums={this.state.artistAlbums}/>
            <h4>SONGS</h4>
          <Songs songs={this.state.artistSongs}/> */}
        </div>
      </HashRouter>
    )
  }
}
