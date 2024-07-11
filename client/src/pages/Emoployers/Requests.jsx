import { useEffect, useState } from "react"
import { updateTheApply } from "../../controllers/CompaniesController"
import RequestCard from "../../components/RequestCard"
import { HourglassBottom } from "@mui/icons-material"


const Requests = () => {
    const [applies, setApplies] = useState([])
    const [loading, setLoading] = useState(true)

    const getApplies = async () => {
        const res = await fetch(`http://localhost:1616/api/companies/appliesC`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json()
        setApplies(data)
        if (!res.ok) {
            throw Error(data.error)
        }
    }
    const updateApply = async (status, id) => {
        if (status === "Refused") {
            if (confirm('Are You sure to refuse the apply')) {
                const res = await updateTheApply(status, id)
            }
        } else {
            if (confirm('Are You sure to accept the apply')) {
                const res = await updateTheApply(status, id)
            }
        }
    }
    useEffect(() => {
        setTimeout(async () => {
            try {
                await getApplies()
                setLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        }, 1000)
    }, [updateApply])
    return (
        <div className="flexCenter w-full">
            {loading ? <><span className="animate-spin mx-auto
             text-slate-900 py-40"><HourglassBottom fontSize="large" /></span></>
                :
                <div className="grid grid-cols-1 gap-4 border-t-[1px] w-full border-slate-500">
                    {applies.length ? (
                        applies.map((a) => {
                            if (a.status !== "Refused") {
                                if (a.status === "Waiting") {
                                    return <div key={a._id} className="border-b-[1px] border-slate-500">
                                        <RequestCard props={a}>
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded-md
                                             text-white bg-green-600"
                                                    onClick={() => { updateApply("Accepted", a._id) }}
                                                >Accept</button>
                                                <button className="p-2 rounded-md
                                             text-white bg-red-600"
                                                    onClick={() => { updateApply("Refused", a._id) }}
                                                >Refuse</button>
                                            </div>
                                        </RequestCard>
                                    </div>
                                } else
                                    if (a.status === "Accepted") {
                                        return <div key={a._id} className="border-b-[1px] border-slate-500">
                                            <RequestCard props={a}>
                                                <div className="bg-green-600 px-4 py-2 text-white rounded-md">
                                                    Accepted
                                                </div>
                                            </RequestCard>
                                        </div>
                                    }
                            }
                        }
                        )
                    ) : <span className="mx-auto">There is No Requests</span>
                    }
                </div>
            }

        </div>
    )
}

export default Requests