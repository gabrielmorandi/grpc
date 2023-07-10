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

let client = new note_proto.noteService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

client.list({}, function (err, response) {
  if (!err) {
    console.log("Note List:", response.notes)
  } else {
    console.error(err)
  }
})
