// import express, { Request, Response, NextFunction } from 'express';
// import  apiRouter  from "./routes/api";
// import router from "./routes/router";
// import bodyParser from 'body-parser';
// require('dotenv').config();

// const app = express();

// const port = process.env.PORT || 2000;
// console.log('port',port);
// // interface LocationWithTimezone {
// //     location: string;
// //     timezoneName: string;
// //     timezoneAbbr: string;
// //     utcOffset: number;
// //   };

//   // const getLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
//   //   let locations: LocationWithTimezone[] = [
//   //     {
//   //       location: 'Germany',
//   //       timezoneName: 'Central European Time',
//   //       timezoneAbbr: 'CET',
//   //       utcOffset: 1
//   //     },

//   //   ];
//   //   console.log(locations[0]);
//   //   response.status(200).json(locations);
//   // };


// // app.get('/timezones', getLocationsWithTimezones);

// app.use('/api',apiRouter);
// app.use(bodyParser.json());
// app.use(express.json());

// app.listen(port, () => {

//   console.log(`Timezones by location application is running on port ${port}.`);
// });


import express, { Application } from 'express'
import morgan from 'morgan'
import apiRouter from "./routes/api";
import router from "./routes/router";
import bodyParser from 'body-parser';

require('dotenv').config();



export class App {
    app: Application;
    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        // this.middleware();
        this.routes();
        this.apiRoutes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
    }
    private apiRoutes(){
        this.app.use('/api',apiRouter);
        this.app.use(express.json());
        this.app.use(bodyParser.json());
    }
    private routes() {
        this.app.use("/", apiRouter);
        this.app.use(express.json());
        this.app.use(bodyParser.json());
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}