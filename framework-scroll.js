/* ============================================================
   FRAMEWORK SCROLL — Scroll-driven interpolation (2 pasos)
   ============================================================ */

(function () {
  // NODE_POSITIONS: Coordenadas finales de los nodos orbitales (%)
  // Ajustado para mejor distribución en todas las pantallas
  const NODE_POSITIONS = {
    // Izquierda superior
    'experiencias': { left: 15, top: 8 },
    'canal-ia': { left: 8, top: 28 },
    'entidades': { left: 25, top: 22 },
    'apps': { left: 10, top: 48 },
    
    // Centro superior
    'capacidades': { left: 50, top: 6 },
    
    // Derecha superior
    'orquestador': { left: 75, top: 22 },
    'agentes': { left: 85, top: 8 },
    'guardrails': { left: 92, top: 28 },
    'ml-satelites': { left: 90, top: 48 },
    
    // Izquierda inferior
    'core-cartera': { left: 25, top: 58 },
    'fachada': { left: 8, top: 70 },
    'motor-planes': { left: 18, top: 82 },
    'maestro-clientes': { left: 40, top: 75 },
    
    // Derecha inferior
    'datos': { left: 75, top: 58 },
    'cerebro-decision': { left: 92, top: 70 },
    
    // Centro inferior
    'seguridad': { left: 50, top: 88 }
  };

  function initFrameworkScroll() {
    const wrapper = document.getElementById('frameworkPinWrapper');
    const blobWrap = document.getElementById('blobWrap');
    const blob = document.getElementById('blob');
    const blobSvg = blob?.querySelector('svg');
    const blobLabel = document.getElementById('blobLabel');
    const diagramStage = document.getElementById('diagramStage');
    const scrollHint = document.getElementById('scrollHint');
    const nodes = Array.from(document.querySelectorAll('.node'));

    if (!wrapper || !blob) return;

    let vh = window.innerHeight || 800;
    let wrapperTop = wrapper.offsetTop;
    
    // Recalcular en resize
    function recalculate() {
      vh = window.innerHeight || 800;
      wrapperTop = wrapper.offsetTop;
    }

    function updateScroll() {
      const scrollPos = window.scrollY;
      const scrollInWrapper = Math.max(0, scrollPos - wrapperTop);
      
      // Fase 1: Morphing del blob (0 → 1.5vh)
      const morphEnd = vh * 1.5;
      let tMorph = Math.min(scrollInWrapper / morphEnd, 1);
      
      // Fase 2: Transición blob→diagrama (1.5vh → 2.5vh)
      const transitionStart = vh * 1.5;
      const transitionEnd = vh * 2.5;
      let tTransition = Math.max(0, Math.min((scrollInWrapper - transitionStart) / (transitionEnd - transitionStart), 1));
      
      // Fase 3: Spread de nodos (2.5vh → 5vh)
      const spreadStart = vh * 2.5;
      const spreadEnd = vh * 5;
      let tSpread = Math.max(0, Math.min((scrollInWrapper - spreadStart) / (spreadEnd - spreadStart), 1));

      // ============ FASE 1: MORPHING DEL BLOB ============
      // Interpolar border-radius (círculo → orgánico)
      const br1 = 50 + (40 - 50) * tMorph;
      const br2 = 50 + (60 - 50) * tMorph;
      const br7 = 50 + (60 - 50) * tMorph;
      const br8 = 50 + (40 - 50) * tMorph;
      blob.style.borderRadius = `${br1}% ${br2}% 50% 50% / 50% 50% ${br7}% ${br8}%`;

      // Interpolar color (negro sólido → azul glassmórfico)
      const bg_g = Math.round(19 + (107 - 19) * tMorph);
      const bg_b = Math.round(38 + (214 - 38) * tMorph);
      const bg_a = 1.0 + (0.15 - 1.0) * tMorph;
      blob.style.backgroundColor = `rgba(0, ${bg_g}, ${bg_b}, ${bg_a})`;

      // Interpolar border y glow
      const border_a = 0 + 0.45 * tMorph;
      blob.style.borderColor = `rgba(0, 107, 214, ${border_a})`;
      
      const glowIntensity = tMorph * 0.4;
      blob.style.boxShadow = `0 0 ${60 * glowIntensity}px rgba(0, 107, 214, ${glowIntensity}), inset 0 0 ${30 * glowIntensity}px rgba(0, 107, 214, ${glowIntensity * 0.5})`;

      // Scroll hint fade out
      if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - tMorph * 2);
      }

      // ============ FASE 2: ESCALAR BLOB AL CENTRO ============
      // El blob se encoge y queda como centro del diagrama (visible al 60%)
      const blobFinalScale = 0.35; // Escala final cuando está en el centro
      const blobScale = 1 - (1 - blobFinalScale) * tTransition;
      const blobFinalOpacity = 0.6; // Mantener visible al 60%
      const blobOpacity = 1 - (1 - blobFinalOpacity) * tTransition;
      
      if (blobWrap) {
        blobWrap.style.transform = `translate(-50%, -50%) scale(${blobScale})`;
        blobWrap.style.opacity = blobOpacity.toString();
      }
      
      if (blobLabel) {
        blobLabel.style.opacity = Math.max(0, 1 - tTransition * 1.5);
      }

      // Mostrar diagrama stage (los nodos orbitales)
      if (diagramStage) {
        diagramStage.style.opacity = tTransition.toString();
        diagramStage.style.pointerEvents = tTransition > 0.3 ? 'auto' : 'none';
        
        if (tTransition > 0) {
          diagramStage.classList.add('visible');
        } else {
          diagramStage.classList.remove('visible');
        }
      }

      // ============ FASE 3: SPREAD ORBITAL DE NODOS ============
      const specsCard = document.getElementById('specsCard');
      
      nodes.forEach(node => {
        const id = node.dataset.id;
        if (!id || !NODE_POSITIONS[id]) return;

        const pos = NODE_POSITIONS[id];
        
        // Interpolar desde centro (50%, 50%) hacia posición final
        const currLeft = 50 + (pos.left - 50) * tSpread;
        const currTop = 50 + (pos.top - 50) * tSpread;
        const scale = 0.4 + 0.6 * tSpread;
        const opacity = tSpread;

        node.style.left = `${currLeft}%`;
        node.style.top = `${currTop}%`;
        node.style.opacity = opacity.toString();
        node.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (tSpread >= 0.95) {
          node.classList.add('visible');
        } else {
          node.classList.remove('visible');
        }
      });

      // Mostrar specs card cuando los nodos están visibles
      if (specsCard) {
        if (tSpread >= 0.8) {
          specsCard.classList.add('is-visible');
        } else {
          specsCard.classList.remove('is-visible');
        }
      }
    }

    // Event listeners
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', () => {
      recalculate();
      updateScroll();
    });
    
    // Ejecutar al cargar
    recalculate();
    updateScroll();
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFrameworkScroll);
  } else {
    initFrameworkScroll();
  }
})();
