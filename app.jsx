var PLAYERS =[
  {
    name: "Riza Fahmi",
    score: 22,
    id: 1
  },
  {
    name: "Naufal Hisyam",
    score: 25,
    id: 2
  },
  {
    name: "Haaris Ramadhan",
    score: 15,
    id: 3
  }
]

function Header(props) {
  return (
    <div className="header">
      <h1>{ props.title }</h1>
    </div>
  )
}
Header.porpType = {
  title: React.PropTypes.string
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter initialScore={props.score}/>
      </div>
    </div>
  )
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequeired,
  score: React.PropTypes.number.isRequired
}

var Counter = React.createClass({
  propTypes: {
    initialScore: React.PropTypes.number.isRequired
  },
  getInitialState() {
    return {
      score: this.props.initialScore
    }
  },
  incrementScore(e) {
    this.setState({
      score: this.state.score + 1
    })
  },
  decrementScore(e) {
    this.setState({
      score: this.state.score - 1
    })
  },
  render() {

    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score">{this.state.score}</div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>

    )
  }
})


function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">

      {props.players.map((player) => {
        return <Player name={player.name} score={player.score} key={player.id} />
      })}

      </div>
    </div>
  )
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequeired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired
  })).isRequired
}

Application.defaultProps = {
  title: "Scoreboard"
}

ReactDOM.render(
  <Application title="My Scoreboard" players={PLAYERS}/>, document.getElementById('container')
)

