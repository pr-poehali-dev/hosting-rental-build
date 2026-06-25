import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

/* ─── Navigation ──────────────────────────────────────────────────── */
const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Тарифы VPS', href: '#pricing' },
  { label: 'Сборка ПК', href: '#builds' },
  { label: 'Блог', href: '#blog' },
  { label: 'Контакты', href: '#contacts' },
];

/* ─── VPS data ────────────────────────────────────────────────────── */
type StorageType = 'HDD' | 'SSD' | 'NVMe';
type VpsPlan = { name: string; cpu: string; ram: string; storage: string; prices: Record<StorageType, number> };

const VPS_PLANS: VpsPlan[] = [
  { name: '«Спутник 2.0»', cpu: '1 vCPU', ram: '1 Гб',  storage: '20 Гб',  prices: { HDD: 200,  SSD: 270,  NVMe: 350  } },
  { name: '«Восток 2.0»',  cpu: '1 vCPU', ram: '2 Гб',  storage: '50 Гб',  prices: { HDD: 310,  SSD: 400,  NVMe: 510  } },
  { name: '«Восход 2.0»',  cpu: '2 vCPU', ram: '4 Гб',  storage: '70 Гб',  prices: { HDD: 470,  SSD: 590,  NVMe: 750  } },
  { name: '«Союз 2.0»',    cpu: '4 vCPU', ram: '8 Гб',  storage: '100 Гб', prices: { HDD: 700,  SSD: 880,  NVMe: 1100 } },
  { name: '«Ангара 2.0»',  cpu: '8 vCPU', ram: '12 Гб', storage: '150 Гб', prices: { HDD: 1200, SSD: 1500, NVMe: 1900 } },
];

const DEDICATED = { name: '«Циолковский»', cpu: 'AMD Ryzen 9 5950X', cores: '16 ядер', ram: '128 Гб ОЗУ', storage: '1 ТБ NVMe', price: 11000 };

/* ─── PC Builds data ──────────────────────────────────────────────── */
const PC_BUILDS = [
  { icon: 'Gamepad2',    title: 'Игровая',          desc: 'Максимальный FPS под ваш бюджет и монитор. RTX последних поколений, быстрая оперативная память.',        tags: ['Высокий FPS', 'RTX / RX', 'RGB'] },
  { icon: 'Monitor',     title: 'Офисная',           desc: 'Тихий надёжный ПК для документов, браузера и видеозвонков. Работает годами без нареканий.',             tags: ['Тихий', 'Экономичный', 'Долговечный'] },
  { icon: 'BrainCircuit',title: 'Профессиональная',  desc: 'Рабочие станции для 3D, видеомонтажа и машинного обучения. GPU до RTX 4090, ECC-память.',              tags: ['Рендер / ML', 'ECC', 'GPU до RTX 4090'] },
  { icon: 'ServerCog',   title: 'Серверная',         desc: 'Домашние и корпоративные серверы, NAS-хранилища и инфраструктура для бизнеса под ключ.',               tags: ['RAID', 'NAS / HPC', 'Удалённый доступ'] },
];

/* ─── News data ───────────────────────────────────────────────────── */
export type NewsItem = { id: number; tag: string; date: string; title: string; excerpt: string; body: string };

