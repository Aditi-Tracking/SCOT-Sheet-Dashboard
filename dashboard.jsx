import { useState, useMemo, useEffect, useCallback, useRef } from "react";

const FALLBACK_DATA = [
  { name: "ZUBIN'S ROYAL FLEET", category: "PLATINUM", outstanding: 798471.2, outstandingDays: "Above 90 Days", frequency: "Once a Week", calls: { 11: null, 12: null } },
  { name: "CITY COMMUTE & TECH PVT LTD", category: "PLATINUM", outstanding: 735362.22, outstandingDays: "Above 90 Days", frequency: "Once a Week", calls: { 11: "NO" } },
  { name: "SHREE SAI GANESH TOURS (SGTTL)", category: "SILVER", outstanding: 312350.01, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES", 14: "YES", 16: "YES" } },
  { name: "EVOLV ELECTRIC PVT LTD", category: "SILVER", outstanding: 0, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "NO" } },
  { name: "THE CHECKMATE HOSPITALITY", category: "GOLD", outstanding: 146865.16, outstandingDays: "Above 90 Days", frequency: "Twice a Week", calls: { 11: "YES" } },
  { name: "OM SAI TRAVELS RENT CAR", category: "SILVER", outstanding: 103279, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "PRIDE TRAVELS PVT LTD", category: "SILVER", outstanding: 92040, outstandingDays: "Above 30 Days", frequency: "Thrice a Week", calls: { 11: "YES", 14: "YES" } },
  { name: "DIGIANA INDUSTRIES PVT LTD", category: "SILVER", outstanding: 89054, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SARGO OVERSEAS PVT LTD", category: "SILVER", outstanding: 88500, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "GIRIRAJ TRAVEL", category: "SILVER", outstanding: 58115, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 7: "YES", 11: "YES" } },
  { name: "AARYA TRAVELS (GHANSOLI)", category: "SILVER", outstanding: 57948, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "NO", 12: "YES", 13: "YES", 14: "YES" } },
  { name: "MAULI MOTORS", category: "SILVER", outstanding: 56640, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 13: "YES" } },
  { name: "ASHISH RENT A CAR (WORLI)", category: "SILVER", outstanding: 54162, outstandingDays: "Above 30 Days", frequency: "Thrice a Week", calls: { 11: "YES", 14: "YES" } },
  { name: "DESTINY TRAVELS AND TOURS", category: "GOLD", outstanding: 53100, outstandingDays: "Above 90 Days", frequency: "Twice a Week", calls: { 11: "YES", 13: "YES", 14: "YES" } },
  { name: "SADICCHA UDYOG SAMUH", category: "SILVER", outstanding: 53100, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "GARGI EARTHMOVERS", category: "SILVER", outstanding: 52554.02, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "MUMBAI CAR RENTAL", category: "SILVER", outstanding: 52440, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "TRAVELLING SOLUTIONS PVT LTD", category: "SILVER", outstanding: 50976, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SAI LINKS", category: "PLATINUM", outstanding: 50608, outstandingDays: "Above 90 Days", frequency: "Once a Week", calls: { 9: "YES", 13: "YES", 14: "YES" } },
  { name: "METROLINES", category: "GOLD", outstanding: 49000, outstandingDays: "Above 90 Days", frequency: "Twice a Week", calls: { 9: "YES", 10: "YES", 13: "YES" } },
  { name: "LAXMI NARAYAN TRAVELS - LNT", category: "SILVER", outstanding: 45873, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES" } },
  { name: "VIVEK BANGERA", category: "SILVER", outstanding: 41241, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SAHYADHRI LOGISTICS PVT LTD", category: "SILVER", outstanding: 39356, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 13: "YES", 14: "YES" } },
  { name: "OM SAI ENTERPRISES", category: "SILVER", outstanding: 39242, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "NO" } },
  { name: "ANTONY AND SONS", category: "GOLD", outstanding: 35400, outstandingDays: "Above 90 Days", frequency: "Twice a Week", calls: { 11: "YES", 14: "YES" } },
  { name: "S.G.TOURS & TRAVELS (SGTTL)", category: "SILVER", outstanding: 35400, outstandingDays: "0 to 30 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES" } },
  { name: "PLUTO TRAVELS INDIA PVT LTD", category: "SILVER", outstanding: 35360, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 14: "NO" } },
  { name: "SHRI GANESH WATER SUPPLIERS", category: "SILVER", outstanding: 34356, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES" } },
  { name: "SHIDHI TRANSPORT", category: "SILVER", outstanding: 33896, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "NO" } },
  { name: "GOKUL FREIGHT CARRIER (PUNE)", category: "GOLD", outstanding: 29028, outstandingDays: "Above 90 Days", frequency: "Twice a Week", calls: { 12: "YES", 13: "YES", 14: "YES" } },
  { name: "NEW BHARAT TRANSPORT", category: "SILVER", outstanding: 28320, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SAKSHI TOURS & TRAVELS (PUNE)", category: "SILVER", outstanding: 28320, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SAGAR TRAVELS", category: "SILVER", outstanding: 26860, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES", 14: "YES" } },
  { name: "DREAM MERCHANT", category: "SILVER", outstanding: 26490, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 13: "YES" } },
  { name: "PRASHANT ROADLINES", category: "SILVER", outstanding: 25842, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES" } },
  { name: "SAI GANESH ENTERPRISE", category: "SILVER", outstanding: 25488, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SHREE SAI TRANSPORT", category: "SILVER", outstanding: 25488, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 14: "YES" } },
  { name: "BUTHELLO TRAVELS", category: "SILVER", outstanding: 23954, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 14: "NO" } },
  { name: "SHREE SAI GANESH TOURS LLP (SGTTL)", category: "SILVER", outstanding: 23850, outstandingDays: "0 to 30 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 13: "YES" } },
  { name: "J K TRANSPORT & LOGISTICS", category: "SILVER", outstanding: 23600, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "BUTHELLO TRAVELS (RYLAN)", category: "SILVER", outstanding: 23010, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 14: "NO" } },
  { name: "GOODLUCK TRANSPORTS WORLI", category: "SILVER", outstanding: 22500, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SANJAY TRAVEL", category: "SILVER", outstanding: 22250, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES", 14: "YES" } },
  { name: "PRAGATI TRAVEL LINE", category: "SILVER", outstanding: 22125, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES" } },
  { name: "HANS WAHINI EXPRESS CARGO", category: "SILVER", outstanding: 22000, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 13: "YES" } },
  { name: "ASHOK YELLAPPA GUNJALKAR", category: "SILVER", outstanding: 21535, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "SHREE SAI ENTERPRISE (MUMBAI)", category: "SILVER", outstanding: 21240, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "MRL TRANSPORT", category: "SILVER", outstanding: 20884, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "NO" } },
  { name: "TULIP NESTZ HOSPITALITY", category: "SILVER", outstanding: 20790, outstandingDays: "Above 60 Days", frequency: "Thrice a Week", calls: { 12: "YES", 14: "NO" } },
  { name: "SHELU KUMAR", category: "SILVER", outstanding: 20160, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
  { name: "AIR PARCEL SERVICE LLP", category: "SILVER", outstanding: 19824, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 14: "YES" } },
  { name: "NIRA KARS", category: "SILVER", outstanding: 19234, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES" } },
  { name: "KHUSHI INTERNATIONAL", category: "SILVER", outstanding: 18482, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 14: "YES" } },
  { name: "LUCKY READY MIX CONCRETE", category: "SILVER", outstanding: 16107, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 13: "YES" } },
  { name: "MADHUBAN MOTORS (KURLA)", category: "SILVER", outstanding: 14868, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 12: "YES", 13: "YES" } },
  { name: "DAVID MOTORS", category: "GOLD", outstanding: 14750, outstandingDays: "Above 30 Days", frequency: "Twice a Week", calls: { 11: "NO", 12: "YES", 13: "NO", 14: "YES" } },
  { name: "LINK WAYS", category: "PLATINUM", outstanding: 12180, outstandingDays: "Above 90 Days", frequency: "Once a Week", calls: { 11: "NO", 13: "YES" } },
  { name: "ZENSIS CORPORATE SERVICES", category: "SILVER", outstanding: 7080, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: { 11: "YES", 12: "YES", 13: "YES", 14: "YES" } },
  { name: "KHUSHAL LOGISTICS", category: "GOLD", outstanding: 6726, outstandingDays: "Above 60 Days", frequency: "Twice a Week", calls: {} },
  { name: "VIRGIN CAR RENTAL", category: "SILVER", outstanding: -4500, outstandingDays: "Above 90 Days", frequency: "Thrice a Week", calls: {} },
];

