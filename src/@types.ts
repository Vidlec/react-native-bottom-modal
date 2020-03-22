import { ReactNode } from 'react'

export interface ShowModalFnProps {
  close: () => void
}

export type ShowModalObject = {
  content: ReactNode
  header?: ReactNode
} & Partial<Options>
export type ShowModalRenderFn = (props: ShowModalFnProps) => ShowModalObject

export type ShowModalFn = ShowModalRenderFn | ShowModalObject

export interface Options {
  height: number
  closeTreshold: number
}

export interface ModalContextProps {
  showModal: (fn: ShowModalFn) => void
  closeModal: () => void
}
