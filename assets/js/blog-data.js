/* =====================================================
   ブログ投稿データ
   新記事追加方法: HP_UPDATE_GUIDE.md を参照

   カテゴリID:
     mama     → ママ起業家向けコンサル
     coaching → 認知科学コーチング
     ai       → AIエージェント
     subsidy  → 補助金・助成金
   ===================================================== */

const BLOG_POSTS = [
  {
    id: "mama-002",
    category: "mama",
    title: "ママ起業の心得5選｜失敗しないために、最初に知っておくべきこと",
    date: "2026-06-26",
    excerpt: "「完璧な準備を待つ必要はない」「子育ては最大の強みになる」——ママ起業家として歩む前に、ぜひ知っておいてほしい5つの心得を解説します。",
    emoji: "🌸",
    url: "/blog/posts/mama-002.html"
  },
  /* ---------- サンプル記事（削除可） ---------- */
  {
    id: "mama-001",
    category: "mama",
    title: "ママ起業家が最初につまずく「3つの壁」と、その乗り越え方",
    date: "2026-06-26",
    excerpt: "子育てしながら起業を目指すママの多くが、同じ場所でつまずいています。その壁を知ることが、最短ルートへの第一歩です。",
    emoji: "👶",
    url: "/blog/posts/mama-001.html"
  },
  {
    id: "coaching-001",
    category: "coaching",
    title: "認知科学コーチングとは？従来のコーチングとの違いを解説",
    date: "2026-06-20",
    excerpt: "「なぜか行動できない」「頭ではわかっているのに動けない」——その原因は認知の仕組みにあります。",
    emoji: "🧠",
    url: "/blog/posts/coaching-001.html"
  },
  {
    id: "ai-001",
    category: "ai",
    title: "一人起業家がAIエージェントを使うと、何が変わるのか？",
    date: "2026-06-15",
    excerpt: "AIは大企業だけのものではありません。むしろ一人起業家こそ、AIエージェント活用で劇的に生産性を上げられます。",
    emoji: "🤖",
    url: "/blog/posts/ai-001.html"
  },
  {
    id: "subsidy-001",
    category: "subsidy",
    title: "2026年版｜女性起業家が使える補助金・助成金まとめ",
    date: "2026-06-10",
    excerpt: "起業・事業拡大に活用できる補助金・助成金を、女性・ママ起業家向けにまとめました。申請のポイントも解説。",
    emoji: "💰",
    url: "/blog/posts/subsidy-001.html"
  }
];

/* =========================================================
   以下は変更不要（レンダリング処理）
   ========================================================= */

function getCategoryLabel(cat) {
  const labels = {
    mama:     { text: 'ママ起業コンサル', cls: 'cat-mama',    thumb: 'thumb-mama' },
    coaching: { text: '認知科学コーチング', cls: 'cat-coach', thumb: 'thumb-coach' },
    ai:       { text: 'AIエージェント',    cls: 'cat-ai',     thumb: 'thumb-ai' },
    subsidy:  { text: '補助金・助成金',    cls: 'cat-subsidy', thumb: 'thumb-subsidy' }
  };
  return labels[cat] || { text: cat, cls: '', thumb: '' };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}

function renderBlogCard(post) {
  const cat = getCategoryLabel(post.category);
  return `
    <a class="blog-card" href="${post.url}">
      <div class="blog-card-thumb ${cat.thumb}">${post.emoji || '📝'}</div>
      <div class="blog-card-body">
        <span class="blog-cat ${cat.cls}">${cat.text}</span>
        <p class="blog-card-title">${post.title}</p>
        <p class="blog-card-date">${formatDate(post.date)}</p>
      </div>
    </a>
  `;
}

/* トップページ: 最新3件を表示 */
function renderHomeBlog() {
  const grid = document.getElementById('home-blog-grid');
  if (!grid) return;
  const latest = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  grid.innerHTML = latest.map(renderBlogCard).join('');
}

/* ブログページ: タブ別に表示 */
function renderBlogPage() {
  const categories = ['mama', 'coaching', 'ai', 'subsidy'];
  categories.forEach(cat => {
    const container = document.getElementById(`posts-${cat}`);
    if (!container) return;
    const posts = BLOG_POSTS.filter(p => p.category === cat)
                             .sort((a, b) => b.date.localeCompare(a.date));
    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <p class="empty-state-text">記事を準備中です。もうしばらくお待ちください。</p>
        </div>`;
    } else {
      container.innerHTML = `<div class="blog-grid">${posts.map(renderBlogCard).join('')}</div>`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeBlog();
  renderBlogPage();
});
