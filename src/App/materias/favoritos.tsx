import * as React from 'react'
import * as debounce from 'debounce'
import { SearchParams, Materia } from '../../types'
import Card from './card'

export interface FavoritosProps {
  changeFetchMateriais: (variables: Partial<SearchParams>) => {}
  onFavoriteButtonPress: (materia: Materia) => {}
}

export interface FavoritosState {
  filterInput: string
}

export default class Favoritos extends React.Component<FavoritosProps, FavoritosState> {
  state = {
    filterInput: ''
  }
  debounce = debounce

  handleInputChange = e => {
    this.setState({ filterInput: e.target.value })
    this.debounce(this.props.changeFetchMateriais({ Query: e.target.value }), 1000)()
  }

  getFilteredItems = (materias: Materia[]): Materia[] => {
    return materias.filter(element => element.Name.includes(this.state.filterInput))
  }

  public render() {
    const { onFavoriteButtonPress } = this.props
    const { filterInput } = this.state

    const localStorageResults = Object.values(JSON.parse(window.localStorage.getItem('Results') || '{}'))
    const ResultsId = Object.keys(JSON.parse(window.localStorage.getItem('Results') || '{}'))
    const cardsList = this.getFilteredItems(localStorageResults)
    return (
      <div>
        <div className="relative g-mt2 w-50-l w-100  g-pt4">
          <img
            className="absolute g-pb1 g-w5 g-w5 g-mt2 g-ml2"
            src={'http://www.clker.com/cliparts/r/n/5/a/P/q/search-icon.svg.med.png'}
          />
          <input className="g-pa2 g-pl8 br3 ba b--base-4 g-w15" value={filterInput} onChange={this.handleInputChange} />
        </div>
        <div className="w-100 g-mt2">
          {(cardsList || []).map(element => (
            <Card
              materiaData={element}
              onFavoriteButtonPress={onFavoriteButtonPress}
              isFavorite={ResultsId.includes(`${element.Id}`)}
            />
          ))}
        </div>
      </div>
    )
  }
}
