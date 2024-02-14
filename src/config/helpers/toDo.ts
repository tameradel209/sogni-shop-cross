export const doTask = (taskName: string) => {
  var begin = Date.now();
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var end = Date.now();
      var timeSpent = end - begin + 'ms';
      console.log(
        '\x1b[36m',
        '[TASK] FINISHED: ' + taskName + ' in ' + timeSpent,
        '\x1b[0m',
      );
      resolve(true);
    }, Math.random() * 3000);
  });
};
