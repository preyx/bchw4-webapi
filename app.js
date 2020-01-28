const setListener = _ => {
  document.getElementById('highScores').addEventListener('click',doHighScores)
  document.getElementById('ready').addEventListener('click',doReady)
  document.getElementById('answer').addEventListener('click',doAnswer)
  document.getElementById('submit').addEventListener('click',doSubmit)
  document.getElementById('begin').addEventListener('click',doBegin)
  document.getElementById('clear').addEventListener('click',doClear)
}

const setQuiz = x => {
  document.getElementById("main").innerHTML = `
<div class="clearfix">
<p class="float-left"></p>
<button type="button" class="btn btn-link float-right" id="highScores">View High Scores</button>
</div>
<h4 id="question">${x.question}</h4>
<section id = "answer">
<button type="button" class="btn btn-block btn-outline-dark" id="answerA">${x.choiceA}</button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerB">${x.choiceB}</button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerC">${x.choiceC}</button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerD">${x.choiceD}</button>
</section>
`;
}

const setIntro = _ => {
  document.getElementById('main').innerHTML = `
<div class="clearfix">
<p class="float-left"></p>
<button type="button" class="btn btn-link float-right" id="highScores">View High Scores</button>
</div>
<h4>Welcome to the quiz! You will have 90 seconds to answer 10 questions, your score will be the time emaining. You will lose time if you get an incorrect answer. Click the "Ready!" when you're ready to egin.</h4>
<button type="button" class="btn btn-block btn-outline-dark" id="ready">Ready!</button>
`
}

const setScore = x => {
  document.getElementById('main').innerHTML = `
<h2 class="text-center">Game Over!</h2>
<h4 class="text-center">Your Score: ${x}</h4>
<form class="text-center">
<label for="email">Your Name:</label>
<input type="text" name="name" maxlength="16" id="name">
<button type="button" class="btn btn-outline-dark" id="submit">Submit</button>
</form>
`
}

const setHighScore = x => {
  document.getElementById('main').innerHTML = `
<h2 class="text-center">High Scores</h2>
<div class="col-6 offset-3 justify-content-center">
`
  x.sort(compare)
  for (let i = 0; i < x.length; i++) {
    if (x[i].current) {
      document.getElementById('main').innerHTML += `<p class="list-group-item-primary">${i + 1}. ${x[i].name} - ${x[i].score}</p>`
    } else {
      document.getElementById('main').innerHTML += `<p>${i + 1}. ${x[i].name} - ${x[i].score}</p>`
    }
  }
  document.getElementById('main').innerHTML += `
</div>
<div class="text-center">
<button type="button" class="btn btn-outline-dark" id="begin">New Game</button>
<button type="button" class="btn btn-outline-dark" id="clear">Clear Scores</button>
</div>
`
}

const compare = (a, b) => {
  const x = a.score
  const y = b.score

  let comparison = 0
  if (x > y) {
    comparison = 1
  } else if (y > x) {
    comparison = -1
  }
  return comparison
}

const scores = []
const sample = {question: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, nesciunt?',
  choiceA: 'Lorem ipsum dolor sit amet.',
  choiceB: 'Lorem ipsum dolor sit amet.',
  choiceC: 'Lorem ipsum dolor sit amet.',
  choiceD: 'Lorem ipsum dolor sit amet.'}
// setQuiz()
setQuiz(sample)