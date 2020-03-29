///////////////////////////////////////
////    Main Server Configuration  ////
////        Import modules         ////
///////////////////////////////////////
const fs = require('fs');
const express = require('express');
const morgan = require('morgan'); /*Require Third party middleware */
const app = express();
const dataBase = `${__dirname}/dev-data/data/tours-simple.json`;
///////////////////////////////////////
////    Middleware Configuration   ////
///////////////////////////////////////
app.use(morgan('dev'));
app.use(express.json()); /*app.use is required for all middleware! */
app.use((req, res, next) => {
  /*Custom Middleware */
  console.log('Middleware running...');
  next(); /*Neccessary for all middleware */
});
app.use((req, res, next) => {
  /* Adding DTG to each request */
  req.requestTime = new Date().toISOString();
  next(); /*Neccessary for all middleware */
});
////////////////////////////////////////
////    Listening for requests      ////
////     Read Tour JSON data        ////
////////////////////////////////////////
const tours = JSON.parse(fs.readFileSync(dataBase));
////////////////////////////////////////
///      Accept Get Requests        ////
///           All tours             ////
////////////////////////////////////////
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    'requested DTG': req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};
////////////////////////////////////////
///      Accept Get Requests        ////
///         Specfic tours           ////
////////////////////////////////////////
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; /* Specfic Tours as per ":id" */
  const tour = tours.find(el => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    'requested DTG': req.requestTime,
    data: {
      tour
    }
  });
};

////////////////////////////////////////
////     Accept Create Requests     ////
////////////////////////////////////////
const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        'Requested Time': req.requestTime,
        data: {
          tour: newTour
        }
      });
      console.log('recieved!');
    }
  );
};
////////////////////////////////////////
////     Accept Update Requests     ////
////////////////////////////////////////
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    'requested DTG': req.requestTime,
    data: {
      tour: '<Updated Tour ...>'
    }
  });
};
////////////////////////////////////////
////     Accept Delete Requests     ////
////////////////////////////////////////
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    'requested DTG': req.requestTime,
    data: null
  });
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not available.'
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not available.'
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not available.'
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not available.'
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not available.'
  });
};
////////////////////////////////////////
////    Constructing API Routing    ////
////////////////////////////////////////
app
  .route('/api/v1/tours')
  .get(getAllTours) // app.get('/api/v1/tours', getAllTours);
  .post(createTour); // app.post('/api/v1/tours', createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour) // app.get('/api/v1/tours/:id', getTour); Adding the ":" allows for additional custom parameters and data variables.
  .patch(updateTour) // app.patch('/api/v1/tours/:id', updateTour);
  .delete(deleteTour); // app.delete('/api/v1/tours/:id', deleteTour);
///////////////////////////////////
////       User Routing        ////
///////////////////////////////////
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
///////////////////////////////////
////       Start Server        ////
///////////////////////////////////
// Start Server
const port = 8080;
app.listen(port, () => {
  console.log('Started!');
});
