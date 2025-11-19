const locked = { 1: false, 2: false, 3: false };
let current = 0;
const correct = { 1: 0, 2: 0, 3: 10 };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startQuiz() {
  resetAll();
  current = 1;
  showScreen('q1');
}

function answer(q, val) {
  const opts = document.getElementById('opts' + q).querySelectorAll('.opt');
  
  if (locked[q]) {
    document.getElementById('err' + q).innerText = "غلط حاول مرة أخرى — اضغط 'أعد من جديد' للبدء من جديد";
    document.getElementById('err' + q).style.display = 'block';
    document.getElementById('reset' + q).style.display = 'inline-block';
    return;
  }
  
  if (val === correct[q]) {
    opts.forEach(b => b.style.background = '#28a745'); // أخضر عند الصواب
    goNextOrWin(q);
  } else {
    markWrong(q, val);
  }
}

function goNextOrWin(q) {
  if (q >= 3) {
    showScreen('win');
  } else {
    current = q + 1;
    resetError(current);
    showScreen('q' + current);
  }
}

function markWrong(q, val) {
  locked[q] = true;
  document.getElementById('err' + q).innerText = "غلط حاول مرة أخرى";
  document.getElementById('err' + q).style.display = 'block';
  document.getElementById('reset' + q).style.display = 'inline-block';
  
  const opts = document.getElementById('opts' + q).querySelectorAll('.opt');
  opts.forEach(b => {
    b.disabled = true;
    b.style.opacity = 0.6;
    if (parseInt(b.innerText) === val || b.innerText === b.textContent) {
      b.style.background = '#dc3545'; // أحمر للخطاء
    }
  });
}

function resetAll() {
  for (let i = 1; i <= 3; i++) {
    locked[i] = false;
    resetError(i);
    const opts = document.getElementById('opts' + i).querySelectorAll('.opt');
    opts.forEach(b => {
      b.disabled = false;
      b.style.opacity = 1;
      b.style.background = ''; // إعادة اللون الأصلي
    });
  }
  current = 0;
  showScreen('startPage');
}

function resetError(i) {
  const err = document.getElementById('err' + i);
  const resetBtn = document.getElementById('reset' + i);
  if (err) err.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'none';
}

showScreen('startPage');IMG_3560.jpeg