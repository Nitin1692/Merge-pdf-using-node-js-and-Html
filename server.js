const express = require('express')
const app = express()
const port = 4500
const {mergePdfs}  = require('./mergepdf')
const multer = require('multer');

const path = require('path');
const upload = multer({dest: 'upload'})
app.use('/static',express.static("publics"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/mergepdf', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:4500/static/${d}.pdf` )
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`PDF merge app listening on port https://localhost:${port}`)
})