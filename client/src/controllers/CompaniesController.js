function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidURL(url) {
    // Regular expression for URL validation
    var urlPattern = /^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return urlPattern.test(url);
}
function cfl(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

///////////////////////////////////////////////////////////////////////////

const updateCompany = async (bio, profilePic, state, mnplct, nich, contactNmbr) => {
    if (!profilePic) {
        throw Error('All fields are required')
    }
    if (contactNmbr.length != 9) {
        throw Error('Contact number format is wrong')

    }
    let m = mnplct.toLowerCase()
    m = cfl(m)
    const info = JSON.stringify({ bio, profilePic, state, mnplct: m, nich, contactNmbr })

    const res = await fetch('http://localhost:1616/api/companies/update', {
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

const registerCompany = async (email, password, cName, cUrl) => {

    if (!email || !password || !cName || !cUrl) {
        throw Error('All fields are required')
    }
    if (!isValidURL(cUrl)) {
        throw Error('Write Url : www.website.com')
    }
    if (!isValidEmail(email)) {
        throw Error('Email Not valid')
    }
    let e = email.toLowerCase()
    let n = cName.toLowerCase()
    let u = cUrl.toLowerCase()

    const info = JSON.stringify({ email: e, password, cName: n, cUrl: u })

    const res = await fetch('http://localhost:1616/api/companies/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('companyName', data.cName)
    localStorage.setItem('token', data.token)

    return data
}


const loginCompany = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields are required')
    }
    let e = email.toLowerCase()
    const info = JSON.stringify({ email: e, password })
    const res = await fetch('http://localhost:1616/api/companies/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: info
    })
    const data = await res.json()

    if (!res.ok) {
        throw Error(data.error)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)
    localStorage.setItem('companyName', data.cName)

    return data
}

const getCompanydata = async (email) => {
    const info = JSON.stringify({ email })

    const res = await fetch('http://localhost:1616/api/companies/one', {
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
const getCompanyjobs = async () => {
    const res = await fetch('http://localhost:1616/api/jobs/jobscmp', {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
    const data = res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}


const getAllJobs = async () => {
    const res = await fetch(`http://localhost:1616/api/jobs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const updateTheApply = async (status,id)=>{
    const info = JSON.stringify({ status,id })

    const res = await fetch('http://localhost:1616/api/companies/apply', {
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
export {
    registerCompany, loginCompany, updateCompany,updateTheApply,
    getCompanydata, getCompanyjobs, getAllJobs
}