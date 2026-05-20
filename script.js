'use strict';

// ---- 問題データ ----
const questions = [
  {
    text: '日本国憲法が施行された年はいつか？',
    choices: ['1945年', '1946年', '1947年', '1952年'],
    correct: 2,
    explanation: '日本国憲法は1946年11月3日に公布され、1947年5月3日に施行されました。'
  },
  {
    text: '世界で最も面積が大きい国はどこか？',
    choices: ['アメリカ合衆国', 'カナダ', '中国', 'ロシア'],
    correct: 3,
    explanation: 'ロシアの国土面積は約1,710万km²で、世界最大です。日本の約45倍にあたります。'
  },
  {
    text: '元素記号「Au」が表す元素は何か？',
    choices: ['銀', '金', '銅', '鉄'],
    correct: 1,
    explanation: 'Auはラテン語の「Aurum（アウルム）」に由来し、金を表します。銀はAg、銅はCu、鉄はFeです。'
  },
  {
    text: '俳句に必要とされる「季語」を定めた書物を何というか？',
    choices: ['歳時記', '枕草子', '方丈記', '徒然草'],
    correct: 0,
    explanation: '歳時記（さいじき）は季語とその解説・例句を集めた書物です。俳句を作る際の基本的な参考書とされています。'
  },
  {
    text: '人体の血液を全身に送り出す器官はどれか？',
    choices: ['肺', '肝臓', '腎臓', '心臓'],
    correct: 3,
    explanation: '心臓はポンプの役割を果たし、収縮と拡張を繰り返すことで血液を全身に循環させています。'
  },
  {
    text: '小説「吾輩は猫である」の作者は誰か？',
    choices: ['森鴎外', '川端康成', '夏目漱石', '芥川龍之介'],
    correct: 2,
    explanation: '「吾輩は猫である」は夏目漱石が1905年に発表した長編小説です。猫の視点から人間社会を風刺した作品です。'
  },
  {
    text: '光の速さは真空中で約何万km/秒か？',
    choices: ['約3万km/秒', '約30万km/秒', '約300万km/秒', '約3000万km/秒'],
    correct: 1,
    explanation: '光の速さは真空中で約30万km/秒（正確には約29万9,792km/秒）です。地球を約1秒間で7周半する速さです。'
  },
  {
    text: '日本で最も長い川はどれか？',
    choices: ['利根川', '信濃川', '石狩川', '木曽川'],
    correct: 1,
    explanation: '信濃川（しなのがわ）は全長約367kmで日本最長の川です。長野県内では「千曲川」とも呼ばれます。'
  },
  {
    text: 'リンゴが落ちるのを見て万有引力の法則を発見したとされる人物は誰か？',
    choices: ['ガリレオ・ガリレイ', 'アルベルト・アインシュタイン', 'アイザック・ニュートン', 'ニコラウス・コペルニクス'],
    correct: 2,
    explanation: 'アイザック・ニュートンは17世紀のイギリスの科学者で、万有引力の法則や運動の三法則を発見・提唱しました。'
  },
  {
    text: '世界で最も深い湖はどれか？',
    choices: ['カスピ海', 'スペリオル湖', 'バイカル湖', 'チチカカ湖'],
    correct: 2,
    explanation: 'バイカル湖（ロシア）は最大水深約1,642mで世界最深の湖です。世界の淡水の約20%を蓄えていると言われています。'
  }
];

// ---- 状態管理 ----
let currentIndex = 0;
let score = 0;
let answered = false;
const userAnswers = [];

// ---- DOM参照 ----
const screens = {
  start:  document.getElementById('screen-start'),
  quiz:   document.getElementById('screen-quiz'),
  result: document.getElementById('screen-result')
};

const progressBar    = document.getElementById('progress-bar');
const questionCount  = document.getElementById('question-count');
const questionText   = document.getElementById('question-text');
const choicesEl      = document.getElementById('choices');
const feedbackEl     = document.getElementById('feedback');
const btnNext        = document.getElementById('btn-next');
const scoreText      = document.getElementById('score-text');
const scoreComment   = document.getElementById('score-comment');
const reviewList     = document.getElementById('review-list');

// ---- 画面切り替え ----
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ---- 問題を表示 ----
function renderQuestion() {
  answered = false;
  feedbackEl.classList.add('hidden');
  btnNext.classList.add('hidden');

  const q = questions[currentIndex];
  const total = questions.length;

  // プログレスバー
  progressBar.style.width = `${(currentIndex / total) * 100}%`;
  questionCount.textContent = `問題 ${currentIndex + 1} / ${total}`;
  questionText.textContent = q.text;

  // 選択肢を生成
  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => onChoiceClick(i));
    choicesEl.appendChild(btn);
  });
}

// ---- 選択肢クリック処理 ----
function onChoiceClick(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const isCorrect = selectedIndex === q.correct;
  const buttons = choicesEl.querySelectorAll('.choice-btn');

  if (isCorrect) {
    score++;
    buttons[selectedIndex].classList.add('correct');
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[q.correct].classList.add('highlight');
  }

  // 全ボタン無効化
  buttons.forEach(btn => { btn.disabled = true; });

  // フィードバック表示
  feedbackEl.className = `feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
  feedbackEl.textContent = (isCorrect ? '✓ 正解！　' : '✗ 不正解。　') + q.explanation;
  feedbackEl.classList.remove('hidden');

  // 回答を記録
  userAnswers.push({ question: q.text, isCorrect, correct: q.choices[q.correct] });

  // 次へボタンのラベルを変更
  btnNext.textContent = currentIndex + 1 < questions.length ? '次の問題へ' : '結果を見る';
  btnNext.classList.remove('hidden');
}

// ---- 結果画面を表示 ----
function renderResult() {
  const total = questions.length;

  // プログレスバーを100%に
  progressBar.style.width = '100%';

  scoreText.textContent = `${total}問中 ${score}問 正解`;
  scoreComment.textContent = getComment(score, total);

  // 振り返りリスト
  reviewList.innerHTML = '';
  userAnswers.forEach((a, i) => {
    const item = document.createElement('div');
    item.className = `review-item ${a.isCorrect ? 'ok' : 'ng'}`;
    item.innerHTML = `
      <span class="review-icon">${a.isCorrect ? '○' : '×'}</span>
      <span>Q${i + 1}. ${a.question}${a.isCorrect ? '' : `<br>正解：${a.correct}`}</span>
    `;
    reviewList.appendChild(item);
  });

  showScreen('result');
}

// ---- スコアコメント ----
function getComment(score, total) {
  const rate = score / total;
  if (rate === 1)   return '満点です！素晴らしい！';
  if (rate >= 0.8)  return 'とても良い成績です！';
  if (rate >= 0.6)  return 'まずまずの結果です。';
  if (rate >= 0.4)  return 'もう少し頑張りましょう！';
  return 'もう一度チャレンジしてみましょう！';
}

// ---- リセット処理 ----
function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  userAnswers.length = 0;
  progressBar.style.width = '0%';
  renderQuestion();
  showScreen('quiz');
}

// ---- イベントリスナー ----
document.getElementById('btn-start').addEventListener('click', () => {
  resetQuiz();
});

btnNext.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    renderResult();
  }
});

document.getElementById('btn-retry').addEventListener('click', () => {
  resetQuiz();
});
