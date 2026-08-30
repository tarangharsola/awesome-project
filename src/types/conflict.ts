export type InsertOperation = {
  type: 'insert'
  index: number
  text: string
}

export type DeleteOperation = {
  type: 'delete'
  index: number
  length: number
}

export type TextOperation = InsertOperation | DeleteOperation
