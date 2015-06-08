var plan = require('flightplan');

// configuration
plan.target('openshift', {
   host: 'staticassets-clayschick.rhcloud.com',
   username: '54c7b7ede0b8cd28990001a3',
   agent: process.env.SSH_AUTH_SOCK
});

var tmpDir = 'quilt-site' + new Date().getTime();

plan.local(function(local) {
   local.log('Copy files to remote hosts');
   var filesToCopy = local.find('./src')
   local.log(filesToCopy);
   local.transfer(filesToCopy, '~/app-root/data/quilt-site/');
});

plan.remote(function(remote) {
   remote.exec('rm -rf app-root/data/quilt-site/app')
  remote.exec('mv app-root/data/quilt-site/src app-root/data/quilt-site/app');
});
