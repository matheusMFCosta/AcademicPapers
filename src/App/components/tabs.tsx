import * as React from 'react'

class Tab extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.initialTab
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceValue && nextProps.forceValue != this.props.forceValue) {
      this.setState({ active: nextProps.forceValue })
    }
  }

  handleClick = value => {
    this.setState({ active: value })
    this.props.onClick(value)
  }

  render() {
    const { list, className } = this.props
    const { active } = this.state

    return (
      <div className={`g-f2 w-100 ${className}`}>
        {list.map(element => {
          return (
            <div
              key={element.id}
              className={`dib g-pt2 g-pb4 g-mr3 pointer  ${
                element.id === active ? 'bw1 bb c-primary b--primary fw6' : 'c-on-base-2'
              }`}
              onClick={() => this.handleClick(element.id)}
            >
              {element.label}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Tab
