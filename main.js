prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HlYIBdSeo/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model is loaded');
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, got_result);

}

function got_result(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Good"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Bad"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "Super"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#9994;"
        }
        if(results[0].label == "Wait"){
            document.getElementById("update_emoji").innerHTML = "&#9995;"
        }
       
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+ prediction;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 );
    synth.speak(utterThis);
}

