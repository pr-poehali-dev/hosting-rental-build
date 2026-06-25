import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ALL_NEWS, type NewsItem } from './Index';

const TAGS = ['Все', 'Новость', 'Акция', 'Обновление'];

const Blog = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('Все');
  const [opened, setOpened] = useState<NewsItem | null>(null);

  const filtered = activeTag === 'Все' ? ALL_NEWS : ALL_NEWS.filter((n) => n.tag === activeTag);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center h-16 gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="font-mono text-sm">На главную</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 font-display font-black text-lg tracking-widest">
            <Icon name="Hexagon" className="text-neon-cyan" size={22} />
            <span className="gradient-text">Артель NA</span>
          </div>
        </div>
      </header>

      <div className="container pt-32 pb-24">
        {/* Title */}
        <div className="mb-12">
          <div className="font-mono text-xs text-neon-magenta tracking-widest mb-3">// БЛОГ</div>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-4">Все новости</h1>
          <p className="text-muted-foreground max-w-lg">Обновления платформы, технические работы, акции и полезные статьи об оборудовании.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                activeTag === t
                  ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan glow-cyan'
                  : 'border-border text-muted-foreground hover:border-neon-cyan/40'
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted-foreground self-center">{filtered.length} материалов</span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((n, i) => (
            <div
              key={n.id}
              onClick={() => setOpened(n)}
              className="card-tech rounded-2xl overflow-hidden flex flex-col cursor-pointer animate-float-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className={`h-1.5 w-full ${n.tag === 'Акция' ? 'bg-neon-magenta' : n.tag === 'Новость' ? 'bg-neon-cyan' : 'bg-neon-cyan/50'}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    n.tag === 'Акция'
                      ? 'border-neon-magenta/40 text-neon-magenta bg-neon-magenta/5'
                      : 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5'
                  }`}>{n.tag}</span>
                  <span className="text-xs text-muted-foreground font-mono">{n.date}</span>
                </div>
                <h2 className="font-display font-bold text-base mb-2 leading-snug">{n.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{n.excerpt}</p>
                <div className="flex items-center gap-1 text-xs font-mono text-neon-cyan mt-4">
                  Читать далее <Icon name="ArrowRight" size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {opened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md" onClick={() => setOpened(null)}>
          <div
            className="card-tech rounded-2xl max-w-xl w-full p-8 border-neon-cyan/30 relative animate-float-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setOpened(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                opened.tag === 'Акция'
                  ? 'border-neon-magenta/40 text-neon-magenta bg-neon-magenta/5'
                  : 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5'
              }`}>{opened.tag}</span>
              <span className="text-xs text-muted-foreground font-mono">{opened.date}</span>
            </div>
            <h2 className="font-display font-bold text-xl mb-4 leading-snug">{opened.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{opened.body}</p>
            <Button onClick={() => setOpened(null)} className="mt-6 font-mono bg-neon-cyan text-background hover:bg-neon-cyan/90 glow-cyan">
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