const WEEKS = [
  { label: "W1", full: "Week 1 (1-7)", days: [1,2,3,4,5,6,7], start: 1, end: 7 },
  { label: "W2", full: "Week 2 (8-14)", days: [8,9,10,11,12,13,14], start: 8, end: 14 },
  { label: "W3", full: "Week 3 (15-21)", days: [15,16,17,18,19,20,21], start: 15, end: 21 },
  { label: "W4", full: "Week 4 (22-28)", days: [22,23,24,25,26,27,28], start: 22, end: 28 },
  { label: "W5", full: "Week 5 (29-31)", days: [29,30,31], start: 29, end: 31 },
];
const FREQ_MAP = { "Once a Week": 1, "Twice a Week": 2, "Thrice a Week": 3 };

const T = {
  teal: "#3c8d99", tealDark: "#2a7080", tealDeep: "#1b5b66",
  pink: "#e8175d", pinkLight: "#fce4ec",
  yellow: "#f7c948", yellowLight: "#fff8e1",
  green: "#27ae60", greenLight: "#e8f5e9",
  orange: "#e67e22",
  white: "#ffffff", bg: "#f0f2f5", card: "#ffffff",
  text: "#2c3e50", textLight: "#7f8c8d", border: "#e8ecf1",
};

function getWeeklyData(client, weekDays) {
  const required = FREQ_MAP[client.frequency] || 3;
  let yesCalls = 0, noCalls = 0, totalAttempts = 0;
  weekDays.forEach(d => {
    const v = client.calls[d];
    if (v === "YES") { yesCalls++; totalAttempts++; }
    else if (v === "NO") { noCalls++; totalAttempts++; }
  });
  return { required, yesCalls, noCalls, totalAttempts, met: yesCalls >= required, shortfall: Math.max(0, required - yesCalls) };
}

