import * as React from 'react'
import { connect } from 'react-redux'
import { fetchMateriais } from './actions'

export interface ContainerProps {
  fetchMateriais: () => {}
}

export interface ContainerState {}

class Container extends React.PureComponent<ContainerProps, ContainerState> {
  componentDidMount() {
    this.props.fetchMateriais()
  }

  public render() {
    return (
      <div>
        {' '}
        <button>adasdas</button>{' '}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchMateriais: () => dispatch(new fetchMateriais())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
