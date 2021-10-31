const request = require('request')
const member = require('./models/Member')

const serviceKey = "DpNBcmQD8lDae6SG8fiqPj7229g0vEdzR4dLnQzoaaNDIbbyaOaxV1neaTycul3%2BauizA27jMO2A3vEMYt1gHw%3D%3D"

const url = `http://www.bokjiro.go.kr/openapi/rest/gvmtWelSvc?ServiceKey=${serviceKey}&crtiKey=${serviceKey}&numOfRows=100`

let Gvmt = {
    getList:(info)=>{
        return new Promise(async (resolve,reject)=>{
            console.log(info)
            let param = `&callTp=L&lifeArray=${info.age}&charTrgterArray=${info.ect1}`

            console.log(param)

            request({
                url: url+param
            },(err, response, body)=>{
                if (err) reject(err)
                resolve(body)
            })
        })
    },
}

module.exports = Gvmt