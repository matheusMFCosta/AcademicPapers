import * as React from 'react'
import './../assets/scss/App.scss'
import { Provider } from 'react-redux'
import Container from './container'
import store from './../redux/store'

export default class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}