export const ALL_NEWS: NewsItem[] = [
  { id: 1, tag: 'Новость',     date: '25 июня 2026', title: 'Запуск тарифа «Ангара 2.0» с 8 vCPU',                         excerpt: 'Расширяем линейку VPS: 8 ядер, 12 ГБ ОЗУ и выбор накопителя HDD / SSD / NVMe.',                                                   body: 'Тариф предназначен для высоконагруженных приложений, баз данных и веб-серверов. Доступны накопители HDD, SSD и NVMe. Канал до 100 Мбит/с и IP-адрес включены.' },
  { id: 2, tag: 'Акция',       date: '20 июня 2026', title: 'Скидка 20% при оплате VPS за 6 месяцев',                      excerpt: 'До 31 июля: оплатите любой VPS-тариф на полгода вперёд — скидка применяется автоматически.',                                        body: 'Акция на все тарифы линейки 2.0. Скидка применяется автоматически при выборе периода 6 месяцев в панели управления. Действует до 31 июля 2026.' },
  { id: 3, tag: 'Обновление',  date: '15 июня 2026', title: 'Новая панель управления: ребут за 10 секунд',                 excerpt: 'Перезапуск сервера теперь занимает менее 10 секунд. Добавлены графики нагрузки в реальном времени.',                               body: 'Реализованы: мгновенный ребут (<10 сек), графики CPU/RAM/Disk в реальном времени, двухфакторная аутентификация, улучшенный мобильный интерфейс.' },
  { id: 4, tag: 'Новость',     date: '10 июня 2026', title: '«Циолковский»: выделенный сервер на Ryzen 9 5950X',           excerpt: 'В каталоге появился 16-ядерный AMD Ryzen 9 5950X со 128 ГБ ОЗУ и 1 ТБ NVMe.',                                                       body: 'Флагманское предложение для ML-обучения, рендеринга и высоконагруженных сервисов. Идеально для задач, где важна максимальная однопоточная и многопоточная производительность.' },
  { id: 5, tag: 'Обновление',  date: '5 июня 2026',  title: 'Плановые работы 8 июня, 03:00–05:00 МСК',                    excerpt: 'Возможны кратковременные перебои в работе отдельных серверов. Данные сохранены.',                                                   body: 'Плановое обслуживание инфраструктуры 8 июня с 03:00 до 05:00 МСК. Перебои кратковременны. Оперативные обновления — в Telegram-канале.' },
  { id: 6, tag: 'Акция',       date: '1 июня 2026',  title: 'Бесплатная консультация по сборке ПК при аренде сервера',    excerpt: 'Новым клиентам при заказе выделенного сервера от 3 месяцев — бесплатный подбор рабочей станции.',                                   body: 'Предложение для новых клиентов. Заключите договор на аренду выделенного сервера от 3 месяцев — получите бесплатную консультацию по подбору и сборке рабочей станции. Действует до конца июня 2026.' },
];

const NEWS_PREVIEW = ALL_NEWS.slice(0, 3);

