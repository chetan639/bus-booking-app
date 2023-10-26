const {Booking,Bus,Journey,Operator,Rating,Route,Session,User} = require('./models').Models;

const bookingDummyData = [
    {
      journeyId: 1,
      userId: 1,
      seatNumber: 2,
      fare: 50,
      bookingTime: "2023-10-18T08:00:00Z",
      source: "Source City 1",
      destination: "Destination City 1",
    },
    {
      journeyId: 2,
      userId: 2,
      seatNumber: 4,
      fare: 60,
      bookingTime: "2023-10-18T10:30:00Z",
      source: "Source City 2",
      destination: "Destination City 2",
    },{
      journeyId: 1,
      userId: 1,
      seatNumber: 2,
      fare: 50,
      bookingTime: "2023-10-18T08:00:00Z",
      source: "Source City 1",
      destination: "Destination City 1",
    },
    {
      journeyId: 2,
      userId: 2,
      seatNumber: 4,
      fare: 60,
      bookingTime: "2023-10-18T10:30:00Z",
      source: "Source City 2",
      destination: "Destination City 2",
    },
    {
      journeyId: 3,
      userId: 3,
      seatNumber: 6,
      fare: 70,
      bookingTime: "2023-10-18T11:15:00Z",
      source: "Source City 3",
      destination: "Destination City 3",
    },
    {
      journeyId: 4,
      userId: 4,
      seatNumber: 8,
      fare: 80,
      bookingTime: "2023-10-18T13:45:00Z",
      source: "Source City 4",
      destination: "Destination City 4",
    },
    {
      journeyId: 5,
      userId: 5,
      seatNumber: 10,
      fare: 90,
      bookingTime: "2023-10-18T15:30:00Z",
      source: "Source City 5",
      destination: "Destination City 5",
    },
    {
      journeyId: 6,
      userId: 6,
      seatNumber: 12,
      fare: 100,
      bookingTime: "2023-10-18T17:15:00Z",
      source: "Source City 6",
      destination: "Destination City 6",
    },
    {
      journeyId: 7,
      userId: 7,
      seatNumber: 14,
      fare: 110,
      bookingTime: "2023-10-18T19:00:00Z",
      source: "Source City 7",
      destination: "Destination City 7",
    },
    {
      journeyId: 8,
      userId: 8,
      seatNumber: 16,
      fare: 120,
      bookingTime: "2023-10-18T21:30:00Z",
      source: "Source City 8",
      destination: "Destination City 8",
    },
    {
      journeyId: 9,
      userId: 9,
      seatNumber: 18,
      fare: 130,
      bookingTime: "2023-10-18T09:00:00Z",
      source: "Source City 9",
      destination: "Destination City 9",
    },
    {
      journeyId: 10,
      userId: 10,
      seatNumber: 20,
      fare: 140,
      bookingTime: "2023-10-18T11:45:00Z",
      source: "Source City 10",
      destination: "Destination City 10",
    },
    {
      journeyId: 11,
      userId: 11,
      seatNumber: 22,
      fare: 150,
      bookingTime: "2023-10-18T13:30:00Z",
      source: "Source City 11",
      destination: "Destination City 11",
    },
    {
      journeyId: 12,
      userId: 12,
      seatNumber: 24,
      fare: 160,
      bookingTime: "2023-10-18T15:15:00Z",
      source: "Source City 12",
      destination: "Destination City 12",
    },
];
const busDummyData = [
    {
      operatorId: 1,
      busNumber: 101,
      busType: "Seater",
      seatingCapacity: 30,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: false
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 2,
      busNumber: 202,
      busType: "Semi Sleeper",
      seatingCapacity: 40,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 1,
      busNumber: 102,
      busType: "Seater",
      seatingCapacity: 30,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: false
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 2,
      busNumber: 203,
      busType: "Semi Sleeper",
      seatingCapacity: 40,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 3,
      busNumber: 303,
      busType: "Sleeper",
      seatingCapacity: 24,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: false
      },
      rating: 3,
      isAC: false,
    },
    {
      operatorId: 4,
      busNumber: 404,
      busType: "Seater",
      seatingCapacity: 35,
      busAmenities: {
        wifi: false,
        chargingPoints: true,
        entertainmentSystem: false
      },
      rating: 5,
      isAC: true,
    },
    {
      operatorId: 5,
      busNumber: 505,
      busType: "Sleeper",
      seatingCapacity: 28,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 6,
      busNumber: 606,
      busType: "Semi Sleeper",
      seatingCapacity: 45,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 7,
      busNumber: 707,
      busType: "Seater",
      seatingCapacity: 40,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 8,
      busNumber: 808,
      busType: "Sleeper",
      seatingCapacity: 26,
      busAmenities: {
        wifi: false,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 3,
      isAC: false,
    },
    {
      operatorId: 9,
      busNumber: 909,
      busType: "Seater",
      seatingCapacity: 32,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: false
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 10,
      busNumber: 1010,
      busType: "Sleeper",
      seatingCapacity: 22,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 11,
      busNumber: 1111,
      busType: "Semi Sleeper",
      seatingCapacity: 38,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    {
      operatorId: 12,
      busNumber: 1212,
      busType: "Seater",
      seatingCapacity: 30,
      busAmenities: {
        wifi: true,
        chargingPoints: true,
        entertainmentSystem: true
      },
      rating: 4,
      isAC: true,
    },
    // Add more bus objects as needed
];
const journeyDummyData = [
  {
    busId: 1,
    routeId: 1,
    departureTime: "2023-10-18T08:00:00Z",
    arrivalTime: "2023-10-18T12:00:00Z",
  },
  {
    busId: 2,
    routeId: 2,
    departureTime: "2023-10-18T10:30:00Z",
    arrivalTime: "2023-10-18T15:30:00Z",
  },
  {
    busId: 1,
    routeId: 1,
    departureTime: "2023-10-18T08:00:00Z",
    arrivalTime: "2023-10-18T12:00:00Z",
  },
  {
    busId: 2,
    routeId: 2,
    departureTime: "2023-10-18T10:30:00Z",
    arrivalTime: "2023-10-18T15:30:00Z",
  },
  {
    busId: 6,
    routeId: 6,
    departureTime: "2023-10-18T21:00:00Z",
    arrivalTime: "2023-10-18T23:30:00Z",
  },
  {
    busId: 7,
    routeId: 7,
    departureTime: "2023-10-18T14:30:00Z",
    arrivalTime: "2023-10-18T17:00:00Z",
  },
  {
    busId: 8,
    routeId: 8,
    departureTime: "2023-10-18T19:15:00Z",
    arrivalTime: "2023-10-18T22:45:00Z",
  },
  {
    busId: 9,
    routeId: 9,
    departureTime: "2023-10-18T09:45:00Z",
    arrivalTime: "2023-10-18T13:00:00Z",
  },
  {
    busId: 10,
    routeId: 10,
    departureTime: "2023-10-18T12:30:00Z",
    arrivalTime: "2023-10-18T15:45:00Z",
  },
  {
    busId: 12,
    routeId: 12,
    departureTime: "2023-10-18T17:30:00Z",
    arrivalTime: "2023-10-18T20:00:00Z",
  },
  {
    busId: 13,
    routeId: 13,
    departureTime: "2023-10-18T14:15:00Z",
    arrivalTime: "2023-10-18T17:45:00Z",
  },
  {
    busId: 14,
    routeId: 14,
    departureTime: "2023-10-18T20:30:00Z",
    arrivalTime: "2023-10-18T23:15:00Z",
  },
  {
    busId: 10,
    routeId: 14,
    departureTime: "2023-10-18T09:15:00Z",
    arrivalTime: "2023-10-18T12:30:00Z",
  },
  {
    busId: 12,
    routeId: 12,
    departureTime: "2023-10-18T12:00:00Z",
    arrivalTime: "2023-10-18T15:15:00Z",
  },
  // Add more journey objects as needed
];
const operatorDummyData = [
  {
    operatorName: "BusCo 1",
    operatorContact: "operator1@example.com",
    rating: 4,
    userId: 1,
  },
  {
    operatorName: "BusCo 2",
    operatorContact: "operator2@example.com",
    rating: 3,
    userId: 2,
  },{
    operatorName: "BusCo 1",
    operatorContact: "operator1@example.com",
    rating: 4,
    userId: 1,
  },
  {
    operatorName: "BusCo 2",
    operatorContact: "operator2@example.com",
    rating: 3,
    userId: 2,
  },
  {
    operatorName: "BusCo 3",
    operatorContact: "operator3@example.com",
    rating: 5,
    userId: 3,
  },
  {
    operatorName: "BusCo 4",
    operatorContact: "operator4@example.com",
    rating: 4,
    userId: 4,
  },
  {
    operatorName: "BusCo 5",
    operatorContact: "operator5@example.com",
    rating: 4,
    userId: 5,
  },
  {
    operatorName: "BusCo 6",
    operatorContact: "operator6@example.com",
    rating: 3,
    userId: 6,
  },
  {
    operatorName: "BusCo 7",
    operatorContact: "operator7@example.com",
    rating: 5,
    userId: 7,
  },
  {
    operatorName: "BusCo 8",
    operatorContact: "operator8@example.com",
    rating: 5,
    userId: 8,
  },
  {
    operatorName: "BusCo 9",
    operatorContact: "operator9@example.com",
    rating: 4,
    userId: 9,
  },
  {
    operatorName: "BusCo 10",
    operatorContact: "operator10@example.com",
    rating: 4,
    userId: 10,
  },
  {
    operatorName: "BusCo 11",
    operatorContact: "operator11@example.com",
    rating: 3,
    userId: 11,
  },
  {
    operatorName: "BusCo 12",
    operatorContact: "operator12@example.com",
    rating: 5,
    userId: 12,
  },
  // Add more operator objects as needed
];
const routeDummyData = [
    {
      source: "City P",
      destination: "City Q",
      inBetweenStops: [
        {
          stopName: "Stop 14",
          distanceFromSource: 10,
          timeFromSource: "1 hour"
        },
        {
          stopName: "Stop 15",
          distanceFromSource: 20,
          timeFromSource: "2 hours"
        },
        {
          stopName: "Stop 16",
          distanceFromSource: 30,
          timeFromSource: "3 hours"
        }
      ]
    },
    {
      source: "City Q",
      destination: "City R",
      inBetweenStops: [
        {
          stopName: "Stop 17",
          distanceFromSource: 15,
          timeFromSource: "1.5 hours"
        },
        {
          stopName: "Stop 18",
          distanceFromSource: 30,
          timeFromSource: "3 hours"
        },
        {
          stopName: "Stop 19",
          distanceFromSource: 45,
          timeFromSource: "4.5 hours"
        }
      ]
    },
    {
      source: "City S",
      destination: "City T",
      inBetweenStops: [
        {
          stopName: "Stop 20",
          distanceFromSource: 5,
          timeFromSource: "0.5 hours"
        }
      ]
    },
  // Additional routes and in-between stops
  {
    source: "City X",
    destination: "City Y",
    inBetweenStops: [
      {
        stopName: "Stop A",
        distanceFromSource: 10,
        timeFromSource: "1 hour"
      },
      {
        stopName: "Stop B",
        distanceFromSource: 20,
        timeFromSource: "2 hours"
      },
      {
        stopName: "Stop C",
        distanceFromSource: 30,
        timeFromSource: "3 hours"
      }
    ]
  },
  {
    source: "City Y",
    destination: "City Z",
    inBetweenStops: [
      {
        stopName: "Stop D",
        distanceFromSource: 15,
        timeFromSource: "1.5 hours"
      },
      {
        stopName: "Stop E",
        distanceFromSource: 30,
        timeFromSource: "3 hours"
      },
      {
        stopName: "Stop F",
        distanceFromSource: 45,
        timeFromSource: "4.5 hours"
      }
    ]
  },
]
  // Add more route objects as needed

  const userDummyData = [
    {
      userName: "john_doe",
      emailId: "john.doe@example.com",
      password: "password123",
      phoneNumber: "123-456-7890",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street, City, Country",
      paymentDetails: null,
      isOperator: false,
    },
    {
      userName: "jane_smith",
      emailId: "jane.smith@example.com",
      password: "securePassword",
      phoneNumber: "987-654-3210",
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Elm Street, Town, Country",
      paymentDetails: null,
      isOperator: true,
    },
    // Add more user objects as needed
  ];
  
  const populateData = async ()=>{
    try {
        // await User.bulkCreate(userDummyData);
        // await Operator.bulkCreate(operatorDummyData);
        await Bus.bulkCreate(busDummyData);
        // await Route.bulkCreate(routeDummyData);
        // await Journey.bulkCreate(journeyDummyData);
        // await Booking.bulkCreate(bookingDummyData);
    } catch (error) {
        console.log('Error in bulk loading',error);
    }
}

populateData();