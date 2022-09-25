

import net from "net"
import EventEmitter from "events"
import {v4 as uuidv4} from "uuid"


enum PacketType  {
    handshake,
    handshake_ack,
    message
}
interface IOption {
    port: number
}

interface IPacket {
    type: PacketType;
    packetId: string;
    from: string;
    to?: string;
    data: object
}

class Node {
    id: string
    #peers: Map<string, net.Socket>
    #options: IOption
    #emitter: EventEmitter
    on: (eventName: string | symbol, listener: (...args: any[]) => void) => EventEmitter;
    #server: net.Server
    #seenPackets: Set<string>

    constructor(options: IOption){
        this.#seenPackets = new Set()
        this.id = uuidv4()
        this.#peers = new Map()
        this.#options = options
        this.#emitter = new EventEmitter()
        this.on =  this.#emitter.on.bind(this.#emitter)
        this.#server = net.createServer((socket) => this.onNewConnection(socket))
        this.listeners()
    }


    listeners(){
        this.#server.on("listening", this.onStart)

        this.#emitter.on("connect", ({nodeId, socket}) => {
            console.log(`connect with ${nodeId}`)
            this.#peers.set(nodeId, socket)
        })

        this.#emitter.on("disconnect", (nodeId) => {
            console.log(`disconnect from ${nodeId}`)
            this.#peers.delete(nodeId)
        })

        this.#emitter.on("message", (packet) => {
            let {packetId} = packet
            if(this.#seenPackets.has(packetId)) return 

            let {from, to, data} = packet


            // broadcast message
            if(!to){
                this.#broadcast(from, packetId, data)
            }

            if(to){
                if(to === this.id){
                    this.#emitter.emit("direct", {from, data})
                }else{
                    this.#direct(from, to, packet, data)
                }
                
            }
        })
    }

    broadcast(data: object){
        this.#broadcast(this.id, uuidv4(), data)
    }

    direct(to: string, data: object){
        this.#direct(this.id, to, uuidv4(), data)
    }

    #broadcast( from: string, packetId: string, data: object){

        this.#emitter.emit("broadcast", {from, packetId, data})

        this.#sendPacketToPeers(from, undefined, packetId, data)
        
    }

    #direct(from: string, to: string, packetId: string, data: object){
        this.#sendPacketToPeers(from, to, packetId, data)
    }

    #sendPacketToPeers(from: string, to: string | undefined, packetId: string, data: object){

        let packet = JSON.stringify({
            packetId,
            to,
            from,
            type: PacketType.message,
            data
        })

        this.#seenPackets.add(packetId)

        setTimeout(() => {
            this.#seenPackets.delete(packetId)
        })

        this.#peers.forEach((socket, nodeId) => {
            socket.write(packet)
        })
    }

    start(){
        this.#server.listen(this.#options.port)
    }

    onNewConnection(socket: net.Socket){
        let nodeId: string | undefined = undefined;
        socket.write(JSON.stringify({type: PacketType.handshake, from: this.id}))

        socket.on("data", (rawPacket) => {
           
            let parsedPacket: any
            
            try{
                parsedPacket = this.parsePacket(rawPacket)
            }catch(err){
                socket.destroy()
                return 
            }

            let {type}  = parsedPacket

            if(type === PacketType.handshake){
                nodeId = parsedPacket.from 
                this.#emitter.emit("connect", {nodeId, socket})
            }

           

            if (type === PacketType.message){
                this.#emitter.emit("message", parsedPacket)
            }
            
        })

        socket.on("close", () => {
            if (!nodeId) return 
            this.#emitter.emit("disconnect", nodeId)
        })

        socket.on("error", (error) => {
            if(!nodeId) return 
            this.#emitter.emit("disconnect", nodeId)
        })
    }

    parsePacket(rawPacket: Buffer){
        let parsedPacket = JSON.parse(rawPacket.toString())
        return parsedPacket
    }

    connect(ip: string, port: number){
                const socket = new net.Socket();
                socket.connect(port, ip, () => {
                  this.onNewConnection(socket);
                });
              };

    onStart(){
        console.log("Server started")
    }
}

const node = new Node({port: 3000})
node.start()
node.on("broadcast", ({from, data}) => {
    console.log(from, data)
})

process.stdin.on('data', (data) => {
    node.broadcast(JSON.parse(data.toString()));
  });





