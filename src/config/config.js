module.exports = {
    Port: process.env.PORT || process.env.PORT_LOCAL,
    db: 'mongodb+srv://franqsanz:franqsanzdev@articulosfranqsanz-hj5fo.mongodb.net/articulos?retryWrites=true&w=majority' || process.env.MONGODB
}