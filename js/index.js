const answer = 'APPLE';

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement('div');
    div.innerText = '게임이 종료됐습니다!';
    div.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42.2vw; background-color:black; width:300px; height: 200px; border-radius:20px; color: white; font-size: 20px';
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    else attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener('keydown', handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let answer_count = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      console.log(block.innerText);
      const write_letter = block.innerText;
      const answer_letter = answer[i];
      if (write_letter === answer_letter) {
        answer_count += 1;
        block.style.background = '#6aaa64';
      } else if (answer.includes(write_letter))
        block.style.background = '#c9b458';
      else block.style.background = '#787c7e';
      block.style.color = 'white';
    }
    if (answer_count === 5) {
      gameover();
    } else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = '';
      if (index !== 0) index -= 1;
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (e.key === 'Backspace') handleBackspace();
    else if (index === 5) {
      if (e.key === 'Enter') handleEnterKey();
      else return;
    } else if (64 < keyCode && keyCode < 91) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const current_time = new Date();
      const flow_time = new Date(current_time - start_time);
      const min = flow_time.getMinutes().toString().padStart(2, '0');
      const sec = flow_time.getSeconds().toString().padStart(2, '0');
      const timeDiv = document.querySelector('#timer');
      timeDiv.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
    console.log('timer:', timer);
  };

  startTimer();
  window.addEventListener('keydown', handleKeyDown);
}

appStart();
