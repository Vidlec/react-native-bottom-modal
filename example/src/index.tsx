import React from 'react'
import { Dimensions, View } from 'react-native'
import { BottomModalProvider, useBottomModal } from 'react-native-bottom-modal'
import { Button, Headline, Provider as PaperProvider } from 'react-native-paper'

import { Container, Handle, HandleContainer, StyledModal } from './styled'

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
        Basic
      </Button>

      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() =>
          showModal({
            height: Dimensions.get('screen').height / 1.1,
            content: (
              <StyledModal>
                <Headline>Hello</Headline>
              </StyledModal>
            ),
          })
        }
      >
        Full screen
      </Button>

      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() =>
          showModal({
            header: (
              <HandleContainer>
                <Handle>
                  <View />
                </Handle>
              </HandleContainer>
            ),
            content: (
              <StyledModal>
                <Headline>Hello</Headline>
              </StyledModal>
            ),
          })
        }
      >
        With handle
      </Button>

      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() =>
          showModal(({ close }) => ({
            header: (
              <HandleContainer>
                <Handle>
                  <View />
                </Handle>
              </HandleContainer>
            ),
            content: (
              <StyledModal>
                <Button onPress={close}>Close</Button>
              </StyledModal>
            ),
          }))
        }
      >
        With close button
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
