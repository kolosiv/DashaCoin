import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LineChart as LineChartIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

type RomancePoint = {
  label: string;
  value: number;
  tooltip?: string;
};

const romanceData: RomancePoint[] = [
    // --- НАЧАЛО (Genesis) ---
    { label: 'Genesis: Знакомство', value: 10, tooltip: 'Запуск майннета любви' },
    { label: 'First Kiss', value: 35, tooltip: 'Первый поцелуй. Первая успешная транзакция' },
    
    // --- ВЗРЫВНОЙ РОСТ ---
    { label: 'GOD CANDLE: Первая ночь', value: 120, tooltip: 'Взрывной рост объемов торгов 🔞' },
    { label: 'Gas Fee', value: 85, tooltip: 'Тот самый "пук". Кратковременный обвал рынка из-за утечки газа 💨' },
    
    // --- ЖИЗНЬ ВМЕСТЕ ---
    { label: 'Merger: Съехались', value: 130, tooltip: 'Слияние активов и жилплощади' },
    
    // --- КАЛИНИНГРАД (Вместо первой поездки) ---
    { label: 'Baltic Expansion: Калининград', value: 160, tooltip: 'Экспансия на запад(Калининград). Поиск янтаря и вайба' },
  
    // --- ПИЦЦА (Стабильный рост) ---
    { label: 'Proof of Pizza: Пицца от Даши', value: 175, tooltip: 'Фундаментальный анализ показал: это безумно вкусно 🍕' },
  
    // --- МОСКВА (Перед морем) ---
    { label: 'Capital Listing: Поездка в Москву', value: 200, tooltip: 'Capital Listing: Поездка в Москву' },
  
    // --- ССОРА (Коррекция перед туземуном) ---
    { label: 'Stress Test: Конструктивная ссора', value: 160, tooltip: 'Здоровая коррекция рынка. Выпуск пара перед новым ростом 📉' },
  
    // --- ЕГИПЕТ (Вместо моря - Туземун) ---
    { label: 'Pyramid Pump: Египет', value: 280, tooltip: 'Египет памп. Пирамиды (но не финансовые!) 🐫' },
  
    // --- ТЕКУЩИЙ МОМЕНТ ---
    { label: 'To The Moon', value: 350, tooltip: 'Ракета заправлена, летим в вечность 🚀' },
  ];

type HeaderTickerState = {
  pseudoVolume: number;
  pseudoFunding: number;
};

const useHeaderTicker = () => {
  const [state, setState] = useState<HeaderTickerState>({
    pseudoVolume: 123456.78,
    pseudoFunding: 0.01,
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setState((prev) => {
        const volDelta = (Math.random() - 0.5) * 2000;
        const fundingDelta = (Math.random() - 0.5) * 0.002;
        return {
          pseudoVolume: Math.max(100000, prev.pseudoVolume + volDelta),
          pseudoFunding: +(prev.pseudoFunding + fundingDelta).toFixed(3),
        };
      });
    }, 1200);

    return () => window.clearInterval(id);
  }, []);

  return state;
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: RomancePoint }[];
}) => {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="rounded-xl border border-pink-500/40 bg-slate-900/90 px-4 py-3 shadow-lg shadow-pink-500/30 backdrop-blur"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pink-400">
        <LineChartIcon className="h-3 w-3" />
        DSH / VNY
      </div>
      <div className="mt-2 text-sm font-medium text-slate-50">
        {point.tooltip ?? point.label}
      </div>
      <div className="mt-1 text-xs text-slate-400">
        Romantic PnL: <span className="font-mono text-pink-400">+{point.value.toFixed(2)} DSH</span>
      </div>
    </motion.div>
  );
};

const BuyOrderRow = ({ label, price }: { label: string; price: string }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className="flex items-center justify-between rounded-lg bg-emerald-500/5 px-3 py-2 text-xs text-emerald-100/90"
  >
    <span className="truncate">{label}</span>
    <span className="font-mono text-[11px] text-emerald-300">{price}</span>
  </motion.div>
);

