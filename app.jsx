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
        <Counter />
      </div>
    </div>
  )
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequeired,
  score: React.PropTypes.number.isRequired
}

var Counter = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      score: 0
    }
  },
  render() {

    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <div className="counter-score">{this.state.score}</div>
        <button className="counter-action increment"> + </button>
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

