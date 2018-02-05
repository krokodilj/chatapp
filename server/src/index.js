var ws = require('ws')
var url = require('url')
var express = require('express')
var http = require('http')

const config = require('./config/config')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/user',require('./api/user.api'))

app.use(function(err,req,res,next){
	if(!err.status) { 
		console.log("a"+err)
		res.status(500).send() }
	else{ res.status(err.status).send() }
})

const server = http.createServer(app)
const wss = new ws.Server({
	server: server ,
	verifyClient: (info,cb) =>{
		//extract username from url
		let username = url.parse(info.req.url,true).query.username
		if(!username) cb(false,401,"No username provided")
		info.req.id=username
		return cb(true)
	}
})

var USERS={}
var count=0

wss.on('connection',socket =>{

	let username = socket.upgradeReq.id

	//check if username is available
	if(Object.keys(USERS).includes(username)){
		socket.send(`SERVER >> Username '${username}' not available`)
		username=username+count++
		socket.send(`SERVER >> Your username is set to '${username}'`)
	}

	socket.id=username
	USERS[username] = socket

	console.log(`user connected id=${username}`)
	console.log("allusers : "+Object.keys(USERS))

	socket.send(JSON.stringify({
		sentBy:"SERVER",
		message:`hi , ${username}`
	}))
	wss.broadcast("SERVER",`User ${username} connected`)

	//EVENTS
	socket.on('message', message =>{
		console.log(`new message ${socket.id}: ${message}`)
		wss.broadcast(socket.id,message)
	})

	socket.on('close',_=>{
		delete USERS[socket.id]
		wss.broadcast("SERVER",`User ${username} disconnected`)
		console.log(`user disconnected id=${socket.id}`)
		console.log("allusers : "+Object.keys(USERS))
	})

	socket.on('error',e=>{
		console.log("socketerror : " +e)
	})	
})

wss.on('error',e=>{
	console.log("server error : " + e)
})

wss.broadcast=(sender,message)=>{
	for(let socket of wss.clients){
		socket.send(JSON.stringify({
			sentBy:sender,
			message:message
		}))
	}
}

server.listen(config.port,()=>{
	console.log(`server started on port ${config.port} . . .`)
})
