import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      seasons: [],
      episodes: [],
      selectedSeason: 1,
    }
    this.SeasonsComponent = this.SeasonsComponent.bind(this);
    this.EpisodesComponent = this.EpisodesComponent.bind(this);
  }

  componentDidMount() {
    fetch("https://api.tvmaze.com/shows/1").then(res => res.json())
      .then((showsData) => {
        // console.log("show", showsData)
        this.setState({
          shows: showsData
        })
      },
      );
    fetch("https://api.tvmaze.com/shows/1/seasons").then(res => res.json())
      .then((seasonsData) => {
        // console.log("seasons", seasonsData)
        this.setState({
          seasons: seasonsData
        })
      },
      );
    fetch("https://api.tvmaze.com/shows/1/episodes").then(res => res.json())
      .then((episodesData) => {
        // console.log("episodes", episodesData)
        this.setState({
          episodes: episodesData
        })
      },
      );
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <h1>
          {this.state.shows.name}
        </h1>
      </header>
      <div className='twopanes'>
        <this.SeasonsComponent />
        <div style={{ width: "2px", backgroundColor: "#BDBDBD", height: "100vh", margin:0, padding:0 }}></div>
        <this.EpisodesComponent />
      </div>
    </div>);
  }

  SeasonItem(props) {

    return (
      <div className='seasonItem'>
        <div onClick={props.onClick}>
          <h2>Season {props.value}</h2>
        </div>
      </div>
    );
  }
  SeasonsComponent() {
    const seasons = this.state.seasons;
    return (
      <div className='pane'>
        <h1>Seasons</h1>
        <div className='seasonsContent'>
          {seasons.map((item, index) => <this.SeasonItem key={item.id} value={item.number} onClick={() => { this.setState({ selectedSeason: item.number }) }} />)}
        </div>
      </div>
    );
  }

  EpisodeItem(props) {
    const desc = props.value.summary.replace(/(<p[^>]+?>|<p>|<\/p>)/g, "");
    return (
      <>
        <h2 style={{ color: "#212121" }}>Episode {props.value.number}</h2>
        <h3 style={{ color: "#757575" }}>{desc}</h3>
      </>
    );
  }

  EpisodesComponent() {
    const context = this;
    const seasons = context.state.episodes;
    return (
      <div className='pane'>
        <h1>Episodes</h1>
        <div className='seasonsContent'>
          {seasons.map((item, index) => context.state.selectedSeason == item.season ? <this.EpisodeItem key={item.id} value={item} onClick={() => { this.setState({ selectedSeason: item.number }) }} /> : <></>)}
        </div>
      </div>
    );
  }

}

export default App;

