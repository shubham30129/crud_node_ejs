var express=require("express");
var bodyparser=require("body-parser");
var {mongoose}=require("./db/mongoose");
var {Emp1}=require("./models/emp");

// file upload
var exupload=require("express-fileupload");
var path=require("path");
var mv = require('mv');

var app =express();
app.use(bodyparser.urlencoded({extended:false }));
app.set('view engine', 'ejs');
app.use("/views/partial", express.static(__dirname + '/views/partial'));
app.use(exupload());


app.get('/', function(req, res) {
    res.render('pages/page1');
});

app.post('/insert', function(req, res) {
    var name1=req.body.name;
    var salary1=req.body.salary;
    var email1=req.body.email;
    var password1=req.body.password;
    var file=req.files.fup;
    var uploadfile=path.join(__dirname+"/img/"+file.name);
    res.send(name1 +"\n"+ salary1 +"\n"+ email1 +"\n" +password1);

    var e=new Emp1({name:name1, salary:salary1, email:email1, password:password1 ,image:file.name});
    e.save().then((doc)=>{
        res.send(doc);

    });
    file.mv(uploadfile,(err)=>{
        if(err){
            console.log(err);
        }
        else
        {
            console.log("success");
        }
    });

});

app.get('/display', function(req, res){

    Emp1.find().then((result)=> {
        res.render('pages/display',{data :result
        });
    })
});

app.get("/delete",(req,res)=>{
    //res.send("delete");
    var did=req.query.did;
   // res.send(did);

    Emp1.findByIdAndRemove(did,()=>{

        res.redirect("/display");
    })
});

app.get("/edit",(req,res)=>{
    res.send("edit");
});
app.listen(8080);
console.log('8080 is the magic port');