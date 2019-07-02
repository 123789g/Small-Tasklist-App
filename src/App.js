import React from "react"
import "./App.css"
import logo from "./img/logo.png"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="EoDHeader">
          <a href="">
            <img src={logo} className="EoDLogo" />
          </a>
        </header>
        <div className="EoDContainer">
          <input
            type="text"
            className="EoDInput"
            placeholder="What's the plan?"
            ref={this.EoDInput}
            onKeyUp={this.addTask}
          />

          {this.state.EoData.map((mapData, index) => (
            <div key={mapData.id} className="EoDItem">
              <div className="EoDItemLeft">
                <input
                  type="checkbox"
                  onChange={event => this.checkTask(mapData, index, event)}
                />
                <div
                  className={
                    "EoDItemLabel " + (mapData.done ? "completed" : " ")
                  }
                >
                  {mapData.actionTrigger}
                </div>
              </div>

              <div
                className="removeItem"
                onClick={event => this.deleteTask(index)}
              >
                &times;
              </div>
            </div>
          ))}

          <div className="extraContainer">
            <div>
              <label>
                <input type="checkbox" /> Check All
              </label>
            </div>
            <div>2 items left</div>
          </div>

          <div className="extraContainer">
            <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>

            <div>
              <button>Clear Completed</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  EoDInput = React.createRef()
  state = {
    idForTask: 1,
    EoData: []
  }

  addTask = event => {
    if (event.key === "Enter") {
      const taskAdded = this.EoDInput.current.value

      this.setState((prevState, props) => {
        let EoData = prevState.EoData
        let idForTask = prevState.idForTask + 1

        EoData.push({
          id: idForTask,
          actionTrigger: taskAdded,
          done: false
        })
        return {
          EoData,
          idForTask
        }
      })

      this.EoDInput.current.value = " "
    }
  }
  deleteTask = index => {
    this.setState((prevState, props) => {
      let EoData = prevState.EoData

      EoData.splice(index, 1)

      return {
        EoData
      }
    })
  }

  checkTask = (mapData, index, event) => {
    this.setState((prevState, props) => {
      let EoData = prevState.EoData
      mapData.done = !mapData.done

      EoData.splice(index, 1, mapData)

      return {
        EoData
      }
    })
  }
}
export default App
