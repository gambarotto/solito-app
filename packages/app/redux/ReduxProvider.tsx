import { Provider } from 'react-redux'
import { reduxStore } from './store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  )
}
