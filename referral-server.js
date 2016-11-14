if (Meteor.isServer) {
  var meteorAppUrl = Meteor.settings.mdisc.url;
  var client = DDP.connect(meteorAppUrl);
  DDP.loginWithPassword(client, {email: Meteor.settings.mdisc.user}, Meteor.settings.mdisc.pass);
  Job.setDDP(client);
  var workers = Job.processJobs('md_jobs_referafriend', 'userSignup', {concurrency: Meteor.settings.mdisc.concurrency},
    function (job, cb) {
      try {
        console.log('Checking: ' + job.data.userId);

        //job.done("Done");
        cb();
      }
      catch (err) {
        var msg = 'Error: ' + err + 'userId: ' + job.data.userId;
        console.log(msg);
        job.fail(msg);
        cb();
      }
    }
  );
}
