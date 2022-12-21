const express=require('express')
const mysql=require('mysql')
const myconn=require('express-myconnection')
const routes=require('./routes')
const cors = require('cors')

const app=express()

app.use(cors())

app.set('port', 9000)

/*const dbOption={
    host: 'localhost',
    port: '3306',
    user: 'UserProyect',
    password: 'SQLPassword',
    database: 'deporte'

}*/

const dbOption={
    host: process.env.HOST_DB || 'localhost',
    port: process.env.PORT_DB ||'3306',
    user: process.env.USER_DB ||'UserProyect',
    password: process.env.PASSWORD_DB ||'SQLPassword',
    database: process.env.NAME_DB || 'deporte'

}


///middelwars------
app.use(myconn(mysql, dbOption,'single'))
app.use(express.json())

///routes
app.get('/',(req,res)=>{
    res.send('Aplicacion Deportes Deportivos')
})

app.use('/api',routes)

app.listen(app.get('port'),()=>{
    console.log(`servidor ejecutandose en el puerto ${app.get('port')}`)
})