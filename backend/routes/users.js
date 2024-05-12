const express = require("express");
const router = express.Router();
const axios = require("axios"); // Import axios library
const { users } = require("../models");

// Sign-up route
router.post("/signup", async (req, res) => {
  const { username, password, email, choice } = req.body;

  try {
    const newUser = await users.create({
      username: username,
      password: password,
      email: email,
      choice: choice,
      type: true
    });

    res.json({ message: "User created successfully", user: newUser });

    // Call AWS API Gateway if choice is true
    if (choice) {
      const apiGatewayUrl = "https://r6kroxk7g5.execute-api.us-east-1.amazonaws.com/prod/lambda"; 
      const data = {arn:"arn:aws:sns:us-east-1:426085379010:DailyNotification", emailAddress: email }; 

      // Make HTTP POST request to API Gateway
      axios.post(apiGatewayUrl, data)
        .then(response => console.log("API Gateway response:", response.data))
        .catch(error => console.error("Error calling API Gateway:", error));
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email: email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  if(password!=user.password)res.json({ error: "password not correct" });

res.json({username: user.username, id: user.id,email:user.email});
  });


module.exports = router;