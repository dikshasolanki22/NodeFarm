const http= require("http");
var fs=require("fs");
var url= require("url");
var replace= require("./templates/replace");
var obj= fs.readFileSync("data.json");
var jsonObj= JSON.parse(obj);

var templateproduct= fs.readFileSync("./templates/template-product.html").toString();
var templateOverview= fs.readFileSync("./templates/template-overview.html").toString();
var templateCards= fs.readFileSync("./templates/template-card.html").toString();

const server= http.createServer(function(req,res){

    var MakeCard= function(templateCards,json){
        return replace(templateCards,json);
    }

    //console.log("url requested"+ req.url);

    var path= req.url;
    var id=url.parse(path,true).query.id;
    var path= url.parse(path,true).pathname;


    if(path=="/products"){
        
        var ProductHtml= replace(templateproduct, jsonObj[id]);
        res.writeHead(200,{"content-type":"text/html"});
        res.end(ProductHtml);

    }
    else if(path=="/"||path=="/overview")
    {
     /*
     res.writeHead(200,{"content-type":"text/html"});
     var cardArr= jsonObj.map(function(el){
     return MakeCard(templateCards,el);

     }); */

     ////////////OR////////////////
     //////BY FOR LOOP////////////
     
     res.writeHead(200,{"content-type":"text/html"});
      var cards="";
      for(let i=0; i<jsonObj.length;i++)
      {
          cards+= MakeCard(templateCards, jsonObj[i]);
      }
      let overviewHTML= templateOverview.replace("{%PRODUCT_CARDS%}",cards);
      res.end(overviewHTML);
     

    }
    else if(path=="product?id={%ID%}")
    {
       
    }
    else if(path=="/api")
    {
        var obj= fs.readFileSync("data.json");
        console.log(obj);
        res.writeHead(200,{"content-type":"application/json"})
        res.end(obj);
    }
    
    else{
        res.writeHead(404);
        res.end("404 Error");
    }
  /*  res.writeHead(200,{"content-type":"text/plain"});
    res.write("Hi we are serving from node server");
    res.end(); */
});
var port=process.env.PORT||80;
server.listen(port);
console.log("Server has started at port "+port);