const R = String.fromCharCode(8377);
const fmt = n => {
  if (n === 0) return R + "0";
  if (n < 0) return "-" + R + Math.abs(n).toLocaleString("en-IN");
  return R + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
};
const fmtShort = n => {
  if (n >= 10000000) return R + (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return R + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return R + (n / 1000).toFixed(1) + "K";
  return fmt(n);
};

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 400);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return w;
}

/* ── SVG Icons ── */
const Icon = ({ type, size = 16, color = "#fff" }) => {
  const s = { width: size, height: size, display: "inline-block", verticalAlign: "middle" };
  const p = { fill: "none", stroke: color, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "users") return <svg style={s} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (type === "rupee") return <svg style={s} viewBox="0 0 24 24" {...p}><path d="M6 3h12M6 8h12M6 3v5"/><path d="M14 8c0 4-4 6-8 8l10 5"/></svg>;
  if (type === "check") return <svg style={s} viewBox="0 0 24 24" {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
  if (type === "alert") return <svg style={s} viewBox="0 0 24 24" {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  if (type === "search") return <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
  if (type === "refresh") return <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
  if (type === "zap") return <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  return null;
};

/* ── UI Components ── */
const StatusBadge = ({ met, shortfall, totalAttempts }) => {
  const c = totalAttempts === 0
    ? { bg: T.pinkLight, color: T.pink, border: "#f8bbd0", label: "NO CALLS", dot: T.pink }
    : met
    ? { bg: T.greenLight, color: T.green, border: "#a5d6a7", label: "ON TRACK", dot: T.green }
    : { bg: T.yellowLight, color: T.orange, border: "#ffe082", label: "SHORT BY " + shortfall, dot: T.orange };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: c.bg, color: c.color, border: "1.5px solid " + c.border }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {c.label}
    </span>
  );
};

