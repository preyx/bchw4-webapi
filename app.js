const doReady = _ => {
  console.log('READY')
  qOrder = shuffle([...Array(10).keys()])
  console.log(qOrder)
  qNum = 0
  timeLeft = 99
  setQuiz()
  setQuestion(qOrder[0])
  interval = setInterval(_ => {
    console.log('tick!')
    timeLeft--
    document.getElementById('timeLeft').textContent = timeLeft
    if (timeLeft === 0) {
      setScore()
    }
  }, 1000)
}

const doBegin = _ => {
  console.log('BEGIN')
  setIntro()
}

const doHighScores = _ => {
  console.log('HIGHSCORE')
  clearInterval(interval)
  setHighScore()
}

const doClear = _ => {
  console.log('CLEAR')
  scores.length = 0
  setHighScore()
}

const doSubmit = _ => {
  console.log('SUBMIT')
  const newScore = {
    name: document.getElementById('name').value,
    score: timeLeft,
    current: true
  }
  scores.push(newScore)
  setHighScore()
  scores[scores.length - 1].current = false
}

const doAnswer = x => {
  console.log('ANSWER')
  if (x === `answer${correctAns}`) {
    statusMsg('Correct!', 1500)
  } else {
    statusMsg('Incorrect!', 1500)
    timeLeft -= 10
    if (timeLeft < 1) {
      timeLeft = 0
      setScore()
    }
  }
  qNum++
  console.log(qNum)
  if (qNum < 10) {
    console.log(qOrder.qNum)
    setQuestion(qOrder[qNum])
  } else {
    setScore()
  }
}

const statusMsg = (msg, timeMS) => {
  document.getElementById('footer').innerHTML = `
<hr />
<h4>${msg}</h4>  
`
  setTimeout(() => {
    document.getElementById('footer').innerHTML = ''
  }, timeMS)
}

const actionArray = {
  ready: doReady,
  begin: doBegin,
  highScores: doHighScores,
  clear: doClear,
  submit: doSubmit,
  answerA: doAnswer,
  answerB: doAnswer,
  answerC: doAnswer,
  answerD: doAnswer
}

const setListener = _ => {
  document.getElementById('main').addEventListener('click', (event) => {
    event.preventDefault()
    try {
      actionArray[event.target.id](event.target.id)
    } catch (e) {
      console.log('No action taken!')
    }
  })
}

const setQuiz = _ => {
  document.getElementById('main').innerHTML = `
<div class="clearfix">
<p class="float-left">Time Left: <span id="timeLeft">99</span></p>
<button type="button" class="btn btn-link float-right" id="highScores">View High Scores</button>
</div>
<h4 id="question"></h4>
<section id = "answer">
<button type="button" class="btn btn-block btn-outline-dark" id="answerA"></button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerB"></button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerC"></button>
<button type="button" class="btn btn-block btn-outline-dark" id="answerD"></button>
</section>
`
}

const setQuestion = x => {
  const aOrder = shuffle([...Array(4).keys()])
  console.log(aOrder)
  document.getElementById('question').textContent = questions[x].question
  document.getElementById('answerA').textContent = questions[x].answer[aOrder[0]]
  if (aOrder[0] === 0) correctAns = 'A'
  document.getElementById('answerB').textContent = questions[x].answer[aOrder[1]]
  if (aOrder[1] === 0) correctAns = 'B'
  document.getElementById('answerC').textContent = questions[x].answer[aOrder[2]]
  if (aOrder[2] === 0) correctAns = 'C'
  document.getElementById('answerD').textContent = questions[x].answer[aOrder[3]]
  if (aOrder[3] === 0) correctAns = 'D'
  console.log(correctAns)
}

