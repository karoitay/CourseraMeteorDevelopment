Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {up_votes : -1, down_votes: 1, createdOn: -1}});
	}
});
