const mongoose = require('mongoose')

const databaseConection = async()=>{

    try {
        const res = await mongoose.connect(process.env.DB_URI)

        console.log(res.connection.host)
        console.log(process.env.DB_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports = databaseConection