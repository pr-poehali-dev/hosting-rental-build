import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Калькулятор', href: '#calc' },
  { label: 'Поддержка', href: '#support' },
  { label: 'Контакты', href: '#contacts' },
];

const SERVICES = [
  { icon: 'Server', title: 'Аренда мощностей', desc: 'Выделенные серверы и GPU-кластеры под любые задачи. Масштабирование за минуты.' },
  { icon: 'Cpu', title: 'Сборка ПК', desc: 'Игровые, рабочие и серверные конфигурации любой сложности под ключ.' },
  { icon: 'Wrench', title: 'Настройка', desc: 'Установка ОС, оптимизация, разгон, тонкая настройка под ваши процессы.' },
  { icon: 'Headphones', title: 'Техподдержка 24/7', desc: 'Реагируем за минуты. Мониторинг, диагностика и удалённая помощь круглосуточно.' },
];

const PRICING = [
  { name: 'START', price: '1 490', accent: 'cyan', features: ['4 vCPU / 8 GB RAM', '120 GB NVMe', '1 Гбит/с канал', 'Поддержка по тикетам'], popular: false },
  { name: 'PRO', price: '4 990', accent: 'magenta', features: ['16 vCPU / 32 GB RAM', '500 GB NVMe', '10 Гбит/с канал', 'GPU по запросу', 'Поддержка 24/7'], popular: true },
  { name: 'ENTERPRISE', price: '12 900', accent: 'cyan', features: ['64 vCPU / 128 GB RAM', '2 TB NVMe RAID', 'Выделенный GPU-кластер', 'Персональный инженер', 'SLA 99.99%'], popular: false },
];

type Part = { id: string; name: string; price: number };
type Category = { key: string; label: string; icon: string; options: Part[] };

const CATEGORIES: Category[] = [
  { key: 'cpu', label: 'Процессор', icon: 'Cpu', options: [
    { id: 'cpu1', name: 'Ryzen 5 7600', price: 18000 },
    { id: 'cpu2', name: 'Ryzen 7 7800X3D', price: 38000 },
    { id: 'cpu3', name: 'Core i9-14900K', price: 52000 },
  ]},
  { key: 'gpu', label: 'Видеокарта', icon: 'MonitorPlay', options: [
    { id: 'gpu1', name: 'RTX 4060 Ti', price: 42000 },
    { id: 'gpu2', name: 'RTX 4080 Super', price: 105000 },
    { id: 'gpu3', name: 'RTX 4090', price: 185000 },
  ]},
  { key: 'ram', label: 'Память', icon: 'MemoryStick', options: [
    { id: 'ram1', name: '32 GB DDR5', price: 11000 },
    { id: 'ram2', name: '64 GB DDR5', price: 22000 },
    { id: 'ram3', name: '128 GB DDR5', price: 46000 },
  ]},
  { key: 'storage', label: 'Накопитель', icon: 'HardDrive', options: [
    { id: 'st1', name: '1 TB NVMe', price: 9000 },
    { id: 'st2', name: '2 TB NVMe Gen4', price: 18000 },
    { id: 'st3', name: '4 TB NVMe Gen5', price: 39000 },
  ]},
  { key: 'cooling', label: 'Охлаждение', icon: 'Fan', options: [
    { id: 'cl1', name: 'Башенный кулер', price: 5000 },
    { id: 'cl2', name: 'СЖО 240 мм', price: 12000 },
    { id: 'cl3', name: 'СЖО 360 мм', price: 19000 },
  ]},
];

