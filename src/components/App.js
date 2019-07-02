import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilterType = (ev) => {
    console.log(ev.target.value)
    this.setState({
      filters: {
        type: ev.target.value
      }
    })
  }

  fetchPets = (ev) => {
    let selection = this.state.filters.type
    let url = ''
    if (selection === 'all'){
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${selection}`
    }

    fetch(url)
    .then(res => res.json())
     .then(json => this.setState({
         pets: json
       }))
  }

  //PRACTICE THIS ONE!
  handleAdopt = (id) => {
    console.log(id)
    this.setState(prevState => {
      prevState.pets.map(pet => {
        pet.id===id ? pet.isAdopted = true : null
      })
    return prevState
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.updateFilterType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
