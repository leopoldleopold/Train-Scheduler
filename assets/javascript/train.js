//Start Document, organize 
$("document").ready(function(){
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCvcUCjpGYyaZS3KpaX2b3bl9kGMskIYZw",
        authDomain: "train-scheduler-5ef62.firebaseapp.com",
        databaseURL: "https://train-scheduler-5ef62.firebaseio.com",
        projectId: "train-scheduler-5ef62",
        storageBucket: "train-scheduler-5ef62.appspot.com",
        messagingSenderId: "54576644073",
        appId: "1:54576644073:web:1ae8d30d0ef8a5c964d578",
        measurementId: "G-B19R4WZ5VB"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //convert database into a variable
    var database = firebase.database().ref();

    //Capture User Input and push to database
    $("#add-train").on("click", function (trainName, destination, firstTrain, frequency) {
        event.preventDefault();

        // Capturing and converting User Input into a variable
         var trainName = $("#train-input").val().trim();
         var destination = $("#destination-input").val().trim();
         var firstTrain = $("#first-input").val().trim();
         var frequency = $("#frequency-input").val().trim();
        // console.log(trainName + destination + firstTrain + frequency);

        
        //Pushing to database
        database.push({
            train: trainName,
            location: destination,
            first: firstTrain,
            freq: frequency,
        });
        
        $(".userInput").val("");
        //Firebase watcher
        database.on("child_added", function(snapshot) {
            var sv = snapshot.val();

            //Calculaing the minutes until the train
            var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            // var currentTime = moment();
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var remainder = diffTime % frequency;
            var untilTrain = frequency - remainder;
            var nTrain = moment().add(untilTrain, "minutes");
            var nextTrain = nTrain.format("HH:mm");

            //Updating and Appending to the HTML
            $("#infolocation").append("<tr><td>" + trainName +
                "</td><td>" + destination + "</td><td>" + frequency +
                "</td><td>" + nextTrain + "</td><td>" + untilTrain +
                "</td></tr>");
        });
    });
});