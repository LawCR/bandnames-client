import { ChangeEvent, FC, useEffect, useState, useContext } from 'react';
import { SocketContext } from '../context';
import { BandType } from "../interfaces/Band"

const BandList: FC= () => {

    const [bands, setBands] = useState<BandType[]>([])
    const {socket} = useContext(SocketContext)

    // Para obtener las bandas actuales
    useEffect(() => {
        socket.on('current_bands', (bands) => {
            setBands(bands)
        })

        return () => {
            socket.off('current_bands')
        }
    }, [socket])

    const onChangeName = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const newName = event.target.value
        setBands(bands => bands.map(band => (band.id === id ? { ...band, name: newName } : band)))
    }

    // Se activa al soltar el input 
    const onLossFocus = (id: string, name: string) => {
        socket.emit('change_name_band', { id, name })
    }

    const onIncreaseVote = (id: string) => {
        socket.emit('vote_increase_band', id)
    }

    const onDecreaseVote = (id: string) => {
        socket.emit('vote_decrease_band', id)
    }

    const onRemoveBand = (id: string) => {
        socket.emit('remove_band', id)
      }

    const crearRows = () => {
        return (
            bands.map((band) => (
                <tr key={band.id}>
                    <td>
                        <button 
                            className="btn btn-warning"
                            onClick={() => onDecreaseVote(band.id)}
                        >-1</button>
                    </td>
                    <td>
                        <button 
                            className="btn btn-primary"
                            onClick={() => onIncreaseVote(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input 
                            className="form-control" 
                            value={band.name} 
                            onChange={(e) => onChangeName(e, band.id)} 
                            onBlur={() => onLossFocus(band.id, band.name)}
                        />
                    </td>
                    <td><h3>{band.votes}</h3></td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={() => onRemoveBand(band.id)}
                        >Borrar</button>
                    </td>
                </tr>
            ))
        )
    }

  return (
    <>
        <table className="table table-stripped">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {crearRows()}
            </tbody>
        </table>
    </>
  )
}

export default BandList