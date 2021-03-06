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

  updateType = (pet) => {
    this.setState({
      filters: {
        type: pet
      }
    })
  }

  fetchPets = () => {
    if (this.state.filters.type === 'all')
      {fetch('/api/pets')
      .then(result=> result.json())
      .then(res => this.setState({pets: res}))}
    else if (this.state.filters.type === 'cat') {
      fetch('/api/pets?type=cat')
      .then(result=> result.json())
      .then(res => this.setState({pets: res}))
    }
    else if (this.state.filters.type === 'dog') {
      fetch('/api/pets?type=dog')
      .then(result=> result.json())
      .then(res => this.setState({pets: res}))
    }
    else if (this.state.filters.type === 'micropig') {
      fetch('/api/pets?type=micropig')
      .then(result=> result.json())
      .then(res => this.setState({pets: res}))
    }
  }

  adoptPet = petId => {
  const pets = this.state.pets.map(pet => {
    return pet.id === petId ? { ...pet, isAdopted: true } : pet;
  });
  this.setState({ pets });
};

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={(pet) => this.updateType(pet)}
                onFindPetsClick={this.fetchPets}
                />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={(petId) => this.adoptPet(petId)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
