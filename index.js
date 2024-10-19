const http = require("http");
const url = require("url");
const nodemailer = require("nodemailer");

// Create an HTTP server
http.createServer((req, res) => {
    // Serve the HTML form on the root URL ('/')
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
      <html>
        <body>
          <form action="/sendEmail" method="GET">
            <label for="email">Enter your email:</label>
            <input type="email" id="email" name="email" required>
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
      res.end();
    }

    // Handle the form submission and send email
    else if (req.method === "GET" && req.url.startsWith("/sendEmail")) {
      // Parse the query parameters to extract the email
      const queryObject = url.parse(req.url, true).query;
      const userEmail = queryObject.email;

      if (userEmail) {
        // Create a transporter for nodemailer
        let transporter = nodemailer.createTransport({
          service: "gmail", // or any other email service like Yahoo, Outlook, etc.
          auth: {
            user: "ismailmehtab1@gmail.com", // Replace with your email
            pass: "floi zgxj icsc etac" // Replace with your email password (or App password for Gmail)
          },
        });

        // Setup email data
        let mailOptions = {
          from: "ismailmehtab1@gmail.com", // sender address
          to: userEmail, // list of receivers
          subject: "Welcome!",
          text: "Welcome to our service!",
          html: "<b>Welcome to our service!</b>", // html body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if 
          (error) {
            console.log(error);
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("<h1>There was an error sending the email.</h1>");
            res.end();
          } 
          else 
            {
            console.log("Email sent: " + info.response);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Email sent successfully!</h1>");
            res.end();
          }
        });
      } 
      else 
       {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write("<h1>Email is required!</h1>");
        res.end();
      }
    }

    // Handle other routes
    else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Page not found</h1>");
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
