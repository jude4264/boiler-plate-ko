const express = require('express')
const app = express()
const port = 5100
// const port = 3000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } = require('./middleware/auth')
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { application } = require('express');
const { urlencoded } = require('body-parser');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false


}).then(()=> console.log('MongoDB connected...'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('/api/hello', (req,res)=>{
    res.send("hola")
})

app.post('/api/users/register',(req,res)=>{
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err,doc)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })//몽고디비메소드

})

app.post('/api/users/login',(req,res)=>{

    //요청된 이메일을 데이터베이스에 있는지 찾는다 

    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSucces: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다. 

        user.comparePassword(req.body.password, (err , isMatch)=>{
            if(!isMatch) return res.json({ loginSucces: false,message: "비밀번호가 틀렸습니다."})
            //비밀번호까지 맞다면 토큰을 생성하기 
            user.genToken((err, user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 
                res.cookie("x_auth",user.token)
                .status(200)
                .json({
                    loginSucces: true,
                    userId: user._id
                })


            })
        })

    })



})



app.get('/api/auth', auth, (req,res)=>{

    // req.user
    // req.token
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Auth가 true 

    res.status(200).json({
        _id : req.user._id,
        isAdmin: req.user.role === 0?false:true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout',auth, (req,res)=>{
    User.findOneAndUpdate({ _id : req.user._id}, {token : ""}, (err, user) =>{
        if(err) return res.json({success:false, err})
        return res.status(200).send({
            success:true
        })
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})