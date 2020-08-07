import { Meteor } from 'meteor/meteor';
Post=new Mongo.Collection('post');
Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options,user)
{
      user.profile=user.profile || {};

      user.profile.follow=[];

      return user;
});
Meteor.methods(
  {
      addPost:function(content)
      {
          if(!Meteor.userId())
          {
              throw new Meteor.Error('not-authorized','you are not signed in');
          }
          var username=Meteor.user().username;
          Post.insert({
        
              content:content,
              created:new Date(),
              username:username
          
          });
     
      },
      follow:function(post)
      {
          //get current user
         console.log(post);
          var user=Meteor.user();
          if(!user)
          {
            throw new Meteor.Error('not authorized','you are not signed ');

          }
          //cant follow yourself
          //cant follow someone twice

          if(user.username!=post.username && user.profile.follow.indexOf(post.username)==-1)
          {
           Meteor.users.update({

            _id:user._id},{$push:{'profile.follow':post.username}
            
           });

          }
      }
  });

