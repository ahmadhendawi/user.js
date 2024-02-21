var express = require('express')
var app=express()
var fs=require('fs')
var bodyParser= require('body-parser')
var urlEncoded= bodyParser.urlencoded({extended:false})

app.get('/', function(req,res)
{
    res.send("start my server")
})

app.get('/listUsers', function(req,res){
    var data=fs.readFileSync(__dirname+"/users.json")
    res.send(String(data))
})

app.get('/user/:id', function(req,res){
    if(req.params.id>0 && req.params.id<4){
var data= fs.readFileSync(__dirname+"/users.json")
data= JSON.parse(String(data))
console.log(data)
var user= data['user'+req.params.id]
console.log(user)
res.send(user)
}
else
{
  res.send("user id error")
}})

app.delete('/deleteUser/:id', function(req,res){
    var data= fs.readFileSync(__dirname+"/users.json")
    data= JSON.parse(String(data))
    delete data['user'+req.params.id]
    res.send(data)
})

app.get('/form', function(req,res){
    res.sendFile(__dirname+"/userform.html")
})


app.post('/addUser', urlEncoded,function(req,res){

    var newUser={name:"", password:"", profession:""}
    newUser.name=req.body.name
    newUser.password=req.body.password
    var data= fs.readFileSync(__dirname+"/users.json")
    data= JSON.parse(String(data))
    data['user4']= newUser
    res.send(data)
})

var server= app.listen(8000, function(){
    var host = server.address().address
    var port = server.address().port
})
