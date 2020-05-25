import React from 'react';
import marvel from './lists';
import {disney} from './lists';
import {states} from './lists';
import {countries} from './lists';

class NameGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: 'home',
                 category: 'marvel',
                 title: '',
                 name: '',
                 score: 0,
                 timeLeft: 180};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.playMarvel = this.playMarvel.bind(this);
    this.playDisney = this.playDisney.bind(this);
    this.playCountries = this.playCountries.bind(this);
    this.playStates = this.playStates.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toCategories = this.toCategories.bind(this);
  }
  
  handleChange(e) {
    this.setState({name: e.target.value.toLowerCase()});
  }
  
  handleSubmit(e) {
    alreadySaid = false;
    for (let i=0; i<gameArr.length; i++) {
      if (this.state.name === gameArr[i]) {
        for (let j=0; j<alreadySaidArr.length; j++) {
          if (this.state.name === alreadySaidArr[j]) {
            alreadySaid = true;
          }
        }
        if (alreadySaid === false) {
          this.correct();
        }
      }
    }
    e.preventDefault();
  }
  
  startTime() {
    this.timer = setInterval(() => this.update(), 1000);
  }
  update() {
    this.setState(state => ({timeLeft: state.timeLeft - 1}));
    if (this.state.timeLeft === 0) {
      this.end();
    }
  }
  end() {
    this.setState({screen: 'end',
                  time: 180});
    clearInterval(this.timer);
    gameArr.splice(0, gameArr.length);
  }
  
  playMarvel() {
    for (let i=0; i<marvel.length; i++) {
      gameArr.push(marvel[i]);
    }
    this.setState({screen: 'game',
                  title: 'Marvel Characters',
                  score: 0});
    alreadySaidArr = [];
    this.startTime();
  }
  playDisney() {
    for (let i=0; i<disney.length; i++) {
      gameArr.push(disney[i]);
    }
    this.setState({screen: 'game',
                  title: 'Disney, Dreamworks, and Pixar Movies',
                  score: 0});
    alreadySaidArr = [];
    this.startTime();
  }
  playCountries() {
    for (let i=0; i<countries.length; i++) {
      gameArr.push(countries[i]);
    }
    this.setState({screen: 'game',
                  title: 'Countries',
                  score: 0});
    alreadySaidArr = [];
    this.startTime();
  }
  playStates() {
    for (let i=0; i<states.length; i++) {
      gameArr.push(states[i]);
    }
    this.setState({screen: 'game',
                  title: 'States',
                  score: 0});
    alreadySaidArr = [];
    this.startTime();
  }
  
  toHome() {
    this.setState({screen: 'home'});
  }
  toCategories() {
    this.setState({screen: 'categories'});
  }
  
  correct() {
    alreadySaidArr.push(this.state.name, ', ');
    this.setState(state => ({score: state.score + 1,
                            name: ''}));
    alreadySaid = false;
  }
  
  render() {
    return (
      <div style={{width: '100vw', height: '100vh', display: 'flex'}}>
        <div style={screenStyle}>
          <GameArea screen={this.state.screen} title={this.state.title} name={this.state.name} score={this.state.score} time={this.state.timeLeft} change={this.handleChange} submit={this.handleSubmit} back={this.toHome} select={this.toCategories} marvel={this.playMarvel} disney={this.playDisney} countries={this.playCountries} states={this.playStates} />
        </div>
      </div>
    );
  }
}

function GameArea(props) {
  const buttonStyle  = {height: '40px', width: '120px', margin: 'auto'};
  switch (props.screen) {
    case 'home':
      return (
        <div style={areaStyle}>
          <h1>Welcome to the Name Game!</h1>
          <h4 style={{margin: '10px'}}>After choosing a category, you will have 3 minutes to type in as many names as you can think of. Dont forget to hit enter or click submit after typing in a name! Also, remember that some names may be hyphenated (superheroes).</h4>
          <button style={buttonStyle} onClick={props.select}>Go To Category Select</button>
        </div>
      );
    case 'categories':
      return (
        <div style={areaStyle}>
          <h3>Please select one of the following categories.</h3>
          <div style={{display: 'flex', flexWrap: 'wrap', textAlign: 'center', width: '300px', height: '100px', margin: 'auto'}}>
            <button style={buttonStyle} onClick={props.marvel}>Marvel Cinematic Universe Characters</button>
            <button style={buttonStyle} onClick={props.countries}>Countries</button>
            <button style={buttonStyle} onClick={props.states}>US States</button>
            <button style={buttonStyle} onClick={props.disney}>Disney, Dreamworks, and Pixar Movies</button>
          </div>
            <br/><br/>
          <button onClick={props.back}>BACK</button>
        </div>
      );
    case 'game':
      return (
        <div style={areaStyle}>
          <h1>{props.title}</h1>
          <h2>Type in names here</h2>
          <form onSubmit={props.submit}>
            <input type='text' value={props.name} onChange={props.change}></input>
            <input type='submit' />
          </form>
          <h4>Score: {props.score}</h4>
          <h4>{props.time} second(s) left</h4>
        </div>
      );
    case 'end':
      return (
        <div style={areaStyle}>
          <h3>Well done, you were able to name {props.score} {props.title.toLowerCase()}!</h3>
          <div style={{width: '75%', border: '1px solid black', margin: 'auto', textAlign: 'center'}}>
            <p>{alreadySaidArr}</p>
          </div>
          <button onClick={props.back}>Back to Home</button>
        </div>
      );
    default:
      break;
  }
}

const screenStyle = {width: '600px',
                    height: '300px',
                    border: '2px solid black',
                    margin: 'auto',
                    display: 'flex'};
const areaStyle = {margin: 'auto',
                  textAlign: 'center'};

let gameArr = [];
let alreadySaidArr = [];
let alreadySaid = false;

export default NameGame;
