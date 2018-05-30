# Can I Park Here (CIPH)
CIPH is a mobile application that helps Los Angeles residents find parking locations in Los Angeles County.

### What can CIPH do?
* Helps users find parking spaces ahead of time
* Helps users understand the local parking regulations based on their location
* Keeps an updated database of the current parking regulations and parking times

### Data Flow Diagrams (DFD)

#### DFD Legend
* Blue ovals represent modules that are implemented (using code) to make CIPH work
* Blue rectangles represent external entities
* Straight arrows represent direct communication between two modules
* Wavy arrows represent indirect communication (through the air) between two modules
* Parallel lines represent databases

#### DFD 0
The DFD 0 shows the general structure of CIPH and emphasizes the way it interacts with external entities such as the user and GPS.

![DFD 0](/images/DFD0.png)

#### DFD 1
The DFD 1 goes into more detail on how the modules of CIPH interact with one another. It displays the data that flows from one module to another.

![DFD 1](/images/DFD1.png)

# Running the program
1. Run "npm install" in both the client and server folders
1. In the server folder, run "npm start server.js" to connect the website to MongoDB. This allows the frontend to communicate with the server and the database
1. In the client folder, run "ionic serve" to launch the website
