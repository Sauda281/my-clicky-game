import React, { Component } from 'react';
import Card from "./components/Cards";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import flowers from "./cards.json";
import './App.css';

class App extends Component{
  state = {
    flowers,
    clickedFlowerIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedFlowerIds = this.state.clickedFlowerIds;

    if(clickedFlowerIds.includes(id)){
      this.setState({ clickedFlowerIds: [], score: 0, status: "You lost! Click to play again"});
      return;
    }else{
      clickedFlowerIds.push(id)

      if(clickedFlowerIds.length === 12){
        this.setState({score: 12, status: "Congratulations, you won!. Click to play again!", clickedFlowerIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ flowers, clickedFlowerIds, score: clickedFlowerIds.length, status: " "});

      for (let i = flowers.length - 1; i > 0; i--) {
        let k = Math.floor(Math.random() * (i + 1));
        [flowers[i], flowers[k]] = [flowers[k], flowers[i]];
      }
    }
  }

  // render a card component for each card object
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Clicky Game</h1>
        <p className="App-intro">Try not to click the same image twice!
        </p>
        </header>
        <Score total={this.state.score}
        goal={12}
        status={this.state.status} />

        <Wrapper>
          {this.state.flowers.map(flower =>(
            <Card
            shuffleScoreCard={this.shuffleScoreCard}
            id={flower.id}
            key={flower.id}
            image={flower.image}
            />
          ))}
        </Wrapper>
        <footer>

        </footer>
      </div>
    );
  }
}


export default App;
