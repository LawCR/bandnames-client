import { createContext } from 'react';
import { Socket } from "socket.io-client";
import { BandType, NameBandType } from '../interfaces/Band';

export interface ServerToClientEvents {
    current_bands: (bands: BandType[]) => void
}

export interface ClientToServerEvents {
    change_name_band: (data: BandType) => void;
    vote_increase_band: (id: string) => void;
    vote_decrease_band: (id: string) => void;
    remove_band: (id: string) => void;
    add_band: (name: NameBandType) => void;
}

interface ContextProps {
    online: boolean;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
}

export const SocketContext = createContext({} as ContextProps)
