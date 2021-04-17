var fs = require('fs');
const helpers = require('../controllers/helpers');
const multer = require('multer');

var path = require('path');
const getHtmlPage = function(request, response, next) {
 fs.readFile("views/fileupload.html", function (error, resp) {
 if (error) {
 response.writeHead(404);
 response.write('Contents you are looking are Not Found');
 } else {
 response.writeHead(200, { 'Content-Type': 'text/html' });
 response.write(resp);
 }
 response.end();
 });
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/');
  },
  // By default, multer removes file extensions so let's add them back
 filename: function(req, file, cb) {
 cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

const uploadImage = function(request, response, next) {
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter })
 .single('profile_pic');
  upload(request, response, function(err) {
    // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (request.fileValidationError) {
  return response.send(request.fileValidationError);
  }
  else if (!request.file) {
  return response.send('Please select an image to upload');
  }
  else if (err instanceof multer.MulterError) {
  return response.send(err);
  }
  else if (err) {
  return response.send(err);
  }
  response.send({
  "image_name" : request.file.filename,
  "image_full_path": request.file.path,
  "view_image": "http://localhost:8080/images/"+ request.file.filename
});
});
}
const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/files/');
  },
  // By default, multer removes file extensions so let's add them back
 filename: function(req, file, cb) {
 cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

const uploadpdf = function(request, response, next) {
  let upload = multer({ storage1: storage1, fileFilter: helpers.fileFilter })
 .single('files');
  upload(request, response, function(err) {
    // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (request.fileValidationError) {
  return response.send(request.fileValidationError);
  }
  else if (!request.file) {
  return response.send('Please select an  pdf/word/powerpoint/excel to upload');
  }
  else if (err instanceof multer.MulterError) {
  return response.send(err);
  }
  else if (err) {
  return response.send(err);
  }
  response.send({
  "file_name" : request.file.filename,
  "file_full_path": request.file.path,
  "view_file": "http://localhost:8080/files/"+ request.file.filename
});
});
}
module.exports = {getHtmlPage:getHtmlPage, uploadImage:uploadImage, uploadpdf:uploadpdf};
 