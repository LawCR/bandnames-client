import React, { useContext, useState } from 'react'
import { SocketContext } from '../context'

const BandAdd = () => {

    const [name, setName] = useState('')
    const {socket} = useContext(SocketContext)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name.trim().length > 0) {
          socket.emit('add_band', { name })
          setName('')
        }
    }

    return (
        <>
            <h3 className='text-center'>Agregar Banda</h3>
            <form onSubmit={onSubmit}>
                <input 
                  className='form-control' 
                  placeholder='Nuevo nombre de banda' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </form>   
        </>
    )
}

export default BandAdd