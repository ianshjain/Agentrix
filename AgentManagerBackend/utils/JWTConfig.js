const jwt = require('jsonwebtoken');

const secretKey = "aljlaasDASdsdf23047fLAFJKJA1`@!#DASDSafdasf"

function generateToken(userid,role)
{
    const token = jwt.sign({userid,role},secretKey,{
        expiresIn : '1h'
    });
    return token;
}

function verifyToken(token,callback)
{
    jwt.verify(token,secretKey,(err,tokendata)=>
    {
       callback(err,tokendata);
    });
}

module.exports = {generateToken,verifyToken}