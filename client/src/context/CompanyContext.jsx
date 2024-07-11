import { createContext, useState } from "react";

export const CompanyContext = createContext()

const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(localStorage.getItem('companyName'))
    return <CompanyContext.Provider value={{ company, setCompany }}>
        {children}
    </CompanyContext.Provider>
}
export default CompanyProvider