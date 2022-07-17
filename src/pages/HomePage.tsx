import { useContext } from 'react'
import { SocketContext } from '../context';
import BandAdd from '../components/BandAdd'
import BandList from '../components/BandList'
import BandChart from '../components/BandChart';

function HomePage() {
  
  const { online } = useContext(SocketContext)
  
  return (
    <div className="container ">
      <div className='container-color'>
        <div className='alert'>
          <p>
            Estado del Servidor:
            {
              online 
                ? <span className='text-success'> Online</span>
                : <span className='text-danger'> Offline</span>
            }
          </p>
        </div>

        <h1>BandNames</h1>
        <hr />

        <div className="row">
          <div className="col-8">
            <BandList />
          </div>

          <div className="col-4">
            <BandAdd />
          </div>
        </div>

      </div>
      <div className='container-color'>
        <div className="row">
          <div className="col">
            <BandChart />
          </div>
        </div>
        </div>
    </div>
  )
}

export default HomePage
