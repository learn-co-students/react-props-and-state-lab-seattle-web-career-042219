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
  adoptPet = id => {
    console.log(id)
    this.setState(prevState => {
      prevState.pets.map(pet => {
        pet.id===id?pet.isAdopted=true:null
      })
      return prevState
    })
  }

  changeType = newType => {
    this.setState({filters: 
      {type:
         newType}
        }, 
      ()=>{console.log(this.state.filters.type)})
  }
 

    fetchpets = () =>{
      let URL = ''
      console.log(this.state.filters.type)
      if (this.state.filters.type==='all'){
        URL = '/api/pets'
      }else{
        URL = `/api/pets?type=${this.state.filters.type}`
      }
      fetch(URL)
        .then(res=>res.json())
        .then(data => {
          this.setState({pets: data});
          console.log(this.state.pets)})
          ;  
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
              <Filters onFindPetsClick={this.fetchpets} onChangeType={this.changeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} filteredPets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
