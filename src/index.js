//run in google =localhost:8000?name=varanasi
//how to use dynamic api in express js
const express=require("express");
const path=require("path");
const requests=require("requests");
const app=express();

app.get("/",(req,res)=>{
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}%20&appid=159fe93c64cddddaea83344a068995f0`
      )
      //data is a event data come chunk by chunk
      .on('data',(chunk)=>{ 
          const objdata=JSON.parse(chunk);
          const arrData=[objdata];
          //change into objectdata into array data for accessing data
          

          
           console.log(`city name is : ${arrData[0].name} temp is ${((arrData[0].main.temp)-274).toFixed(2)}`);
         res.write(arrData[0].name);
       })
      .on('end',(err)=>{
         if(err)
            return console.log("connection closed due to error",err);
            res.end();
      });
   
});
app.listen(8000,()=>{
    console.log("this is port 8000");
});
