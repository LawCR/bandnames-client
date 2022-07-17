import HomePage from './pages/HomePage'
import { SocketProvider } from './context'
import './index.css'

const BandNamesApp = () => {
  return (
    <SocketProvider>
        <HomePage />
    </SocketProvider>
  )
}

export default BandNamesApp