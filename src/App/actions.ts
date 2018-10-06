import { Operation } from '../redux/utils'
import axios from 'axios'
import { assign } from './../redux/utils'
import { Containertabs, containerReducerState, SearchParams, Materia } from '../types'

export class changeFetchMateriais extends Operation {
  constructor(public payload: Partial<SearchParams>) {
    super()
  }
  public containerReducer(state: containerReducerState) {
    return assign(state, { searchParams: { ...state.searchParams, ...this.payload } })
  }
  public process = async (getState, dispatch) => dispatch(new fetchMateriais())
}

export class fetchMateriais extends Operation {
  public process = async (getState, dispatch) => {
    const { searchParams }: containerReducerState = getState().containerReducer
    const { data } = await axios({
      method: 'get',
      url: `/search?Query=${searchParams.Query}&ContentTypeIds%5B%5D=1&PageNumber=${searchParams.PageNumber}&PageSize=${
        searchParams.PageSize
      }&Order=2`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log(`data`, data)
    dispatch(new fetchMateriaisSuccess(data))
  }
}

export class fetchMateriaisSuccess extends Operation {
  constructor(public payload) {
    super()
  }
  public containerReducer(state) {
    return assign(state, { materias: this.payload })
  }
}

export class handleChangetabs extends Operation {
  constructor(public payload: Containertabs) {
    super()
  }
  public containerReducer(state: containerReducerState) {
    return assign(state, { activeTab: this.payload })
  }
}

export class onFavoriteButtonPress extends Operation {
  constructor(public payload: Materia) {
    super()
  }

  public process(getState, dispatch) {
    const Results: Materia[] = JSON.parse(localStorage.getItem('Results') || '{}')
    if (Results[this.payload.Id]) {
      delete Results[this.payload.Id]
    } else {
      Results[this.payload.Id] = this.payload
    }
    localStorage.setItem('Results', JSON.stringify(Results))

    dispatch(new onFavoriteButtonPressSuccess(Object.keys(Results)))
  }
}

export class onFavoriteButtonPressSuccess extends Operation {
  constructor(public payload: string[]) {
    super()
  }

  public containerReducer(state: containerReducerState) {
    return assign(state, { favoritesIds: this.payload })
  }
}
