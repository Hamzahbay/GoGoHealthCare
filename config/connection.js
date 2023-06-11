const mongoose = require('mongoose')

//MONGODB ATLAS ONLINE APLICATION 
const mongoAtlasURI = 'mongodb://ghc_123:GHC13113@cluster0-shard-00-00.9rwkr.mongodb.net:27017,cluster0-shard-00-01.9rwkr.mongodb.net:27017,cluster0-shard-00-02.9rwkr.mongodb.net:27017/ghc_db?ssl=true&replicaSet=atlas-bd9g20-shard-0&authSource=admin&retryWrites=true&w=majority'

//MONGODB COMPASSCOMUNITY LOCAL APLICATION
const mongoCompassURI = 'mongodb://localhost/ghc-db'

//FUNCTION CONNECTION
const dbConnection = ( URI ) => {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log('MongoDB Connection Succeed')).catch(err => console.log(err))
}

//ACTIVE CONNECTION
dbConnection(mongoAtlasURI)