const bcrypt = require("bcrypt");

const password = "seller"; // The password you want to hash

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }
  console.log("Hashed Password:", hash); // Print the hashed password
});

// db.users.insertOne({
//   email: "admin@example.com", // Replace with the desired email
//   password: "$2b$10$SJtINuO5APQARlbAiAjRROpgf7okvgfCQRLz2C8qd6OgqBbOIWBd2", // Replace with a hashed password if applicable
//   userType: "admin",
//   createdAt: new Date(),
// });
;

db.sellers.insertOne({
  "email": "seller@example.com",
  "password": "$2b$10$ZkQnWmGXQAbKCfS2REasqOYvvjLhr5UMNWqMdPdxchJkq2O2lP2/2", // Replace with actual hashed password
  "storeName": "Best Pet Supplies",
  "location": "123 Pet St, Pet City",
  "phone": "123-456-7890"
})
