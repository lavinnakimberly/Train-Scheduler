var database = firebase.database();

$(document).ready(function(){
  console.log("ready");

	$("#add-user").on("click", function() {
		console.log("click");

		event.preventDefault();

		var trainName = $("#train-input").val();
		var destination = $("#destination-input").val();
		var trainTime = $("#time-input").val();
		var frequency = $("#frequency-input").val();

		database.ref().push({
			"trainName": trainName,
			"destination": destination,
			"trainTime": trainTime,
			"frequency": frequency
			
		});
	});
});

database.ref().on("child_added", function(snapshot, prevChildKey){
		var newPost = snapshot.val();

		var trainNames = newPost.trainName;
		var destinations = newPost.destination;
		var trainTimes = newPost.trainTime;
		var frequencies = newPost.frequency;
		//var minAway = moment(frequencies).format('h:mm a', / 25 roundCeiling());

		var minutesLeft = moment().diff(moment(trainTimes, 'HH:mm'), "minutes");
        var lastArrival = minutesLeft % frequency; //minutes ago
        var minutesAway = frequency - lastArrival; //in minutes
        var nextTime = moment().add(minutesAway, "minutes");
        console.log('trainTime', trainTime);
        console.log('nextArrival', minutesAway);

		var trainNames_td = $("<td>").text(trainNames);
		var destinations_td = $("<td>").text(destinations);
		var trainTimes_td = $("<td>").text(trainTimes);
		var frequencies_td = $("<td>").text(frequencies);
		var minAway_td = $("<td>").text(minAway)

		var trainSchedule_tr = $("<tr>").append(trainNames_td)
										.append(destinations_td)
										.append(trainTimes_td)		
										.append(frequencies_td)
										.append(minAway_td);


		$("#trainSchedule > tbody").append(trainSchedule_tr);
});