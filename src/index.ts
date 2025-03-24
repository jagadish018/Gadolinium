import jwt from 'jsonwebtoken';
import "dotenv/config";

const payload: jwt.JwtPayload = {
  iss: 'jagadishck.018@gmail.com',
  sub:'jagadish018'
  
}

const jwtSecretKey = process.env.SCERET_KEY || process.exit(1);
console.log(jwtSecretKey);

const token = jwt.sign(payload, jwtSecretKey, {
  algorithm: "HS256",
  expiresIn: "7d",
});
 
console.log(token);

const decoded = jwt.decode(token);
console.log(decoded,"\n");

try {
  const verified = jwt.verify(token, jwtSecretKey);
  console.log(verified);
}
catch (error) {
  console.log(error);
  }  