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
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  )
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequeired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
}

function Counter(props) {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={() => props.onChange(-1)}> - </button>
        <div className="counter-score">{props.score}</div>
        <button className="counter-action increment" onClick={() => props.onChange(1)}> + </button>
      </div>

    )

}

Counter.PropTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}


var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequeired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })).isRequired
  },
  getDefaultProps() {

    return {
      title: "Scoreboard"
    }

  },
  getInitialState() {
    return {
      players: this.props.initialPlayers
    }
  },
  onScoreChange(index, delta) {
    console.log('onScoreChange ', index, delta)
    this.state.players[index].score += delta
    this.setState(this.state)
  },

  render () {
    return (
      <div className="scoreboard">
      <Header title={this.props.title} />
      <div className="players">

      {this.state.players.map((player, index) => {
        return (
          <Player
          name={player.name}
          score={player.score}
          onScoreChange={(delta) => this.onScoreChange(index, delta)}
          key={player.id} />
        )
      })}

      </div>
      </div>
    )

  }

})


ReactDOM.render(
  <Application title="My Scoreboard" initialPlayers={PLAYERS}/>, document.getElementById('container')
)

