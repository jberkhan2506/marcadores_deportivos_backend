const express=require('express')
const routes=express.Router()
//req= lo que enviamos, res= lo que recibimos
routes.get('/:table',(req,res)=>{
    //res.send('uso de select')
    req.getConnection((err,conn)=>{

        if(err) return res.send(err)
        var ssql='select * from '+req.params.table

        conn.query(ssql,(err,rows)=>{

            if(err) return res.send(err)
            
            res.json(rows)

        })
    })
})

routes.post('/:table',(req,res)=>{
    //res.send('insertar')
    req.getConnection((err,conn)=>{

        if(err) return res.send(err)
        var ssql = 'INSERT INTO '+req.params.table+' set ?'

        conn.query(ssql,[req.body],(err,rows)=>{

            if(err) return res.send(err)
            
            res.send('add ok')

        })
    })
})

routes.delete('/:table/:field/:id',(req,res)=>{
    //res.send('ahora si viene el delete')
    req.getConnection((err,conn)=>{

        if(err) return res.send(err)
        var ssql= 'DELETE FROM '+req.params.table+' WHERE '+req.params.field+' = ?'

        conn.query(ssql,[req.params.id],(err,rows)=>{

            if(err) return res.send(err)
            
            res.send('book deleted')

        })
    })
})

routes.put('/:table/:field/:id',(req,res)=>{
    //res.send('actualizar')
    req.getConnection((err,conn)=>{

        if(err) return res.send(err)

        var ssql = 'UPDATE '+ req.params.table+' set ? WHERE '+req.params.field+' = '+req.params.id

        conn.query(ssql,[req.body],(err,rows)=>{

            if(err) return res.send(err)
            
            res.send('book updated')

        })
    })
})

routes.get('/:table/:email/:clave', (req, res) => {
    //res.send('Ahora si viene el sel')
    req.getConnection((err, conn) => {

        if (err) return res.send(err)

        var ssql = 'Select * from deporte.' + req.params.table + " WHERE usu_email='" + req.params.email + "' AND usu_clave='" +req.params.clave + "'"
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })

})

module.exports=routes