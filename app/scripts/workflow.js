Final.PostJobWorkflow = Ember.Object.extend({
	fetchUser: function() {
    var self = this;
    return this.store.find('user', this.userID)
      .then(function(user) {
        self.set('user', user);
      });
  },

  postJob: function() {
    var config = Ember.merge({
      user: this.user,
    }, this.attributes);
    this.set('job', this.store.createRecord('job',config));
    return this.get('job').save();
  },

  addJobToClient: function() {
    this.get('user.jobs').addObject(this.get('job'));
    return this.get('user').save();
  },

  run: function() {
    return this.fetchUser()
      .then(this.postJob.bind(this))
      .then(this.addJobToClient.bind(this))
  }

});

Final.BidsWorkflow = Ember.Object.extend({
	fetchUser: function() {
		var self = this;
		return this.store.find('user', this.userID)
			.then(function(user) {
				self.set('user', user);
			});
	},

	fetchJob: function() {
		var self = this;
		return this.store.find('job', this.jobID)
			.then(function(job) {
				self.set('job', job);
			});
	},

	postBid: function() {
		var config = Ember.merge({
			user: this.user,
			job: this.job,
		}, this.attributes);

		this.set('bid', this.store.createRecord('bid',config));
		return this.get('bid').save();
	},

	addBidToUser: function() {
		this.get('user.bids').addObject(this.get('bid'));
		return this.get('user').save();
	},

	addBidToJob: function() {
		this.get('job.bids').addObject(this.get('bid'));
		return this.get('job').save();
	},

	run: function() {
		return this.fetchUser()
			.then(this.fetchJob(this))
			.then(this.postBid.bind(this))
			.then(this.addBidToUser.bind(this))
			.then(this.addBidToJob.bind(this))
	}

});
