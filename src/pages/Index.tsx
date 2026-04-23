import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "discussions" | "categories" | "users" | "about";

const CATEGORIES = [
  { id: 1, icon: "📢", name: "Объявления", desc: "Официальные новости проекта", threads: 24, color: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", textColor: "#f97316" },
  { id: 2, icon: "🎮", name: "Игровой процесс", desc: "Обсуждение механик и геймплея", threads: 318, color: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.3)", textColor: "#00d4ff" },
  { id: 3, icon: "🏢", name: "Организации", desc: "Банды, фракции, кланы", threads: 156, color: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.3)", textColor: "#a855f7" },
  { id: 4, icon: "💰", name: "Торговля", desc: "Купля-продажа игровых ресурсов", threads: 892, color: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", textColor: "#22c55e" },
  { id: 5, icon: "🛠️", name: "Техподдержка", desc: "Помощь с проблемами и багами", threads: 445, color: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.3)", textColor: "#ec4899" },
  { id: 6, icon: "🌍", name: "Ролевая игра", desc: "Истории, персонажи, ивенты", threads: 203, color: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.3)", textColor: "#eab308" },
];

const THREADS = [
  { id: 1, title: "Обновление 3.5 — новые районы и транспорт", category: "Объявления", author: "AdminSlava", avatar: "AS", time: "2 часа назад", replies: 89, views: 3421, badge: "pinned", hot: true },
  { id: 2, title: "Как правильно начать RP с нуля? Полный гайд 2026", category: "Ролевая игра", author: "RPmaster_K", avatar: "RM", time: "4 часа назад", replies: 64, views: 1892, badge: "new", hot: false },
  { id: 3, title: "Продам бизнес в центре — гараж + ресторан", category: "Торговля", author: "BigBoss777", avatar: "BB", time: "6 часов назад", replies: 23, views: 567, badge: null, hot: false },
  { id: 4, title: "Набор в ОПГ «Ночная Стража» — открытый рекрутинг", category: "Организации", author: "NightWatch_X", avatar: "NW", time: "8 часов назад", replies: 112, views: 2105, badge: "new", hot: true },
  { id: 5, title: "Вылетает при заходе на сервер — ошибка GTA5.exe", category: "Техподдержка", author: "User_2341", avatar: "U2", time: "10 часов назад", replies: 18, views: 432, badge: null, hot: false },
  { id: 6, title: "Мега-ивент «Война кланов» — регистрация открыта!", category: "Объявления", author: "EventManager", avatar: "EM", time: "12 часов назад", replies: 201, views: 5678, badge: "pinned", hot: true },
  { id: 7, title: "Гайд по прокачке механика — с нуля до мастера", category: "Игровой процесс", author: "Wrench_Pro", avatar: "WP", time: "1 день назад", replies: 45, views: 1203, badge: null, hot: false },
  { id: 8, title: "История моего персонажа — 3 года в КРМП", category: "Ролевая игра", author: "VetPlayer", avatar: "VP", time: "1 день назад", replies: 77, views: 2890, badge: null, hot: false },
];

const USERS = [
  { id: 1, name: "AdminSlava", role: "Администратор", posts: 4201, joined: "Янв 2022", online: true, avatar: "AS", color: "#f97316" },
  { id: 2, name: "RPmaster_K", role: "Модератор", posts: 3187, joined: "Мар 2022", online: true, avatar: "RM", color: "#a855f7" },
  { id: 3, name: "BigBoss777", role: "Ветеран", posts: 1892, joined: "Июн 2022", online: false, avatar: "BB", color: "#00d4ff" },
  { id: 4, name: "NightWatch_X", role: "Игрок", posts: 934, joined: "Окт 2022", online: true, avatar: "NW", color: "#22c55e" },
  { id: 5, name: "EventManager", role: "Куратор", posts: 2341, joined: "Фев 2023", online: true, avatar: "EM", color: "#ec4899" },
  { id: 6, name: "Wrench_Pro", role: "Игрок", posts: 712, joined: "Апр 2023", online: false, avatar: "WP", color: "#eab308" },
  { id: 7, name: "VetPlayer", role: "Ветеран", posts: 2891, joined: "Янв 2022", online: false, avatar: "VP", color: "#00d4ff" },
  { id: 8, name: "User_2341", role: "Новичок", posts: 43, joined: "Янв 2026", online: true, avatar: "U2", color: "#6b7280" },
];

function AvatarBlock({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div
      className={`${sizes[size]} rounded-lg flex items-center justify-center font-exo font-bold flex-shrink-0`}
      style={{ background: `${color}22`, border: `1px solid ${color}50`, color }}
    >
      {initials}
    </div>
  );
}

function BadgePill({ type }: { type: string | null }) {
  if (!type) return null;
  const map: Record<string, { label: string; cls: string }> = {
    pinned: { label: "📌 Закреп", cls: "badge-pinned" },
    new: { label: "✨ Новое", cls: "badge-new" },
    hot: { label: "🔥 Горячее", cls: "badge-hot" },
  };
  const b = map[type];
  if (!b) return null;
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.cls}`}>{b.label}</span>;
}

function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {[
        { label: "Игроков онлайн", value: "1 248", icon: "Users", color: "#22c55e" },
        { label: "Тем на форуме", value: "3 142", icon: "MessageSquare", color: "#00d4ff" },
        { label: "Сообщений", value: "48.7K", icon: "MessagesSquare", color: "#a855f7" },
        { label: "Участников", value: "24 891", icon: "UserCheck", color: "#f97316" },
      ].map((s, i) => (
        <div
          key={i}
          className={`bg-card border border-border rounded-xl p-4 flex items-center gap-3 card-hover animate-fade-in`}
          style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
            <Icon name={s.icon} size={20} style={{ color: s.color }} />
          </div>
          <div>
            <div className="font-exo font-bold text-lg leading-none" style={{ color: s.color }}>{s.value}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 p-8 md:p-12" style={{
        background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(168,85,247,0.07) 50%, rgba(34,197,94,0.04) 100%)",
        border: "1px solid rgba(0,212,255,0.2)"
      }}>
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="online-dot" />
            <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Сервер онлайн — 1 248 игроков</span>
          </div>
          <h1 className="font-exo font-black text-4xl md:text-5xl mb-3 leading-tight">
            <span className="neon-text-cyan">КРМП</span>{" "}
            <span className="text-foreground">Форум</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-xl leading-relaxed">
            Официальное сообщество проекта. Обсуждения, торговля, ивенты и всё о жизни на сервере.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="glow-btn px-5 py-2.5 rounded-lg font-exo font-semibold text-sm" style={{ color: "#00d4ff" }}>
              ✏️ Новая тема
            </button>
            <button
              onClick={() => setPage("about")}
              className="bg-secondary border border-border px-5 py-2.5 rounded-lg font-medium text-sm hover:border-primary/40 transition-colors text-foreground"
            >
              Правила форума
            </button>
          </div>
        </div>
      </div>

      <StatsBar />

      {/* Recent threads */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-exo font-bold text-xl">Последние обсуждения</h2>
        <button onClick={() => setPage("discussions")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          Все темы <Icon name="ChevronRight" size={14} />
        </button>
      </div>

      <div className="space-y-2">
        {THREADS.slice(0, 6).map((t, i) => {
          const cat = CATEGORIES.find(c => c.name === t.category);
          return (
            <div
              key={t.id}
              className={`bg-card border border-border rounded-xl p-4 flex items-center gap-4 card-hover cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "both" }}
            >
              <AvatarBlock initials={t.avatar} color={cat?.textColor || "#00d4ff"} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {t.hot && <BadgePill type="hot" />}
                  <BadgePill type={t.badge} />
                  <span className="text-xs text-muted-foreground">{t.category}</span>
                </div>
                <div className="font-exo font-semibold text-sm md:text-base truncate">
                  {t.title}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.author} · {t.time}</div>
              </div>
              <div className="hidden md:flex flex-col items-end gap-1 text-xs text-muted-foreground flex-shrink-0">
                <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} /> {t.replies}</span>
                <span className="flex items-center gap-1"><Icon name="Eye" size={12} /> {t.views}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiscussionsPage() {
  const [filter, setFilter] = useState<"all" | "hot" | "new">("all");
  const filtered = THREADS.filter(t => {
    if (filter === "hot") return t.hot;
    if (filter === "new") return t.badge === "new";
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-exo font-bold text-2xl">Обсуждения</h2>
        <div className="flex gap-2">
          {(["all", "hot", "new"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                filter === f
                  ? "border-primary/30 bg-primary/10"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              style={filter === f ? { color: "#00d4ff" } : {}}
            >
              {f === "all" ? "Все" : f === "hot" ? "🔥 Горячие" : "✨ Новые"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-3 px-4 text-xs text-muted-foreground font-medium border-b border-border bg-muted/20 hidden md:grid">
          <span>Тема</span>
          <span>Категория</span>
          <span>Ответы</span>
          <span>Просмотры</span>
        </div>
        {filtered.map((t, i) => {
          const cat = CATEGORIES.find(c => c.name === t.category);
          return (
            <div
              key={t.id}
              className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/20 transition-colors border-b border-border last:border-0 animate-fade-in`}
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}
            >
              <AvatarBlock initials={t.avatar} color={cat?.textColor || "#00d4ff"} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  {t.hot && <BadgePill type="hot" />}
                  <BadgePill type={t.badge} />
                </div>
                <div className="font-exo font-semibold text-sm truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.author} · {t.time}</div>
              </div>
              <span className="hidden md:block text-xs px-2 py-1 rounded-md whitespace-nowrap" style={{ background: cat?.color, border: `1px solid ${cat?.border}`, color: cat?.textColor }}>
                {t.category}
              </span>
              <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground w-12 justify-end">
                <Icon name="MessageCircle" size={12} /> {t.replies}
              </div>
              <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground w-16 justify-end">
                <Icon name="Eye" size={12} /> {t.views}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoriesPage() {
  return (
    <div>
      <h2 className="font-exo font-bold text-2xl mb-6">Категории</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.id}
            className={`rounded-xl p-5 cursor-pointer card-hover animate-fade-in`}
            style={{
              background: cat.color,
              border: `1px solid ${cat.border}`,
              animationDelay: `${i * 0.07}s`,
              animationFillMode: "both"
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl leading-none">{cat.icon}</div>
              <div className="flex-1">
                <div className="font-exo font-bold text-lg mb-1" style={{ color: cat.textColor }}>{cat.name}</div>
                <div className="text-muted-foreground text-sm mb-3">{cat.desc}</div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Icon name="MessageSquare" size={12} /> {cat.threads} тем
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="TrendingUp" size={12} /> Активная
                  </span>
                </div>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground mt-1 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersPage() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    "Администратор": "#f97316",
    "Модератор": "#a855f7",
    "Ветеран": "#00d4ff",
    "Куратор": "#ec4899",
    "Игрок": "#94a3b8",
    "Новичок": "#64748b",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="font-exo font-bold text-2xl">Участники</h2>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск игрока..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors w-48 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((u, i) => (
          <div
            key={u.id}
            className={`bg-card border border-border rounded-xl p-4 card-hover cursor-pointer animate-fade-in`}
            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "both" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <AvatarBlock initials={u.avatar} color={u.color} size="md" />
                {u.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 rounded-full online-dot" style={{ width: 10, height: 10 }} />
                )}
              </div>
              <div>
                <div className="font-exo font-bold text-sm mb-1">{u.name}</div>
                <div className="text-xs px-1.5 py-0.5 rounded-md inline-block" style={{
                  background: `${roleColors[u.role]}18`,
                  color: roleColors[u.role],
                  border: `1px solid ${roleColors[u.role]}35`
                }}>
                  {u.role}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <div className="text-foreground font-semibold font-exo text-sm">{u.posts.toLocaleString()}</div>
                <div>сообщений</div>
              </div>
              <div>
                <div className="text-foreground font-semibold font-exo text-sm">{u.joined}</div>
                <div>на форуме</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-exo font-bold text-2xl mb-6">О форуме</h2>

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-6 animate-fade-in" style={{ animationFillMode: "both" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
              <span className="text-xl">🎮</span>
            </div>
            <h3 className="font-exo font-bold text-lg neon-text-cyan">О проекте КРМП</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            КРМП — крупнейший ролевой сервер GTA V на русском языке. Здесь тысячи игроков живут полноценной виртуальной жизнью: открывают бизнесы, вступают в банды, служат в полиции и создают незабываемые истории.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 animate-fade-in stagger-2" style={{ animationFillMode: "both" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
              <span className="text-xl">📋</span>
            </div>
            <h3 className="font-exo font-bold text-lg neon-text-purple">Правила форума</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground text-sm">
            {[
              "Уважайте других участников сообщества",
              "Публикуйте темы в соответствующих разделах",
              "Запрещён спам, флуд и оскорбления",
              "Реклама сторонних проектов строго запрещена",
              "Личные конфликты решайте в личных сообщениях",
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="neon-text-cyan mt-0.5 font-bold">›</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🚀", title: "Запущен", value: "Январь 2022", color: "#f97316" },
            { icon: "🏆", title: "Статус", value: "Активный", color: "#22c55e" },
            { icon: "👥", title: "Команда", value: "12 модераторов", color: "#a855f7" },
            { icon: "⚡", title: "Версия GTA", value: "Enhanced", color: "#00d4ff" },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-xl p-4 flex items-center gap-3 animate-fade-in`}
              style={{ animationDelay: `${0.2 + i * 0.07}s`, animationFillMode: "both" }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{item.title}</div>
                <div className="font-exo font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "discussions", label: "Обсуждения", icon: "MessageSquare" },
  { id: "categories", label: "Категории", icon: "LayoutGrid" },
  { id: "users", label: "Участники", icon: "Users" },
  { id: "about", label: "О форуме", icon: "Info" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "discussions": return <DiscussionsPage />;
      case "categories": return <CategoriesPage />;
      case "users": return <UsersPage />;
      case "about": return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen scrollbar-custom">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{
        background: "rgba(9, 12, 17, 0.88)",
        borderBottom: "1px solid rgba(0,212,255,0.15)"
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => setPage("home")} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-exo font-black text-sm"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.25), rgba(168,85,247,0.25))", border: "1px solid rgba(0,212,255,0.35)", color: "#00d4ff" }}>
                К
              </div>
              <span className="font-exo font-black text-xl">
                <span className="neon-text-cyan">КР</span>
                <span className="text-foreground">МП</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    page === item.id
                      ? "bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  style={page === item.id ? { color: "#00d4ff" } : {}}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="online-dot" />
                <span>1248 онлайн</span>
              </div>
              <button className="glow-btn px-4 py-2 rounded-lg text-sm font-exo font-semibold" style={{ color: "#00d4ff" }}>
                Войти
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden gap-1 pb-2 overflow-x-auto scrollbar-custom">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  page === item.id
                    ? "bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={page === item.id ? { color: "#00d4ff" } : {}}
              >
                <Icon name={item.icon} size={13} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(9,12,17,0.5)" }} className="mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-exo font-bold neon-text-cyan">КРМП</span>
            <span>Официальный форум сообщества</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2026 КРМП Проект</span>
            <div className="flex items-center gap-1.5">
              <div className="online-dot" style={{ width: 6, height: 6 }} />
              <span>Онлайн</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}