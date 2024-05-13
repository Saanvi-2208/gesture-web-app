Webcam.set(
    {
        width:350,
        height:350,
        image_format:'png',
        png_quality:90
    }
)
camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1juB4Yn9J/model.json",modelLoaded);
function modelLoaded()
{
    console.log('Model loaded');
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,got_results);
}

function got_results(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emoji_name").innerHTML=results[0].label;
        document.getElementById("result_emoji_name_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label=="Best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }

        if(results[0].label=="Victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }

        if(results[0].label=="Amazing")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[1].label=="Best")
            {
                document.getElementById("update_emoji_2").innerHTML="&#128077;";
            }
    
        if(results[1].label=="Victory")
            {
                document.getElementById("update_emoji_2").innerHTML="&#9996;";
            }
    
        if(results[1].label=="Amazing")
            {
                document.getElementById("update_emoji_2").innerHTML="&#128076;";
            }
    }
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+ prediction_1;
    speak_data_2="And the second prediction is "+ prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}


