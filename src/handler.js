const fs=require('fs')
const path=require('path')
const type={
    ".html":"text/html",
    ".css":"text/css",
    ".jpg":"image/jpg",
    ".png":"image/png",
    ".js":"text/javasrcipt",
    ".json":"application/json"
}

const handler =(response,url) => {
    const extensions=path.extname(url)
    const filePath = path.join(__dirname,'..',url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(500)
            response.end('server error')
        } else {
          response.writeHead(200, { 'Content-Type': type[extensions] })
          response.end(file);
        }
    })
}

module.exports = handler