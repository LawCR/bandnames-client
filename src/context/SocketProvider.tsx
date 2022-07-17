import { FC } from 'react';
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from './';

export const SocketProvider: FC = ({children}) => {

    // const { online, socket } = useSocket('http://localhost:8081');
    const { online, socket } = useSocket('https://socket-bandnames.herokuapp.com/');


    return (
        <SocketContext.Provider value={{
            // ...state,
            online,
            socket
        }}>
            { children }
        </SocketContext.Provider>
    )
}