const CAT_S = { PLATINUM: { bg: "#f3e5f5", color: "#7b1fa2", border: "#ce93d8" }, GOLD: { bg: T.yellowLight, color: T.orange, border: "#ffe082" }, SILVER: { bg: "#e3f2fd", color: "#1565c0", border: "#90caf9" } };
const CategoryPill = ({ category }) => { const c = CAT_S[category] || CAT_S.SILVER; return <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", background: c.bg, color: c.color, border: "1.5px solid " + c.border }}>{category}</span>; };
const FreqPill = ({ frequency }) => { const m = { "Once a Week": { bg: "#fce4ec", color: "#c2185b", border: "#f48fb1" }, "Twice a Week": { bg: "#fff3e0", color: "#e65100", border: "#ffcc80" }, "Thrice a Week": { bg: "#e0f2f1", color: "#00695c", border: "#80cbc4" } }; const c = m[frequency] || m["Thrice a Week"]; return <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 9, fontWeight: 700, background: c.bg, color: c.color, border: "1px solid " + c.border }}>{frequency}</span>; };
const DaysPill = ({ outstandingDays }) => { const m = { "0 to 30 Days": { bg: T.greenLight, color: "#2e7d32", border: "#a5d6a7" }, "Above 30 Days": { bg: T.yellowLight, color: "#f57f17", border: "#ffe082" }, "Above 60 Days": { bg: "#fff3e0", color: "#e65100", border: "#ffcc80" }, "Above 90 Days": { bg: T.pinkLight, color: "#c62828", border: "#ef9a9a" } }; const c = m[outstandingDays] || m["Above 90 Days"]; return <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 9, fontWeight: 700, background: c.bg, color: c.color, border: "1px solid " + c.border }}>{outstandingDays}</span>; };

const DayDots = ({ client, weekDays }) => (
  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
    {weekDays.map(d => {
      const v = client.calls[d];
      const s = v === "YES" ? { bg: "#c8e6c9", border: T.green, color: "#1b5e20" } : v === "NO" ? { bg: "#ffcdd2", border: T.pink, color: "#b71c1c" } : { bg: "#f5f5f5", border: "#e0e0e0", color: "#bdbdbd" };
      return <div key={d} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, background: s.bg, border: "1.5px solid " + s.border, color: s.color }}>{d}</div>;
    })}
  </div>
);

const KpiGauge = ({ value, label, icon, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, background: color, borderRadius: 12, padding: "10px 14px", flex: 1, minWidth: 0 }}>
    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon type={icon} size={18} color="#fff" />
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Outfit'", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  </div>
);

