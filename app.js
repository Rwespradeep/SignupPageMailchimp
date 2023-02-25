const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = new express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res) =>{
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName,lastName,email);

    var data = {

        members:[

            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var url = "https://us17.api.mailchimp.com/3.0/lists/5fee246edc";
    var options = {
        method:"POST",
        auth:"pradeep:5599157312d8d789899fa024e2e71a52-us17"

    };
   const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }

        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    
});

app.post("/failure", (req,res) => {
    res.redirect("/");
})

app.listen(port,() => {
    console.log("server running on: " + port);
})