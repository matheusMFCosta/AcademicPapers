export type Containertabs = 'materiais' | 'favoritos'

export interface SearchParams {
  Query: string
  ContentTypeIds: '%5B%5'
  D: 1
  PageNumber: number
  PageSize: number
  Order: 2
}

export interface containerReducerState {
  searchParams: SearchParams
  activeTab: Containertabs
  materias: Materias
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
  FilePreview: { FolderUrl: string }
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
