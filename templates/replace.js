
module.exports= function replace(template,json)
{

//const fs=require("fs");
//let rawdata= fs.readFileSync("data.json");
//var json= JSON.parse(rawdata);
// console.log(json);

let htmlTemplate= template;

let output= htmlTemplate.replace(/{%PRODUCTNAME%}/g,json["productName"]);
output= output.replace(/{%IMAGE%}/g,json["image"]);
output= output.replace(/{%FROM%}/g,json["from"]);
output= output.replace(/{%NUTRIENTS%}/g,json["nutrients"]);
output= output.replace(/{%QUANTITY%}/g,json["quantity"]);
output= output.replace(/{%PRICE%}/g,json["price"]);
output= output.replace(/{%DESCRIPTION%}/g,json["description"]);
output= output.replace(/{%ID%}/g,json["id"]);

if(json["organic"]===false)
{
output= output.replace(/{%NOT_ORGANIC%}/g,"not-organic");
}

return output;

};