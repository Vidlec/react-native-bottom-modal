import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'
import { animated, useSpring } from 'react-spring'

import { ModalContextProps, Options, ShowModalFn } from './@types'

const ModalProviderContext = createContext<ModalContextProps>(null)

const AnimatedContainer = animated(View) as any
const AnimatedContentContainer = animated(View) as any

const deviceHeight = Number(Dimensions.get('window').height)
const HEIGHT = deviceHeight / 2

const defaultOptions: Options = {
  height: HEIGHT,
  closeTreshold: 200,
}

interface State {
  content: React.ReactNode
  header?: React.ReactNode
  options: Options
}

export const BottomModalProvider: React.FC = ({ children }) => {
  const [{ content, header, options: stateOptions }, setState] = useState<State>({
    content: null,
    header: null,
    options: defaultOptions,
  })

  const { height, closeTreshold } = stateOptions

  const [spring, set] = useSpring(() => ({
    value: 0,
    opacity: 0,
  }))
  const resetState = () => setState(({ options }) => ({ content: null, header: null, options }))

  useEffect(() => {
    set({ value: content ? height : 0, opacity: content ? 1 : 0, config: { duration: 200 } })
  }, [content])

  const closeModal = useCallback(() => {
    resetState()
  }, [])

  const showModal = useCallback((render: ShowModalFn) => {
    if (typeof render === 'function') {
      const { content, header, ...options } = render({ close: closeModal })
      return setState({ content, header, options: { ...stateOptions, ...options } })
    }

    const { content, header, ...options } = render
    setState({ content, header, options: { ...stateOptions, ...options } })
  }, [])

  return (
    <ModalProviderContext.Provider value={{ showModal, closeModal }}>
      {children}
      <AnimatedContainer
        pointerEvents={content ? undefined : 'none'}
        style={{
          opacity: spring.opacity,
          display: spring.opacity.interpolate(v => (v > 0 ? 'flex' : 'none')),
          zIndex: 999,
          height: '100%',
          width: '100%',
          flex: 1,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PanGestureHandler
          onHandlerStateChange={e => {
            if (e.nativeEvent.state === GestureState.END) {
              const value = height - e.nativeEvent.translationY

              if (e.nativeEvent.velocityY > 100) {
                return resetState()
              }
              if (value < closeTreshold) resetState()
              if (value >= closeTreshold) set({ value: height, config: { duration: 200 } })
            }
          }}
          onGestureEvent={e => {
            const value = height - e.nativeEvent.translationY
            set({ value, config: { duration: 50 } })
          }}
        >
          <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <TouchableOpacity
              style={{ flex: 1, height: '100%', width: '100%' }}
              activeOpacity={1}
              onPress={() => resetState()}
            >
              <View
                style={{
                  opacity: 0.8,
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                  flex: 1,
                  backgroundColor: 'black',
                  position: 'absolute',
                }}
              />
            </TouchableOpacity>
            <AnimatedContentContainer
              style={{
                height,
                bottom: spring.value.interpolate({
                  range: [0, height],
                  output: [-height, 0],
                  extrapolate: 'clamp',
                } as any),
                position: 'absolute',
                zIndex: 3,
                width: '100%',
              }}
            >
              {header}
              {content}
            </AnimatedContentContainer>
          </View>
        </PanGestureHandler>
      </AnimatedContainer>
    </ModalProviderContext.Provider>
  )
}

export const useBottomModal = () => {
  return useContext(ModalProviderContext)
}
