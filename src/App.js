import './App.css';
import axios from "axios"

function App() {
    String.prototype.format = function() {
      var formatted = this;
      for( var arg in arguments ) {
          formatted = formatted.replace("{" + arg + "}", arguments[arg]);
      }
      return formatted;
    };

  const startLearn = async() => {
    var resultDoc = document.getElementById("result")
    resultDoc.innerText = "불러오는중.."

    // document.getElementById("score").value = "380" // 샘ㅍㄹ
    // document.getElementById("grade").value = "3.21"
    // document.getElementById("rank").value = "3"

    var data1 = document.getElementById("score").value
    var data2 = document.getElementById("grade").value
    var data3 = document.getElementById("rank").value

    var reqUrl = "http://localhost:5000/learn?score={0}&grade={1}&rank={2}"
      .format(data1, data2, data3)
    console.log(reqUrl)
    const res = await axios.get(reqUrl);
      
    if(res.data != ""){
      var result = parseFloat(res.data) * 100
      resultDoc.innerText = result + "%"
    }
  }

  return (
    <div className="App">
      <div class="head">
        <h1 id="title-text">대학 붙을 확률</h1>
      </div>
      <div class="body">
        <input type="text" id="score" placeholder='수능총합점수' size="40"></input><br/><br/>
        <input type="text" id="grade" placeholder='등급' size="40"></input><br/><br/>
        <input type="text" id="rank" placeholder='대학랭크' size="40"></input><br/><br/>
        <button id="exeLearning" onClick={startLearn}>실행</button>
      </div>
      <div class="foot">
        <div id="result"></div>
      </div>
    </div>
  );
}

export default App;
