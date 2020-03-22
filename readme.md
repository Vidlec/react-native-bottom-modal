# react-native-bottom-modal ⚛️

## Install
### Expo
`expo install react react-native-gesture-handler  `
`yarn add react-spring react-native-bottom-modal`
### Bare
`yarn add react-spring react-native-bottom-modal react-native-gesture-handler`

[Follow install instructions for react-native-gesture-handler](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html)

## Examples

```tsx
      <Button
        onPress={() =>
          showModal({
            header: <ModalHeader/>,
            content: (
              <StyledModal>
                <CartCheckout/>
              </StyledModal>
            ),
          })
        }
      >
        With handle
      </Button>
```


![preview](./docs/preview.png)