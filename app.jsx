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

var nextId = 4

function Stats(props) {
  var totalPlayers = props.players.length
  var totalPoints = props.players.reduce((total, player) => {
    return total + player.score
  }, 0)
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.PropTypes = {
  players: React.PropTypes.array.isRequeired
}


function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{ props.title }</h1>
      <Stopwatch />
    </div>
  )
}

Header.porpType = {
  title: React.PropTypes.string,
  players: React.PropTypes.array.isRequeired
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
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
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
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
  onPlayerAdd(name) {
    console.log("Player added: ", name)
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    })

    this.setState(this.state)
    nextId += 1
  },
  onRemovePlayer(index) {
    console.log("Remove: ", index)
    this.state.players.splice(index, 1)
    this.setState(this.state)
  },

  render () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players">

        {this.state.players.map((player, index) => {
          return (
            <Player
            name={player.name}
            score={player.score}
            onScoreChange={(delta) => this.onScoreChange(index, delta)}
            onRemove={() => this.onRemovePlayer(index)}
            key={player.id} />
          )
        })}

        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    )

  }

})

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },
  onSubmit(e) {
    e.preventDefault()

    this.props.onAdd(this.state.name)
    this.setState({
      name: ""
    })
  },
  getInitialState() {
    return {
      name: ""
    }
  },
  onNameChange(e) {
    this.setState({
      name: e.target.value
    })
  },
  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    )
  }
})

var Stopwatch = React.createClass({
  getInitialState() {
    return {
      running: false,
      previousTime: 0,
      elapsedTime: 0
    }
  },
  onStop() {
    this.setState({
      running: false,
    })
  },
  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  },
  onReset() {
    this.setState({
     elapsedTime: 0,
     previousTime: Date.now()
    })
  },
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100)
  },
  componentWillUnmount() {
    clearInterval(this.interval)
  },
  onTick() {
    if (this.state.running) {
      var now = Date.now()
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
  },
  render() {
    var startStop
    if (this.state.running) {
      startStop = <button onClick={this.onStop}>Stop</button>
    } else {
      startStop = <button onClick={this.onStart}>Start</button>
    }

    var seconds = Math.floor(this.state.elapsedTime / 1000)
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { startStop }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
})

ReactDOM.render(
  <Application title="My Scoreboard" initialPlayers={PLAYERS}/>, document.getElementById('container')
)

