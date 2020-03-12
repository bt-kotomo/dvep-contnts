var Backbone = require('backbone');
module.exports = (function () {

	var StampCardModel = Backbone.Model.extend({
	});

	var StampCardCollection = Backbone.Collection.extend({
		model: StampCardModel,
	});

	StampCardCollection.generate = function( count, imageUrl, maxCount ){
		console.log(maxCount);
		console.log(count);
		var arr = [];
		for( var i = 0; i < maxCount ; i++ ){
			if( i < count ){
				arr.push({ id: i, image: imageUrl });
			}else{
				arr.push({ id: i, image: "" });
			}
		}
		return new StampCardCollection( arr );
	};

	return StampCardCollection;

})();
