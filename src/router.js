const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const handler = require('./handler');
const router = (request, response) => {
    const endpoint = request.url;
    const method = request.method;
    if(endpoint== "/") {
        handler(response,'/public/index.html')
    }
    else if (endpoint =="/public/main.css") {
       handler(response,endpoint)
    }
    else if (endpoint =="public/img/image.jpg") {
        handler(response,endpoint)
    }
    else if (endpoint =="/public/img/logo1.png") {
        handler(response,endpoint)
    }
    else if (endpoint =="/public/img/logo2.png") {
        handler(response,endpoint)
    }else if (endpoint == '/public/script.js'){
      handler(response,endpoint)
    }else if (endpoint=="/create-post" && method === "POST") {
        let allTheData = '';
        request.on('data', chunkOfData => {
            allTheData += chunkOfData;
        });
        request.on('end', () => {
        const filePath = path.join(__dirname,'posts.json');
        const convertedData=querystring.parse(allTheData)
        fs.readFile(filePath,(err,data)=>{
          if(err){
            response.writeHead(500)
            response.end('error server')
          }else {
            obj=JSON.parse(data)
            obj[Date.now()]= convertedData.post;
            fs.writeFile(filePath,JSON.stringify(obj),error=>{
            console.log(error);
            })
          }
        })
        response.writeHead(302,{"location":"/"})
        response.end()
      });

    }else if (endpoint == '/posts') {
      handler(response,"src/posts.json")

    }
    else {
        response.writeHead(404)
        response.end('Not Found')
    }
  }

  module.exports =router