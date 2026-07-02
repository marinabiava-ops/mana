import { useState, useEffect } from 'react';

const C = {
  bg: '#f5f0ea',
  card: '#ffffff',
  pri: '#c96a6a',
  pL: '#fce8e8',
  lav: '#b8a4d4',
  lavL: '#f0eaff',
  txt: '#2d2b2b',
  mut: '#9a9090',
  ok: '#5a9e6f',
  okL: '#edf7f1',
  bor: '#ede0d8',
  red: '#c0392b',
  gold: '#c48a2a',
  gL: '#fdf6e8',
};

const sc = (x: any = {}) => ({
  background: C.card,
  borderRadius: 14,
  padding: '14px 16px',
  boxShadow: '0 1px 6px #00000010',
  marginBottom: 10,
  border: `1px solid ${C.bor}`,
  ...x,
});
const ip = (x: any = {}) => ({
  background: C.bg,
  border: `1px solid ${C.bor}`,
  borderRadius: 10,
  padding: '10px 12px',
  fontSize: 14,
  color: C.txt,
  width: '100%',
  boxSizing: 'border-box' as const,
  outline: 'none',
  ...x,
});
const bt = (bg: string, x: any = {}) => ({
  background: bg,
  border: 'none',
  borderRadius: 10,
  padding: '10px 16px',
  color: 'white',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 14,
  ...x,
});
const lb: any = {
  fontSize: 12,
  fontWeight: 600,
  color: C.mut,
  display: 'block',
  marginBottom: 4,
};
const SL = ({ t }: { t: string }) => (
  <div
    style={{
      fontSize: 11,
      fontWeight: 700,
      color: C.mut,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 8,
      marginTop: 14,
    }}
  >
    {t}
  </div>
);
const Bar = ({
  pct,
  color,
  h = 8,
}: {
  pct: number;
  color: string;
  h?: number;
}) => (
  <div
    style={{
      background: C.bor,
      borderRadius: 99,
      height: h,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: '100%',
        width: `${Math.min(100, Math.max(0, pct))}%`,
        background: color,
        borderRadius: 99,
        transition: 'width .5s',
      }}
    />
  </div>
);

const InitialsAvatar = ({
  name,
  size = 80,
}: {
  name: string;
  size?: number;
}) => {
  const ini = (name || 'MB')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg,${C.lav},#9b7fc4)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `3px solid ${C.lavL}`,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.32, fontWeight: 800, color: 'white' }}>
        {ini}
      </span>
    </div>
  );
};
const PhotoAvatar = ({ src, size = 80 }: { src: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      border: `3px solid ${C.lav}`,
      flexShrink: 0,
    }}
  >
    <img
      src={src}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      alt="avatar"
    />
  </div>
);

// ── Etapas padrão de todos os trabalhos ──────────────────────────────────────
const DEF_STEPS = [
  'Reservado',
  'Evento',
  'Backup',
  'Seleção IA',
  'Selecionado',
  'Edição IA',
  'Editado',
  'Exportado',
  'Link App',
  'Backup Drive',
];

const DEF_ALBUM_STEPS = [
  'Álbum pedido',
  'Álbum em prova',
  'Álbum aprovado',
  'Álbum entregue',
];

const PHRASES = [
  'Capture momentos, crie memórias ✨',
  'Every click tells a story 📷',
  'Cada entrega é uma vitória! 🏆',
  'Sua melhor versão começa agora! 🌟',
  'Uma conquista de cada vez ⭐',
  'Consistência bate talento todo dia ⚡',
];

// Todos os templates usam as mesmas etapas padrão (editáveis)
const DEF_TMPLS = [
  { id: 't1', name: 'Ensaio', icon: '📷', steps: [...DEF_STEPS] },
  { id: 't2', name: 'Casamento', icon: '💍', steps: [...DEF_STEPS] },
  { id: 't3', name: 'Aniversário', icon: '🎂', steps: [...DEF_STEPS] },
  { id: 't4', name: 'Batizado', icon: '🕊️', steps: [...DEF_STEPS] },
  { id: 't5', name: 'Evento', icon: '🎉', steps: [...DEF_STEPS] },
  { id: 't6', name: 'Corporativo', icon: '💼', steps: [...DEF_STEPS] },
];

const POST_STATUS = [
  { v: 'nao_autorizado', l: 'Não autorizado', icon: '🚫', color: '#c0392b' },
  { v: 'autorizado', l: 'Autorizado', icon: '⏳', color: '#c48a2a' },
  { v: 'postado', l: 'Postado', icon: '📸', color: '#5a9e6f' },
];
const postInfo = (status: string) =>
  POST_STATUS.find((p) => p.v === status) || POST_STATUS[0];

const DEF_H = [
  { id: 'h1', name: 'Oração', icon: '🙏' },
  { id: 'h2', name: 'Meditação', icon: '🧘‍♀️' },
  { id: 'h3', name: 'Treino', icon: '💪' },
  { id: 'h4', name: 'Sem açúcar', icon: '🚫' },
];

const INIT: any = {
  name: 'Marina Biava',
  photo: null,
  phrase: PHRASES[0],
  habits: DEF_H,
  doneToday: [],
  works: [],
  templates: DEF_TMPLS,
  albumSteps: [...DEF_ALBUM_STEPS],
  goals: [
    {
      id: 'g1',
      name: 'Trabalhos fechados',
      target: 4,
      done: 0,
      unit: 'trabalhos',
      period: 'mes',
    },
    {
      id: 'g2',
      name: 'Treinar',
      target: 3,
      done: 0,
      unit: 'vezes',
      period: 'semana',
    },
    {
      id: 'g3',
      name: 'Investir',
      target: 1,
      done: 0,
      unit: 'vez',
      period: 'mes',
    },
  ],
  metaBruto: 5000,
  metaLiquido: 4000,
  lastDate: '',
  weekReset: '',
  monthReset: '',
};

