export interface containerReducerState {
  activeTab: 'materiais' | 'favoritos'
  materias: Materias | {}
}

export interface Materia {
  Id: number
  AuthorId: number
  AuthorName: string
  AuthorImageUrl: string
  Date: string
  Name: string
  AmazonId: string
  UniversityId: number
  UniversityName: string
  SubjectId: number
  SubjectName: string
  SubjectAlias: string
  Extension: string
  Popularity: number
  Evaluation: number
  CommentsTotal: number
  PositiveEvaluations: number
  EvaluationState: number
  Tags: number
  HasBeenReported: boolean
  HasThumbnail: boolean
  IsOnStudentList: boolean
  Type: number
}

export interface Materias {
  Results: Materia[]
  TotalResults: number
  recomendations: []
}
