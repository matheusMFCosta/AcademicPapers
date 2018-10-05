import * as React from 'react'
import { connect } from 'react-redux'
import { fetchMateriais, handleChangetabs, changeFetchMateriais, onFavoriteButtonPress } from './actions'
import Tab from './components/tabs'

import Card from './materias/card'
import { globalState } from '../redux/reducers/reducers'
import { Containertabs, SearchParams, Materia } from '../types'
import Materias from './materias/materias'

interface ContainerProps {
  activetab: Containertabs
  cardList: Materia[]
  fetchMateriais: () => {}
  handleChangetabs: (newTab: Containertabs) => {}
  changeFetchMateriais: (variables: Partial<SearchParams>) => {}
  onFavoriteButtonPress: (materia: Materia) => {}
}

interface ContainerState {}

class Container extends React.PureComponent<ContainerProps, ContainerState> {
  componentDidMount() {
    this.props.fetchMateriais()
  }

  public render() {
    const { activetab, handleChangetabs, changeFetchMateriais, cardList, onFavoriteButtonPress } = this.props
    const list: { id: Containertabs; label: string }[] = [
      {
        id: 'materiais',
        label: 'Materias'
      },
      {
        id: 'favoritos',
        label: 'Favoritos'
      }
    ]

    const localStorageResults = Object.values(JSON.parse(window.localStorage.getItem('Results') || '{}'))
    const localStorageMaterias = {
      Results: localStorageResults,
      TotalResults: localStorageResults.length,
      ResultsId: Object.keys(JSON.parse(window.localStorage.getItem('Results') || '{}')),
      recomendations: []
    }

    return (
      <div className="center">
        <div className="w-70  center g-mt12">
          <div className="g-ml4 g-mt4 ">
            <Tab list={list} initialTab={activetab} onClick={value => handleChangetabs(value)} />
            <Materias
              changeFetchMateriais={changeFetchMateriais}
              cardList={localStorageResults}
              onFavoriteButtonPress={onFavoriteButtonPress}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: globalState) => ({
  activetab: state.containerReducer.activeTab,
  cardList: state.containerReducer.materias.Results
})

const mapDispatchToProps = dispatch => ({
  handleChangetabs: (newTab: Containertabs) => dispatch(new handleChangetabs(newTab)),
  fetchMateriais: () => dispatch(new fetchMateriais()),
  changeFetchMateriais: (variables: Partial<SearchParams>) => dispatch(new changeFetchMateriais(variables)),
  onFavoriteButtonPress: (materia: Materia) => (console.log(`ddd`), dispatch(new onFavoriteButtonPress(materia)))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
