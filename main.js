/* ============================================================
   MAIN — Sidebar scroll-spy + gráficos de Adopción IA
   ============================================================ */

(function () {
  /* ---------- Sidebar scroll-spy ---------- */
  var sideNav = document.getElementById('sideNav');
  if (sideNav) {
    var items = Array.prototype.slice.call(sideNav.querySelectorAll('.side-nav-item'));
    var sections = items.map(function (item) {
      return document.getElementById(item.dataset.target);
    });
    var fill = document.getElementById('sideNavFill');
    var trackHeight = 0;

    function recalcTrack() {
      var track = sideNav.querySelector('.side-nav-track');
      trackHeight = track ? track.offsetHeight : 0;
    }

    function updateActive() {
      var scrollY = window.scrollY + window.innerHeight * 0.35;
      var activeIdx = 0;
      sections.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= scrollY) activeIdx = i;
      });
      items.forEach(function (item, i) {
        item.classList.toggle('active', i === activeIdx);
      });
      if (fill && trackHeight > 0) {
        var pct = items.length > 1 ? activeIdx / (items.length - 1) : 0;
        fill.style.height = (pct * trackHeight) + 'px';
      }
    }

    window.addEventListener('load', function () { recalcTrack(); updateActive(); });
    window.addEventListener('resize', function () { recalcTrack(); updateActive(); });
    window.addEventListener('scroll', updateActive, { passive: true });
    recalcTrack();
    updateActive();
  }

  /* ---------- Ramp-up chart (línea, 4 series) ---------- */
  var rampupEl = document.getElementById('rampupChart');
  if (rampupEl) {
    var quarters = ["Q2'26", "Q3'26", "Q4'26", "Q1'27", "Q2'27", "Q3'27", "Q4'27"];
    var maxY = 150;
    var series = [
      { name: 'Fundamentos Digitales', color: 'var(--text-primary)', data: [93, 95, 96, 97, 97, 98, 98] },
      { name: 'Automatización de Procesos', color: 'var(--text-brand)', data: [80, 85, 87, 88, 89, 91, 92] },
      { name: 'ML Predictivo', color: '#6CA46C', data: [58, 73, 81, 85, 88, 91, 93] },
      { name: 'IA Generativa y Agentiva', color: '#9C82C1', data: [28, 52, 70, 80, 87, 92, 96] },
      { name: 'Personas', color: '#E07B39', data: [6, 24, 68, 100, 100, 150, 150], isPersonas: true }
    ];

    var w = rampupEl.clientWidth || 900;
    var h = 220;
    var padding = 12;
    var stepX = (w - padding * 2) / (quarters.length - 1);

    function yFor(val) {
      return h - padding - (val / maxY) * (h - padding * 2);
    }

    var svgParts = ['<svg width="100%" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" style="overflow:visible;">'];

    // gridlines + Y-axis labels
    [0, 50, 100, 150].forEach(function (g) {
      var gy = yFor(g);
      svgParts.push('<line x1="0" y1="' + gy + '" x2="' + w + '" y2="' + gy + '" stroke="var(--border-default)" stroke-width="1" stroke-dasharray="2 3" />');
      svgParts.push('<text x="4" y="' + (gy - 4) + '" text-anchor="start" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-mono)">' + g + '</text>');
    });

    function smoothPath(data) {
      var points = data.map(function (v, i) {
        return { x: padding + i * stepX, y: yFor(v) };
      });
      var d = 'M ' + points[0].x + ' ' + points[0].y;
      for (var i = 1; i < points.length; i++) {
        var prev = points[i - 1];
        var curr = points[i];
        var cpx = (prev.x + curr.x) / 2;
        d += ' C ' + cpx + ' ' + prev.y + ' ' + cpx + ' ' + curr.y + ' ' + curr.x + ' ' + curr.y;
      }
      return d;
    }

    series.forEach(function (s) {
      svgParts.push('<path d="' + smoothPath(s.data) + '" fill="none" stroke="' + s.color + '" stroke-width="' + (s.isPersonas ? '2.5' : '2') + '" stroke-linejoin="round" />');
      s.data.forEach(function (v, i) {
        var cx = padding + i * stepX;
        var cy = yFor(v);
        svgParts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (s.isPersonas ? 4 : 3) + '" fill="' + s.color + '" />');
        if (s.isPersonas) {
          svgParts.push('<text x="' + cx + '" y="' + (cy - 8) + '" text-anchor="middle" font-size="9" fill="' + s.color + '" font-family="var(--font-mono)" font-weight="700">' + v + '</text>');
        }
      });
    });

    svgParts.push('</svg>');
    rampupEl.innerHTML = svgParts.join('');

    // quarter labels
    var labelsHtml = '<div style="display:flex;justify-content:space-between;margin-top:8px;font-family:var(--font-mono);font-size:10px;color:var(--text-tertiary);">' +
      quarters.map(function (q) { return '<span>' + q + '</span>'; }).join('') + '</div>';
    rampupEl.insertAdjacentHTML('afterend', labelsHtml);
  }

  /* ---------- AS-IS vs TO-BE bars ---------- */
  var tobeEl = document.getElementById('tobeBars');
  if (tobeEl) {
    var layers = [
      { label: 'Experiencia Multicanal', asis: 42, tobe: 88 },
      { label: 'Confianza Digital', asis: 58, tobe: 92 },
      { label: 'Automatización Financiera', asis: 33, tobe: 87 },
      { label: 'Motor de Decisión IA', asis: 18, tobe: 95 },
      { label: 'Registros Core', asis: 52, tobe: 84 },
      { label: 'Inteligencia de Datos', asis: 27, tobe: 92 },
      { label: 'Gobierno y Resiliencia', asis: 48, tobe: 88 }
    ];

    var rowsHtml = layers.map(function (l) {
      return '<div class="tobe-row">' +
        '<span class="tobe-label">' + l.label + '</span>' +
        '<span class="tobe-track">' +
          '<span class="tobe-fill-asis" style="width:' + l.asis + '%;"></span>' +
          '<span class="tobe-fill-tobe" style="width:' + l.tobe + '%; opacity:0.35;"></span>' +
        '</span>' +
        '<span class="tobe-value">' + l.asis + ' → ' + l.tobe + '</span>' +
      '</div>';
    }).join('');
    tobeEl.innerHTML = rowsHtml;
  }
})();
