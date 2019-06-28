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

  handleChangeType = (value) => {
    this.setState({
      filters : {
        type: value
      }
    })
  }

  fetchPets = () => {
    fetch(`/api/pets${this.state.filters.type==="all"?"":"?type="+this.state.filters.type}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
    })
  }

  handleAdoptPet = (id) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === id? {...pet, isAdopted: true}: pet
    })
    this.setState({
      pets
    })
  }

  // handleAdoptPet = id => {
  //   this.setState(prevState => {
  //     prevState.pets.map((pet) => {
  //       pet.id === id ? pet.isAdopted = true : false
  //     })
  //     return prevState
  //   })
  // }
    

 

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
