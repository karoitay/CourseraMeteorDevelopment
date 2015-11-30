// getScores return an object with userIds as keys and score for that userId as the value.
//
// params:
//    userId - the user to get recommendations for.
//    userVotedSites - an array with the sites that the user voted on.
var getScores = function(userId, userVotedSites) {
	// scores holds a list of objects of the form { userId: otherUserId, score: 1 }.
	// For each user there can be multiple entries in the list
	// one for each site the both userId and otherUserId have voted.
	// The score will be 1 if they agreed on the vote and -1 if the have disagreed.
	var scores = _.flatten(_.map(userVotedSites, function(site) {
		var upscore = 1;
		var downscore = -1;
		if (_.contains(site.down, userId)) {
			upscore = -1;
			downscore = 1;
		}
		return _.map(site.up, function(upvote) {
			return { userId: upvote, score: upscore };
		}).concat( _.map(site.down, function(downvote) {
			return { userId: downvote, score: downscore };
		}));
	}));
	// group the scores by userId.
	var userScores = _.groupBy(scores, function(score) {
		return score.userId;
	});

	// now sum up the score for each user.
	scores = {};
	_.each(_.keys(userScores), function(userId) {
		scores[userId] = _.reduce(userScores[userId], function(sum, score) { return sum + score.score }, 0);
	});
	return scores;
}

// getRecommendations get a list of recommended sites for the user sorted
// with the highest ranked site first.
//
// params:
//    userId - the user to get recommendations for.
//    allSites - an array with all the sites.
getRecommendations = function(userId, allSites) {
	var userVotedSites = _.filter(allSites, function(site) {
		return _.contains(site.up, userId) || _.contains(site.down, userId);
	});
	var scores = getScores(userId, userVotedSites);

	// We only want to recommend sites that the user did not vote on.
	var userUnvotedSites = _.difference(allSites, userVotedSites);
	// Compute the score for each unvoted site.
	// The furmula is: sum(score of users who upvoted the site) - sum(score of users who downvoted the site)
	_.each(userUnvotedSites, function(site) {
		var score = 0;
		_.each(site.up, function(userId) {
			score += scores[userId] || 0;
		});
		_.each(site.down, function(userId) {
			score -= scores[userId] || 0;
		});
		site.score = score;
	});
	return _.sortBy(userUnvotedSites, function(site) {
		return -site.score;
	});
}
