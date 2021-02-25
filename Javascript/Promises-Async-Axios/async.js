const login = async(username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'test1234') return 'Welcome'
    throw 'Invalid Password'
}

login ('blah', 'test1234')
    .then((msg) => {
        console.log("Logged In")
        console.log(msg)
    })
    .catch((err) => {
        console.log('Error!!!')
        console.log(err)
    })

