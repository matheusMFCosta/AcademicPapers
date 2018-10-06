import * as React from 'react'
import * as debounce from 'debounce'
import { SearchParams } from '../../types'

export interface MateriasProps {
  changeFetchMateriais: (variables: Partial<SearchParams>) => {}
}

export interface MateriasState {
  filterInput: string
}
function wow() {
  console.log('0003555')
}
export default class Materias extends React.Component<MateriasProps, MateriasState> {
  state = {
    filterInput: ''
  }
  debounce = debounce

  handleInputChange = e => {
    this.setState({ filterInput: e.target.value })
    this.debounce(this.props.changeFetchMateriais({ Query: e.target.value }), 1000)()
  }

  public render() {
    const { filterInput } = this.state
    return (
      <div>
        <input value={filterInput} onChange={this.handleInputChange} />
      </div>
    )
  }
}
