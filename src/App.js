import React from "react"
import "./App.css"
import logo from "./img/logo.png"
import * as classnames from "classnames"
import { CSSTransitionGroup } from "react-transition-group"
import TasksRemaining from "./components/TasksRemaining"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="EoDHeader">
          <a href="">
            <img src={logo} className="EoDLogo" alt=" " />
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
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.state.EoData.map((mapData, index) => (
              <div key={mapData.id} className="EoDItem">
                <div className="EoDCheckbox">
                  <div
                    className="removeItem"
                    onClick={event => this.deleteTask(index)}
                  >
                    &times;
                  </div>
                  <input
                    type="checkbox"
                    onChange={event => this.checkTask(mapData, index, event)}
                    checked={mapData.done}
                  />
                  {!mapData.editing && (
                    <div
                      className={classnames({
                        EoDItemLabel: true,
                        done: mapData.done
                      })}
                      onDoubleClick={event =>
                        this.editTask(mapData, index, event)
                      }
                    >
                      {mapData.actionTrigger}
                    </div>
                  )}

                  {mapData.editing && (
                    <input
                      className="EoDItemEdit"
                      type="text"
                      autoFocus
                      defaultValue={mapData.actionTrigger}
                      onBlur={event => this.doneEdit(mapData, index, event)}
                      onKeyUp={event => {
                        if (event.key === "Enter") {
                          this.doneEdit(mapData, index, event)
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </CSSTransitionGroup>
          <div className="extraContainer">
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={!this.anyRemaining()}
                  onChange={this.checkAllTasks}
                />
                Check All Tasks
              </label>
            </div>
            <TasksRemaining remaining={this.remaining()} />
          </div>
        </div>
      </div>
    )
  }

  EoDInput = React.createRef()

  state = {
    idForTask: 3,
    EoData: [
      {
        id: 2,
        actionTrigger: "Campaign Start!",
        done: false,
        editing: false
      }
    ]
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

  editTask = (mapData, index, event) => {
    this.setState((prevState, props) => {
      let EoData = prevState.EoData
      mapData.editing = true

      EoData.splice(index, 1, mapData)

      return {
        EoData
      }
    })
  }

  doneEdit = (mapData, index, event) => {
    event.persist()
    this.setState((prevState, props) => {
      let EoData = prevState.EoData
      mapData.editing = false

      mapData.actionTrigger = event.target.value

      EoData.splice(index, 1, mapData)

      return {
        EoData
      }
    })
  }

  remaining = () => {
    return this.state.EoData.filter(mapData => !mapData.done).length
  }

  checkAllTasks = event => {
    event.persist()

    this.setState((prevState, props) => {
      let EoData = prevState.EoData
      EoData.forEach(mapData => (mapData.done = event.target.checked))
      return {
        EoData
      }
    })
  }

  anyRemaining = () => {
    return this.remaining() !== 0
  }
}
export default App
