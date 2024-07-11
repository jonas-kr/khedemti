import { createContext, useState } from "react";

export const WorkerContext = createContext()

const WorkerProvider = ({ children }) => {
    const [worker, setWorker] = useState(localStorage.getItem('secondName'))

    return <WorkerContext.Provider value={{ worker, setWorker }}>
        {children}
    </WorkerContext.Provider>
}
export default WorkerProvider