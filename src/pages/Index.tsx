import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Калькулятор', href: '#calc' },
  { label: 'Поддержка', href: '#support' },
  { label: 'Блог', href: '#blog' },
  { label: 'Контакты', href: '#contacts' },
];

const SERVICES = [
  { icon: 'Server', title: 'Аренда мощностей', desc: 'Выделенные серверы и GPU-кластеры под любые задачи. Масштабирование за минуты.' },
  { icon: 'Cpu', title: 'Сборка ПК', desc: 'Игровые, рабочие и серверные конфигурации любой сложности под ключ.' },
  { icon: 'Wrench', title: 'Настройка', desc: 'Установка ОС, оптимизация, разгон, тонкая настройка под ваши процессы.' },
  { icon: 'Headphones', title: 'Техподдержка 24/7', desc: 'Реагируем за минуты. Мониторинг, диагностика и удалённая помощь круглосуточно.' },
];

type StorageType = 'HDD' | 'SSD' | 'NVMe';
type VpsPlan = {
  name: string;
  cpu: string;
  ram: string;
  storage: string;
  prices: Record<StorageType, number>;
};

const VPS_PLANS: VpsPlan[] = [
  { name: '«Спутник 2.0»',  cpu: '1 vCPU', ram: '1 Гб ОЗУ',  storage: '20 Гб',  prices: { HDD: 200,  SSD: 270,  NVMe: 350  } },
  { name: '«Восток 2.0»',   cpu: '1 vCPU', ram: '2 Гб ОЗУ',  storage: '50 Гб',  prices: { HDD: 310,  SSD: 400,  NVMe: 510  } },
  { name: '«Восход 2.0»',   cpu: '2 vCPU', ram: '4 Гб ОЗУ',  storage: '70 Гб',  prices: { HDD: 470,  SSD: 590,  NVMe: 750  } },
  { name: '«Союз 2.0»',     cpu: '4 vCPU', ram: '8 Гб ОЗУ',  storage: '100 Гб', prices: { HDD: 700,  SSD: 880,  NVMe: 1100 } },
  { name: '«Ангара 2.0»',   cpu: '8 vCPU', ram: '12 Гб ОЗУ', storage: '150 Гб', prices: { HDD: 1200, SSD: 1500, NVMe: 1900 } },
];

const DEDICATED_PLANS = [
  { name: '«Циолковский»', cpu: 'AMD Ryzen 9 5950X', cores: '16 CPU', ram: '128 Гб ОЗУ', storage: '1000 Гб NVMe', price: 11000 },
];

const PC_BUILDS = [
  {
    icon: 'Gamepad2',
    title: 'Игровая сборка',
    desc: 'Максимальный FPS в любых играх. Подбираем баланс процессора, видеокарты и охлаждения под ваш бюджет и монитор.',
    tags: ['Высокий FPS', 'RTX / RX', 'RGB-подсветка'],
    accent: 'cyan',
  },
  {
    icon: 'Monitor',
    title: 'Офисная сборка',
    desc: 'Надёжный и тихий ПК для работы с документами, браузером и видеозвонками. Без лишних затрат.',
    tags: ['Тихий корпус', 'Энергоэффективность', 'Долгий ресурс'],
    accent: 'magenta',
  },
  {
    icon: 'BrainCircuit',
    title: 'Профессиональные решения',
    desc: '3D-рендер, монтаж видео, машинное обучение, архитектурные визуализации. Рабочие станции с GPU до RTX 4090.',
    tags: ['Рендер / ML', 'ECC-память', 'Мощные GPU'],
    accent: 'cyan',
  },
  {
    icon: 'ServerCog',
    title: 'Серверные решения',
    desc: 'Домашние и корпоративные серверы, NAS-системы, файловые хранилища и инфраструктура для бизнеса.',
    tags: ['RAID-массивы', 'NAS / HPC', 'Удалённый доступ'],
    accent: 'magenta',
  },
];

export type NewsItem = {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
};

