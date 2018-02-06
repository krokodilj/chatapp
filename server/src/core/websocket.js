const ws = require('ws')
const url = require('url')
const redis = require('redis').createClient()
const jwt = require('./jwt')

module.exports={
    createServer: createServer
}

var USERS={}

function createServer(server){
    const wss = new ws.Server({
        server: server ,
        verifyClient: verifyClients
    })

    wss.on('connection', socket =>{
        let userData = socket.upgradeReq.userData
    
        socket.id=userData.username
        USERS[socket.id]=socket

        socket.send(JSON.stringify({
            sentBy:"SERVER",
            message:`hi , ${userData.username}`
        }))

        broadcast("SERVER",`User ${userData.username} connected`)


        console.log(`user connected id=${userData.username}`)
        console.log("allusers : "+Object.keys(USERS))
    
        //EVENTS
        socket.on('message', message =>{
            console.log(`new message ${socket.id}: ${message}`)
            broadcast(socket.id,message)
        })
    
        socket.on('close',(p)=>{
            delete USERS[socket.id]
            broadcast("SERVER",`User ${userData.username} disconnected`)
            console.log(`user disconnected id=${socket.id}`)
            console.log("allusers : "+Object.keys(USERS))
        })
    
        socket.on('error',e=>{
            console.log("socketerror : " +e)
        })
    })

}

function verifyClients(info,cb){
        let token = url.parse(info.req.url,true).query.token        
        if(token){
            jwt.verifyToken(token)
                .then(val =>{
                    info.req.userData=val
                    cb(true)
                })
                .catch(val =>{
                    cb(false,401,"Unauthorised")
                })
        }
        else cb(false,400,"Bad Request")
}

function broadcast(sender,message){
	for(let id in USERS){
		USERS[id].send(JSON.stringify({
			sentBy:sender,
			message:message
		}))
	}
}