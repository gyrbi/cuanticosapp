let mongoClient = require('mongodb').MongoClient;
let _db; //Puntero hacia la base


module.exports = class
{
    static async getDB()
    {
        //Si ya existe la conexión, solo la retorna
        if (_db) 
        {
            return _db;
        }
        else 
        {
            try
            {
                let client = await mongoClient.connect(process.env.MONGODBURI, {useNewUrlParser:true, useUnifiedTopology:true}); //Conectar el Cliente
                _db = client.db(process.env.MONGODBNAME); //Conectar a nuestra base
                return _db;
            }
            catch(err)
            {
                console.log(err);
                process.exit(1); //Sale de la API
            }
        }
    }
}