/* ═══════════ MAIN ═══════════ */
export default function Dashboard() {
  const [rawData, setRawData] = useState(FALLBACK_DATA);
  const [apiUrl, setApiUrl] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncError, setSyncError] = useState("");
  const [connected, setConnected] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [fetchTime, setFetchTime] = useState(null);

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("outstanding");
  const [expandedCard, setExpandedCard] = useState(null);

  const width = useWidth();
  const isMobile = width < 480;
  const isDesktop = width >= 768;
  const week = WEEKS[selectedWeek];
  const timerRef = useRef(null);

  /* ── Fetch from Apps Script API ── */
  const fetchData = useCallback(async (url, silent) => {
    if (!url) return;
    if (!silent) setLoading(true);
    setSyncError("");
    const start = Date.now();

    try {
      // Use JSONP approach to avoid any CORS issues
      const callbackName = "_sheetCb_" + Date.now();
      const jsonpUrl = url + (url.includes("?") ? "&" : "?") + "callback=" + callbackName;

      const result = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Request timed out after 15s"));
          cleanup();
        }, 15000);

        const cleanup = () => {
          clearTimeout(timeout);
          delete window[callbackName];
          if (script.parentNode) script.parentNode.removeChild(script);
        };

        window[callbackName] = (data) => {
          cleanup();
          resolve(data);
        };

        const script = document.createElement("script");
        script.src = jsonpUrl;
        script.onerror = () => {
          cleanup();
          // Fallback: try direct fetch
          fetch(url)
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        };
        document.head.appendChild(script);
      });

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setRawData(result.data);
        setConnected(true);
        setLastSync(new Date());
        setFetchTime(Date.now() - start);
      } else {
        throw new Error("Invalid response. Got " + (result.count || 0) + " rows.");
      }
    } catch (e) {
      if (!silent) setSyncError(e.message || "Failed to fetch");
    }
    if (!silent) setLoading(false);
  }, []);

  /* Auto-refresh */
  useEffect(() => {
    if (!connected || !apiUrl) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => fetchData(apiUrl, true), refreshInterval * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [connected, apiUrl, refreshInterval, fetchData]);

  /* ── Data processing ── */
  const processedData = useMemo(() => rawData.map(client => {
    const weekData = getWeeklyData(client, week.days);
    let status = "on_track";
    if (weekData.totalAttempts === 0) status = "no_calls";
    else if (!weekData.met) status = "behind";
    return { ...client, weekData, status };
  }), [rawData, selectedWeek]);

  const filtered = useMemo(() => {
    let data = [...processedData];
    if (categoryFilter !== "ALL") data = data.filter(d => d.category === categoryFilter);
    if (statusFilter !== "ALL") data = data.filter(d => d.status === statusFilter);
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    data.sort((a, b) => sortBy === "outstanding" ? b.outstanding - a.outstanding : sortBy === "shortfall" ? b.weekData.shortfall - a.weekData.shortfall : a.name.localeCompare(b.name));
    return data;
  }, [processedData, categoryFilter, statusFilter, searchTerm, sortBy]);

  const stats = useMemo(() => {
    const total = processedData.length;
    const onTrack = processedData.filter(d => d.status === "on_track").length;
    const behind = processedData.filter(d => d.status === "behind").length;
    const noCalls = processedData.filter(d => d.status === "no_calls").length;
    const totalOutstanding = processedData.reduce((s, d) => s + Math.max(0, d.outstanding), 0);
    const flaggedOutstanding = processedData.filter(d => d.status === "no_calls").reduce((s, d) => s + Math.max(0, d.outstanding), 0);
    const complianceRate = total > 0 ? Math.round((onTrack / total) * 100) : 0;
    const catCounts = { PLATINUM: 0, GOLD: 0, SILVER: 0 };
    processedData.forEach(d => { if (catCounts[d.category] !== undefined) catCounts[d.category]++; });
    return { total, onTrack, behind, noCalls, totalOutstanding, flaggedOutstanding, complianceRate, catCounts };
  }, [processedData]);

  const pad = isDesktop ? "0 24px" : "0 14px";

  return (
    <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: T.bg, color: T.text, minHeight: "100vh", maxWidth: isDesktop ? 960 : 600, margin: "0 auto", paddingBottom: 60 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ═══ HEADER ═══ */}
      <div style={{ background: "linear-gradient(135deg, " + T.tealDeep + " 0%, " + T.teal + " 60%, " + T.tealDark + " 100%)", padding: isDesktop ? "18px 24px 14px" : "16px 14px 12px", position: "sticky", top: 0, zIndex: 30, boxShadow: "0 3px 16px rgba(44,62,80,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Collection Call Tracker</div>
            <div style={{ fontSize: isDesktop ? 24 : 20, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>March 2026</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setShowSetup(!showSetup)} style={{ background: connected ? "rgba(39,174,96,0.3)" : "rgba(255,255,255,0.15)", border: connected ? "1.5px solid rgba(39,174,96,0.6)" : "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: connected ? "#2ecc71" : "#95a5a6", display: "inline-block", animation: connected ? "pulse 2s infinite" : "none" }} />
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{connected ? "LIVE" : "CONNECT"}</span>
            </button>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: "'Outfit'" }}>{stats.complianceRate}%</span>
            </div>
          </div>
        </div>

        {/* Setup Panel */}
        {showSetup && (
          <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: 14, marginBottom: 10, backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Icon type="zap" size={14} color={T.yellow} />
              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Apps Script API (Fastest Method)</span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: T.yellow, marginBottom: 4 }}>One-time setup (2 minutes):</div>
              <div>1. Open your Google Sheet</div>
              <div>2. Go to <b style={{ color: "#fff" }}>Extensions &rarr; Apps Script</b></div>
              <div>3. Delete existing code, paste the script provided</div>
              <div>4. Click <b style={{ color: "#fff" }}>Deploy &rarr; New deployment</b></div>
              <div>5. Type: <b style={{ color: "#fff" }}>Web app</b> | Execute as: <b style={{ color: "#fff" }}>Me</b> | Access: <b style={{ color: "#fff" }}>Anyone</b></div>
              <div>6. Click Deploy, authorize, then copy the URL below</div>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              <input
                type="text" placeholder="Paste Apps Script Web App URL..."
                value={apiUrl} onChange={e => { setApiUrl(e.target.value); setSyncError(""); }}
                style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, fontFamily: "'Outfit'", outline: "none", minWidth: 0 }}
              />
              <button onClick={() => fetchData(apiUrl, false)} disabled={loading} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: T.yellow, color: T.tealDeep, fontWeight: 800, fontSize: 12, cursor: loading ? "wait" : "pointer", fontFamily: "'Outfit'", whiteSpace: "nowrap", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Syncing..." : "Connect"}
              </button>
            </div>

            {syncError && <div style={{ color: "#ffab91", fontSize: 11, marginTop: 8, fontWeight: 600, lineHeight: 1.4, background: "rgba(255,87,34,0.15)", padding: "6px 10px", borderRadius: 6 }}>{syncError}</div>}

            {connected && (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ecc71", display: "inline-block" }} />
                    <span style={{ color: "#a5d6a7", fontSize: 11, fontWeight: 700 }}>Connected</span>
                    {fetchTime && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>({fetchTime}ms)</span>}
                  </div>
                  <button onClick={() => fetchData(apiUrl, false)} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon type="refresh" size={12} color="#fff" />
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>Refresh Now</span>
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>Auto-refresh every:</span>
                  {[15, 30, 60].map(s => (
                    <button key={s} onClick={() => setRefreshInterval(s)} style={{ padding: "2px 8px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, background: refreshInterval === s ? T.yellow : "rgba(255,255,255,0.1)", color: refreshInterval === s ? T.tealDeep : "rgba(255,255,255,0.6)" }}>
                      {s}s
                    </button>
                  ))}
                </div>
                {lastSync && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>Last synced: {lastSync.toLocaleTimeString()}</div>}
              </div>
            )}
          </div>
        )}

        {/* Week selector */}
        <div style={{ display: "flex", gap: 3 }}>
          {WEEKS.map((w, i) => (
            <button key={i} onClick={() => setSelectedWeek(i)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: isMobile ? 11 : 12, fontWeight: 700, fontFamily: "'Outfit'", background: selectedWeek === i ? T.yellow : "rgba(255,255,255,0.12)", color: selectedWeek === i ? T.tealDeep : "rgba(255,255,255,0.75)", transition: "all 0.2s" }}>
              {isMobile ? w.label : w.full}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ KPIs ═══ */}
      <div style={{ padding: isDesktop ? "14px 24px" : "12px 14px", display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr 1fr 1fr" : "1fr 1fr", gap: 8 }}>
        <KpiGauge value={stats.total} label="Total Clients" icon="users" color={T.teal} />
        <KpiGauge value={fmtShort(stats.totalOutstanding)} label="Total Outst." icon="rupee" color={T.pink} />
        <KpiGauge value={stats.onTrack} label="On Track" icon="check" color={T.green} />
        <KpiGauge value={stats.noCalls} label="No Calls" icon="alert" color={T.orange} />
      </div>

      {/* ═══ STATUS CARDS ═══ */}
      <div style={{ padding: pad, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 4 }}>
        {[
          { label: "On Track", value: stats.onTrack, color: T.green, bg: T.greenLight, bc: "#a5d6a7", fv: "on_track" },
          { label: "Behind", value: stats.behind, color: T.orange, bg: T.yellowLight, bc: "#ffe082", fv: "behind" },
          { label: "No Calls", value: stats.noCalls, color: T.pink, bg: T.pinkLight, bc: "#f8bbd0", fv: "no_calls" },
        ].map(s => (
          <button key={s.label} onClick={() => setStatusFilter(statusFilter === s.fv ? "ALL" : s.fv)} style={{ padding: "10px 6px", borderRadius: 12, cursor: "pointer", border: statusFilter === s.fv ? "2.5px solid " + s.color : "1.5px solid " + s.bc, background: statusFilter === s.fv ? s.bg : T.card, display: "flex", flexDirection: "column", alignItems: "center", gap: 1, boxShadow: statusFilter === s.fv ? "0 3px 10px " + s.color + "22" : "0 1px 3px rgba(0,0,0,0.05)", transition: "all 0.15s" }}>
            <span style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Outfit'", color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ OUTSTANDING BAR ═══ */}
      <div style={{ margin: isDesktop ? "8px 24px" : "8px 14px", padding: "12px 16px", borderRadius: 12, background: T.card, border: "1.5px solid " + T.border, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9, color: T.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Total Outstanding</div>
            <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit'", color: T.text }}>{fmt(stats.totalOutstanding)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, color: T.pink, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Uncalled Amount</div>
            <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit'", color: T.pink }}>{fmt(stats.flaggedOutstanding)}</div>
          </div>
        </div>
        <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: "#eceff1", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, " + T.green + ", " + T.teal + ")", width: stats.totalOutstanding > 0 ? Math.max(5, 100 - (stats.flaggedOutstanding / stats.totalOutstanding * 100)) + "%" : "0%", transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 9, color: T.textLight }}><span>Called</span><span>Uncalled</span></div>
      </div>

      {/* ═══ FILTERS ═══ */}
      <div style={{ padding: isDesktop ? "8px 24px" : "8px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><Icon type="search" size={14} color="#94a3b8" /></div>
          <input type="text" placeholder="Search client name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 34px", borderRadius: 10, border: "1.5px solid " + T.border, background: T.card, color: T.text, fontSize: 13, fontFamily: "'Outfit'", outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
          {["ALL", "PLATINUM", "GOLD", "SILVER"].map(cat => {
            const cs = { ALL: { a: T.teal, ib: "#eceff1", it: T.textLight }, PLATINUM: { a: "#7b1fa2", ib: "#f3e5f5", it: "#7b1fa2" }, GOLD: { a: T.orange, ib: T.yellowLight, it: T.orange }, SILVER: { a: "#1565c0", ib: "#e3f2fd", it: "#1565c0" } };
            const s = cs[cat]; const active = categoryFilter === cat;
            return <button key={cat} onClick={() => setCategoryFilter(cat)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Outfit'", background: active ? s.a : s.ib, color: active ? "#fff" : s.it, transition: "all 0.15s" }}>{cat}{cat !== "ALL" ? " (" + (stats.catCounts[cat] || 0) + ")" : ""}</button>;
          })}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ marginLeft: "auto", padding: "5px 10px", borderRadius: 8, border: "1.5px solid " + T.border, background: T.card, color: T.textLight, fontSize: 11, fontFamily: "'Outfit'", fontWeight: 600, cursor: "pointer" }}>
            <option value="outstanding">Sort: Amount</option>
            <option value="shortfall">Sort: Shortfall</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      <div style={{ padding: "4px " + (isDesktop ? "24px" : "14px") + " 6px", fontSize: 11, color: T.textLight, fontWeight: 600 }}>Showing {filtered.length} of {processedData.length} clients</div>

      {/* ═══ CLIENT CARDS ═══ */}
      <div style={{ padding: "0 " + (isDesktop ? "24px" : "14px") + " 40px", display: isDesktop ? "grid" : "flex", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, flexDirection: isDesktop ? undefined : "column", gap: 8 }}>
        {filtered.map((client, idx) => {
          const expanded = expandedCard === idx; const wd = client.weekData;
          const bc = client.status === "no_calls" ? T.pink : client.status === "behind" ? T.orange : T.green;
          return (
            <div key={idx} onClick={() => setExpandedCard(expanded ? null : idx)} style={{ background: T.card, border: "1.5px solid " + T.border, borderRadius: 14, padding: "12px 14px", cursor: "pointer", transition: "all 0.2s", borderLeft: "4px solid " + bc, boxShadow: expanded ? "0 6px 20px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)", alignSelf: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{client.name}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 5, alignItems: "center", flexWrap: "wrap" }}>
                    <CategoryPill category={client.category} />
                    <FreqPill frequency={client.frequency} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'Outfit'", color: client.outstanding > 50000 ? T.pink : T.text }}>{fmt(client.outstanding)}</div>
                  <div style={{ marginTop: 3 }}><DaysPill outstandingDays={client.outstandingDays} /></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <StatusBadge met={wd.met} shortfall={wd.shortfall} totalAttempts={wd.totalAttempts} />
                <div style={{ fontSize: 12, fontFamily: "'Outfit'", color: T.textLight, fontWeight: 600 }}>
                  <span style={{ color: T.green, fontWeight: 800 }}>{wd.yesCalls}</span>
                  <span style={{ color: "#ccc" }}> / </span>
                  <span style={{ fontWeight: 800, color: T.text }}>{wd.required}</span>
                  {wd.noCalls > 0 && <span style={{ color: T.pink, marginLeft: 4, fontSize: 10 }}>{"(" + wd.noCalls + " missed)"}</span>}
                </div>
              </div>
              {expanded && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1.5px solid " + T.border }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.textLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{"Daily Call Log \u2014 " + week.full}</div>
                  <DayDots client={client} weekDays={week.days} />
                  <div style={{ marginTop: 10, display: "flex", gap: 14, fontSize: 10, color: T.textLight, fontWeight: 600 }}>
                    <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#c8e6c9", border: "1.5px solid " + T.green, marginRight: 4, verticalAlign: "middle" }} />Called</span>
                    <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#ffcdd2", border: "1.5px solid " + T.pink, marginRight: 4, verticalAlign: "middle" }} />Missed</span>
                    <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#f5f5f5", border: "1.5px solid #e0e0e0", marginRight: 4, verticalAlign: "middle" }} />No Data</span>
                  </div>
                  {wd.shortfall > 0 && (
                    <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: T.pinkLight, border: "1.5px solid #f8bbd0", fontSize: 12, color: "#c62828", fontWeight: 600 }}>
                      {"\u26A0 Need " + wd.shortfall + " more call" + (wd.shortfall > 1 ? "s" : "") + " this week to meet " + client.frequency.toLowerCase() + " target"}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
