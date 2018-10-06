import * as React from 'react'
import { connect } from 'react-redux'
import { fetchMateriais, handleChangetabs, changeFetchMateriais, onFavoriteButtonPress } from './actions'
import Tab from './components/tabs'
import { globalState } from '../redux/reducers/reducers'
import { Containertabs, SearchParams, Materia } from '../types'
import Materias from './materias/materias'
import Favoritos from './materias/favoritos'

interface ContainerProps {
  totalResults: number
  favoritesIds: string[]
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
    const {
      activetab,
      handleChangetabs,
      changeFetchMateriais,
      cardList,
      onFavoriteButtonPress,
      favoritesIds
    } = this.props
    const tabsList: { id: Containertabs; label: string }[] = [
      {
        id: 'materiais',
        label: 'Materias'
      },
      {
        id: 'favoritos',
        label: 'Favoritos'
      }
    ]

    const favoriteIds = Object.keys(JSON.parse(window.localStorage.getItem('Results') || '{}'))
    console.log(`favoritesIds`, favoritesIds)
    return (
      <div className="center">
        <section className="box-1 w-100" />
        <div className="flex g-ph6">
          <img className="" src={'https://resources.passeidireto.com/website-anonymous/images/svg/logo-pd.svg'} />
        </div>
        <div className="g-mw8  center g-mt12">
          <div className="g-mh4 g-mt4 ">
            <Tab list={tabsList} initialTab={activetab} onClick={value => handleChangetabs(value)} />
            {activetab === 'materiais' && (
              <Materias
                totalResults={this.props.totalResults}
                changeFetchMateriais={changeFetchMateriais}
                cardList={cardList}
                onFavoriteButtonPress={onFavoriteButtonPress}
                favoriteIds={favoriteIds}
              />
            )}
            {activetab === 'favoritos' && (
              <Favoritos changeFetchMateriais={changeFetchMateriais} onFavoriteButtonPress={onFavoriteButtonPress} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: globalState) => ({
  activetab: state.containerReducer.activeTab,
  totalResults: state.containerReducer.materias.TotalResults,
  cardList: state.containerReducer.materias.Results,
  favoritesIds: state.containerReducer.favoritesIds
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
