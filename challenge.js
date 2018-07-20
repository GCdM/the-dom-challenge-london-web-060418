document.addEventListener('DOMContentLoaded', init)

function init() {
  //Grab all DOM elements
  const counter = document.getElementById('counter');
  const minus = document.getElementById('-');
  const plus = document.getElementById('+');
  const heart = document.getElementById('<3');
  const pause = document.getElementById('pause');
  const comment = document.getElementById('submit')
  const commentList = document.getElementById('list')
  const input = document.getElementById('input')
  const buttons = document.querySelectorAll('button')
  let timer;
  let listener;

  //Add Event Listeners
  (function eventListeners() {
    minus.addEventListener('click', decrement);
    plus.addEventListener('click', increment);
    heart.addEventListener('click', likeCounter);
    startCount();

    comment.onclick = function(e) {
      e.preventDefault()
      postComment()
    }
  })()

  function startCount() {
    timer = setInterval(increment, 1000);
    pause.innerText = 'pause';
    pause.removeEventListener('click', startCount);
    listener = pause.addEventListener('click', stopCount);
    enableButtons()
  }

  function stopCount() {
    clearInterval(timer);
    pause.innerText = 'resume';
    pause.removeEventListener('click', stopCount);
    listener = pause.addEventListener('click', startCount);
    disableButtons()
  }

  function increment() {
    counter.innerText = parseInt(counter.innerText) + 1;
  }

  function decrement() {
    counter.innerText = parseInt(counter.innerText) - 1;
  }

  function likeCounter() {
    const currentCount = counter.innerText;
    let li = document.getElementById(`${currentCount}`);

    if (!li) {
      li = document.createElement('li');
      const ulist = document.getElementsByClassName('likes')[0];
      ulist.append(li);
      li.innerHTML = `<li id=${currentCount}>${currentCount} has been liked <span class="like-count">0</span> <span class="time-word">time</span></li>`;
    }

    const likeCount = li.getElementsByClassName('like-count')[0];
    const timeWord = li.getElementsByClassName('time-word')[0];

    if (likeCount.innerText > 0) {
      timeWord.innerText = 'times';
    }

    likeCount.innerText = parseInt(likeCount.innerText) + 1;
  }

  function postComment() {
    let newComment = document.createElement('p')
    newComment.innerText = input.value
    commentList.append(newComment)
  }

  function enableButtons() {
    for (const button of buttons) {
      button.disabled = false
    }
  }

  function disableButtons() {
    for (const button of buttons) {
      button.disabled = true
    }
    pause.disabled = false
  }
}
