const createTables = require('./index')
const {optionsSqLite, optionsMySQL} = require('./options')
const Contenedor = require('../controller/Contenedor')

const testProdManager = async pmanger => {
    const productos = [
        {title: 'Prueba', price: 1234, thumbnail: 'www.holamundo.com/foto.jpeg'},
        {title: 'Coca', price: 1000, thumbnail: 'www.holamundo.com/coca.jpeg'},
        {title: 'Pasaje', price: 850, thumbnail: 'www.holamundo.com/foto22.jpeg'},
        {title: 'Impuestp', price: 2000, thumbnail: 'www.holamundo.com/foto3.jpeg'},
    ]
    await pmanger.save(productos)
    console.log((await pmanger.getAll()).result)
    console.log((await pmanger.getById(2)).result)
    console.log((await pmanger.deleteById(3)).result)
    console.log((await pmanger.getAll()).result)
    console.log((await pmanger.deleteAll()).result)
    console.log((await pmanger.getAll()).result)
    await pmanger.db.schema.dropTable(pmanger.table)
    console.log('Tabla eliminada')
    pmanger.db.destroy()
}

const testChatManager = async cmanger => {
    const messages = [
        {message: 'Hola mundo 1'},
        {message: 'Hola mundo 2'},
        {message: 'Hola mundo 3'},
        {message: 'Hola mundo 4'},
        {message: 'Hola mundo 10'}
    ]
    await cmanger.save(messages)
    console.log((await cmanger.getAll()).result)
    console.log((await cmanger.getById(2)).result)
    console.log((await cmanger.deleteById(3)).result)
    console.log((await cmanger.getAll()).result)
    console.log((await cmanger.deleteAll()).result)
    console.log((await cmanger.getAll()).result)
    await cmanger.db.schema.dropTable(cmanger.table)
    console.log('Tabla eliminada')
    cmanger.db.destroy()
}

const test = async (pTable, cTable) => {

    await createTables(pTable, cTable)

    const pManager = new Contenedor(optionsMySQL, pTable)
    const cManager = new Contenedor(optionsSqLite, cTable)

    await testProdManager(pManager)
    await testChatManager(cManager)
}

module.exports = test