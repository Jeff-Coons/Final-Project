Final.Router.map(function(){

	/* ============ General ============ */

	this.route('home');
	this.route('cool');

	this.resource('signup', function () {
		this.route('client');
		this.route('freelancer');
	});

	this.resource('login', function() {
		this.route('client');
		this.route('freelancer');
	});

	/* ============ Client ============ */
	this.resource('profile-client', function() {
		this.route('static', {path: ':user_id'});
	});
	this.resource('client', function(){
		this.route('post-job');
		this.route('my-jobs');
		this.resource('client-profile', function(){
			this.route('create');
			this.route('edit');
			this.route('my', {path: ':user_id'});
		});
	});



	/* ============ Freelance ============ */

	this.resource('freelancer', function () {
		this.route('static', {path: ':user_id'});
		this.route('jobs');
		this.route('my-bids', {path: '/:user_id/my-bids'});
		this.resource('profile', function () {
			this.route('create');
			this.route('edit', { path: '/:user_id/edit' });
			this.route('my', {path: ':user_id'});
		});
	});

});




Final.Message = DS.Model.extend({
	message: DS.attr('string'),
	user: DS.belongsTo('user', {async: true}),
});

Final.CoolController = Ember.ArrayController.extend({
	needs: 'application',

	actions: {
		post: function(){
			var user = this.get('controllers.application.currentUser');
			var chat = this.store.createRecord('message', {
				message: this.get('newMessage'),	
				user: user		
			});
			chat.save();
			user.get('messages').addObject('chat');
			user.save();
		}
	}
});

Final.CoolRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('message');
	}
});






