const Index = () => {
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.key, c.options[0].id]))
  );

  const total = useMemo(() => {
    return CATEGORIES.reduce((sum, cat) => {
      const part = cat.options.find((o) => o.id === selected[cat.key]);
      return sum + (part?.price || 0);
    }, 0);
  }, [selected]);

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-display font-black text-xl tracking-widest">
            <Icon name="Hexagon" className="text-neon-cyan text-glow-cyan" size={26} />
            <span className="gradient-text">Артель [N|A]</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-neon-cyan transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan">
            Заказать
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-28 grid-bg scanline">
        <div className="absolute inset-0 grid-bg animate-grid opacity-40" />
        <div className="container relative text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow text-xs font-mono text-neon-cyan mb-8 animate-float-up">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
            ОНЛАЙН · 99.99% UPTIME
          </div>
          <h1 className="font-display font-black text-4xl md:text-7xl leading-tight mb-6 animate-float-up" style={{ animationDelay: '0.1s' }}>
            МОЩНОСТИ <span className="gradient-text">БУДУЩЕГО</span><br />ПОД ТВОИ ЗАДАЧИ
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-float-up" style={{ animationDelay: '0.2s' }}>
            Аренда вычислительных мощностей, сборка ПК любой сложности и техподдержка 24/7. Запускаем за минуты.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-float-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan h-12 px-8" asChild>
              <a href="#calc"><Icon name="Calculator" size={18} className="mr-2" />Собрать конфигурацию</a>
            </Button>
            <Button size="lg" variant="outline" className="border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 font-mono font-bold h-12 px-8" asChild>
              <a href="#pricing">Тарифы аренды</a>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-20 animate-float-up" style={{ animationDelay: '0.4s' }}>
            {[['10K+', 'Серверов'], ['24/7', 'Поддержка'], ['5 мин', 'Запуск']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display font-black text-3xl md:text-4xl text-glow-cyan text-neon-cyan">{v}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-24">
        <SectionTitle tag="// СЕРВИСЫ" title="Что мы делаем" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card-tech rounded-xl p-6 animate-float-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-4 border border-neon-cyan/20">
                <Icon name={s.icon} className="text-neon-cyan" size={24} />
              </div>
              <h3 className="font-display text-base font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-24">
        <SectionTitle tag="// ТАРИФЫ" title="Аренда мощностей" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {PRICING.map((p, i) => (
            <div
              key={p.name}
              className={`card-tech rounded-2xl p-8 relative animate-float-up ${p.popular ? 'border-neon-magenta/60 glow-magenta' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neon-magenta text-background text-xs font-mono font-bold">
                  ПОПУЛЯРНЫЙ
                </span>
              )}
              <h3 className={`font-display font-black text-xl mb-1 ${p.accent === 'magenta' ? 'text-neon-magenta' : 'text-neon-cyan'}`}>{p.name}</h3>
              <div className="flex items-end gap-1 mb-6 mt-4">
                <span className="font-display font-black text-4xl">{p.price}</span>
                <span className="text-muted-foreground font-mono text-sm mb-1">₽/мес</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className={p.accent === 'magenta' ? 'text-neon-magenta' : 'text-neon-cyan'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full font-mono font-bold ${p.popular ? 'bg-neon-magenta text-background hover:bg-neon-magenta/90' : 'bg-secondary hover:bg-secondary/80'}`}>
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section id="calc" className="py-24 grid-bg relative scanline">
        <div className="container relative">
          <SectionTitle tag="// КОНФИГУРАТОР" title="Калькулятор сборки ПК" />
          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-2 space-y-4">
              {CATEGORIES.map((cat, ci) => (
                <div key={cat.key} className="card-tech rounded-xl p-5 animate-float-up" style={{ animationDelay: `${ci * 0.06}s` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name={cat.icon} className="text-neon-cyan" size={18} />
                    <span className="font-display text-sm font-bold uppercase tracking-wide">{cat.label}</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {cat.options.map((opt) => {
                      const active = selected[cat.key] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelected((s) => ({ ...s, [cat.key]: opt.id }))}
                          className={`text-left rounded-lg p-3 border transition-all ${
                            active
                              ? 'border-neon-cyan bg-neon-cyan/10 glow-cyan'
                              : 'border-border bg-secondary/40 hover:border-neon-cyan/40'
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">{opt.name}</div>
                          <div className={`font-mono text-xs ${active ? 'text-neon-cyan' : 'text-muted-foreground'}`}>
                            {fmt(opt.price)} ₽
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="card-tech rounded-2xl p-7 border-neon-magenta/40">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Итого конфигурация</div>
                <div className="font-display font-black text-5xl gradient-text mb-1">{fmt(total)}</div>
                <div className="font-mono text-sm text-muted-foreground mb-6">рублей</div>
                <div className="space-y-2 mb-6 border-t border-border pt-4">
                  {CATEGORIES.map((cat) => {
                    const part = cat.options.find((o) => o.id === selected[cat.key]);
                    return (
                      <div key={cat.key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{part?.name}</span>
                        <span className="font-mono">{fmt(part?.price || 0)} ₽</span>
                      </div>
                    );
                  })}
                </div>
                <Button className="w-full bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan h-12 mb-3">
                  <Icon name="ShoppingCart" size={18} className="mr-2" />Заказать сборку
                </Button>
                <p className="text-xs text-muted-foreground text-center">Сборка и тестирование 2–4 дня</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="container py-24">
        <div className="card-tech rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <Icon name="LifeBuoy" className="text-neon-magenta text-glow-magenta mx-auto mb-6" size={48} />
            <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Техподдержка <span className="text-neon-magenta">24/7</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Мониторим инфраструктуру круглосуточно. Среднее время реакции — менее 5 минут. Удалённая диагностика, настройка и сопровождение.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-neon-magenta text-background hover:bg-neon-magenta/90 font-mono font-bold glow-magenta">
                <Icon name="MessageCircle" size={18} className="mr-2" />Открыть чат
              </Button>
              <Button size="lg" variant="outline" className="border-border font-mono">
                <Icon name="FileText" size={18} className="mr-2" />База знаний
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-24">
        <SectionTitle tag="// КОНТАКТЫ" title="Связаться с нами" />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            { icon: 'Phone', label: 'Телефон', value: '+7 (800) 555-00-42' },
            { icon: 'Mail', label: 'Почта', value: 'hello@na40.ru' },
            { icon: 'MapPin', label: 'Дата-центр', value: 'Москва, ул. Серверная, 1' },
          ].map((c) => (
            <div key={c.label} className="card-tech rounded-xl p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Icon name={c.icon} className="text-neon-cyan" size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-black tracking-widest">
            <Icon name="Hexagon" className="text-neon-cyan" size={20} />
            <span className="gradient-text">Артель [N|A]</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">© 2026 Артель [N|A] · Мощности будущего</p>
        </div>
      </footer>
    </div>
  );
};

const SectionTitle = ({ tag, title }: { tag: string; title: string }) => (
  <div className="text-center">
    <div className="font-mono text-xs text-neon-magenta tracking-widest mb-3">{tag}</div>
    <h2 className="font-display font-black text-3xl md:text-5xl">{title}</h2>
  </div>
);

export default Index;