function cfl(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const deleteJob = async (_id) => {
    const res = await fetch(`/api/jobs/${_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        },
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const createJob = async (title, category, desc, type, state, mnplct) => {

    if (!title || !category || !desc || !type || !state || !mnplct) {
        throw Error('All fields are required')
    }

    let t = title.toLowerCase()
    t = cfl(t)
    let m = mnplct.toLowerCase()
    m = cfl(m)
    const info = JSON.stringify({ title: t, category, desc, type, state, mnplct :m})
    const res = await fetch('http://localhost:1616/api/jobs/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${localStorage.getItem('token')}`
        },
        body: info
    })
    const data = await res.json()

    if (!res.ok) {
        throw Error(data.error)
    }

    return data
}

const updateJob = async (title, category, desc, type, state, mnplct, _id) => {

    if (!title || !category || !desc || !state || !mnplct || !type) {
        throw Error('All fields are required')
    }
    let t = title.toLowerCase()
    t = cfl(t)
    const info = JSON.stringify({ title: t, category, desc, type, state, mnplct })
    const res = await fetch(`http://localhost:1616/api/jobs/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${localStorage.getItem('token')}`
        },
        body: info
    })
    const data = await res.json()

    if (!res.ok) {
        throw Error(data.error)
    }

    return data
}

const getJobdata = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'GET'
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

export { deleteJob, createJob, getJobdata, updateJob }