person = {
    school : '',
    year: '',
    email: '',
    studying: '',
}

setPersonAttributes = function(id) {       
    switch(id) {
        //school
        case '1': 
            this.person.school = $('#school').val();
            this.person.year = $('#year').val();
            this.person.email = $('#email').val();
            break;
        case '2': 
            this.person.studying = $('.selected').attr('value');
            break;
        case '3': 
            break;
        case '4': 
            break;
        default : 
            
    }
}

setYears = function() {
    var years = [];
    for(var year = 1970 ; year <= 2030; year++){
      years.push({
          'year': year
      });
    } 
    return years;
}


Router.route('/', function () {
    this.render('pages', { data : {id:0} });
});

//Posts router
Router.route('/:_id', {
    controller: 'PageController',
    action: 'page'
});


if (Meteor.isClient) {
  
    //Page controller
    PageController = RouteController.extend({
        page: function () {

            //console.log(JSON.stringify(person));
            var years = setYears();
            
            //console.log(this.params._id);
            var pageContent = {
                'id': this.params._id,
                'years': years,
                'person': person
            }
            
            //find post by id and render post page
            //var post = Posts.find({_id : this.params._id}).fetch()[0]; 
            this.render('pages', { data : pageContent });
        },
    });

    Template.pages.helpers({
        isId: function(id){
            return this.id == id;
        },
        selectedYear: function(){
            return person.year == this.year;
        },
        isStudying: function(studying) {
            console.log(studying);
            console.log(person.studying);
            return person.studying == studying;
        }
        
    });
    
    Template.pages.events({
        'click .btn-next': function(e, template) {
            
            var id = this.id;
            setPersonAttributes(id);
               
            //Router to next page;
            var pageId = parseInt(this.id) + 1;
            Router.go('/' + pageId);
            
        },
        'click .btn-previous': function(e, template) {
            
            var id = this.id;
            setPersonAttributes(id);
            
            //Router to next previous;
            var pageId = parseInt(this.id) - 1;
            Router.go('/' + pageId);
        },
        'click img.select-box': function(e, template) {
            console.log(e.target);
            $('.selected').removeClass('selected'); // removes the previous selected class
            $(e.target).addClass('selected');
        }
    });
  
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
