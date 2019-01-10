import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";

// local imports
import schema from "./schema";

const app = express();

// allow cross-origin requests, let's see if this is needed
app.use(cors());

// make sure to replace my db string & creds with your own
// the location of the db, change this for my stuff
const dbName = "CMS";
mongoose.connect(
  `mongodb://localhost:27017/${dbName}`,
  {
    useNewUrlParser: true
  }
);

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//  This tells me the code necessary to load a file
//   const respHttpOptions = {
//   root: `public/`,
//   dotfiles: 'deny',
//   headers: {
//       'dina-timestamp': Date.now(),
//       'my-xxx-header': true
//   }
// };
// app.get('/', (req, resp) => { // HANDLE THE REQUEST HERE
//   resp.sendFile('index.html', respHttpOptions, (err) => {
//       // SEND INDEX.HTML INSIDE PUBLIC DIRECTORY
//       if (!err)
//           console.log(sucL(`Served index.html`));
//       else
//           console.log(errL(`Failed to serve index.html ${err}`));
//   })
// });

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});