/* ─── Component ───────────────────────────────────────────────────── */
const Index = () => {
  const [storageType, setStorageType] = useState<StorageType>('HDD');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-display font-black text-xl tracking-widest">
            <Icon name="Hexagon" className="text-neon-cyan text-glow-cyan" size={24} />
            <span className="gradient-text">Артель NA</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-mono text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-neon-cyan transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold text-sm glow-cyan h-9 px-5">
            Заказать
          </Button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 grid-bg scanline overflow-hidden">
        <div className="absolute inset-0 grid-bg animate-grid opacity-30" />
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />

        <div className="container relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow text-xs font-mono text-neon-cyan mb-7 animate-float-up">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
            ОНЛАЙН · 99.99% UPTIME
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[1.08] mb-5 animate-float-up" style={{ animationDelay: '0.08s' }}>
            АРЕНДА СЕРВЕРОВ<br />И <span className="gradient-text">СБОРКА ПК</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-9 animate-float-up" style={{ animationDelay: '0.16s' }}>
            VPS от 200 ₽/мес, выделенные серверы и ПК под любые задачи. Техподдержка 24/7.
          </p>

          <div className="flex flex-wrap gap-3 justify-center animate-float-up" style={{ animationDelay: '0.24s' }}>
            <Button size="lg" className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan h-11 px-7" asChild>
              <a href="#pricing">Тарифы VPS</a>
            </Button>
            <Button size="lg" variant="outline" className="border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 font-mono font-bold h-11 px-7" asChild>
              <a href="#builds">Собрать ПК</a>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-10 mt-16 animate-float-up" style={{ animationDelay: '0.32s' }}>
            {[['VPS от 200 ₽', 'в месяц'], ['24/7', 'поддержка'], ['2–4 дня', 'сборка ПК']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="font-display font-black text-2xl md:text-3xl text-neon-cyan text-glow-cyan">{v}</div>
                <div className="text-xs font-mono text-muted-foreground mt-0.5 uppercase tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — два направления ─────────────────────────────── */}
      <section id="services" className="container py-20">
        <SectionTitle tag="// УСЛУГИ" title="Два направления" sub="Аренда вычислительных мощностей и сборка ПК под ключ — выберите нужное или закажите сразу оба." />

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {/* VPS / Серверы */}
          <a href="#pricing" className="card-tech rounded-2xl p-8 group hover:border-neon-cyan/60 transition-all block">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                <Icon name="Server" className="text-neon-cyan" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl mb-2 text-neon-cyan">Аренда серверов</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  VPS-тарифы от 200 ₽/мес и выделенные серверы. Процессоры Intel Xeon и AMD Ryzen, канал 100 Мбит/с, IP-адрес в подарок. Запуск за 5 минут.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['VPS', 'Выделенный сервер', 'Панель управления', 'HDD / SSD / NVMe'].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded border border-neon-cyan/25 text-neon-cyan/70 bg-neon-cyan/5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-neon-cyan mt-6 group-hover:gap-2 transition-all">
              Смотреть тарифы <Icon name="ArrowRight" size={13} />
            </div>
          </a>

          {/* Сборка ПК */}
          <a href="#builds" className="card-tech rounded-2xl p-8 group hover:border-neon-magenta/60 transition-all block">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center shrink-0">
                <Icon name="PcCase" className="text-neon-magenta" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl mb-2 text-neon-magenta">Сборка ПК</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Игровые, офисные, профессиональные и серверные конфигурации под ключ. Подбираем под бюджет, собираем и тестируем. Гарантия на сборку.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Игровые', 'Офисные', 'Рабочие станции', 'Серверы'].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded border border-neon-magenta/25 text-neon-magenta/70 bg-neon-magenta/5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-neon-magenta mt-6 group-hover:gap-2 transition-all">
              Оставить заявку <Icon name="ArrowRight" size={13} />
            </div>
          </a>
        </div>
      </section>

      {/* ── Pricing — VPS ──────────────────────────────────────────── */}
      <section id="pricing" className="py-20 grid-bg scanline relative">
        <div className="container relative">
          <SectionTitle tag="// ТАРИФЫ VPS" title="Аренда мощностей" sub="Процессоры Intel Xeon и AMD Ryzen 3–4,5 ГГц. Канал до 100 Мбит/с и IP-адрес бесплатно к каждому тарифу." />

          {/* Накопитель */}
          <div className="flex items-center justify-center gap-2 mt-10 mb-8">
            <span className="text-xs font-mono text-muted-foreground mr-1">Накопитель:</span>
            {(['HDD', 'SSD', 'NVMe'] as StorageType[]).map((t) => (
              <button
                key={t}
                onClick={() => setStorageType(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                  storageType === t
                    ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan glow-cyan'
                    : 'border-border text-muted-foreground hover:border-neon-cyan/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* VPS cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {VPS_PLANS.map((p, i) => (
              <div key={p.name} className="card-tech rounded-2xl p-5 flex flex-col animate-float-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <h4 className="font-display font-bold text-sm text-neon-cyan mb-4 leading-snug">{p.name}</h4>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {[
                    { icon: 'Cpu',          val: p.cpu },
                    { icon: 'MemoryStick',  val: p.ram + ' ОЗУ' },
                    { icon: 'HardDrive',    val: p.storage + ' ' + storageType },
                  ].map((r) => (
                    <li key={r.val} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name={r.icon} size={12} className="text-neon-cyan/50 shrink-0" />
                      {r.val}
                    </li>
                  ))}
                </ul>
                <div className="mb-4 border-t border-border pt-3">
                  <span className="font-display font-black text-xl gradient-text">от {p.prices[storageType].toLocaleString('ru-RU')}</span>
                  <span className="text-xs font-mono text-muted-foreground ml-1">₽/мес</span>
                </div>
                <Button className="w-full font-mono font-bold text-xs h-8 bg-secondary hover:bg-neon-cyan/15 hover:border-neon-cyan border border-border transition-all">
                  Заказать
                </Button>
              </div>
            ))}
          </div>

          {/* Dedicated — inline баннер */}
          <div className="mt-6 card-tech rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-neon-magenta/30">
            <div className="w-12 h-12 rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center shrink-0">
              <Icon name="Server" className="text-neon-magenta" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-neon-magenta uppercase tracking-widest mb-1">Выделенный сервер</div>
              <h3 className="font-display font-bold text-lg mb-1">{DEDICATED.name}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground font-mono">
                <span>{DEDICATED.cpu}</span>
                <span>{DEDICATED.cores}</span>
                <span>{DEDICATED.ram}</span>
                <span>{DEDICATED.storage}</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-display font-black text-2xl text-neon-magenta">от {DEDICATED.price.toLocaleString('ru-RU')} ₽</div>
              <div className="text-xs font-mono text-muted-foreground mb-3">в месяц</div>
              <Button className="font-mono font-bold bg-neon-magenta text-background hover:bg-neon-magenta/90 glow-magenta h-9 px-5">
                Заказать
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PC Builds ──────────────────────────────────────────────── */}
      <section id="builds" className="container py-20">
        <SectionTitle tag="// СБОРКА ПК" title="Под любые задачи" sub="Расскажите о задачах и бюджете — подберём конфигурацию и соберём за 2–4 дня с гарантией." />

        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {PC_BUILDS.map((b, i) => (
            <div key={b.title} className="card-tech rounded-2xl p-6 flex gap-4 animate-float-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                i % 2 === 0 ? 'bg-neon-cyan/10 border-neon-cyan/20' : 'bg-neon-magenta/10 border-neon-magenta/20'
              }`}>
                <Icon name={b.icon} size={24} className={i % 2 === 0 ? 'text-neon-cyan' : 'text-neon-magenta'} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-display font-bold text-base mb-1.5 ${i % 2 === 0 ? 'text-neon-cyan' : 'text-neon-magenta'}`}>{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{b.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {b.tags.map((t) => (
                    <span key={t} className={`text-xs font-mono px-2 py-0.5 rounded border ${
                      i % 2 === 0
                        ? 'border-neon-cyan/25 text-neon-cyan/70 bg-neon-cyan/5'
                        : 'border-neon-magenta/25 text-neon-magenta/70 bg-neon-magenta/5'
                    }`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 card-tech rounded-2xl p-8 text-center border-neon-cyan/20">
          <p className="text-muted-foreground mb-5 max-w-md mx-auto">
            Не знаете, что выбрать? Оставьте заявку — подскажем оптимальную конфигурацию и рассчитаем стоимость.
          </p>
          <Button size="lg" className="bg-neon-cyan text-background hover:bg-neon-cyan/90 font-mono font-bold glow-cyan h-11 px-8">
            <Icon name="Send" size={16} className="mr-2" />Оставить заявку
          </Button>
          <p className="text-xs text-muted-foreground mt-3 font-mono">Ответим в течение 2 часов</p>
        </div>
      </section>

      {/* ── Blog ───────────────────────────────────────────────────── */}
      <section id="blog" className="py-20 grid-bg scanline relative">
        <div className="container relative">
          <SectionTitle tag="// БЛОГ" title="Новости Артели" sub="Обновления платформы, акции и технические изменения." />

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {NEWS_PREVIEW.map((n, i) => (
              <div key={n.id} className="card-tech rounded-2xl overflow-hidden flex flex-col animate-float-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`h-1 w-full ${n.tag === 'Акция' ? 'bg-neon-magenta' : 'bg-neon-cyan'}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                      n.tag === 'Акция' ? 'border-neon-magenta/40 text-neon-magenta bg-neon-magenta/5' : 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5'
                    }`}>{n.tag}</span>
                    <span className="text-xs text-muted-foreground font-mono">{n.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm mb-2 leading-snug flex-1">{n.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{n.excerpt}</p>
                  <button className="flex items-center gap-1 text-xs font-mono text-neon-cyan hover:gap-2 transition-all self-start">
                    Читать <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/blog">
              <Button variant="outline" className="border-neon-cyan/35 text-neon-cyan hover:bg-neon-cyan/10 font-mono font-bold">
                <Icon name="Newspaper" size={15} className="mr-2" />Все новости
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contacts ───────────────────────────────────────────────── */}
      <section id="contacts" className="container py-20">
        <SectionTitle tag="// КОНТАКТЫ" title="Связаться с нами" sub="Техподдержка работает круглосуточно. Среднее время ответа — менее 5 минут." />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Реквизиты */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">Прямые контакты</h3>
            {[
              { icon: 'Phone',   label: 'Телефон',     value: '+7 (800) 555-00-42', href: 'tel:+78005550042' },
              { icon: 'Mail',    label: 'Почта',       value: 'hello@na40.ru',       href: 'mailto:hello@na40.ru' },
              { icon: 'MapPin',  label: 'Дата-центр',  value: 'Москва, ул. Серверная, 1', href: '#' },
            ].map((c) => (
              <a key={c.label} href={c.href} className="card-tech rounded-xl p-5 flex items-center gap-4 hover:border-neon-cyan/50 transition-all block">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} className="text-neon-cyan" size={18} />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase">{c.label}</div>
                  <div className="font-medium text-sm">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Соцсети + поддержка */}
          <div>
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">Сообщества</h3>
            <div className="space-y-4">
              <a href="https://t.me/artel_na" target="_blank" rel="noopener noreferrer"
                className="card-tech rounded-xl p-5 flex items-center gap-4 hover:border-neon-cyan/50 group transition-all block">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0 text-lg">✈️</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Telegram</div>
                  <div className="font-medium text-sm">Канал Артель NA</div>
                  <div className="text-xs text-muted-foreground">Срочные новости и плановые работы</div>
                </div>
                <Icon name="ArrowRight" size={15} className="text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-1 transition-all shrink-0" />
              </a>
              <a href="https://vk.com/artel_na" target="_blank" rel="noopener noreferrer"
                className="card-tech rounded-xl p-5 flex items-center gap-4 hover:border-neon-magenta/50 group transition-all block">
                <div className="w-10 h-10 rounded-lg bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center shrink-0 text-lg">🔵</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-muted-foreground uppercase">ВКонтакте</div>
                  <div className="font-medium text-sm">Сообщество Артель NA</div>
                  <div className="text-xs text-muted-foreground">Статьи, обзоры и полезные гайды</div>
                </div>
                <Icon name="ArrowRight" size={15} className="text-muted-foreground group-hover:text-neon-magenta group-hover:translate-x-1 transition-all shrink-0" />
              </a>

              {/* Support inline */}
              <div className="card-tech rounded-xl p-5 border-neon-magenta/20">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="LifeBuoy" className="text-neon-magenta" size={18} />
                  <span className="font-display font-bold text-sm">Техподдержка 24/7</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Мониторинг инфраструктуры, удалённая диагностика и настройка. Реагируем за минуты.</p>
                <Button size="sm" className="bg-neon-magenta text-background hover:bg-neon-magenta/90 font-mono font-bold glow-magenta text-xs h-8">
                  <Icon name="MessageCircle" size={14} className="mr-1.5" />Открыть чат
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 mt-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-display font-black tracking-widest">
            <Icon name="Hexagon" className="text-neon-cyan" size={18} />
            <span className="gradient-text text-sm">Артель NA</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">© 2026 Артель NA · Аренда серверов и сборка ПК</p>
          <nav className="flex gap-5 text-xs font-mono text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-neon-cyan transition-colors">{n.label}</a>
            ))}
          </nav>
        </div>
      </footer>

    </div>
  );
};

/* ─── SectionTitle ────────────────────────────────────────────────── */
const SectionTitle = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="text-center">
    <div className="font-mono text-xs text-neon-magenta tracking-widest mb-3">{tag}</div>
    <h2 className="font-display font-black text-3xl md:text-5xl">{title}</h2>
    {sub && <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mt-3">{sub}</p>}
  </div>
);

export default Index;
