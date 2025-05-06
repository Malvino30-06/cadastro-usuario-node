
const requestLogger = ((req, next) => {
    console.log(`[${new Date().toISOString()}], ${req.ip}, ${req.method}, ${req.originalUrl}`); 
    next(); 
});

export default requestLogger; 