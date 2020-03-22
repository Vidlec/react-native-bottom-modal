import { View } from 'react-native'
import { Surface } from 'react-native-paper'
import styled from 'styled-components'

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const StyledModal = styled(Surface)`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`
export const Handle = styled(Surface)`
  height: 8px;
  width: 50px;
  border-radius: 8px;
`

export const HandleContainer = styled(View)`
  width: 100%;
  height: 25px;
  justify-content: center;
  align-items: center;
`
