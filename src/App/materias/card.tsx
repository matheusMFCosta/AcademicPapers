import * as React from 'react'

export interface MaterialCardProps {
  materiaData: any
}

export interface MaterialCardState {}

export default class MaterialCard extends React.Component<MaterialCardProps, MaterialCardState> {
  constructor(props: MaterialCardProps) {
    super(props)

    this.state = {}
  }

  public render() {
    return <div />
  }
}
