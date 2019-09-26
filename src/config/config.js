module.exports = {
    Port: process.env.PORT || process.env.PORT_LOCAL,
    db: process.env.MONGO_URI || process.env.MONGODB
}