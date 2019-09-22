const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000


const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title:'Home Page',
        name:'Biplab Paul',
        age:'21'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About Page',
        name:'Biplab Paul',
        message:'Its a light weight weather app...'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Desk',
        name:'Bipla Paul',
        contact:'Plz contact on 9570015320'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'No address found!!!'
        })
    }
    
    geocode(req.query.address,(error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address,
            })
        })
    })
})



// ************************************************
// Partise
// app.get('/weather', (req,res) => {
//     res.send({
//         forecast:'29 Degrees',
//         location:'bhubaneshwar'
//     })
// })


// app.get('/products',(req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })
//***********************************************

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Biplab Paul',
        message:'Help page not found!!!!!!'
    })
})

// app.com
// app.com/help

app.get('*',(req,res) => {
    res.send('My 404 Page..')
})

app.listen(port, () => {
    console.log('Server is running....')
})

