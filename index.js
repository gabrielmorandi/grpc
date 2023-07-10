import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

const PROTO_PATH = "notes.proto"

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

let note_proto = grpc.loadPackageDefinition(packageDefinition)

let notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" },
  { id: "3", title: "Note 3", content: "Content 3" },
]

function list(call, callback) {
  callback(null, { notes: notes })
}

let server = new grpc.Server()

server.addService(note_proto.noteService.service, { list: list })

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server running at http://0.0.0.0:50051")
    server.start()
  }
)
