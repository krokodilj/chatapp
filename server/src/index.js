var ws = require('ws')
var url = require('url')

const port = 3001

const wss = new ws.Server({
	port: port ,
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

	let id = socket.upgradeReq.id
	//check if username is available
	if(Object.keys(USERS).includes(id)){
		socket.send(`SERVER >> Username '${id}' not available`)
		id=id+count++
		socket.send(`SERVER >> Your username is set to '${id}'`)
	}
	socket.id=id
	USERS[id] = socket.id

	console.log(`user connected id=${id}`)
	console.log("allusers : "+Object.keys(USERS))

	socket.send(JSON.stringify({
		sentBy:"SERVER",
		message:`hi , ${id}`
	}))
	wss.broadcast("SERVER",`User ${id} connected`)

	//EVENTS
	socket.on('message', message =>{
		console.log(`new message ${socket.id}: ${message}`)
		wss.broadcast(socket.id,message)
	})

	socket.on('close',_=>{
		delete USERS[socket.id]
		wss.broadcast("SERVER",`User ${id} disconnected`)
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

console.log("server started\n")
