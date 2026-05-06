<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SportyStyle – Diagrama de Arquitectura de Base de Datos</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0e1a;
    --surface: #111827;
    --border: #1e3a5f;
    --accent: #00d4ff;
    --sql: #3b82f6;
    --text: #e2e8f0;
    --muted: #64748b;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: linear-gradient(180deg, #0a0e1a 0%, #111827 100%);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding: 60px 20px;
    line-height: 1.6;
  }

  .page { max-width: 1280px; margin: 0 auto; }

  .header {
    text-align: center;
    margin-bottom: 60px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,212,255,0.12);
    border: 2px solid var(--accent);
    color: var(--accent);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 10px 26px;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0,212,255,0.2);
  }
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: -2px;
    margin: 18px 0 10px;
  }
  h1 span { color: var(--accent); }
  .subtitle {
    font-size: 20px;
    color: var(--muted);
    max-width: 620px;
    margin: 0 auto;
  }

  /* === BANNER DE DECISIÓN - MUY RESALTADO === */
  .decision-banner {
    background: linear-gradient(135deg, rgba(59,130,246,0.22), rgba(59,130,246,0.08));
    border: 4px solid var(--sql);
    border-radius: 20px;
    padding: 38px;
    margin-bottom: 70px;
    display: flex;
    gap: 32px;
    align-items: flex-start;
    box-shadow: 0 20px 40px rgba(59,130,246,0.25);
  }
  .decision-icon { font-size: 68px; flex-shrink: 0; }
  .decision-content h3 {
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: var(--sql);
    font-weight: 700;
    margin-bottom: 8px;
  }
  .decision-content h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .decision-content p {
    font-size: 17.5px;
    color: #e2e8f0;
    line-height: 1.75;
  }
  .highlight { color: #00d4ff; font-weight: 700; }

  /* === FLUJO DE ARQUITECTURA === */
  .arch-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    position: relative;
  }
  .node {
    background: rgba(17, 24, 39, 0.95);
    border: 3px solid #334155;
    border-radius: 20px;
    padding: 32px 40px;
    width: 620px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    transition: all 0.4s ease;
    position: relative;
  }
  .node:hover {
    border-color: var(--accent);
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0,212,255,0.25);
  }
  .node-title {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text);
  }
  .node-desc {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.7;
  }
  .node strong { color: #00d4ff; }

  .arrow {
    font-size: 38px;
    color: var(--accent);
    margin: 8px 0;
    text-shadow: 0 0 15px rgba(0,212,255,0.6);
  }

  /* === SECCIÓN DE DESCRIPCIÓN DETALLADA === */
  .details {
    margin-top: 80px;
    background: rgba(17, 24, 39, 0.6);
    border-radius: 20px;
    padding: 40px;
    border: 1px solid #334155;
  }
  .details h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    color: var(--accent);
  }
  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  .detail-card {
    background: #111827;
    padding: 24px;
    border-radius: 16px;
    border-left: 5px solid var(--sql);
  }
  .detail-card h4 {
    color: var(--accent);
    margin-bottom: 10px;
    font-size: 18px;
  }

  .footer {
    text-align: center;
    margin-top: 100px;
    color: var(--muted);
    font-size: 14px;
    font-family: 'Inter', sans-serif;
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="badge">CIB302 • Unidad 3 • Semana 7</div>
    <h1>Arquitectura de Base de Datos<br><span>SportyStyle</span></h1>
    <p class="subtitle">Caso adaptado: TechStore • Tienda online de ropa deportiva</p>
  </div>

  <!-- BANNER DE DECISIÓN -->
  <div class="decision-banner">
    <div class="decision-icon">🗄️</div>
    <div class="decision-content">
      <h3>Decisión Técnica • Base de Datos</h3>
      <h2>Elegida: <span style="color:#3b82f6;">MySQL (SQL Relacional)</span></h2>
      <p>Se seleccionó <strong>MySQL</strong> porque el sistema necesita <strong>datos altamente estructurados</strong> con relaciones claras entre tablas y <strong class="highlight">transacciones ACID completas</strong> durante el checkout. Esto garantiza que cada compra cree el pedido y actualice el stock de forma atómica, evitando inconsistencias en el inventario.</p>
    </div>
  </div>

  <!-- FLUJO DE ARQUITECTURA -->
  <div class="arch-flow">
    <div class="node">
      <div class="node-title">👤 Cliente</div>
      <div class="node-desc">Usuario final que navega el catálogo, agrega productos al carrito, inicia sesión y realiza compras seguras.</div>
    </div>

    <div class="arrow">↓</div>

    <div class="node">
      <div class="node-title">🌐 Frontend</div>
      <div class="node-desc">Interfaz moderna y responsive construida con <strong>HTML5 + CSS3 + Vanilla JavaScript</strong>. Incluye carrito dinámico, login y formulario de checkout.</div>
    </div>

    <div class="arrow">↓ HTTPS + Fetch API (JSON)</div>

    <div class="node">
      <div class="node-title">⚙️ Backend</div>
      <div class="node-desc">Node.js + Express. Gestiona toda la lógica de negocio, validaciones, consultas parametrizadas y <strong>transacciones ACID</strong> en el endpoint /api/checkout.</div>
    </div>

    <div class="arrow">↓ Consultas parametrizadas (Prepared Statements)</div>

    <div class="node" style="border-color: #3b82f6; background: rgba(59,130,246,0.1);">
      <div class="node-title">🗄️ Base de Datos</div>
      <div class="node-desc"><strong>MySQL 8 (XAMPP)</strong><br><br>
        Tablas principales:<br>
        <strong>users</strong> • <strong>products</strong> • <strong>orders</strong> • <strong>order_items</strong> • <strong>login_logs</strong>
      </div>
    </div>
  </div>

  <!-- SECCIÓN DE DESCRIPCIÓN DETALLADA -->
  <div class="details">
    <h2>Descripción Detallada de la Arquitectura</h2>
    <div class="detail-grid">
      <div class="detail-card">
        <h4>✅ Seguridad en Transacciones</h4>
        <p>Transacciones ACID completas + consultas parametrizadas evitan inyección SQL y garantizan integridad en cada compra.</p>
      </div>
      <div class="detail-card">
        <h4>✅ Tipos de Instrucciones SQL</h4>
        <p><strong>DDL:</strong> CREATE TABLE<br>
           <strong>DML:</strong> SELECT, INSERT, UPDATE<br>
           <strong>Integridad:</strong> FOREIGN KEY y ON DELETE CASCADE</p>
      </div>
      <div class="detail-card">
        <h4>✅ Auditoría y Trazabilidad</h4>
        <p>Cada inicio de sesión se registra automáticamente en la tabla <strong>login_logs</strong> para auditoría.</p>
      </div>
      <div class="detail-card">
        <h4>✅ Control de Inventario</h4>
        <p>El stock se actualiza en tiempo real dentro de la misma transacción ACID, evitando sobreventa.</p>
      </div>
    </div>
  </div>

  <div class="footer">
    SportyStyle • Arquitectura 3 capas con MySQL + Transacciones ACID + Consultas Parametrizadas<br>
    Repositorio: <a href="https://github.com/huracan2421/pagina-de-tienda-de-ropa-deportiva-de-lalo.git" style="color:#00d4ff; text-decoration:none;">github.com/huracan2421</a> • Taller de Plataformas Web • Unidad 3
  </div>

</div>
</body>
</html>