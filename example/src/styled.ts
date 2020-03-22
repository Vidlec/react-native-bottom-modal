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
