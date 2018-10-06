import * as React from 'react'
import { Materia } from '../../types'
import * as ReactTooltip from 'react-tooltip'
const facebookLike = require('./../../assets/images/facebook-like-xl.png')
const ActiveStart = require('./../../assets/images/activeStar.jpg')
const InactiveStar = require('./../../assets/images/inactiveStar.png')

export interface MaterialCardProps {
  materiaData: Materia
  isFavorite: boolean
  onFavoriteButtonPress: (materia: Materia) => {}
}

export interface MaterialCardState {}

export default class MaterialCard extends React.Component<MaterialCardProps, MaterialCardState> {
  handleCardClick = () => (window.location.href = `https://www.passeidireto.com/arquivo/${this.props.materiaData.Id}`)
  handleFavoritButtonClick = e => {
    this.props.onFavoriteButtonPress(this.props.materiaData)
    e.stopPropagation()
  }

  public render() {
    const isFavorite = this.props.isFavorite
    const {
      Name,
      SubjectName,
      UniversityName,
      AuthorImageUrl,
      AuthorName,
      PositiveEvaluations
    } = this.props.materiaData

    return (
      <div className="dib w-third-l w-50-m w-100 g-pa2" onClick={this.handleCardClick}>
        <div className=" flex flex-column ba b--base-4 br1 bg-base-1  br2 shadow-hover">
          <div className="flex justify-between bg-base-2 g-pa2 ">
            <a data-tip={AuthorName}>
              <img className="br-100 g-w9 g-h9" src={AuthorImageUrl} />
            </a>
            <div className="flex">
              {PositiveEvaluations >= 1 && (
                <div>
                  <img className="g-pb1 g-w6 g-w6" src={facebookLike} />
                  <span className="g-pb2 c-base-4 g-f2 g-pr2">{PositiveEvaluations}</span>
                </div>
              )}
              <div onClick={this.handleFavoritButtonClick}>
                <img className="br-100 g-w8 g-h8" src={isFavorite ? ActiveStart : InactiveStar} />
              </div>
            </div>
          </div>

          <ReactTooltip place="top" type="dark" effect="float" />
          <div className="g-pt4 g-pa2 ">
            <div className="flex flex-column g-pt2  g-pb1">
              <span className="g-f2 c-base-4">Nome:</span>
              <span>{Name}</span>
            </div>
            <div className="flex flex-column g-pt2 g-pb1">
              <span className="g-f2 c-base-4">Disciplina:</span>
              <span>{SubjectName}</span>
            </div>
            <div className="flex flex-column g-pt2 g-pb1">
              <span className="g-f2 c-base-4">Universidade:</span>
              <span>{UniversityName}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//(campo Name), o nome da disciplina (campo ​SubjectName​) e o nome da universidade (campo ​UniversityName​).
