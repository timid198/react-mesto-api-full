const allowedCors = [
    'https://azannik.nomoredomains.rocks',
    'http://azannik.nomoredomains.rocks',
    'localhost:3000'
  ];

module.exports = (req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const requestHeaders = req.headers['access-control-request-headers']; 
    if (allowedCors.includes(origin)) {
        console.log(allowedCors.includes(origin));
        res.header('Access-Control-Allow-Origin', "*");
    }
    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
    }
    
    next();
}