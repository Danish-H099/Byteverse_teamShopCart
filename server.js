const con = require("./connection.js")
const express = require ("express")
const path = require("path");
const bodyParser = require ("body-parser")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.listen(3000,function(){
    console.log("Server listening at port 3000")
})

app.get("/",function(req,res){
    res.sendFile(__dirname ,"public", "index.html");
    console.log("h33");
    
})

app.post("/sellerpage",function(req,res){
    const Username=req.body.username;
    const Password=req.body.password;
    con.query("select * from sellers where name = ? and password = ?",[Username,Password],function(error,results,fields){
        if(results.length>0){
            con.query(`select * from sellercontent where name=?`,[Username],(err,result)=>{
                if(err){
                    return console.log(err);
                }
                return console.log(result);

            })
            res.render("sellerinterface",{dash:Username,hash:results});
            // console.log(typeof(results)) -> Object
            // console.log(results.length); ->1
            // console.log(Object.keys(results).length); ->1
            // console.log(Object.keys(results[0]).length); ->6
            // console.log(Object.keys(results[1]).length); ->error

            // console.log(results[0].Name) ->Praveen
        }
        else{
            
            res.redirect("/fail")
        }
    })
})
app.get("/fail",function(req,res){
    res.sendFile(__dirname +"/public/fail.html")
})

app.get("/sellerinterface",function(req,res){
    // res.sendFile(__dirname , "public" , "sellerinterface.html")
    // res.send("Successfully logedin")
    res.sendFile(__dirname +"/public/sellerinterface.html");

    
})

app.post("/page3",function(req,res){
    const Name=req.body.username;
    const Shopname=req.body.shopname;
    const City=req.body.city;
    const Phone=req.body.phone;
    const Email=req.body.email;
    const Password=req.body.password;

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO sellers VALUES('"+Name+"','"+Shopname+"','"+City+"','"+Phone+"','"+Email+"','"+Password+"')";

        con.query(sql,function(error,result){
            if(error) throw error;
            res.send("Successfully Submitted!")
            
        })
    })

})
app.post("/sellerupload",function(req,res){
    const Name=req.body.name;
    const Img=req.body.img;
    const ProName=req.body.pname;
    const Prize=req.body.prize;
    console.log(Img)
    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO sellercontent VALUES('"+Name+"','"+Img+"','"+ProName+"','"+Prize+"')";

        con.query(sql,function(error,result){
            if(error) throw error;
            res.send("Successfully Submitted!")
            // setInterval(() => {
            //     res.redirect("/sellerinterface");
            // }, 3000);
            
        })
    })

})
