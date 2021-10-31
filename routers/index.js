
const express = require('express')
const router = express.Router()
const member = require('../models/Member')
const api = require('../api')

const parseString = require('xml2js').parseString

router.get('/',(req, res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{

    console.log(req.body.password)
    console.log(req.body.confirm_password)

    if(req.body.password == req.body.confirm_password){
        req.body.age = 2018 - req.body.age.split('-')[0]

        if(req.body.age <= 6){
            req.body.age = "001"
        } else if(req.body.age <= 13){
            req.body.age = "002"
        } else if(req.body.age <= 24){
            req.body.age = "003"
        } else if(req.body.age <= 41){
            req.body.age = "004"
        } else {
            req.body.age = "005"
        }
        
        member.create(req.body)
        res.redirect('/')
    } else{
        res.render('register',{password:true})
    }
})

router.post('/login',async(req, res)=>{
    let result = (await member.select(req.body))[0]

    if(result){
        req.session.name = (await member.getName(req.body))[0].name
        req.session.userId = req.body.userId
        req.session.login = true
    } else{
        res.render('login',{login:true})
    }
    parseString(await api.getList(result),(err, result)=>{
        let life = 0;
        let edu = 0;
        let eco = 0;
        let medic = 0;
        let tech = 0;
        let culture = 0;
        let area = 0;
        // console.log(result.wantedList.servList)
        result.wantedList.servList.forEach(element => {
            if(element.jurMnofNm == "여성가족부"){
                life ++
            }
            if(element.jurMnofNm == "교육부"){
                edu ++
            }
            if(element.jurMnofNm == "기획재정부"){
                eco ++
            }
            if(element.jurMnofNm == "보건복지부"){
                medic ++
            }
            if(element.jurMnofNm == "과학기술정보통신부"){
                tech ++
            }
            if(element.jurMnofNm == "문화체육관광부"){
                culture ++
            }
            if(element.jurMnofNm == "농림축산식품부"){
                area ++
            }
        });

        res.render('main',{sess:req.session ,data:result.wantedList.servList, cnt:{life:life,edu:edu,eco:eco,medic:medic,tech:tech,culture:culture,area:area}})
    })
})

router.get('/logout',(req, res)=>{
    req.session.destroy((err)=>{
        if(err) throw err
    })
    res.redirect('/login')
})

module.exports = router