import { useState } from "react";

const COR_TIME_A = "#e8500a";
const COR_TIME_B = "#1a6fd4";

function JogadorCard({ jogador, onPontos }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
      }}>
        <input
          value={jogador.nome}
          onChange={e => onPontos("nome", e.target.value)}
          placeholder="Nome do jogador"
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: 14,
            fontFamily: "inherit",
            flex: 1,
            padding: "2px 0",
            outline: "none",
          }}
        />
        <span style={{
          fontSize: 22,
          fontWeight: 800,
          minWidth: 36,
          textAlign: "right",
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
        }}>
          {jogador.pontos}
        </span>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3].map(v => (
          <button
            key={v}
            onClick={() => onPontos("add", v)}
            style={{
              flex: 1,
              padding: "6px 0",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.22)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.12)"}
          >
            +{v}
          </button>
        ))}
        <button
          onClick={() => onPontos("sub")}
          disabled={jogador.pontos === 0}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            background: "rgba(255,255,255,0.07)",
            color: jogador.pontos === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.6)",
            fontWeight: 700,
            fontSize: 13,
            cursor: jogador.pontos === 0 ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
        >
          −1
        </button>
      </div>
    </div>
  );
}

function TimeCard({ time, cor, lado, onUpdate }) {
  const total = time.jogadores.reduce((s, j) => s + j.pontos, 0);

  function handleJogador(idx, acao, valor) {
    const jogadores = time.jogadores.map((j, i) => {
      if (i !== idx) return j;
      if (acao === "nome") return { ...j, nome: valor };
      if (acao === "add") return { ...j, pontos: j.pontos + valor };
      if (acao === "sub") return { ...j, pontos: Math.max(0, j.pontos - 1) };
      return j;
    });
    onUpdate({ ...time, jogadores });
  }

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      {/* Cabeçalho do time */}
      <div style={{
        background: cor,
        borderRadius: 12,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <input
          value={time.nome}
          onChange={e => onUpdate({ ...time, nome: e.target.value })}
          placeholder={`Time ${lado}`}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "inherit",
            flex: 1,
            outline: "none",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        />
        <span style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}>
          {total}
        </span>
      </div>

      {/* Jogadores */}
      {time.jogadores.map((j, i) => (
        <JogadorCard
          key={i}
          jogador={j}
          onPontos={(acao, valor) => handleJogador(i, acao, valor)}
        />
      ))}
    </div>
  );
}

function novoTime(nome) {
  return {
    nome,
    jogadores: Array(4).fill(null).map(() => ({ nome: "", pontos: 0 })),
  };
}

export default function App() {
  const [timeA, setTimeA] = useState(novoTime("Time A"));
  const [timeB, setTimeB] = useState(novoTime("Time B"));

  const totalA = timeA.jogadores.reduce((s, j) => s + j.pontos, 0);
  const totalB = timeB.jogadores.reduce((s, j) => s + j.pontos, 0);

  function resetar() {
    setTimeA(t => ({ ...t, jogadores: t.jogadores.map(j => ({ ...j, pontos: 0 })) }));
    setTimeB(t => ({ ...t, jogadores: t.jogadores.map(j => ({ ...j, pontos: 0 })) }));
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
      padding: "16px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 4,
          }}>
            Liga Grajauense de Basquete 3x3
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: 0.5,
          }}>
            Pontuação Individual
          </h1>
        </div>

        {/* Placar geral */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "14px 20px",
          marginBottom: 20,
        }}>
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: COR_TIME_A,
            flex: 1,
            textAlign: "right",
            textTransform: "uppercase",
            letterSpacing: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {timeA.nome || "Time A"}
          </span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 40,
              fontWeight: 900,
              color: totalA > totalB ? COR_TIME_A : "#fff",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}>{totalA}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 24, fontWeight: 300 }}>×</span>
            <span style={{
              fontSize: 40,
              fontWeight: 900,
              color: totalB > totalA ? COR_TIME_B : "#fff",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}>{totalB}</span>
          </div>
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: COR_TIME_B,
            flex: 1,
            textAlign: "left",
            textTransform: "uppercase",
            letterSpacing: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {timeB.nome || "Time B"}
          </span>
        </div>

        {/* Times lado a lado */}
        <div style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}>
          <TimeCard time={timeA} cor={COR_TIME_A} lado="A" onUpdate={setTimeA} />
          <TimeCard time={timeB} cor={COR_TIME_B} lado="B" onUpdate={setTimeB} />
        </div>

        {/* Botão resetar pontos */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={resetar}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.5)",
              borderRadius: 8,
              padding: "8px 24px",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = "rgba(255,255,255,0.4)";
              e.target.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            Resetar pontos
          </button>
        </div>

      </div>
    </div>
  );
}
