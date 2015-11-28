Websites = new Mongo.Collection("websites");
Websites.allow({
	insert: function(userId, doc) {
		if (!doc.title) {
			doc.title = doc.url;
		}
		doc.createdOn = new Date();
		return userId && doc.url && doc.description;
	}
});

Comments = new Mongo.Collection("comments");
Comments.allow({
	insert: function(userId, doc) {
		doc.createdOn = new Date();
		doc.createdBy = Meteor.user().username;
		doc.comment = (doc.comment || "").trim();
		return userId && doc.comment && Websites.findOne({_id: doc.site_id});
	}
});
