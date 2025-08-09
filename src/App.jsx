import { Provider } from 'react-redux'
import './App.css'
import Dashboard from './pages/Dashboard'
import { store } from './Redux/store'

function App () {
  return (
    <>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </>
  )
}

export default App
