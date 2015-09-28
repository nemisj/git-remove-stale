var FindStale = require('git-removed-branches/lib/find-stale.js');
var utils = require('git-removed-branches/lib/utils.js');

var argv = require('minimist')(process.argv, {
  string: 'remote',
  boolean: ['do-it', 'force'],
  'default': {
    'remote': 'origin',
    'force': false
  }
});

var options = ['do-it', 'force', 'remote', '_'];
var validParams = Object.keys(argv).some(function (name) {
  return (options.indexOf(name) == -1);
});

if (!validParams) {
  // check for git repository
  var exec = utils.asyncExec(['git', 'rev-parse', '--show-toplevel']);
  var obj = new FindStale({
    remove: argv['do-it'],
    force: argv.force,
    remote: argv.remote
  });
  
  exec(function (err, stdout, stderr) {
    if (err) {
      console.error(err.message);
      return;
    }

    obj.run();
  });
} else {
  console.info('Usage: git-remove-stale --do-it --force --remote {remote}');
}