export const ALL_NEWS: NewsItem[] = [
  {
    id: 1,
    tag: 'Новость',
    date: '25 июня 2026',
    title: 'Запуск нового тарифа «Ангара 2.0» с 8 vCPU',
    excerpt: 'Мы расширяем линейку VPS-тарифов: встречайте «Ангара 2.0» — 8 ядер, 12 ГБ ОЗУ и выбор накопителя.',
    body: 'Подробное описание тарифа «Ангара 2.0». Тариф предназначен для высоконагруженных приложений, баз данных и веб-серверов с большим трафиком. Доступны накопители HDD, SSD и NVMe. Канал до 100 Мбит/с и IP-адрес включены в стоимость.',
  },
  {
    id: 2,
    tag: 'Акция',
    date: '20 июня 2026',
    title: 'Скидка 20% на все VPS при оплате за 6 месяцев',
    excerpt: 'До 31 июля действует специальное предложение: оплатите любой VPS-тариф на 6 месяцев вперёд и получите скидку 20%.',
    body: 'Акция распространяется на все VPS-тарифы линейки 2.0. Скидка применяется автоматически при выборе периода 6 месяцев в панели управления. Предложение действует до 31 июля 2026 года.',
  },
  {
    id: 3,
    tag: 'Обновление',
    date: '15 июня 2026',
    title: 'Обновление панели управления: новый интерфейс и быстрый перезапуск',
    excerpt: 'Мы обновили панель управления серверами. Ребут теперь занимает менее 10 секунд, добавлены графики нагрузки в реальном времени.',
    body: 'В новой версии панели управления реализованы: мгновенный перезапуск сервера (менее 10 сек), графики CPU/RAM/Disk в реальном времени, поддержка двухфакторной аутентификации, улучшенный мобильный интерфейс.',
  },
  {
    id: 4,
    tag: 'Новость',
    date: '10 июня 2026',
    title: 'Добавлен выделенный сервер «Циолковский» на AMD Ryzen 9 5950X',
    excerpt: 'В каталог выделенных серверов добавлена новая позиция — 16-ядерный AMD Ryzen 9 5950X с 128 ГБ ОЗУ и 1 ТБ NVMe.',
    body: 'Выделенный сервер «Циолковский» — наше флагманское предложение для задач, требующих максимальной производительности. Идеально подходит для ML-обучения, рендеринга, тяжёлых баз данных и высоконагруженных сервисов.',
  },
  {
    id: 5,
    tag: 'Обновление',
    date: '5 июня 2026',
    title: 'Техническое обслуживание 8 июня с 03:00 до 05:00 МСК',
    excerpt: 'Уведомляем о плановых технических работах. Возможны кратковременные перебои в работе отдельных серверов.',
    body: 'Плановое техническое обслуживание инфраструктуры пройдёт 8 июня с 03:00 до 05:00 МСК. В это время возможны кратковременные перебои. Все данные будут сохранены. Следите за оперативными обновлениями в нашем Telegram-канале.',
  },
  {
    id: 6,
    tag: 'Акция',
    date: '1 июня 2026',
    title: 'Бесплатная сборка ПК при заказе выделенного сервера',
    excerpt: 'Специальное предложение для новых клиентов: закажите выделенный сервер и получите бесплатную консультацию по сборке рабочей станции.',
    body: 'При заключении договора на аренду выделенного сервера сроком от 3 месяцев новые клиенты получают бесплатную консультацию по подбору и сборке рабочей станции. Предложение действует до конца июня 2026.',
  },
];

const NEWS_PREVIEW = ALL_NEWS.slice(0, 3);

