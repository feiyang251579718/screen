declare module '*.less'
declare module 'umi'
declare module '*.svg'
declare module '*.png'
declare module 'intl'
declare module 'regenerator-runtime/runtime'
declare module 'qs'
declare module 'react-countdown-hook' {
  interface Actions {
    start(ttc?: number): void
    pause(): void
    resume(): void
    reset(): void
  }

  interface UseCountDown {
    (timeToCount: number, interval?: number): [number, Actions]
  }

  const useCountDown: UseCountDown

  export default useCountDown
}

interface Window {
}

interface Location {
  query: any
  valueOf(): Object
  setPrototypeOf(o: any, proto: object | null): any
}

interface LocationDescriptorObject {
  query: Object
}

interface ResponsiveInfo {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
}
