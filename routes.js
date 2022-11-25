const express=require('express')
const routes=express.Router()
//req= lo que enviamos, res= lo que recivimos
routes.get('/:table',(req,res)=>{
    //res.send('ahora si viene el select')
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
    //res.send('ahora si viene el insert')
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
    //res.send('ahora si viene el update')
    req.getConnection((err,conn)=>{

        if(err) return res.send(err)

        var ssql = 'UPDATE '+ req.params.table+' set ? WHERE '+req.params.field+' = '+req.params.id

        conn.query(ssql,[req.body],(err,rows)=>{

            if(err) return res.send(err)
            
            res.send('book updated')

        })
    })
})

module.exports=routes