const MES = [
  '',
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const tod = () => new Date().toLocaleDateString('pt-BR');
const monthKey = () => {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getFullYear()}`;
};
const mondayKey = () => {
  const d = new Date(),
    dy = d.getDay(),
    diff = dy === 0 ? 6 : dy - 1;
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString('pt-BR');
};
const fmtR = (v: number) =>
  (v || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const fmtDate = (s: string) => (s ? s.split('-').reverse().join('/') : '');

const todayISO = () => new Date().toISOString().slice(0, 10);
const workMY = (w: any): { m: number; y: number } | null => {
  const raw = w.date || w.createdAt;
  if (!raw) return null;
  const d = new Date(raw + 'T12:00:00');
  if (isNaN(d.getTime())) return null;
  return { m: d.getMonth() + 1, y: d.getFullYear() };
};
const belongsToMonthList = (w: any, vm: { m: number; y: number }) => {
  // sem data de evento -> sempre aparece na lista de Trabalhos,
  // independente do mês selecionado (ex: fotolivros avulsos)
  if (!w.date) return true;
  const d = new Date(w.date + 'T12:00:00');
  if (isNaN(d.getTime())) return true;
  return d.getMonth() + 1 === vm.m && d.getFullYear() === vm.y;
};
const sortByDate = (arr: any[]) =>
  [...arr].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });

const KEY = 'mana-v5';
const saveData = (data: any) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {}
};
const loadData = (): any => {
  try {
    const r = localStorage.getItem(KEY);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// FORMULÁRIOS FORA DO APP
// ══════════════════════════════════════════════════════════════════════════════

function WorkForm({
  initial,
  templates,
  albumSteps,
  onSave,
  onCancel,
  title,
}: any) {
  const [clientName, setClientName] = useState(initial?.clientName || '');
  const [workName, setWorkName] = useState(initial?.workName || '');
  const [tmplId, setTmplId] = useState(initial?.tmplId || '');
  const [album, setAlbum] = useState(initial?.album || false);
  const [date, setDate] = useState(initial?.date || '');
  const [valor, setValor] = useState(
    initial?.valor ? String(initial.valor) : ''
  );
  const [expenses, setExpenses] = useState(
    initial?.expenses ? String(initial.expenses) : ''
  );
  const [method, setMethod] = useState(initial?.method || 'PIX');
  const [installments, setInstallments] = useState(
    String(initial?.installments || 1)
  );
  const [dueDates, setDueDates] = useState(initial?.dueDates || ['']);
  const [obs, setObs] = useState(initial?.obs || '');

  const instNum = parseInt(installments) || 1;
  const setInst = (n: string) => {
    const ni = parseInt(n) || 1;
    const dd = [...dueDates];
    while (dd.length < ni) dd.push('');
    setInstallments(String(ni));
    setDueDates(dd.slice(0, ni));
  };
  const setDD = (i: number, v: string) => {
    const dd = [...dueDates];
    dd[i] = v;
    setDueDates(dd);
  };
  const mainSteps = (() => {
    const tmpl = templates.find((t: any) => t.id === tmplId);
    return tmpl ? [...tmpl.steps] : [];
  })();
  const albumStepsArr = albumSteps || DEF_ALBUM_STEPS;
  // prev é só para exibir o preview ao usuário (etapas combinadas)
  const prev = album ? [...mainSteps, ...albumStepsArr] : mainSteps;
  const instVal =
    valor && instNum > 1 ? (parseFloat(valor) / instNum).toFixed(2) : '';
  const liquido =
    valor && expenses ? parseFloat(valor) - parseFloat(expenses) : null;

  return (
    <div style={sc({ border: `1.5px solid ${C.pri}` })}>
      <div
        style={{
          fontWeight: 800,
          color: C.pri,
          fontSize: 15,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      <label style={lb}>Nome do cliente *</label>
      <input
        style={ip()}
        value={clientName}
        onChange={(e: any) => setClientName(e.target.value)}
        placeholder="Ex: Família Silva"
      />

      <label style={{ ...lb, marginTop: 10 }}>
        Nome do trabalho (opcional)
      </label>
      <input
        style={ip()}
        value={workName}
        onChange={(e: any) => setWorkName(e.target.value)}
        placeholder="Ex: Ensaio gestante"
      />

      <label style={{ ...lb, marginTop: 12 }}>Tipo de trabalho</label>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 8 }}
      >
        {templates.map((t: any) => (
          <button
            key={t.id}
            onClick={() => setTmplId((id: string) => (id === t.id ? '' : t.id))}
            style={{
              background: tmplId === t.id ? C.pri : C.bg,
              border: `1.5px solid ${tmplId === t.id ? C.pri : C.bor}`,
              borderRadius: 10,
              padding: '7px 12px',
              cursor: 'pointer',
              color: tmplId === t.id ? 'white' : C.txt,
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      <button
        onClick={() => setAlbum((a: boolean) => !a)}
        style={{
          ...bt(album ? C.pri : C.bg, {
            color: album ? 'white' : C.mut,
            border: `1.5px solid ${album ? C.pri : C.bor}`,
            width: '100%',
            marginBottom: 8,
          }),
        }}
      >
        {album ? '📚 Fotolivro incluído ✓' : '📚 Adicionar fotolivro'}
      </button>
      {album && tmplId && (
        <div
          style={{
            fontSize: 11,
            color: C.lav,
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          ℹ️ Serão criados 2 trabalhos: o principal e um separado (Fotolivro)
          só com as etapas do álbum.
        </div>
      )}
      {album && !tmplId && (
        <div
          style={{
            fontSize: 11,
            color: C.lav,
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          ℹ️ Será criado apenas 1 trabalho: um Fotolivro, com as etapas do
          álbum.
        </div>
      )}

      {prev.length > 0 && (
        <div
          style={{
            background: C.lavL,
            borderRadius: 10,
            padding: '8px 12px',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.lav,
              fontWeight: 700,
              marginBottom: 5,
            }}
          >
            Etapas ({prev.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {prev.map((s: string, i: number) => (
              <span
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 99,
                  padding: '2px 8px',
                  fontSize: 11,
                }}
              >
                {i + 1}. {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {!(album && !tmplId) && (
        <>
          <label style={{ ...lb, marginTop: 6 }}>Data do evento</label>
          <input
            type="date"
            style={ip()}
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
          />
        </>
      )}

      <label style={{ ...lb, marginTop: 10 }}>Valor total (R$)</label>
      <input
        type="number"
        style={ip()}
        value={valor}
        onChange={(e: any) => setValor(e.target.value)}
        placeholder="0"
      />

      <label style={{ ...lb, marginTop: 10 }}>Despesas / Custos (R$)</label>
      <input
        type="number"
        style={ip()}
        value={expenses}
        onChange={(e: any) => setExpenses(e.target.value)}
        placeholder="0"
      />
      {liquido !== null && parseFloat(valor) > 0 && (
        <div
          style={{
            fontSize: 12,
            color: (liquido as number) >= 0 ? C.ok : C.red,
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          Líquido: R$ {fmtR(liquido as number)}
        </div>
      )}

      <label style={{ ...lb, marginTop: 10 }}>Forma de pagamento</label>
      <div
        style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}
      >
        {['PIX', 'Dinheiro', 'Cartão'].map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            style={{
              background: method === m ? C.pri : C.bg,
              border: `1.5px solid ${method === m ? C.pri : C.bor}`,
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              color: method === m ? 'white' : C.txt,
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <label style={lb}>Nº de parcelas</label>
      <select
        style={ip()}
        value={installments}
        onChange={(e: any) => setInst(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
          <option key={n} value={n}>
            {n === 1
              ? 'À vista (1x)'
              : `${n}x${
                  valor && n > 1
                    ? ` de R$ ${(parseFloat(valor) / n).toFixed(2)}`
                    : ''
                }`}
          </option>
        ))}
      </select>

      {instNum > 1 && (
        <>
          <label style={{ ...lb, marginTop: 10 }}>Datas de vencimento</label>
          {Array.from({ length: instNum }, (_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: C.pri,
                  fontWeight: 700,
                  minWidth: 22,
                }}
              >
                {i + 1}x
              </span>
              {instVal && (
                <span
                  style={{
                    fontSize: 12,
                    color: C.gold,
                    fontWeight: 600,
                    minWidth: 80,
                  }}
                >
                  R$ {instVal}
                </span>
              )}
              <input
                type="date"
                style={ip({ flex: 1 })}
                value={dueDates[i] || ''}
                onChange={(e: any) => setDD(i, e.target.value)}
              />
            </div>
          ))}
        </>
      )}

      {/* Campo de Observações — máx 100 caracteres */}
      <label style={{ ...lb, marginTop: 10 }}>Observações (opcional)</label>
      <div style={{ position: 'relative' }}>
        <textarea
          style={{
            ...ip({ resize: 'none', height: 72, fontFamily: 'inherit' }),
            paddingBottom: 20,
          }}
          value={obs}
          onChange={(e: any) => setObs(e.target.value.slice(0, 100))}
          placeholder="Anotações rápidas sobre o trabalho..."
          maxLength={100}
        />
        <span
          style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontSize: 10,
            color: obs.length >= 90 ? C.red : C.mut,
          }}
        >
          {obs.length}/100
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button
          onClick={() => {
            if (!clientName.trim()) return;
            onSave(
              {
                clientName,
                workName,
                tmplId,
                album,
                date,
                valor,
                expenses: parseFloat(expenses) || 0,
                method,
                installments,
                dueDates,
                obs,
              },
              mainSteps,
              album ? albumStepsArr : null
            );
          }}
          style={bt(C.pri, { flex: 2 })}
        >
          💾 Salvar
        </button>
        <button onClick={onCancel} style={bt(C.mut, { flex: 1 })}>
          ✕
        </button>
      </div>
    </div>
  );
}

function TmplEditor({ tmpl, onSave, onDelete, onCancel }: any) {
  const [name, setName] = useState(tmpl?.name || '');
  const [icon, setIcon] = useState(tmpl?.icon || '📋');
  const [steps, setSteps] = useState(tmpl?.steps ? [...tmpl.steps] : ['']);
  const upd = (i: number, v: string) =>
    setSteps((s: string[]) => s.map((x, j) => (j === i ? v : x)));
  const mov = (i: number, dir: number) => {
    const s = [...steps],
      j = i + dir;
    if (j < 0 || j >= s.length) return;
    [s[i], s[j]] = [s[j], s[i]];
    setSteps(s);
  };
  const save = () => {
    if (!name.trim() || !steps.filter((x: string) => x.trim()).length) return;
    onSave({
      ...tmpl,
      id: tmpl?.id || 't' + Date.now(),
      name: name.trim(),
      icon,
      steps: steps.filter((x: string) => x.trim()),
    });
  };
  return (
    <div style={sc({ border: `1.5px solid ${C.pri}` })}>
      <div
        style={{
          fontWeight: 800,
          color: C.pri,
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {tmpl?.id ? '✏️ Editar' : '✨ Novo'} template
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          style={ip({ width: 52, textAlign: 'center', padding: '10px 6px' })}
          value={icon}
          onChange={(e: any) => setIcon(e.target.value)}
          maxLength={2}
        />
        <input
          style={ip()}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Nome do template"
        />
      </div>
      <label style={lb}>Etapas</label>
      {steps.map((step: string, i: number) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 6,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => mov(i, -1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.mut,
                fontSize: 10,
                lineHeight: 1,
                padding: '1px 3px',
              }}
            >
              ▲
            </button>
            <button
              onClick={() => mov(i, +1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.mut,
                fontSize: 10,
                lineHeight: 1,
                padding: '1px 3px',
              }}
            >
              ▼
            </button>
          </div>
          <div
            style={{
              background: C.pri,
              color: 'white',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <input
            style={ip({ padding: '8px 10px' })}
            value={step}
            onChange={(e: any) => upd(i, e.target.value)}
            placeholder={`Etapa ${i + 1}`}
          />
          <button
            onClick={() =>
              setSteps((s: string[]) => s.filter((_, j) => j !== i))
            }
            style={{
              background: 'none',
              border: 'none',
              color: C.mut,
              cursor: 'pointer',
              fontSize: 16,
              padding: '0 4px',
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => setSteps((s: string[]) => [...s, ''])}
        style={{
          ...bt(C.lavL, {
            color: C.lav,
            width: '100%',
            marginBottom: 10,
            border: `1px solid ${C.lav}`,
          }),
        }}
      >
        + Etapa
      </button>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={save} style={bt(C.pri, { flex: 2 })}>
          💾 Salvar
        </button>
        {tmpl?.id && (
          <button
            onClick={() => onDelete(tmpl.id)}
            style={bt(C.red, { flex: 1 })}
          >
            🗑
          </button>
        )}
        <button onClick={onCancel} style={bt(C.mut, { flex: 1 })}>
          ✕
        </button>
      </div>
    </div>
  );
}

function AlbumStepsEditor({ steps, onSave, onCancel }: any) {
  const [s, setS] = useState([...steps]);
  const upd = (i: number, v: string) =>
    setS((a: string[]) => a.map((x, j) => (j === i ? v : x)));
  const mov = (i: number, dir: number) => {
    const a = [...s],
      j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    setS(a);
  };
  return (
    <div style={sc({ border: `1.5px solid ${C.lav}` })}>
      <div style={{ fontWeight: 700, color: C.lav, marginBottom: 10 }}>
        📚 Editar etapas do álbum
      </div>
      {s.map((step: string, i: number) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 6,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => mov(i, -1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.mut,
                fontSize: 10,
                lineHeight: 1,
                padding: '1px 3px',
              }}
            >
              ▲
            </button>
            <button
              onClick={() => mov(i, +1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.mut,
                fontSize: 10,
                lineHeight: 1,
                padding: '1px 3px',
              }}
            >
              ▼
            </button>
          </div>
          <div
            style={{
              background: C.lav,
              color: 'white',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <input
            style={ip({ padding: '8px 10px' })}
            value={step}
            onChange={(e: any) => upd(i, e.target.value)}
            placeholder={`Etapa ${i + 1}`}
          />
          <button
            onClick={() => setS((a: string[]) => a.filter((_, j) => j !== i))}
            style={{
              background: 'none',
              border: 'none',
              color: C.mut,
              cursor: 'pointer',
              fontSize: 16,
              padding: '0 4px',
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => setS((a: string[]) => [...a, ''])}
        style={{
          ...bt(C.lavL, {
            color: C.lav,
            width: '100%',
            marginBottom: 10,
            border: `1px solid ${C.lav}`,
          }),
        }}
      >
        + Etapa
      </button>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onSave(s.filter((x: string) => x.trim()))}
          style={bt(C.lav, { flex: 2 })}
        >
          💾 Salvar
        </button>
        <button onClick={onCancel} style={bt(C.mut, { flex: 1 })}>
          ✕
        </button>
      </div>
    </div>
  );
}

function GoalCfg({ g, onSave }: any) {
  const [n, setN] = useState(g.name);
  const [t, setT] = useState(String(g.target));
  const [u, setU] = useState(g.unit);
  const [p, setP] = useState(g.period || 'mes');
  return (
    <div style={sc({ marginBottom: 8 })}>
      <input
        style={ip()}
        value={n}
        onChange={(e: any) => setN(e.target.value)}
        placeholder="Nome da meta"
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ flex: '0 0 80px' }}>
          <label style={lb}>Meta</label>
          <input
            type="number"
            style={ip()}
            value={t}
            onChange={(e: any) => setT(e.target.value)}
            min="1"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={lb}>Unidade</label>
          <input
            style={ip()}
            value={u}
            onChange={(e: any) => setU(e.target.value)}
          />
        </div>
        <div style={{ flex: '0 0 90px' }}>
          <label style={lb}>Período</label>
          <select
            style={ip()}
            value={p}
            onChange={(e: any) => setP(e.target.value)}
          >
            <option value="semana">Semana</option>
            <option value="mes">Mês</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => onSave(g.id, n, parseInt(t) || 1, u, p)}
        style={bt(C.pri, { width: '100%', marginTop: 8 })}
      >
        Salvar
      </button>
    </div>
  );
}

function HabitForm({ onSave, onCancel }: any) {
  const [icon, setIcon] = useState('⭐');
  const [name, setName] = useState('');
  return (
    <div style={sc({ border: `1.5px solid ${C.pri}` })}>
      <div style={{ fontWeight: 700, color: C.pri, marginBottom: 8 }}>
        Novo Hábito
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          style={ip({ width: 60, textAlign: 'center' })}
          value={icon}
          onChange={(e: any) => setIcon(e.target.value)}
          maxLength={2}
        />
        <input
          style={ip()}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Nome do hábito"
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => {
            if (!name.trim()) return;
            onSave({ icon, name: name.trim() });
          }}
          style={bt(C.pri, { flex: 1 })}
        >
          + Adicionar
        </button>
        <button onClick={onCancel} style={bt(C.mut, { flex: 1 })}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function CfgFormInline({ d, onSave }: any) {
  const [name, setName] = useState(d.name || '');
  const [bruto, setBruto] = useState(String(d.metaBruto || 5000));
  const [liquido, setLiquido] = useState(String(d.metaLiquido || 4000));
  return (
    <div style={sc()}>
      <label style={lb}>Seu nome</label>
      <input
        style={ip()}
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <label style={{ ...lb, marginTop: 10 }}>
        Meta faturamento bruto (R$)
      </label>
      <input
        type="number"
        style={ip()}
        value={bruto}
        onChange={(e: any) => setBruto(e.target.value)}
      />
      <label style={{ ...lb, marginTop: 10 }}>
        Meta faturamento líquido (R$)
      </label>
      <input
        type="number"
        style={ip()}
        value={liquido}
        onChange={(e: any) => setLiquido(e.target.value)}
      />
      <button
        onClick={() =>
          onSave(name, parseFloat(bruto) || 5000, parseFloat(liquido) || 4000)
        }
        style={bt(C.pri, { width: '100%', marginTop: 12 })}
      >
        💾 Salvar
      </button>
    </div>
  );
}

function MonthNav({
  vm,
  onPrev,
  onNext,
}: {
  vm: { m: number; y: number };
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        background: C.card,
        borderRadius: 12,
        padding: '8px 4px',
        border: `1px solid ${C.bor}`,
      }}
    >
      <button
        onClick={onPrev}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
          color: C.pri,
          fontSize: 22,
          padding: '0 16px',
          lineHeight: 1,
        }}
      >
        ‹
      </button>
      <div style={{ fontWeight: 800, fontSize: 15, color: C.txt }}>
        {MES[vm.m]} {vm.y}
      </div>
      <button
        onClick={onNext}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
          color: C.pri,
          fontSize: 22,
          padding: '0 16px',
          lineHeight: 1,
        }}
      >
        ›
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [d, setD] = useState<any>(null);
  const [tab, setTab] = useState('home');
  const [toast, setToast] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [addWork, setAddWork] = useState(false);
  const [editWork, setEditWork] = useState<any>(null);
  const [addHabit, setAddHabit] = useState(false);
  const [editTmpl, setEditTmpl] = useState<any>(null);
  const [editAlbum, setEditAlbum] = useState(false);
  const [pickPhrase, setPickPhrase] = useState(false);
  const [wSearch, setWSearch] = useState('');
  const [wFilter, setWFilter] = useState('todos');
  const [wKindFilter, setWKindFilter] = useState('todos');
  const [wTypeFilter, setWTypeFilter] = useState('todos');
  const [wSort, setWSort] = useState('data');

  const now = new Date();
  const [vm, setVm] = useState({ m: now.getMonth() + 1, y: now.getFullYear() });
  const prevMo = () =>
    setVm((v) => (v.m === 1 ? { m: 12, y: v.y - 1 } : { m: v.m - 1, y: v.y }));
  const nextMo = () =>
    setVm((v) => (v.m === 12 ? { m: 1, y: v.y + 1 } : { m: v.m + 1, y: v.y }));

  useEffect(() => {
    const stored = loadData();
    let s = stored
      ? { ...INIT, ...stored }
      : {
          ...INIT,
          lastDate: tod(),
          weekReset: mondayKey(),
          monthReset: monthKey(),
        };
    if (!s.templates) s.templates = DEF_TMPLS;
    if (!s.albumSteps) s.albumSteps = [...DEF_ALBUM_STEPS];
    if (!s.phrase) s.phrase = PHRASES[0];
    if (!s.weekReset) s.weekReset = mondayKey();
    if (!s.monthReset) s.monthReset = monthKey();
    if (!s.metaBruto) s.metaBruto = 5000;
    if (!s.metaLiquido) s.metaLiquido = 4000;
    s.goals = (s.goals || []).map((g: any) => ({
      ...g,
      period: g.period || 'mes',
    }));
    if (s.lastDate !== tod()) {
      s.doneToday = [];
      s.lastDate = tod();
    }
    if (s.weekReset !== mondayKey()) {
      s.goals = s.goals.map((g: any) =>
        g.period === 'semana' ? { ...g, done: 0 } : g
      );
      s.weekReset = mondayKey();
    }
    if (s.monthReset !== monthKey()) {
      s.goals = s.goals.map((g: any) =>
        g.period === 'mes' ? { ...g, done: 0 } : g
      );
      s.monthReset = monthKey();
    }
    setD(s);
  }, []);

  const cp = () => JSON.parse(JSON.stringify(d));
  const sv = (nd: any) => {
    setD({ ...nd });
    saveData(nd);
  };
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };

  const handlePhoto = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d')!;
        const min = Math.min(img.width, img.height);
        ctx.drawImage(
          img,
          (img.width - min) / 2,
          (img.height - min) / 2,
          min,
          min,
          0,
          0,
          300,
          300
        );
        const nd = cp();
        nd.photo = canvas.toDataURL('image/jpeg', 0.8);
        sv(nd);
        flash('📸 Foto atualizada!');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
  const removePhoto = () => {
    const nd = cp();
    nd.photo = null;
    sv(nd);
    flash('Avatar restaurado!');
  };

  const checkH = (h: any) => {
    if (!d || d.doneToday.includes(h.id)) return;
    const nd = cp();
    nd.doneToday.push(h.id);
    sv(nd);
    flash('✅ Hábito feito!');
  };
  const uncheckH = (id: string) => {
    const nd = cp();
    nd.doneToday = nd.doneToday.filter((x: string) => x !== id);
    sv(nd);
  };
  const removeH = (id: string) => {
    const nd = cp();
    nd.habits = nd.habits.filter((h: any) => h.id !== id);
    nd.doneToday = nd.doneToday.filter((x: string) => x !== id);
    sv(nd);
  };
  const addHabitSave = (h: any) => {
    const nd = cp();
    nd.habits.push({ id: 'h' + Date.now(), ...h });
    sv(nd);
    setAddHabit(false);
    flash('✅ Hábito adicionado!');
  };

  const saveTmpl = (t: any) => {
    const nd = cp();
    const i = nd.templates.findIndex((x: any) => x.id === t.id);
    if (i >= 0) nd.templates[i] = t;
    else nd.templates.push(t);
    sv(nd);
    setEditTmpl(null);
    flash('Template salvo!');
  };
  const delTmpl = (id: string) => {
    const nd = cp();
    nd.templates = nd.templates.filter((t: any) => t.id !== id);
    sv(nd);
    setEditTmpl(null);
    flash('Template removido.');
  };
  const dupTmpl = (t: any) => {
    const nd = cp();
    nd.templates.push({
      ...JSON.parse(JSON.stringify(t)),
      id: 't' + Date.now(),
      name: t.name + ' (cópia)',
    });
    sv(nd);
    flash('Template duplicado!');
  };
  const saveAlbumSteps = (steps: string[]) => {
    const nd = cp();
    nd.albumSteps = steps;
    sv(nd);
    setEditAlbum(false);
    flash('✅ Etapas do álbum salvas!');
  };

  const saveWork = (
    f: any,
    mainSteps: string[],
    albumStepsList: string[] | null,
    existingId: string | null
  ) => {
    const nd = cp();
    const tmpl = nd.templates.find((t: any) => t.id === f.tmplId);
    const newV = parseFloat(f.valor) || 0;
    const newExp = parseFloat(f.expenses) || 0;
    const instNum = parseInt(f.installments) || 1;

    if (existingId) {
      // Edição: mantém tudo no mesmo trabalho (sem dividir de novo)
      const combinedSteps = albumStepsList
        ? [...mainSteps, ...albumStepsList]
        : mainSteps;
      // Se não tem tipo escolhido e o álbum está marcado, é um Fotolivro.
      // Isso também corrige (dali pra frente) trabalhos antigos que não
      // tinham o campo "kind" salvo.
      const isFotolivroForm = !f.tmplId && f.album;
      const editTmplName = isFotolivroForm ? 'Fotolivro' : tmpl?.name || '';
      const editTmplIcon = isFotolivroForm ? '📚' : tmpl?.icon || '📷';
      const editKind = isFotolivroForm ? 'fotolivro' : 'trabalho';
      const idx = nd.works.findIndex((w: any) => w.id === existingId);
      if (idx >= 0) {
        const ex = nd.works[idx];
        const newSteps = combinedSteps.map((sN, i) => {
          const match = ex.steps.find((es: any) => es.name === sN);
          return match
            ? { ...match }
            : { id: `s${i}_${Date.now()}`, name: sN, done: false };
        });
        nd.works[idx] = {
          ...ex,
          clientName: f.clientName.trim(),
          workName: f.workName.trim(),
          tmplId: f.tmplId,
          tmplName: editTmplName,
          tmplIcon: editTmplIcon,
          album: f.album,
          kind: editKind,
          date: f.date,
          valor: newV,
          expenses: newExp,
          method: f.method,
          installments: instNum,
          dueDates: f.dueDates,
          installmentsPaid: Array(instNum).fill(false),
          steps: newSteps,
          obs: f.obs || '',
          createdAt: ex.createdAt || todayISO(),
        };
        setDetail(nd.works[idx]);
      }
      sv(nd);
      setAddWork(false);
      setEditWork(null);
      flash('✅ Atualizado!');
      return;
    }

    // FOTOLIVRO SOZINHO: álbum marcado, mas sem tipo de trabalho escolhido
    // -> cria só 1 trabalho (Fotolivro), sem data
    if (!f.tmplId && albumStepsList && albumStepsList.length) {
      nd.works.push({
        id: 'w' + Date.now(),
        clientName: f.clientName.trim(),
        workName: f.workName.trim(),
        tmplId: '',
        tmplName: 'Fotolivro',
        tmplIcon: '📚',
        album: true,
        kind: 'fotolivro',
        date: '',
        valor: newV,
        expenses: newExp,
        method: f.method,
        installments: instNum,
        dueDates: f.dueDates,
        installmentsPaid: Array(instNum).fill(false),
        steps: albumStepsList.map((s, i) => ({
          id: `a${i}`,
          name: s,
          done: false,
        })),
        obs: f.obs || '',
        postStatus: 'nao_autorizado',
        createdAt: todayISO(),
      });
      sv(nd);
      setAddWork(false);
      setEditWork(null);
      flash('✅ Fotolivro adicionado!');
      return;
    }

    // Trabalho normal (com tipo escolhido). Se tiver álbum junto, cria
    // um 2º trabalho separado (Fotolivro).
    nd.works.push({
      id: 'w' + Date.now(),
      clientName: f.clientName.trim(),
      workName: f.workName.trim(),
      tmplId: f.tmplId,
      tmplName: tmpl?.name || '',
      tmplIcon: tmpl?.icon || '📷',
      album: false,
      kind: 'trabalho',
      date: f.date,
      valor: newV,
      expenses: newExp,
      method: f.method,
      installments: instNum,
      dueDates: f.dueDates,
      installmentsPaid: Array(instNum).fill(false),
      steps: mainSteps.map((s, i) => ({ id: `s${i}`, name: s, done: false })),
      obs: f.obs || '',
      postStatus: 'nao_autorizado',
      createdAt: todayISO(),
    });

    if (f.tmplId && albumStepsList && albumStepsList.length) {
      nd.works.push({
        id: 'w' + Date.now() + 'a',
        clientName: f.clientName.trim(),
        workName: (f.workName.trim() ? f.workName.trim() + ' — ' : '') +
          'Fotolivro',
        tmplId: f.tmplId,
        tmplName: 'Fotolivro',
        tmplIcon: '📚',
        album: true,
        kind: 'fotolivro',
        date: f.date,
        valor: 0,
        expenses: 0,
        method: f.method,
        installments: 1,
        dueDates: [''],
        installmentsPaid: [false],
        steps: albumStepsList.map((s, i) => ({
          id: `a${i}`,
          name: s,
          done: false,
        })),
        obs: '',
        postStatus: 'nao_autorizado',
        createdAt: todayISO(),
      });
    }

    sv(nd);
    setAddWork(false);
    setEditWork(null);
    flash(
      f.tmplId && albumStepsList && albumStepsList.length
        ? '✅ 2 trabalhos criados (principal + fotolivro)!'
        : '✅ Trabalho adicionado!'
    );
  };

  const setPostStatus = (wId: string, status: string) => {
    const nd = cp();
    const w = nd.works.find((x: any) => x.id === wId);
    if (!w) return;
    w.postStatus = status;
    sv(nd);
    setDetail(nd.works.find((x: any) => x.id === wId));
    flash('📸 Status do post atualizado!');
  };

  const delWork = (id: string) => {
    const nd = cp();
    nd.works = nd.works.filter((x: any) => x.id !== id);
    sv(nd);
    setDetail(null);
    flash('Trabalho removido.');
  };
  const completeStep = (wId: string, sId: string) => {
    const nd = cp();
    const w = nd.works.find((x: any) => x.id === wId);
    if (!w) return;
    const s = w.steps.find((x: any) => x.id === sId);
    if (!s || s.done) return;
    s.done = true;
    sv(nd);
    setDetail(nd.works.find((x: any) => x.id === wId));
    flash('✓ Etapa concluída!');
  };
  const uncompleteStep = (wId: string, sId: string) => {
    const nd = cp();
    const w = nd.works.find((x: any) => x.id === wId);
    if (!w) return;
    const s = w.steps.find((x: any) => x.id === sId);
    if (!s || !s.done) return;
    s.done = false;
    sv(nd);
    setDetail(nd.works.find((x: any) => x.id === wId));
  };

  const togglePaid = (wId: string, idx: number) => {
    const nd = cp();
    const w = nd.works.find((x: any) => x.id === wId);
    if (!w) return;
    if (!w.installmentsPaid)
      w.installmentsPaid = Array(w.installments || 1).fill(false);
    w.installmentsPaid[idx] = !w.installmentsPaid[idx];
    sv(nd);
    setDetail(nd.works.find((x: any) => x.id === wId));
    flash(
      w.installmentsPaid[idx]
        ? '💰 Pagamento recebido!'
        : 'Pagamento desmarcado'
    );
  };

  const updateGoal = (id: string, delta: number) => {
    const nd = cp();
    const g = nd.goals.find((x: any) => x.id === id);
    if (!g) return;
    const prev = g.done;
    g.done = Math.max(0, g.done + delta);
    if (g.done === g.target && prev < g.target) flash('🎯 Meta batida!');
    sv(nd);
  };
  const saveGoal = (id: string, n: string, t: number, u: string, p: string) => {
    const nd = cp();
    const g = nd.goals.find((x: any) => x.id === id);
    if (g) {
      g.name = n;
      g.target = t;
      g.unit = u;
      g.period = p;
    }
    sv(nd);
    flash('Meta atualizada!');
  };
  const addGoal = () => {
    const nd = cp();
    nd.goals.push({
      id: 'g' + Date.now(),
      name: 'Nova meta',
      target: 1,
      done: 0,
      unit: 'vez',
      period: 'mes',
    });
    sv(nd);
  };
  const saveCfg = (name: string, metaBruto: number, metaLiquido: number) => {
    const nd = cp();
    nd.name = name.trim() || nd.name;
    nd.metaBruto = metaBruto;
    nd.metaLiquido = metaLiquido;
    sv(nd);
    flash('✅ Salvo!');
  };
  const setPhrase = (p: string) => {
    const nd = cp();
    nd.phrase = p;
    sv(nd);
    setPickPhrase(false);
  };

  const navTo = (t: string) => {
    setTab(t);
    setDetail(null);
    setAddWork(false);
    setEditWork(null);
    setAddHabit(false);
    setEditTmpl(null);
    setPickPhrase(false);
    setEditAlbum(false);
  };
  const goToWork = (w: any) => {
    setDetail(w);
    setTab('works');
    setAddWork(false);
    setEditWork(null);
  };
  const payStr = (w: any) => {
    if (!w.valor) return '';
    const n = w.installments || 1;
    return `${w.method || 'PIX'} · ${
      n > 1
        ? `${n}x de R$ ${(w.valor / n).toFixed(2).replace('.', ',')}`
        : `R$ ${fmtR(w.valor)}`
    }`;
  };

  if (!d)
    return (
      <div
        style={{
          background: C.bg,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 32,
            color: C.pri,
            letterSpacing: 4,
          }}
        >
          MANÁ
        </div>
        <div style={{ color: C.mut }}>Carregando...</div>
      </div>
    );

  const allWorks: any[] = d.works || [];
  const monthWorks = allWorks.filter((w: any) => {
    const my = workMY(w);
    return my && my.m === vm.m && my.y === vm.y;
  });
  const listWorks = allWorks.filter((w: any) => belongsToMonthList(w, vm));
  const fatBruto = monthWorks.reduce(
    (s: number, w: any) => s + (w.valor || 0),
    0
  );
  const fatLiq = monthWorks.reduce(
    (s: number, w: any) => s + (w.valor || 0) - (w.expenses || 0),
    0
  );
  const bPct = d.metaBruto
    ? Math.min(100, Math.round((fatBruto / d.metaBruto) * 100))
    : 0;
  const lPct = d.metaLiquido
    ? Math.min(100, Math.round((fatLiq / d.metaLiquido) * 100))
    : 0;
  const hPct = d.habits.length
    ? Math.round((d.doneToday.length / d.habits.length) * 100)
    : 0;
  const applyFilters = (list: any[]) => {
    let r = [...list];
    if (wSearch.trim()) {
      const q = wSearch.toLowerCase().trim();
      r = r.filter((w: any) => {
        const kind = w.kind || 'trabalho';
        const kindWords =
          kind === 'fotolivro' ? 'fotolivro álbum' : 'trabalho normal';
        return (w.clientName + ' ' + w.workName + ' ' + w.tmplName + ' ' + kindWords)
          .toLowerCase()
          .includes(q);
      });
    }
    if (wFilter === 'andamento')
      r = r.filter((w: any) => !w.steps.every((s: any) => s.done));
    if (wFilter === 'concluidos')
      r = r.filter(
        (w: any) => w.steps.length > 0 && w.steps.every((s: any) => s.done)
      );
    if (wKindFilter === 'trabalho')
      r = r.filter((w: any) => (w.kind || 'trabalho') === 'trabalho');
    if (wKindFilter === 'fotolivro')
      r = r.filter((w: any) => w.kind === 'fotolivro');
    if (wTypeFilter !== 'todos')
      r = r.filter((w: any) => w.tmplId === wTypeFilter);
    if (wSort === 'data') r = sortByDate(r);
    else if (wSort === 'nome')
      r = [...r].sort((a: any, b: any) =>
        a.clientName.localeCompare(b.clientName)
      );
    else if (wSort === 'progresso')
      r = [...r].sort((a: any, b: any) => {
        const pA = a.steps.length
          ? a.steps.filter((s: any) => s.done).length / a.steps.length
          : 0;
        const pB = b.steps.length
          ? b.steps.filter((s: any) => s.done).length / b.steps.length
          : 0;
        return pB - pA;
      });
    return r;
  };
  const filteredWorks = applyFilters(listWorks);

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        color: C.txt,
      }}
    >
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhoto}
      />

      <div
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.bor}`,
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 22,
            color: C.pri,
            letterSpacing: 4,
          }}
        >
          MANÁ
        </div>
      </div>

      <div style={{ paddingBottom: 100 }}>
        {/* ══ HOME ══ */}
        {tab === 'home' && !addWork && !detail && (
          <div style={{ padding: 16 }}>
            <div
              style={sc({
                background: `linear-gradient(150deg,${C.lavL},#fff)`,
                textAlign: 'center',
              })}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                {d.photo ? (
                  <PhotoAvatar src={d.photo} size={90} />
                ) : (
                  <InitialsAvatar name={d.name} size={90} />
                )}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: C.txt,
                  marginBottom: 2,
                }}
              >
                {d.name}
              </div>
              <div
                onClick={() => setPickPhrase(true)}
                style={{
                  color: C.mut,
                  fontSize: 13,
                  fontStyle: 'italic',
                  cursor: 'pointer',
                }}
              >
                "{d.phrase}" <span style={{ fontSize: 10 }}>✏️</span>
              </div>
            </div>

            {pickPhrase && (
              <div style={sc({ border: `1.5px solid ${C.pri}` })}>
                <div style={{ fontWeight: 700, color: C.pri, marginBottom: 8 }}>
                  Escolha sua frase
                </div>
                {PHRASES.map((p) => (
                  <div
                    key={p}
                    onClick={() => setPhrase(p)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      marginBottom: 6,
                      cursor: 'pointer',
                      background: d.phrase === p ? C.pL : C.bg,
                      border: `1.5px solid ${d.phrase === p ? C.pri : C.bor}`,
                      fontSize: 13,
                      color: d.phrase === p ? C.pri : C.txt,
                    }}
                  >
                    {p}
                  </div>
                ))}
                <button
                  onClick={() => setPickPhrase(false)}
                  style={bt(C.mut, { width: '100%', marginTop: 4 })}
                >
                  Fechar
                </button>
              </div>
            )}

            <MonthNav vm={vm} onPrev={prevMo} onNext={nextMo} />

            <SL t="METAS DO MÊS" />
            <div style={sc()}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 13 }}>
                  Faturamento Bruto
                </span>
                <span style={{ color: C.pri, fontWeight: 700, fontSize: 12 }}>
                  R$ {fmtR(fatBruto)} / R$ {fmtR(d.metaBruto)}
                </span>
              </div>
              <Bar
                pct={bPct}
                color={`linear-gradient(90deg,${C.pri},#e8a0a0)`}
                h={8}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                  marginTop: 12,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 13 }}>
                  Faturamento Líquido
                </span>
                <span style={{ color: C.ok, fontWeight: 700, fontSize: 12 }}>
                  R$ {fmtR(fatLiq)} / R$ {fmtR(d.metaLiquido)}
                </span>
              </div>
              <Bar
                pct={lPct}
                color={`linear-gradient(90deg,${C.ok},#86efac)`}
                h={8}
              />
              <div style={{ fontSize: 11, color: C.mut, marginTop: 6 }}>
                {monthWorks.length} trabalho(s) em {MES[vm.m]}
              </div>
              {bPct >= 100 && (
                <div
                  style={{
                    fontSize: 12,
                    color: C.ok,
                    fontWeight: 700,
                    marginTop: 6,
                    textAlign: 'center',
                  }}
                >
                  🏆 Meta batida!
                </div>
              )}
            </div>

            <div style={sc()}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <span style={{ fontWeight: 700 }}>Hábitos de Hoje</span>
                <span style={{ color: C.pri, fontWeight: 700 }}>
                  {d.doneToday.length}/{d.habits.length}
                </span>
              </div>
              <Bar
                pct={hPct}
                color={`linear-gradient(90deg,${C.lav},#d4b8f0)`}
              />
              <div style={{ fontSize: 12, color: C.mut, marginTop: 5 }}>
                {hPct === 100
                  ? '✨ Todos feitos!'
                  : `Faltam ${d.habits.length - d.doneToday.length} hábito(s)`}
              </div>
              {d.habits.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  {d.habits.map((h: any) => {
                    const done = d.doneToday.includes(h.id);
                    return (
                      <div
                        key={h.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '6px 0',
                          borderTop: `1px solid ${C.bor}`,
                        }}
                      >
                        <div
                          onClick={() => (done ? uncheckH(h.id) : checkH(h))}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: `2px solid ${done ? C.ok : C.bor}`,
                            background: done ? C.ok : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all .2s',
                          }}
                        >
                          {done && (
                            <span style={{ color: 'white', fontSize: 13 }}>
                              ✓
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: 17 }}>{h.icon}</span>
                        <div
                          style={{
                            flex: 1,
                            fontSize: 13,
                            fontWeight: 600,
                            opacity: done ? 0.6 : 1,
                            textDecoration: done ? 'line-through' : 'none',
                          }}
                        >
                          {h.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ TRABALHOS ══ */}
        {tab === 'works' && !addWork && !editWork && !detail && (
          <div style={{ padding: 16 }}>
            <MonthNav vm={vm} onPrev={prevMo} onNext={nextMo} />
            <button
              onClick={() => setAddWork(true)}
              style={bt(C.pri, { width: '100%', marginBottom: 12 })}
            >
              + Novo Trabalho
            </button>
            <input
              style={ip({ marginBottom: 8 })}
              value={wSearch}
              onChange={(e: any) => setWSearch(e.target.value)}
              placeholder="🔍 Buscar por cliente, nome, 'fotolivro' ou 'trabalho'..."
            />
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 8,
                flexWrap: 'wrap',
              }}
            >
              {[
                { v: 'todos', l: 'Todos' },
                { v: 'andamento', l: 'Em andamento' },
                { v: 'concluidos', l: 'Concluídos' },
              ].map((f) => (
                <button
                  key={f.v}
                  onClick={() => setWFilter(f.v)}
                  style={{
                    background: wFilter === f.v ? C.pri : C.bg,
                    border: `1.5px solid ${wFilter === f.v ? C.pri : C.bor}`,
                    borderRadius: 8,
                    padding: '5px 12px',
                    cursor: 'pointer',
                    color: wFilter === f.v ? 'white' : C.txt,
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {f.l}
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 8,
                flexWrap: 'wrap',
              }}
            >
              {[
                { v: 'todos', l: 'Todos' },
                { v: 'trabalho', l: '📷 Trabalhos' },
                { v: 'fotolivro', l: '📚 Fotolivros' },
              ].map((f) => (
                <button
                  key={f.v}
                  onClick={() => setWKindFilter(f.v)}
                  style={{
                    background: wKindFilter === f.v ? C.lav : C.bg,
                    border: `1.5px solid ${
                      wKindFilter === f.v ? C.lav : C.bor
                    }`,
                    borderRadius: 8,
                    padding: '5px 12px',
                    cursor: 'pointer',
                    color: wKindFilter === f.v ? 'white' : C.txt,
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {f.l}
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 12,
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setWTypeFilter('todos')}
                style={{
                  background: wTypeFilter === 'todos' ? C.lav : C.bg,
                  border: `1.5px solid ${
                    wTypeFilter === 'todos' ? C.lav : C.bor
                  }`,
                  borderRadius: 8,
                  padding: '5px 12px',
                  cursor: 'pointer',
                  color: wTypeFilter === 'todos' ? 'white' : C.txt,
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Todos os tipos
              </button>
              {d.templates.map((t: any) => (
                <button
                  key={t.id}
                  onClick={() => setWTypeFilter(t.id)}
                  style={{
                    background: wTypeFilter === t.id ? C.lav : C.bg,
                    border: `1.5px solid ${
                      wTypeFilter === t.id ? C.lav : C.bor
                    }`,
                    borderRadius: 8,
                    padding: '5px 12px',
                    cursor: 'pointer',
                    color: wTypeFilter === t.id ? 'white' : C.txt,
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: C.mut,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                Ordenar:
              </span>
              <select
                style={ip({
                  padding: '6px 10px',
                  fontSize: 12,
                  width: 'auto',
                  flex: 1,
                })}
                value={wSort}
                onChange={(e: any) => setWSort(e.target.value)}
              >
                <option value="data">Data do evento</option>
                <option value="nome">Nome do cliente</option>
                <option value="progresso">Progresso</option>
              </select>
            </div>
            {filteredWorks.length === 0 && (
              <div
                style={{ textAlign: 'center', padding: '40px 0', color: C.mut }}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
                <div>Nenhum trabalho encontrado</div>
              </div>
            )}
            {filteredWorks.map((w: any) => {
              const done = w.steps.filter((s: any) => s.done);
              const p = w.steps.length
                ? Math.round((done.length / w.steps.length) * 100)
                : 0;
              const last = done[done.length - 1];
              const next = w.steps.find((s: any) => !s.done);
              const isConc =
                w.steps.length > 0 && w.steps.every((s: any) => s.done);
              return (
                <div
                  key={w.id}
                  style={{
                    ...sc({ opacity: isConc ? 0.75 : 1 }),
                    cursor: 'pointer',
                  }}
                  onClick={() => setDetail(w)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: isConc ? 0 : 6,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>
                        {w.tmplIcon} {w.clientName}
                      </div>
                      {w.workName && (
                        <div
                          style={{
                            fontSize: 12,
                            color: C.pri,
                            fontWeight: 600,
                          }}
                        >
                          {w.workName}
                        </div>
                      )}
                      {w.date && (
                        <div style={{ fontSize: 11, color: C.mut }}>
                          📅 {fmtDate(w.date)}
                        </div>
                      )}
                      {!isConc && last && (
                        <div style={{ fontSize: 11, color: C.ok }}>
                          ✓ {last.name}
                        </div>
                      )}
                      {!isConc && next && (
                        <div style={{ fontSize: 11, color: C.pri }}>
                          → {next.name}
                        </div>
                      )}
                      {w.obs && (
                        <div
                          style={{
                            fontSize: 11,
                            color: C.mut,
                            fontStyle: 'italic',
                            marginTop: 2,
                          }}
                        >
                          "{w.obs}"
                        </div>
                      )}
                    </div>
                    {isConc ? (
                      <span style={{ fontSize: 20 }}>✅</span>
                    ) : (
                      <span
                        style={{ fontWeight: 800, color: C.pri, fontSize: 16 }}
                      >
                        {p}%
                      </span>
                    )}
                  </div>
                  {!isConc && (
                    <Bar
                      pct={p}
                      color={`linear-gradient(90deg,${C.lav},#d4b8f0)`}
                    />
                  )}
                  {w.valor > 0 &&
                    (() => {
                      const instN = w.installments || 1;
                      const paidArr =
                        w.installmentsPaid || Array(instN).fill(false);
                      const paidCount = paidArr.filter(Boolean).length;
                      const fullyPaid = paidCount >= instN;
                      const partPaid = paidCount > 0 && !fullyPaid;
                      const payColor = fullyPaid
                        ? C.ok
                        : partPaid
                        ? C.gold
                        : C.red;
                      return (
                        <div
                          style={{
                            fontSize: 11,
                            color: payColor,
                            fontWeight: fullyPaid ? 700 : 600,
                            marginTop: 5,
                          }}
                        >
                          {fullyPaid ? '✅' : '💰'} {payStr(w)}
                          {fullyPaid
                            ? ' · Pago'
                            : partPaid
                            ? ` · ${paidCount}/${instN} pago`
                            : ' · Pendente'}
                        </div>
                      );
                    })()}
                  <div
                    style={{
                      fontSize: 11,
                      color: postInfo(w.postStatus).color,
                      fontWeight: 600,
                      marginTop: 3,
                    }}
                  >
                    {postInfo(w.postStatus).icon} {postInfo(w.postStatus).l}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'works' && addWork && (
          <div style={{ padding: 16 }}>
            <button
              onClick={() => setAddWork(false)}
              style={{
                background: 'none',
                border: 'none',
                color: C.pri,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 12,
                padding: 0,
              }}
            >
              ← Voltar
            </button>
            <WorkForm
              initial={null}
              templates={d.templates}
              albumSteps={d.albumSteps}
              title="Novo Trabalho"
              onSave={(
                f: any,
                mainSteps: string[],
                albumStepsList: string[] | null
              ) => saveWork(f, mainSteps, albumStepsList, null)}
              onCancel={() => setAddWork(false)}
            />
          </div>
        )}
        {tab === 'works' && editWork && (
          <div style={{ padding: 16 }}>
            <button
              onClick={() => setEditWork(null)}
              style={{
                background: 'none',
                border: 'none',
                color: C.pri,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 12,
                padding: 0,
              }}
            >
              ← Voltar
            </button>
            <WorkForm
              initial={editWork}
              templates={d.templates}
              albumSteps={d.albumSteps}
              title="✏️ Editar Trabalho"
              onSave={(
                f: any,
                mainSteps: string[],
                albumStepsList: string[] | null
              ) => saveWork(f, mainSteps, albumStepsList, editWork.id)}
              onCancel={() => setEditWork(null)}
            />
          </div>
        )}

        {/* DETALHE */}
        {tab === 'works' &&
          detail &&
          !editWork &&
          (() => {
            const w = detail;
            const doneSt = w.steps.filter((s: any) => s.done);
            const p = w.steps.length
              ? Math.round((doneSt.length / w.steps.length) * 100)
              : 0;
            const last = doneSt[doneSt.length - 1];
            const next = w.steps.find((s: any) => !s.done);
            const instNum = w.installments || 1;
            const paid = w.installmentsPaid || Array(instNum).fill(false);
            const paidCount = paid.filter(Boolean).length;
            const instVal = w.valor / instNum;
            return (
              <div style={{ padding: 16 }}>
                <button
                  onClick={() => setDetail(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: C.pri,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 12,
                    padding: 0,
                  }}
                >
                  ← Voltar
                </button>
                <div
                  style={sc({
                    background: `linear-gradient(150deg,${C.lavL},#fff)`,
                  })}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 18 }}>
                        {w.tmplIcon} {w.clientName}
                      </div>
                      {w.workName && (
                        <div
                          style={{
                            fontSize: 14,
                            color: C.pri,
                            fontWeight: 700,
                          }}
                        >
                          {w.workName}
                        </div>
                      )}
                      <div style={{ color: C.mut, fontSize: 12 }}>
                        {w.tmplName}
                        {w.date ? ` · ${fmtDate(w.date)}` : ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={() => {
                          setEditWork(w);
                          setDetail(null);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: C.pri,
                          cursor: 'pointer',
                          fontSize: 18,
                          padding: 0,
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => delWork(w.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: C.red,
                          cursor: 'pointer',
                          fontSize: 18,
                          padding: 0,
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>

                  {/* Observações no detalhe */}
                  {w.obs && (
                    <div
                      style={{
                        marginTop: 8,
                        background: 'white',
                        borderRadius: 10,
                        padding: '8px 12px',
                        border: `1px solid ${C.bor}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: C.mut,
                          fontWeight: 600,
                          marginBottom: 2,
                        }}
                      >
                        📝 OBS
                      </div>
                      <div style={{ fontSize: 13, color: C.txt }}>{w.obs}</div>
                    </div>
                  )}

                  {w.valor > 0 && (
                    <div
                      style={{
                        marginTop: 8,
                        background: C.gL,
                        borderRadius: 10,
                        padding: '8px 12px',
                      }}
                    >
                      <div
                        style={{ fontWeight: 700, color: C.gold, fontSize: 15 }}
                      >
                        💰 R$ {fmtR(w.valor)}
                      </div>
                      {w.expenses > 0 && (
                        <div
                          style={{ fontSize: 12, color: C.ok, fontWeight: 600 }}
                        >
                          Líquido: R$ {fmtR(w.valor - w.expenses)}
                        </div>
                      )}
                      <div style={{ fontSize: 12, color: C.mut }}>
                        {payStr(w)}
                      </div>
                      <div style={{ fontSize: 12, color: C.ok, marginTop: 4 }}>
                        Recebido: {paidCount}/{instNum} parcela
                        {instNum > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 10 }}>
                    {last && (
                      <div
                        style={{ fontSize: 12, color: C.ok, marginBottom: 2 }}
                      >
                        ✓ Concluído: {last.name}
                      </div>
                    )}
                    {next && (
                      <div
                        style={{ fontSize: 12, color: C.pri, marginBottom: 6 }}
                      >
                        → Próximo: {next.name}
                      </div>
                    )}
                    <Bar
                      pct={p}
                      color={`linear-gradient(90deg,${C.lav},#d4b8f0)`}
                      h={10}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        color: C.mut,
                        marginTop: 4,
                        textAlign: 'right',
                      }}
                    >
                      {p}% · {doneSt.length}/{w.steps.length} etapas
                    </div>
                  </div>
                </div>

                <SL t="FLUXO DO TRABALHO" />
                {w.steps.length === 0 && (
                  <div
                    style={sc({
                      textAlign: 'center',
                      color: C.mut,
                      fontSize: 13,
                    })}
                  >
                    Edite e selecione um template.
                  </div>
                )}
                {w.steps.length > 0 && (
                  <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        minWidth: 'max-content',
                        padding: '4px 0 8px',
                      }}
                    >
                      {w.steps.map((step: any, i: number) => (
                        <div
                          key={step.id}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: 64,
                            }}
                          >
                            <div
                              onClick={() =>
                                step.done
                                  ? uncompleteStep(w.id, step.id)
                                  : completeStep(w.id, step.id)
                              }
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                border: `2.5px solid ${
                                  step.done
                                    ? C.ok
                                    : i === doneSt.length
                                    ? C.pri
                                    : C.bor
                                }`,
                                background: step.done
                                  ? C.ok
                                  : i === doneSt.length
                                  ? C.pL
                                  : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all .2s',
                              }}
                            >
                              {step.done ? (
                                <span
                                  style={{
                                    color: 'white',
                                    fontSize: 13,
                                    fontWeight: 700,
                                  }}
                                >
                                  ✓
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: i === doneSt.length ? C.pri : C.mut,
                                    fontSize: 11,
                                    fontWeight: 700,
                                  }}
                                >
                                  {i + 1}
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontSize: 9,
                                color: step.done
                                  ? C.ok
                                  : i === doneSt.length
                                  ? C.pri
                                  : C.mut,
                                fontWeight:
                                  step.done || i === doneSt.length ? 700 : 400,
                                textAlign: 'center',
                                marginTop: 4,
                                lineHeight: 1.2,
                                maxWidth: 60,
                              }}
                            >
                              {step.name}
                            </div>
                          </div>
                          {i < w.steps.length - 1 && (
                            <div
                              style={{
                                width: 16,
                                height: 2,
                                background: step.done ? C.ok : C.bor,
                                marginBottom: 18,
                                transition: 'background .3s',
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {w.steps.map((step: any, i: number) => (
                  <div
                    key={step.id}
                    style={sc({
                      background: step.done ? C.okL : C.card,
                      border: `1px solid ${step.done ? C.ok : C.bor}`,
                    })}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      <div
                        onClick={() =>
                          step.done
                            ? uncompleteStep(w.id, step.id)
                            : completeStep(w.id, step.id)
                        }
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          border: `2px solid ${step.done ? C.ok : C.bor}`,
                          background: step.done ? C.ok : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0,
                          transition: 'all .2s',
                        }}
                      >
                        {step.done ? (
                          <span style={{ color: 'white', fontSize: 15 }}>
                            ✓
                          </span>
                        ) : (
                          <span style={{ color: C.mut, fontSize: 12 }}>
                            {i + 1}
                          </span>
                        )}
                      </div>
                      <div style={{ flex: 1, opacity: step.done ? 0.6 : 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            textDecoration: step.done ? 'line-through' : 'none',
                          }}
                        >
                          {step.name}
                        </div>
                        {!step.done && i === doneSt.length && (
                          <div
                            style={{
                              fontSize: 11,
                              color: C.pri,
                              fontWeight: 600,
                            }}
                          >
                            ← próxima etapa
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {w.valor > 0 && (
                  <>
                    <SL t="PAGAMENTOS" />
                    {Array.from({ length: instNum }, (_, i) => {
                      const isPaid = paid[i] || false;
                      const dueDate = w.dueDates?.[i] || '';
                      return (
                        <div
                          key={i}
                          style={sc({
                            background: isPaid ? C.okL : C.gL,
                            border: `1.5px solid ${isPaid ? C.ok : C.gold}`,
                          })}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontWeight: 700,
                                  fontSize: 14,
                                  color: isPaid ? C.ok : C.gold,
                                }}
                              >
                                💰{' '}
                                {instNum > 1
                                  ? `Parcela ${i + 1}/${instNum}`
                                  : 'Pagamento'}{' '}
                                — R$ {fmtR(instVal)}
                              </div>
                              {dueDate && (
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: C.mut,
                                    marginTop: 2,
                                  }}
                                >
                                  Vencimento: {fmtDate(dueDate)}
                                </div>
                              )}
                              {isPaid && (
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: C.ok,
                                    fontWeight: 600,
                                    marginTop: 2,
                                  }}
                                >
                                  ✅ Recebido
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => togglePaid(w.id, i)}
                              style={bt(
                                isPaid
                                  ? C.ok
                                  : `linear-gradient(90deg,${C.gold},#e8b860)`,
                                {
                                  fontSize: 13,
                                  padding: '8px 14px',
                                  flexShrink: 0,
                                }
                              )}
                            >
                              {isPaid ? '✅ Recebido' : 'Recebido ✓'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                <SL t="POST" />
                <div style={sc()}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      flexWrap: 'wrap',
                      marginBottom: 8,
                    }}
                  >
                    {POST_STATUS.map((ps) => {
                      const active = (w.postStatus || 'nao_autorizado') === ps.v;
                      return (
                        <button
                          key={ps.v}
                          onClick={() => setPostStatus(w.id, ps.v)}
                          style={{
                            background: active ? ps.color : C.bg,
                            border: `1.5px solid ${active ? ps.color : C.bor}`,
                            borderRadius: 8,
                            padding: '8px 12px',
                            cursor: 'pointer',
                            color: active ? 'white' : C.txt,
                            fontWeight: 700,
                            fontSize: 12,
                            flex: 1,
                          }}
                        >
                          {ps.icon} {ps.l}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: postInfo(w.postStatus).color,
                      fontWeight: 600,
                    }}
                  >
                    Status atual: {postInfo(w.postStatus).icon}{' '}
                    {postInfo(w.postStatus).l}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ══ METAS ══ */}
        {tab === 'goals' && (
          <div style={{ padding: 16 }}>
            <MonthNav vm={vm} onPrev={prevMo} onNext={nextMo} />
            <div
              style={sc({
                background: `linear-gradient(150deg,${C.pL},#fff)`,
                textAlign: 'center',
              })}
            >
              <div
                style={{
                  fontSize: 11,
                  color: C.mut,
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                FATURAMENTO BRUTO
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: C.pri,
                  marginTop: 2,
                }}
              >
                R$ {fmtR(fatBruto)}
              </div>
              <Bar
                pct={bPct}
                color={`linear-gradient(90deg,${C.pri},#e8a0a0)`}
                h={10}
              />
              <div style={{ fontSize: 12, color: C.mut, marginTop: 4 }}>
                Meta: R$ {fmtR(d.metaBruto)} · {bPct}%
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 11,
                  color: C.mut,
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                FATURAMENTO LÍQUIDO
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: C.ok,
                  marginTop: 2,
                }}
              >
                R$ {fmtR(fatLiq)}
              </div>
              <Bar
                pct={lPct}
                color={`linear-gradient(90deg,${C.ok},#86efac)`}
                h={10}
              />
              <div style={{ fontSize: 12, color: C.mut, marginTop: 4 }}>
                Meta: R$ {fmtR(d.metaLiquido)} · {lPct}%
              </div>
              <div style={{ fontSize: 11, color: C.mut, marginTop: 8 }}>
                {monthWorks.length} trabalho(s) em {MES[vm.m]}
              </div>
              {bPct >= 100 && (
                <div
                  style={{
                    fontSize: 13,
                    color: C.ok,
                    fontWeight: 800,
                    marginTop: 6,
                  }}
                >
                  🏆 Meta batida!
                </div>
              )}
            </div>
            {['semana', 'mes'].map((period) => {
              const gs = d.goals.filter((g: any) => g.period === period);
              if (!gs.length) return null;
              return (
                <div key={period}>
                  <SL t={period === 'semana' ? 'ESTA SEMANA' : 'ESTE MÊS'} />
                  {gs.map((g: any) => {
                    const bateu = g.done >= g.target;
                    const pBar = Math.min(
                      100,
                      Math.round((g.done / g.target) * 100)
                    );
                    return (
                      <div key={g.id} style={sc()}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 6,
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: 14 }}>
                            {g.name}
                          </div>
                          {bateu && <span>✅</span>}
                        </div>
                        <Bar
                          pct={pBar}
                          color={
                            bateu
                              ? `linear-gradient(90deg,${C.ok},#86efac)`
                              : `linear-gradient(90deg,${C.lav},#d4b8f0)`
                          }
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              color: bateu ? C.ok : C.mut,
                              fontWeight: 600,
                            }}
                          >
                            {g.done}/{g.target} {g.unit}
                            {g.done > g.target && (
                              <span style={{ color: C.ok, fontSize: 12 }}>
                                {' '}
                                · +{g.done - g.target} além 🎯
                              </span>
                            )}
                          </span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => updateGoal(g.id, -1)}
                              style={{
                                background: C.bor,
                                border: 'none',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: 18,
                                color: C.txt,
                              }}
                            >
                              −
                            </button>
                            <button
                              onClick={() => updateGoal(g.id, +1)}
                              style={{
                                background: bateu ? C.okL : C.lavL,
                                border: 'none',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: 18,
                                color: bateu ? C.ok : C.lav,
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ HÁBITOS ══ */}
        {tab === 'habits' && (
          <div style={{ padding: 16 }}>
            <MonthNav vm={vm} onPrev={prevMo} onNext={nextMo} />
            <div
              style={sc({
                background: C.lavL,
                textAlign: 'center',
                padding: '10px 16px',
              })}
            >
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {d.doneToday.length}/{d.habits.length} hábitos hoje
              </div>
              <Bar
                pct={hPct}
                color={`linear-gradient(90deg,${C.lav},#d4b8f0)`}
                h={8}
              />
              <div style={{ fontSize: 12, color: C.mut, marginTop: 4 }}>
                {hPct === 100
                  ? '✨ Todos feitos!'
                  : hPct > 0
                  ? `${hPct}% concluído`
                  : 'Bora começar!'}
              </div>
            </div>
            {d.habits.map((h: any) => {
              const done = d.doneToday.includes(h.id);
              return (
                <div
                  key={h.id}
                  style={{
                    ...sc(),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    onClick={() => (done ? uncheckH(h.id) : checkH(h))}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      border: `2px solid ${done ? C.ok : C.bor}`,
                      background: done ? C.ok : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all .2s',
                    }}
                  >
                    {done && (
                      <span style={{ color: 'white', fontSize: 15 }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize: 22 }}>{h.icon}</span>
                  <div style={{ flex: 1, opacity: done ? 0.6 : 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: done ? 'line-through' : 'none',
                      }}
                    >
                      {h.name}
                    </div>
                  </div>
                  <button
                    onClick={() => removeH(h.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: C.mut,
                      cursor: 'pointer',
                      fontSize: 16,
                      padding: 4,
                    }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
            {addHabit ? (
              <HabitForm
                onSave={addHabitSave}
                onCancel={() => setAddHabit(false)}
              />
            ) : (
              <button
                onClick={() => setAddHabit(true)}
                style={bt(C.pri, { width: '100%', marginTop: 4 })}
              >
                + Novo Hábito
              </button>
            )}
          </div>
        )}

        {/* ══ CONFIG ══ */}
        {tab === 'config' && (
          <div style={{ padding: 16 }}>
            <div style={sc({ textAlign: 'center' })}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                {d.photo ? (
                  <PhotoAvatar src={d.photo} size={80} />
                ) : (
                  <InitialsAvatar name={d.name} size={80} />
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <label
                  htmlFor="photo-input"
                  style={{
                    background: C.pL,
                    border: `1px solid ${C.pri}`,
                    borderRadius: 99,
                    padding: '6px 16px',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: C.pri,
                    fontWeight: 600,
                  }}
                >
                  📷 {d.photo ? 'Trocar foto' : 'Adicionar foto'}
                </label>
                {d.photo && (
                  <button
                    onClick={removePhoto}
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.bor}`,
                      borderRadius: 99,
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontSize: 13,
                      color: C.mut,
                      fontWeight: 600,
                    }}
                  >
                    ✕ Remover
                  </button>
                )}
              </div>
            </div>

            <SL t="DADOS PESSOAIS" />
            <CfgFormInline d={d} onSave={saveCfg} />

            <SL t="TEMPLATES DE ETAPAS" />
            <div style={{ fontSize: 12, color: C.mut, marginBottom: 10 }}>
              Templates definem o fluxo de cada trabalho.
            </div>
            {editTmpl === 'new' && (
              <TmplEditor
                tmpl={null}
                onSave={saveTmpl}
                onDelete={delTmpl}
                onCancel={() => setEditTmpl(null)}
              />
            )}
            {editTmpl && editTmpl !== 'new' && (
              <TmplEditor
                tmpl={editTmpl}
                onSave={saveTmpl}
                onDelete={delTmpl}
                onCancel={() => setEditTmpl(null)}
              />
            )}
            {!editTmpl && (
              <>
                {d.templates.map((t: any) => (
                  <div key={t.id} style={sc()}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <span style={{ fontSize: 24 }}>{t.icon}</span>
                      <div
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={() => setEditTmpl(t)}
                      >
                        <div style={{ fontWeight: 700, fontSize: 14 }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: 11, color: C.mut }}>
                          {t.steps.length} etapas · toque para editar
                        </div>
                      </div>
                      <button
                        onClick={() => dupTmpl(t)}
                        style={{
                          background: C.lavL,
                          border: `1px solid ${C.lav}`,
                          borderRadius: 8,
                          padding: '6px 10px',
                          cursor: 'pointer',
                          color: C.lav,
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setEditTmpl('new')}
                  style={bt(C.pri, { width: '100%', marginTop: 4 })}
                >
                  + Novo Template
                </button>
              </>
            )}

            <SL t="ETAPAS DO ÁLBUM" />
            <div style={{ fontSize: 12, color: C.mut, marginBottom: 10 }}>
              Adicionadas quando um trabalho inclui álbum.
            </div>
            {editAlbum ? (
              <AlbumStepsEditor
                steps={d.albumSteps || DEF_ALBUM_STEPS}
                onSave={saveAlbumSteps}
                onCancel={() => setEditAlbum(false)}
              />
            ) : (
              <div style={sc()}>
                {(d.albumSteps || DEF_ALBUM_STEPS).map(
                  (s: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 13,
                        padding: '5px 0',
                        borderBottom:
                          i < (d.albumSteps || []).length - 1
                            ? `1px solid ${C.bor}`
                            : 'none',
                      }}
                    >
                      <span
                        style={{
                          color: C.lav,
                          fontWeight: 700,
                          marginRight: 8,
                        }}
                      >
                        {i + 1}.
                      </span>
                      {s}
                    </div>
                  )
                )}
                <button
                  onClick={() => setEditAlbum(true)}
                  style={bt(C.lav, { width: '100%', marginTop: 10 })}
                >
                  ✏️ Editar etapas do álbum
                </button>
              </div>
            )}

            <SL t="METAS" />
            {d.goals.map((g: any) => (
              <GoalCfg key={g.id} g={g} onSave={saveGoal} />
            ))}
            <button
              onClick={addGoal}
              style={bt(C.pri, { width: '100%', marginTop: 4 })}
            >
              + Nova Meta
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: C.card,
          borderTop: `1px solid ${C.bor}`,
          display: 'flex',
          padding: '6px 0 10px',
          zIndex: 100,
        }}
      >
        {[
          { id: 'home', icon: '🏠', l: 'Início' },
          { id: 'works', icon: '📋', l: 'Trabalhos' },
          { id: 'goals', icon: '🎯', l: 'Metas' },
          { id: 'habits', icon: '💪', l: 'Hábitos' },
          { id: 'config', icon: '⚙️', l: 'Config' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => navTo(t.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: tab === t.id ? C.pri : C.mut,
              padding: '4px 0',
            }}
          >
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700 }}>{t.l}</span>
          </button>
        ))}
      </div>

      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            background: C.pri,
            color: 'white',
            padding: '8px 22px',
            borderRadius: 99,
            fontWeight: 700,
            fontSize: 14,
            zIndex: 999,
            whiteSpace: 'nowrap',
            boxShadow: `0 4px 16px ${C.pri}55`,
            pointerEvents: 'none',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