const setIntro = _ => {
  document.getElementById('main').innerHTML = `
<div class="clearfix">
<p class="float-left"></p>
<button type="button" class="btn btn-link float-right" id="highScores">View High Scores</button>
</div>
<h4>Welcome to the quiz! You will have 99 seconds to answer 10 questions, your score will be the time emaining. You will lose time if you get an incorrect answer. Click the "Ready!" when you're ready to egin.</h4>
<button type="submit" class="btn btn-block btn-outline-dark" id="ready">Ready!</button>
`
}

const setScore = _ => {
  clearInterval(interval)
  document.getElementById('main').innerHTML = `
<h2 class="text-center">Game Over!</h2>
<h4 class="text-center">Your Score: ${timeLeft}</h4>
<form class="text-center">
<label for="email">Your Name:</label>
<input type="text" name="name" maxlength="16" id="name">
<button type="submit" class="btn btn-outline-dark" id="submit">Submit</button>
</form>
`
}

const setHighScore = _ => {
  document.getElementById('main').innerHTML = `
<h2 class="text-center">High Scores</h2>
<div class="col-6 offset-3 justify-content-center">
`
  scores.sort(compare)
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].current) {
      document.getElementById('main').innerHTML += `<p class="list-group-item-primary">${i + 1}. ${scores[i].name} - ${scores[i].score}</p>`
    } else {
      document.getElementById('main').innerHTML += `<p>${i + 1}. ${scores[i].name} - ${scores[i].score}</p>`
    }
  }
  document.getElementById('main').innerHTML += `
</div>
<div class="text-center">
<button type="submit" class="btn btn-outline-dark" id="begin">New Game</button>
<button type="button" class="btn btn-outline-dark" id="clear">Clear Scores</button>
</div>
`
}

const compare = (a, b) => {
  const y = a.score
  const x = b.score

  let comparison = 0
  if (x > y) {
    comparison = 1
  } else if (y > x) {
    comparison = -1
  }
  return comparison
}

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const scores = []
let timeLeft = 99
let interval = null
let qNum = 0
let qOrder = []
let correctAns = ''
const questions = [
  {
    question: 'What is the HTML tag under which one can write the JavaScript code?',
    answer: ['<script>', '<scripted>', '<javascript>', '<js>']
  },
  {
    question: 'Which of the following is the correct syntax to display "ALERT!" in an alert box using JavaScript?',
    answer: [
      'alert(\'ALERT!\')',
      'msg(\'ALERT!\')',
      'msgbox(\'ALERT!\')',
      'alertbut(\'ALERT!\')'
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "app.js"?',
    answer: [
      '<script src="app.js">',
      '<script href="app.js">',
      '<script ref="app.js">',
      '<script name="app.js">'
    ]
  },
  {
    question: 'What does HTML stands for?',
    answer: [
      'Hypertext Markup Language',
      'Hypertext and links Markup Language',
      'Hypertext Machine Language',
      'Hightext Machine Language'
    ]
  },
  {
    question: 'Which of the following HTML Elements is used for making any text bold?',
    answer: ['<b>', '<i>', '<li>', '<em>']
  },
  {
    question: 'Which of the following characters indicate closing of a HTML tag?',
    answer: ['/', '.', '\\', '!']
  },
  {
    question: 'Which of the following selector matches a element based on its class attribute?',
    answer: [
      'Class Selctor',
      'Universal Selector',
      'Descendant Selector',
      'Type Selector'
    ]
  },
  {
    question: 'Which of the following property is used to set the width of an image border?',
    answer: ['border', 'height', 'width', '-moz-opacity']
  },
  {
    question: 'Which of the following property specifies the top margin of an element?',
    answer: [':margin-top', ':margin-bottom', ':margin', ':margin-left']
  },
  {
    question: 'Which of the following is used to print "Hello World!" to the java console?',
    answer: [
      'console.log(\'Hello World!\')',
      'console.print(\'Hello World!\')',
      'debug(\'Hello World!\')',
      'console.log = \'Hello World!\''
    ]
  }
]

setListener()
setIntro()
