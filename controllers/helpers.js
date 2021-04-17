const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
   };
   const fileFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(pdf|docx|pptx|xlsx)$/)) {
    req.fileValidationError = 'Only  pdf/word/powerpoint/excel files are allowed!';
    return cb(new Error('Only  pdf/word/powerpoint/excel files are allowed!'), false);
    }
    cb(null, true);
   };
   module.exports = {imageFilter:imageFilter, fileFilter:fileFilter};