const request=require('request')

const forecast=(lat,long,callback) => {
    url='https://api.darksky.net/forecast/0ecb4e91f9df9ef0019e01d4f1e66635/'+lat+','+long+'?units=si'

    request({url,json:true},(error,{body}) => {
        if(error){
            callback(`Unable to connect to weather services`,undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability}% chance of rain`)
        }
    }) 
}

module.exports=forecast