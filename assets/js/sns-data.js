/* =====================================================
   SNS投稿データ
   新規投稿追加方法: HP_UPDATE_GUIDE.md を参照

   platform: "Instagram" | "Facebook" | "LINE"
   emoji:    プラットフォームアイコン用
   ===================================================== */

const SNS_POSTS = [
  /* ---------- サンプル（削除可） ---------- */
  {
    id: "ig-001",
    platform: "Instagram",
    emoji: "📸",
    date: "2026-06-25",
    text: "子育てしながら起業を目指すママへ。「時間がない」は理由にならない、という言葉を聞くたびに違和感を感じていました。でも今は少し違う考え方をしています……",
    url: "https://www.instagram.com/maco_re.style/"
  },
  {
    id: "ig-002",
    platform: "Instagram",
    emoji: "📸",
    date: "2026-06-22",
    text: "認知科学コーチングを受けてから、「なりたい自分」の解像度が劇的に変わったというお声をいただいています。ゴールは「達成するもの」より「なりたい状態」に設定する方が、脳科学的にも効果的なんです。",
    url: "https://www.instagram.com/maco_re.style/"
  },
  {
    id: "fb-001",
    platform: "Facebook",
    emoji: "👥",
    date: "2026-06-18",
    text: "【無料セミナー開催】7月のセミナー情報をお知らせします。テーマは「医療従事者が起業で成功するためのロードマップ」。ご参加お待ちしています！",
    url: "https://www.facebook.com/"
  }
];

/* =========================================================
   以下は変更不要（レンダリング処理）
   ========================================================= */

function formatSnsDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth()+1}/${d.getDate()}`;
}

function renderSnsCard(post) {
  return `
    <div class="sns-card">
      <div class="sns-card-head">
        <span>${post.emoji}</span>
        <span class="sns-card-platform">${post.platform}</span>
        <span class="sns-card-date">${formatSnsDate(post.date)}</span>
      </div>
      <p class="sns-card-text">${post.text}</p>
      <a class="sns-card-link" href="${post.url}" target="_blank" rel="noopener">投稿を見る →</a>
    </div>
  `;
}

function renderSnsSection() {
  const grid = document.getElementById('sns-grid');
  if (!grid) return;
  const sorted = [...SNS_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  grid.innerHTML = sorted.map(renderSnsCard).join('');
}

document.addEventListener('DOMContentLoaded', renderSnsSection);
