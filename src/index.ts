import jwt from 'jsonwebtoken';

const payload: jwt.JwtPayload = {
  iss: 'jagadishck.018@gmail.com',
  sub:'jagadish018'
  
}

const scretKey = "helloWorld@123";

const token = jwt.sign(payload, scretKey, {
  algorithm: 'HS256',
  expiresIn: '7d',

  
});
 
console.log(token);

const decoded = jwt.decode(token);
console.log(decoded);