const Index = () => {
  const [storageType, setStorageType] = useState<StorageType>('HDD');

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
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-4 text-sm">
          Процессоры Intel Xeon и AMD Ryzen 3–4,5 ГГц. Канал до 100 Мбит/с и один IP-адрес бесплатно. Возможны уникальные конфигурации под ваши требования.
        </p>

        {/* VPS */}
        <h3 className="font-display font-bold text-lg text-neon-cyan mt-14 mb-2 uppercase tracking-widest">VPS тарифы</h3>

        {/* Storage toggle */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono text-muted-foreground mr-2">Тип накопителя:</span>
          {(['HDD', 'SSD', 'NVMe'] as StorageType[]).map((t) => (
            <button
              key={t}
              onClick={() => setStorageType(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                storageType === t
                  ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan glow-cyan'
                  : 'border-border text-muted-foreground hover:border-neon-cyan/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {VPS_PLANS.map((p, i) => (
            <div key={p.name} className="card-tech rounded-2xl p-6 flex flex-col animate-float-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <h4 className="font-display font-bold text-sm text-neon-cyan mb-4 leading-snug">{p.name}</h4>
              <ul className="space-y-2 mb-5 flex-1">
                {[
                  { icon: 'Cpu', val: p.cpu },
                  { icon: 'MemoryStick', val: p.ram },
                  { icon: 'HardDrive', val: `${p.storage} ${storageType}` },
                ].map((r) => (
                  <li key={r.val} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name={r.icon} size={13} className="text-neon-cyan/60 shrink-0" />
                    {r.val}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <div className="font-display font-black text-2xl gradient-text">от {p.prices[storageType].toLocaleString('ru-RU')}</div>
                <div className="text-xs font-mono text-muted-foreground">₽/месяц</div>
              </div>
              <Button className="w-full font-mono font-bold text-xs bg-secondary hover:bg-neon-cyan/20 hover:border-neon-cyan border border-border transition-all">
                Заказать
              </Button>
            </div>
          ))}
        </div>

        {/* Dedicated */}
        <h3 className="font-display font-bold text-lg text-neon-magenta mt-14 mb-6 uppercase tracking-widest">Выделенные серверы</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEDICATED_PLANS.map((p, i) => (
            <div key={p.name} className="card-tech rounded-2xl p-7 border-neon-magenta/30 animate-float-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <h4 className="font-display font-bold text-base text-neon-magenta mb-4">{p.name}</h4>
              <ul className="space-y-2 mb-5">
                {[
                  { icon: 'Cpu', val: p.cpu },
                  { icon: 'Server', val: p.cores },
                  { icon: 'MemoryStick', val: p.ram },
                  { icon: 'HardDrive', val: p.storage },
                ].map((r) => (
                  <li key={r.val} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name={r.icon} size={15} className="text-neon-magenta/60 shrink-0" />
                    {r.val}
                  </li>
                ))}
              </ul>
              <div className="mb-5">
                <div className="font-display font-black text-3xl text-neon-magenta">от {p.price.toLocaleString('ru-RU')}</div>
                <div className="text-xs font-mono text-muted-foreground">₽/месяц</div>
              </div>
              <Button className="w-full font-mono font-bold bg-neon-magenta text-background hover:bg-neon-magenta/90 glow-magenta">
                Заказать
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* PC Builds */}
      <section id="calc" className="py-24 grid-bg relative scanline">
        <div className="container relative">
          <SectionTitle tag="// СБОРКА ПК" title="Соберём под ваши задачи" />
          <p className="text-center text-muted-foreground max-w-xl mx-auto mt-4 mb-12">
            Оставьте заявку — подберём оптимальную конфигурацию под бюджет и задачи. Сборка и тестирование 2–4 дня.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {PC_BUILDS.map((b, i) => (
              <div
                key={b.title}
                className="card-tech rounded-2xl p-7 flex gap-5 animate-float-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                  b.accent === 'cyan'
                    ? 'bg-neon-cyan/10 border-neon-cyan/25'
                    : 'bg-neon-magenta/10 border-neon-magenta/25'
                }`}>
                  <Icon name={b.icon} size={28} className={b.accent === 'cyan' ? 'text-neon-cyan' : 'text-neon-magenta'} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display font-bold text-base mb-2 ${b.accent === 'cyan' ? 'text-neon-cyan' : 'text-neon-magenta'}`}>
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{b.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {b.tags.map((tag) => (
                      <span key={tag} className={`text-xs font-mono px-2 py-0.5 rounded border ${
                        b.accent === 'cyan'
                          ? 'border-neon-cyan/30 text-neon-cyan/80 bg-neon-cyan/5'
                          : 'border-neon-magenta/30 text-neon-magenta/80 bg-neon-magenta/5'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 card-tech rounded-2xl p-8 md:p-12 text-center border-neon-cyan/30">
            <Icon name="PcCase" size={44} className="text-neon-cyan text-glow-cyan mx-auto mb-5" />
            <h3 className="font-display font-black text-2xl md:text-3xl mb-3">Готовы обсудить вашу сборку?</h3>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto">
              Расскажите о задачах и бюджете — рассчитаем стоимость и предложим оптимальную конфигурацию.
            </p>
            <Button size="lg" className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan h-12 px-10">
              <Icon name="Send" size={18} className="mr-2" />Оставить заявку
            </Button>
            <p className="text-xs text-muted-foreground mt-4 font-mono">Ответим в течение 2 часов</p>
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

      {/* Blog */}
      <section id="blog" className="container py-24">
        <SectionTitle tag="// БЛОГ" title="Новости Артели" />
        <p className="text-center text-muted-foreground max-w-xl mx-auto mt-4 mb-12">
          Обновления платформы, акции и полезные статьи об оборудовании.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {NEWS_PREVIEW.map((n, i) => (
            <div key={n.id} className="card-tech rounded-2xl overflow-hidden flex flex-col animate-float-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`h-1.5 w-full ${n.tag === 'Новость' ? 'bg-neon-cyan' : n.tag === 'Акция' ? 'bg-neon-magenta' : 'bg-neon-cyan/50'}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    n.tag === 'Акция'
                      ? 'border-neon-magenta/40 text-neon-magenta bg-neon-magenta/5'
                      : 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5'
                  }`}>{n.tag}</span>
                  <span className="text-xs text-muted-foreground font-mono">{n.date}</span>
                </div>
                <h3 className="font-display font-bold text-base mb-2 leading-snug">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{n.excerpt}</p>
                <button className="flex items-center gap-1 text-xs font-mono text-neon-cyan mt-4 hover:gap-2 transition-all">
                  Читать далее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/blog">
            <Button variant="outline" className="border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 font-mono font-bold px-8">
              <Icon name="Newspaper" size={16} className="mr-2" />Все новости
            </Button>
          </a>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-24">
        <SectionTitle tag="// КОНТАКТЫ" title="Связаться с нами" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {[
            { icon: 'Phone', label: 'Телефон', value: '+7 (800) 555-00-42', href: 'tel:+78005550042', accent: 'cyan' },
            { icon: 'Mail', label: 'Почта', value: 'hello@na40.ru', href: 'mailto:hello@na40.ru', accent: 'cyan' },
            { icon: 'MapPin', label: 'Дата-центр', value: 'Москва, ул. Серверная, 1', href: '#', accent: 'cyan' },
          ].map((c) => (
            <a key={c.label} href={c.href} className="card-tech rounded-xl p-6 flex items-center gap-4 hover:border-neon-cyan/50 transition-all">
              <div className="w-11 h-11 rounded-lg bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Icon name={c.icon} className="text-neon-cyan" size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <a href="https://t.me/artel_na" target="_blank" rel="noopener noreferrer"
            className="card-tech rounded-xl p-6 flex items-center gap-4 hover:border-neon-cyan/50 group transition-all">
            <div className="w-11 h-11 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0 text-xl">✈️</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono text-muted-foreground uppercase">Telegram</div>
              <div className="font-medium">Канал Артель NA</div>
              <div className="text-xs text-muted-foreground mt-0.5">Срочные новости и плановые работы</div>
            </div>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-1 transition-all shrink-0" />
          </a>
          <a href="https://vk.com/artel_na" target="_blank" rel="noopener noreferrer"
            className="card-tech rounded-xl p-6 flex items-center gap-4 hover:border-neon-magenta/50 group transition-all">
            <div className="w-11 h-11 rounded-lg bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center shrink-0 text-xl">🔵</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono text-muted-foreground uppercase">ВКонтакте</div>
              <div className="font-medium">Сообщество Артель NA</div>
              <div className="text-xs text-muted-foreground mt-0.5">Статьи, обзоры и полезные гайды</div>
            </div>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-neon-magenta group-hover:translate-x-1 transition-all shrink-0" />
          </a>
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