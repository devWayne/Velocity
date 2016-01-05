const glob = require('glob'),
      fs = require('fs');


var appConfig = {};

function getConfig(appPath,callback) {

  var appPath = appPath || '../app';
  // options is optional
  var options = {};
  
  glob(appPath + "/**/*.json", options, function(err, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    console.log(files);
    files.forEach((file,index)=>{
        const pName = file.match(/..\/app\/(\w+)\//)[1];
            appConfig[pName]=JSON.parse(fs.readFileSync(file));
            console.log(JSON.stringify(appConfig));
    });
    
    callback && callback();
  });

}

module.exports = getConfig;
