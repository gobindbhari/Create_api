import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.user  // get token from cookies

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const tokenvarify = jwt.verify(token, process.env.JWT_SECRET)
         if(tokenvarify){
            next();
         }else{
            res.status(401).json({ message: 'Unauthorized' });
         }
};

export { verifyToken };