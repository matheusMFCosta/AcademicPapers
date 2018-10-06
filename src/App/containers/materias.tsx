import * as React from 'react'
import * as debounce from 'debounce'
import { SearchParams, Materia } from '../../types'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Card from '../components/card'

export interface MateriasProps {
  totalResults: number
  favoriteIds: string[]
  cardList: Materia[]
  changeFetchMateriais: (variables: Partial<SearchParams>) => {}
  onFavoriteButtonPress: (materia: Materia) => {}
}

export interface MateriasState {
  filterInput: string
  perPage: number
  currentPage: number
}

export default class Materias extends React.Component<MateriasProps, MateriasState> {
  state = {
    filterInput: '',
    perPage: 20,
    currentPage: 1
  }
  debounce = debounce

  handleInputChange = e => {
    this.setState({ filterInput: e.target.value, currentPage: 1 })
    this.debounce(this.props.changeFetchMateriais({ Query: e.target.value, PageNumber: 1 }), 1000)()
  }

  handleChangePerpage = e => {
    this.setState({ perPage: e.target.value, currentPage: 1 })
    this.props.changeFetchMateriais({ PageSize: e.target.value })
  }

  SelectedPage = (value: number) => {
    this.setState({ currentPage: value })
    this.props.changeFetchMateriais({ PageNumber: value })
  }

  public render() {
    const { cardList, onFavoriteButtonPress, favoriteIds, totalResults } = this.props
    const { filterInput, currentPage, perPage } = this.state
    return (
      <div>
        <div className="flex-l justify-between-l  g-pt4">
          <div className="relative g-mt2 w-50-l w-100">
            <img
              className="absolute g-pb1 g-w5 g-w5 g-mt2 g-ml2"
              src={'http://www.clker.com/cliparts/r/n/5/a/P/q/search-icon.svg.med.png'}
            />
            <input
              className="g-pa2 g-pl8 br3 ba b--base-4 g-w15"
              value={filterInput}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="flex justify-between-m ">
            <Pagination onChange={this.SelectedPage} current={currentPage} total={totalResults / perPage} />
            <div className="db-ns dn">
              <select className="g-mt3 g-ml6" onChange={this.handleChangePerpage}>
                <option value="20">ver 20</option>
                <option value="30">ver 30</option>
                <option value="50">ver 50</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-100">
          {(cardList || []).map(element => (
            <Card
              materiaData={element}
              onFavoriteButtonPress={onFavoriteButtonPress}
              //@ts-ignore
              isFavorite={favoriteIds.includes(`${element.Id}`)}
            />
          ))}
        </div>
      </div>
    )
  }
}
