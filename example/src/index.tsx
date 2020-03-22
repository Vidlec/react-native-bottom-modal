import 'react-native-gesture-handler'

import React from 'react'
import { BottomModalProvider, useBottomModal } from 'react-native-bottom-modal'
import { Button, Headline, Provider as PaperProvider } from 'react-native-paper'

import { Container, StyledModal } from './styled'

const Example = () => {
  const { showModal } = useBottomModal()
  return (
    <Container>
      <Button
        mode="contained"
        onPress={() =>
          showModal({
            content: (
              <StyledModal>
                <Headline>Hello</Headline>
              </StyledModal>
            ),
          })
        }
      >
        Open modal
      </Button>
    </Container>
  )
}

const App = () => {
  return (
    <PaperProvider>
      <BottomModalProvider>
        <Example />
      </BottomModalProvider>
    </PaperProvider>
  )
}

export default App
