const mongoose = require("mongoose");
(async() => {
    await mongoose.connect('mongodb://localhost:27017/googleDocsDocument'); 
  })();
  


const io = require("socket.io")(3001,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ["GET","POST"],
    },
});

const Document = require('./Document');

io.on("connection", socket =>{

   socket.on('get-document', async documentId => {
    const document = await findDocumentorCreate(documentId)
    socket.join(documentId)
    socket.emit('load-document',document.data)

    socket.on('send-changes', (delta) =>{
        //console.log(delta);
        socket.broadcast.to(documentId).emit('receive-changes',delta);
    })
   

   socket.on("save-document", async (data) =>{
    await Document.findByIdAndUpdate(documentId,{data})
   })

   })

    
    console.log("Connected to Client");
})

async function findDocumentorCreate(id) {
    if(id == null) return

    const doc = await Document.findById(id)

    if(doc) return doc

    return await Document.create({_id:id, data: "Type"});
}

