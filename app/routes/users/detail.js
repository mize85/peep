import Ember from 'ember';

const {inject} = Ember;

export default Ember.Route.extend({

  flashMessages: inject.service(),

  model({user_id}){
    return this.store.find('user', user_id);
  },

  actions: {
    save(){
      const flashMessages = this.get('flashMessages');
      const file = document.getElementById('file-field').files[0];

      const model = this.get('currentModel');
      model.set('avatar', file);

      model.save()
        .then(() => {
          flashMessages.success('Saved sucessfully!');

        }).catch((response) => {

        const {errors} = response;
          flashMessages.danger(errors);

      });


    }
  }
});
