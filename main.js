
prediction1="";
prediction2="";

Webcam.set({
    width:200,
    height:200,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
     });
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassfier("https://teachablemachine.withgoogle.com/models/DM7C0r3pm/model.json",modelLoaded);

function modelLoaded(){
    console.log("Modal Loaded");
}

function speak() {
    var synth=window.speechSynthesis;  
    speak_data_1="The First Prediction Is"+prediction1;
    speak_data_2="The Second Prediction Is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
  }
  
  function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,got_result);
  }

  function got_result(error,result){
    if(error){
        console.error(error);
     }
     else {
        console.log(result);
        document.getElementById("emotion_result").innerHTML=result[0].label;
        document.getElementById("emotion_result2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if (result[0].label=="happy"){
           document.getElementById("update_emoji").innerHTML="#128522;";
        }
        if (result[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="#128532;";
         }
         if (result[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="#128548;";
         }
         if (result[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="#128522;";
         }
         if (result[1].label=="sad"){
             document.getElementById("update_emoji2").innerHTML="#128532;";
          }
          if (result[1].label=="angry"){
             document.getElementById("update_emoji2").innerHTML="#128548;";
          }
     }
      }

    