const App = () => {
  const { pseudoVolume, pseudoFunding } = useHeaderTicker();
  const [showToast, setShowToast] = useState(false);

  const maxValue = useMemo(
    () => Math.max(...romanceData.map((d) => d.value)) * 1.1,
    []
  );

  const handleHodlClick = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#ec4899', '#f97316', '#22c55e', '#a855f7'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#ec4899', '#f97316', '#22c55e', '#a855f7'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();

    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3800);
  };

  return (
    <div className="bg-grid min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.18),transparent_55%)] mix-blend-screen opacity-80" />

      <div className="relative z-10 flex min-h-screen flex-col px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 flex flex-col gap-4 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:mb-5 sm:px-6 sm:py-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 shadow-neon-pink sm:h-11 sm:w-11">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500"
              >
                <Heart className="h-4 w-4 text-slate-50" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-pink-500/40 blur-xl" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400/90">
                  DASHACOIN
                </span>
                <span className="rounded-full bg-pink-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-pink-300">
                  $DSH
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-end gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-400/90">DSH/VNY</span>
                  <span className="text-3xl font-semibold leading-none text-pink-400 sm:text-4xl">
                    ∞
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      24h PnL
                    </span>
                    <span className="font-mono text-xs text-emerald-400">
                      +10,000
                      <span className="align-baseline text-[10px]">%</span> 🚀
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      24h Volume
                    </span>
                    <span className="font-mono text-xs text-slate-200">
                      {pseudoVolume.toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      <span className="text-[10px] text-slate-500">DSH</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Funding
                    </span>
                    <span className="font-mono text-xs text-emerald-300">
                      {pseudoFunding > 0 ? '+' : ''}
                      {pseudoFunding.toFixed(3)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-400/90 lg:justify-end">
            <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5">
              Маржинальная торговля
            </span>
            <span className="rounded-full border border-slate-800/80 bg-slate-950/80 px-3 py-1.5">
              Фьючерсы любви
            </span>
            <span className="rounded-full border border-slate-800/80 bg-slate-950/80 px-3 py-1.5">
              P2P Обнимашки
            </span>
          </nav>
        </motion.header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-5">
          {/* Chart */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex-1 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-3 shadow-[0_0_45px_rgba(15,23,42,1)] backdrop-blur-xl sm:p-4 lg:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                  <span className="h-1.5 w-4 rounded-full bg-pink-500" />
                  DSH / VNY
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  Романтический ценовой график. Тренд:{' '}
                  <span className="font-semibold text-emerald-400">только вверх</span>.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <div className="flex flex-col items-end">
                  <span className="uppercase tracking-[0.2em] text-slate-500">ATH</span>
                  <span className="font-mono text-xs text-pink-300">
                    300.00 <span className="text-[10px] text-slate-500">HEARTS</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-[260px] sm:h-[320px] lg:h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={romanceData}
                  margin={{ top: 12, right: 12, left: -20, bottom: 8 }}
                >
                  <defs>
                    <linearGradient id="colorLove" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.7} />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#020617" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={{ stroke: '#1f2937' }}
                    interval={1}
                    height={40}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    domain={[0, maxValue]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ec4899"
                    strokeWidth={2.4}
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                      stroke: '#020617',
                      fill: '#ec4899',
                    }}
                    activeDot={{
                      r: 6,
                    }}
                    fill="url(#colorLove)"
                    isAnimationActive
                    animationDuration={1600}
                    animationBegin={200}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Order Book */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="w-full max-w-full rounded-3xl border border-slate-800/80 bg-slate-950/80 p-3 text-xs shadow-[0_0_40px_rgba(15,23,42,1)] backdrop-blur-xl sm:p-4 lg:w-80 lg:flex-shrink-0"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Биржевой стакан
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Глубина рынка любви для пары&nbsp;
                  <span className="font-mono text-[11px] text-slate-300">DSH/VNY</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Sell Orders */}
              <div className="rounded-2xl border border-rose-800/70 bg-gradient-to-b from-rose-950/60 via-slate-950/80 to-slate-950/80 px-3 py-3">
                <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-rose-300">
                  <span>Продажи (Ask)</span>
                  <span className="font-mono text-[10px] text-rose-400/80">0.0000</span>
                </div>
                <div className="flex h-[86px] items-center justify-center text-center text-[11px] text-rose-200/80">
                  <p>Предложений нет. Этот актив бесценен.</p>
                </div>
              </div>

              {/* Buy Orders */}
              <div className="rounded-2xl border border-emerald-800/70 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-emerald-950/40 px-3 py-3">
                <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-emerald-300">
                  <span>Покупки (Bid)</span>
                  <span className="font-mono text-[10px] text-emerald-400/90">Любовь/DSH</span>
                </div>
                <div className="space-y-1.5">
                  <BuyOrderRow label="Миллион поцелуев" price="1.0000" />
                  <BuyOrderRow label="Вкусный ужин" price="0.9900" />
                  <BuyOrderRow label="Массаж" price="0.9800" />
                  <BuyOrderRow label="Вечная верность" price="0.9500" />
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Action Panel */}
        <motion.footer
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="mt-4 flex flex-col gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/90 px-3 py-3 shadow-[0_0_30px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3.5 lg:mt-6"
        >
          <div className="max-w-xl text-[11px] text-slate-400">
            <p>
              Нажми <span className="font-semibold text-pink-400">HODL FOREVER</span>, чтобы
              подтвердить смарт-контракт любви. Шортить этот актив запрещено протоколом.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01, boxShadow: '0 0 35px rgba(236,72,153,0.9)' }}
              onClick={handleHodlClick}
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-50 shadow-neon-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:flex-none sm:px-7 sm:py-3"
            >
              <Heart className="h-4 w-4 fill-current" />
              HODL FOREVER
            </motion.button>
            <button
              type="button"
              disabled
              title="Невозможно открыть шорт. Тренд только вверх!"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500/80 opacity-60"
            >
              Short
            </button>
          </div>
        </motion.footer>

        {/* Toast / Modal */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4"
            >
              <div className="pointer-events-auto max-w-md rounded-2xl border border-pink-500/50 bg-slate-950/95 px-4 py-3 text-sm shadow-[0_0_40px_rgba(236,72,153,0.8)] backdrop-blur-xl sm:px-5 sm:py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/20">
                    <Heart className="h-3.5 w-3.5 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
                      Смарт-контракт подтвержден
                    </div>
                    <div className="mt-1 text-sm text-slate-50">
                      Вместе навсегда! <span className="text-pink-400">❤️</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      Хэш-транзакции: <span className="font-mono text-pink-300">DSH-∞-VNY</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;

