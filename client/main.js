import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import './main.html';

Post=new Mongo.Collection('post')

Template.postForm.events({
    'submit form':function(event)
    {
      event.preventDefault();
      var content=document.getElementById('content').value;
     Meteor.call('addPost',content);
      
      event.target.reset();
    }
  })
Template.registerHelper("posts",function()
{
    if(Session.get('username'))
    {
             result=result=Post.find({username:Session.get('username')},{sort:{created:-1}});
    
  
    }
  else
  {
     result=Post.find({},{sort:{created:-1}});
  }
      return result;
});
  
  
  


Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY'
});

Template.postList.events(
    {
        'click.follow-link':function(event)
        {
            event.preventDefault();
            Meteor.call('follow',this);
        }
    }
)

Template.profileArea.helpers({
    following:function()
    {
        var user=Meteor.user();
    return user.profile.follow;
    },
    followers:function()
    {
        var user=Meteor.user();
        var followers=Meteor.users.find({'profile.follow':{$in:[user.username]}});
       console.log(followers.fetch());
        return followers;
    }
})

Template.profileArea.events({
    'click.filter-user':function(event)
    {
        event.preventDefault();
        var selectedUser=event.target.text;
        
        
        Session.set('username',selectedUser);
        
    }
    ,'click.community':function(event)
    {
        event.preventdefault();
        Session.set('username',null);
    }
})

