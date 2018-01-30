var ws = require('ws')

const port = 3001

const wss = new ws.Server({
	port: port 
})

var users={}

wss.on('connection',socket =>{
	let id = count++
	socket.id=id
	users[id] = socket.id
	console.log(`user connected id=${id}`)
	console.log("allusers : "+Object.keys(users))

	socket.on('message', message =>{
		console.log(`new message ${socket.id}: ${message}`)
		wss.broadcast(message)
	})

	socket.on('close',_=>{
		delete users[socket.id]
		console.log(`user disconnected id=${socket.id}`)
		console.log("allusers : "+Object.keys(users))
	})

	socket.on('error',e=>{
		console.log("socketerror : " +e)
	})

	socket.send('hi');	
})

wss.on('error',e=>{
	console.log("server error : " + e)
})

wss.broadcast=(message)=>{
	for(let socket of wss.clients){
		socket.send(message)
	}
}

console.log("server started\n")
