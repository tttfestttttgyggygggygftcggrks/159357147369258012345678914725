// --- クイズ問題 ---
const QUESTIONS = [
  {
    q: 'フェルマーの最終定理はどんな命題？',
    choices: [
      '任意の自然数 n に対して x^n + y^n = z^n の解が無限に存在する',
      'n=2 を除く n>2 の整数 n に対して x^n + y^n = z^n の正整数解は存在しない',
      '全ての整数 n に対して 2^n + 3^n = 5^n が成り立つ',
      '負の整数のみを考えたときに成り立つ等式についての命題'
    ],
    a: 1,
    note: '正確には「自然数 n>2 に対して、x^n + y^n = z^n の正整数解は存在しない」というもの。'
  },
  {
    q: 'この問題を最終的に証明した数学者は誰？',
    choices: ['ピエール・ド・フェルマー', 'アンドリュー・ワイルズ', 'カール・フリードリヒ・ガウス', 'レオナルド・オイラー'],
    a: 1,
    note: 'アンドリュー・ワイルズ (Andrew Wiles) が1994年に証明を完成させた（1995年に修整を終える）。'
  },
  {
    q: 'フェルマー自身はどのようにこの問題について書き残した？',
    choices: [
      '証明を詳細に書いた長い論文を出版した',
      '「この余白はそれを書くには狭すぎる」と書き残した',
      'この命題を証明できるのは100年後だと予想した',
      '何も書き残していない'
    ],
    a: 1,
    note: 'フェルマーは余白に「驚くべき証明がある」とだけ書き残したと伝えられる。'
  }
];

// --- 豆知識 ---
const TIPS = [
  "ワイルズの証明は楕円曲線と谷山–志村予想を利用している。",
  "証明は1993年に発表されたが、誤りが見つかり1994年に修正され完成した。",
  "この定理は350年以上にわたり数多くの数学者を悩ませた。",
  "フェルマーの書き残した証明は現在も謎のまま。",
  "この定理は『数学界最大の難問』のひとつと呼ばれていた。"
];

let idx = 0, score = 0, selected = null;
const total = QUESTIONS.length;
const qText = document.getElementById('q-text');
const choicesBox = document.getElementById('choices');
const bar = document.getElementById('bar');
const qcount = document.getElementById('qcount');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const resultEl = document.getElementById('result');
const quizArea = document.getElementById('quiz-area');
const scoreEl = document.getElementById('score');
const detailEl = document.getElementById('detail');
const retryBtn = document.getElementById('retryBtn');
const shareBtn = document.getElementById('shareBtn');

function render(){
  const Q = QUESTIONS[idx];
  qText.textContent = Q.q;
  choicesBox.innerHTML = '';
  Q.choices.forEach((c,i)=>{
    const btn = document.createElement('div');
    btn.className = 'choice';
    btn.innerHTML = `<strong>${String.fromCharCode(65+i)}</strong>. <span>${c}</span>`;
    btn.onclick = ()=> choose(i, btn);
    choicesBox.appendChild(btn);
  });
  selected = null; updateProgress();
}
function choose(i,el){
  Array.from(choicesBox.children).forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  selected = i;
}
function updateProgress(){
  bar.style.width = Math.round(((idx+1)/total)*100) + '%'; // 修正済み
  qcount.textContent = `${idx+1} / ${total}`;
}
nextBtn.addEventListener('click', ()=>{
  if(selected===null){ showCorrectAndAdvance(); return; }
  const Q = QUESTIONS[idx];
  if(selected===Q.a){ score++; }
  detailEl.textContent = Q.note || '';
  idx++;
  if(idx>=total){ finish(); } else { setTimeout(render,500); }
});
skipBtn.addEventListener('click', ()=> showCorrectAndAdvance());
function showCorrectAndAdvance(){
  const Q = QUESTIONS[idx];
  detailEl.textContent = Q.note || '';
  idx++;
  if(idx>=total){ finish(); } else { setTimeout(render,500); }
}
function finish(){
  quizArea.style.display = 'none';
  resultEl.classList.add('show');
  scoreEl.textContent = `${score} / ${total}`;

  if(score === total){
    const randomTip = TIPS[Math.floor(Math.random()*TIPS.length)];
    detailEl.innerHTML = `🎉 全問正解！おめでとう！<br><br>【フェルマーの最終定理の豆知識】<br>${randomTip}`;
  }
}
retryBtn.addEventListener('click', ()=>{
  idx=0; score=0; selected=null;
  resultEl.classList.remove('show'); quizArea.style.display='';
  render();
});
shareBtn.addEventListener('click', ()=>{
  const text = `フェルマーの最終定理クイズの結果: ${score}/${total}`;
  navigator.clipboard.writeText(text).then(()=>alert('結果をコピーしました'));
});

render();
