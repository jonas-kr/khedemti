function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const register = async (email, password, firstName, secondName) => {
    if (!email || !password || !firstName || !secondName) {
        throw Error('All fields are required')
    }
    if(!isValidEmail(email)){
        throw Error('Email Not valid')
    }
    const e = email.toLowerCase()

    const info = JSON.stringify({ email: e, password, firstName, secondName })

    const res = await fetch('http://localhost:1616/api/workers/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('secondName', data.secondName)
    localStorage.setItem('token', data.token)

    return data
}
const login = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({ email, password })
    const res = await fetch('http://localhost:1616/api/workers/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: info
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)
    localStorage.setItem('secondName', data.secondName)

    return data

}
const getWorkerData = async (email) => {
    const info = JSON.stringify({ email })

    const res = await fetch('http://localhost:1616/api/workers/one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const updateWorker = async (bio, profilePic, cvUrl, portfolioUrl, education, skills, state, mnplct) => {
    if (!profilePic) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({ bio, profilePic, cvUrl, portfolioUrl, education, skills, state, mnplct })

    const res = await fetch('http://localhost:1616/api/workers/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

            'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: info,
    })
    const data = res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}
export { register, login, getWorkerData, updateWorker }