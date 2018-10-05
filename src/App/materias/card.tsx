import * as React from 'react'
import { Materia } from '../../types'
import * as ReactTooltip from 'react-tooltip'

export interface MaterialCardProps {
  materiaData: Materia
  onFavoriteButtonPress: (materia: Materia) => {}
}

export interface MaterialCardState {}

export default class MaterialCard extends React.Component<MaterialCardProps, MaterialCardState> {
  handleCardClick = () => (window.location.href = `https://www.passeidireto.com/arquivo/${this.props.materiaData.Id}`)
  handleFavoritButtonClick = e => {
    this.props.onFavoriteButtonPress(this.props.materiaData)
    console.log(`22`)
    e.stopPropagation()
  }

  public render() {
    const {
      Name,
      SubjectName,
      UniversityName,
      AuthorImageUrl,
      AuthorName,
      PositiveEvaluations
    } = this.props.materiaData
    ///http://chittagongit.com//images/all-star-icon/all-star-icon-9.jpg
    return (
      <div className="dib w-third g-pa2" onClick={this.handleCardClick}>
        <div className=" flex flex-column ba b--base-4 br1 bg-base-1  br2 shadow-hover">
          <div className="flex justify-between bg-base-2 g-pa2 ">
            <a data-tip={AuthorName}>
              <img className="br-100 g-w9 g-h9" src={AuthorImageUrl} />
            </a>
            <div>
              {PositiveEvaluations >= 1 && (
                <>
                  <img
                    className="g-pb1 g-w6 g-w6"
                    src={'https://www.iconsdb.com/icons/preview/guacamole-green/facebook-like-xl.png'}
                  />
                  <span className="g-pb2 c-base-4 g-f2 g-pr2">{PositiveEvaluations}</span>
                </>
              )}
              <div onClick={this.handleFavoritButtonClick}>
                <img
                  className="br-100 g-w8 g-h8"
                  src={'https://www.iconsdb.com/icons/preview/dark-gray/star-8-xxl.png'}
                />
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
