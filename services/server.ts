import "dotenv/config"
import * as cors from "cors"
import * as express from "express"
import { DataTypes } from './types'

const app = express()
app.use(
  cors({
    origin: (origin: any, cb: (arg0: null, arg1: boolean) => any) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/search', (req, res) =>  {
  const dataSet1 = [
    {
      "name":"Good Health Home",
      "stateName":"Alaska",
      "availability":{
        "from":"10:00",
        "to":"19:30"
      }
    },
    {
      "name":"Mayo Clinic",
      "stateName":"Florida",
      "availability":{
        "from":"09:00",
        "to":"20:00"
      }
    },
    {
      "name":"Cleveland Clinic",
      "stateName":"New York",
      "availability":{
        "from":"11:00",
        "to":"22:00"
      }
    },
    {
      "name":"Hopkins Hospital Baltimore",
      "stateName":"Florida",
      "availability":{
        "from":"07:00",
        "to":"22:00"
      }
    },
    {
      "name":"Mount Sinai Hospital",
      "stateName":"California",
      "availability":{
        "from":"12:00",
        "to":"22:00"
      }
    },
    {
      "name":"Tufts Medical Center",
      "stateName":"Kansas",
      "availability":{
        "from":"10:00",
        "to":"23:00"
      }
    },
    {
      "name":"UAB Hospital",
      "stateName":"Alaska",
      "availability":{
        "from":"11:00",
        "to":"22:00"
      }
    },
    {
      "name":"Swedish Medical Center",
      "stateName":"Arizona",
      "availability":{
        "from":"07:00",
        "to":"20:00"
      }
    },
    {
      "name":"Scratchpay Test Pet Medical Center",
      "stateName":"California",
      "availability":{
        "from":"00:00",
        "to":"24:00"
      }
    },
    {
      "name":"Scratchpay Official practice",
      "stateName":"Tennessee",
      "availability":{
        "from":"00:00",
        "to":"24:00"
      }
    },
  ]
  const dataSet2 = [
    {
      "clinicName":"Good Health Home",
      "stateCode":"FL",
      "opening":{
        "from":"15:00",
        "to":"20:00"
      }
    },
    {
      "clinicName":"National Veterinary Clinic",
      "stateCode":"CA",
      "opening":{
        "from":"15:00",
        "to":"22:30"
      }
    },
    {
      "clinicName":"German Pets Clinics",
      "stateCode":"KS",
      "opening":{
        "from":"08:00",
        "to":"20:00"
      }
    },
    {
      "clinicName":"City Vet Clinic",
      "stateCode":"NV",
      "opening":{
        "from":"10:00",
        "to":"22:00"
      }
    },
    {
      "clinicName":"Scratchpay Test Pet Medical Center",
      "stateCode":"CA",
      "opening":{
        "from":"00:00",
        "to":"24:00"
      }
    }
  ]
  let data: any = [...dataSet1, ...dataSet2]
  let result: any = []
  const {search_param }: any = req.query

  if (!search_param?.length) {
    return res.status(200).send({
      body:  result,
    })
  }
  let expression = new RegExp(search_param, "i")
  data.forEach((entry: DataTypes) => {
    if (entry.name || entry.stateName || entry.availability) {
      if (entry.name.search(expression) !== -1 || entry.stateName.search(expression) !== -1
        || entry.availability.from.search(expression) !== -1 || entry.availability.to.search(expression) !== -1) {

        result.push({
          name: entry.name,
          stateName: entry.stateName,
          availability: entry.availability
        })

      }
    }

    if (entry.clinicName || entry.stateCode || entry.opening) {
      if (entry.clinicName.search(expression) !== -1 || entry.stateCode.search(expression) !== -1
        || entry.opening.from.search(expression) !== -1  || entry.opening.to.search(expression) !== -1 ) {

        result.push({
          clinicName: entry.clinicName,
          stateCode: entry.stateCode,
          opening: entry.opening,
        })
      }
    }

  })

  return res.status(200).send({
    body:  result,
  })
});


export const app_server = app.listen(process.env.PORT || 4000, () => {
  console.log(`App running on port ${process.env.PORT || 4000}`);
});
