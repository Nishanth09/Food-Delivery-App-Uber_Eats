const logoutUser = (req, res) => {
    console.log(`logging off ${req.session.userId}`)
    req.session.destroy((error) => {
        if (error){
            console.log(error)
            res.status(500).end()
        }
        console.log(`Destroyed session`)
        res.status(200).send("Session destroyed");
    })
}

module.exports = logoutUser
