 Final.ProfileMyController = Ember.ObjectController.extend({
   needs: ['application'],

   actions: {
     logOut: function(){
       this.set('currentUser', null);
       localStorage.removeItem('userAuth');
       Final.ref.unauth();
       this.transitionToRoute('index');
     }
   }
 });

  Final.FreelancerStaticController = Ember.ObjectController.extend({
   needs: ['application'],

   // actions: {
   //   logOut: function(){
   //     this.set('currentUser', null);
   //     localStorage.removeItem('userAuth');
   //     Final.ref.unauth();
   //     this.transitionToRoute('index');
   //   }
   // }
 });
