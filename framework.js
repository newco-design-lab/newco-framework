/* ============================================================
   FRAMEWORK — Lógica del diagrama del Cerebro (2 estados)
   ============================================================ */

(function () {
  var NODE_SPECS = {
    'entidades': {
      badge: 'CONECTOR: REST / JSON',
      title: 'Entidades Financieras y Canales',
      desc: 'Canales transaccionales externos para instituciones bancarias asociadas con autenticación criptográfica robusta de alta velocidad y conexión directa.',
      tech: 'JWT, OAuth 2.0'
    },
    'experiencias': {
      badge: 'API INTERFAZ',
      title: 'Experiencias de Integración',
      desc: 'Interfaces de backend-for-frontend especializadas que exponen servicios agregados adaptados para las plataformas conectadas de NewCo.',
      tech: 'Vite, Next.js, BFF'
    },
    'canal-ia': {
      badge: 'AGENTE: NATURAL LANGUAGE',
      title: 'Canal Agéntico IA',
      desc: 'Interfaz agéntica conversacional que permite a los usuarios interactuar con la plataforma de cartera mediante consultas intuitivas en lenguaje natural.',
      tech: 'NestJS, LangChain'
    },
    'apps': {
      badge: 'CLIENT SYSTEM',
      title: 'Aplicaciones Web y Mobile',
      desc: 'Puntos de contacto del cliente desarrollados bajo componentes desacoplados de alta velocidad de respuesta adaptables a móviles.',
      tech: 'React 19, Tailwind CSS'
    },
    'capacidades': {
      badge: 'PROTOCOLO: gRPC INTERNO',
      title: 'Capacidades de Producto y Operación',
      desc: 'Capa orquestadora intermedia estructurada bajo concurrencia masiva encargada de encauzar solicitudes de negocio hacia los procesadores core.',
      tech: 'Cloud Run, Go, gRPC'
    },
    'core-cartera': {
      badge: 'DATABASES & CORE SERVICES',
      title: 'Core de Cartera Financiera',
      desc: 'Sistema central que resguarda los saldos reales, amortizaciones programadas y lógicas de intereses de la plataforma.',
      tech: 'Spring Boot, Redis'
    },
    'fachada': {
      badge: 'MICRO-AISLAMIENTO',
      title: 'Fachada de Aislamiento Core',
      desc: 'Capa de abstracción técnica diseñada para proteger el núcleo bancario legacy de picos asíncronos de concurrencia y fallos de servicio.',
      tech: 'Redis, Spring Gateway'
    },
    'motor-planes': {
      badge: 'CÁLCULO DINÁMICO',
      title: 'Motor de Planes & Riesgos',
      desc: 'Algoritmos avanzados de cálculo dinámico para simulación de condiciones moratorias, tasas variables y re-estructuración financiera.',
      tech: 'Python, TensorFlow'
    },
    'maestro-clientes': {
      badge: 'RECURSOS DE CLIENTES',
      title: 'Maestro de Clientes',
      desc: 'Servicio unificado que resguarda el perfil consolidado de deudores, historial crediticio y scores preventivos del sistema.',
      tech: 'PostgreSQL, Java'
    },
    'orquestador': {
      badge: 'PLATFORM COGNITIVA',
      title: 'Orquestador de IA',
      desc: 'Capa cerebral inteligente encargada de sincronizar la generación de respuestas, indexar conocimiento RAG bancario y guiar a los agentes.',
      tech: 'NestJS, Nvidia Guardrails'
    },
    'agentes': {
      badge: 'AUTÓMATAS AGÉNTICOS',
      title: 'Agentes de Operación de Negocio',
      desc: 'Agentes especializados de backoffice orientados a automatizar tareas operativas de validación y de seguimiento de compromisos financieros.',
      tech: 'CrewAI, LangGraph'
    },
    'guardrails': {
      badge: 'SEGURIDAD DE RESPUESTAS',
      title: 'Políticas y Guardrails IA',
      desc: 'Reglas rígidas de contención ética y validación sintáctica que previenen comportamientos anómalos o alucinaciones del modelo.',
      tech: 'LlamaGuard, Nvidia NeMo'
    },
    'ml-satelites': {
      badge: 'MODELO PREDICTIVO',
      title: 'Modelos ML Satélites & Calibración',
      desc: 'Modelos ligeros estructurados para optimizar de manera localizada las decisiones del orquestador en base a datos históricos reales.',
      tech: 'Keras, Scikit-learn'
    },
    'datos': {
      badge: 'CEREBRO OPERATIVO & BIG DATA',
      title: 'Plataforma de Datos & Analítica',
      desc: 'Infraestructura analítica unificada que procesa peticiones masivas en tiempo real para entrenamiento de sensores predictivos empresariales.',
      tech: 'BigQuery, GFT Decision'
    },
    'cerebro-decision': {
      badge: 'DECISION MANAGER',
      title: 'Cerebro de Decisión GFT',
      desc: 'Motor propietario de toma de decisiones operativas estratégicas y asignación dinámica de cobros y transacciones óptimas.',
      tech: 'BigQuery, PubSub'
    },
    'seguridad': {
      badge: 'SEGURIDAD ACTIVA PERMANENTE',
      title: 'Seguridad - Cumplimiento - Observabilidad',
      desc: 'Monitoreo transversal extremo a extremo permanente de todas las variables críticas de salud de NewCo, con auditoría criptográfica.',
      tech: 'ISO 27001, Cloud Web Sec'
    }
  };

  var pinWrapper = document.getElementById('frameworkPinWrapper');
  var blobWrap = document.getElementById('blobWrap');
  var blob = document.getElementById('blob');
  var blobLabel = document.getElementById('blobLabel');
  var diagramStage = document.getElementById('diagramStage');
  var brainNode = document.getElementById('brainNode');
  var specsCard = document.getElementById('specsCard');
  var specsBadge = document.getElementById('specsBadge');
  var specsTitle = document.getElementById('specsTitle');
  var specsDesc = document.getElementById('specsDesc');
  var specsTech = document.getElementById('specsTech');
  var scrollHint = document.getElementById('scrollHint');
  var frameworkHead = document.getElementById('frameworkHead');
  var diagramSvg = document.getElementById('diagramSvg');
  var nodes = Array.prototype.slice.call(diagramStage.querySelectorAll('.node'));

  if (!pinWrapper) return;

  var currentSpecId = null;

  var NODE_SPECS_EN = {
    'entidades': {
      badge: 'CONNECTOR: REST / JSON',
      title: 'Financial Entities and Channels',
      desc: 'External transactional channels for partner financial institutions with robust high-speed cryptographic authentication and direct connectivity.',
      tech: 'JWT, OAuth 2.0'
    },
    'experiencias': {
      badge: 'API INTERFACE',
      title: 'Integration Experiences',
      desc: 'Specialized backend-for-frontend interfaces that expose aggregated services tailored for NewCo connected platforms.',
      tech: 'Vite, Next.js, BFF'
    },
    'canal-ia': {
      badge: 'AGENT: NATURAL LANGUAGE',
      title: 'AI Agent Channel',
      desc: 'Conversational agentic interface enabling users to interact with the portfolio platform through intuitive natural language queries.',
      tech: 'NestJS, LangChain'
    },
    'apps': {
      badge: 'CLIENT SYSTEM',
      title: 'Web & Mobile Apps',
      desc: 'Customer touchpoints developed under decoupled components with high response speed adaptable to mobile.',
      tech: 'React 19, Tailwind CSS'
    },
    'capacidades': {
      badge: 'PROTOCOL: INTERNAL gRPC',
      title: 'Product & Operations Capabilities',
      desc: 'Intermediate orchestrator layer structured for massive concurrency, routing business requests to core processors.',
      tech: 'Cloud Run, Go, gRPC'
    },
    'core-cartera': {
      badge: 'DATABASES & CORE SERVICES',
      title: 'Portfolio Core',
      desc: 'Central system safeguarding real balances, scheduled amortizations, and interest logic for the platform.',
      tech: 'Spring Boot, Redis'
    },
    'fachada': {
      badge: 'MICRO-ISOLATION',
      title: 'Isolation Facade',
      desc: 'Technical abstraction layer designed to protect the legacy banking core from async concurrency spikes and service failures.',
      tech: 'Redis, Spring Gateway'
    },
    'motor-planes': {
      badge: 'DYNAMIC CALCULATION',
      title: 'Plans & Risk Engine',
      desc: 'Advanced calculation algorithms for dynamic simulation of moratory conditions, variable rates, and financial restructuring.',
      tech: 'Python, TensorFlow'
    },
    'maestro-clientes': {
      badge: 'CUSTOMER RESOURCES',
      title: 'Customer Master',
      desc: 'Unified service safeguarding consolidated borrower profiles, credit history, and preventive scores across the system.',
      tech: 'PostgreSQL, Java'
    },
    'orquestador': {
      badge: 'COGNITIVE PLATFORM',
      title: 'AI Orchestrator',
      desc: 'Intelligent brain layer in charge of synchronizing response generation, indexing banking RAG knowledge, and guiding autonomous agents.',
      tech: 'NestJS, Nvidia Guardrails'
    },
    'agentes': {
      badge: 'AGENTIC AUTOMATA',
      title: 'Operation Agents',
      desc: 'Specialized backoffice agents oriented to automate validation and financial commitment tracking operational tasks.',
      tech: 'CrewAI, LangGraph'
    },
    'guardrails': {
      badge: 'RESPONSE SECURITY',
      title: 'AI Policies & Guardrails',
      desc: 'Rigid containment rules and syntactic validation preventing anomalous behaviors or model hallucinations.',
      tech: 'LlamaGuard, Nvidia NeMo'
    },
    'ml-satelites': {
      badge: 'PREDICTIVE MODEL',
      title: 'ML Satellite Models',
      desc: 'Lightweight models structured to locally optimize orchestrator decisions based on real historical data.',
      tech: 'Keras, Scikit-learn'
    },
    'datos': {
      badge: 'OPERATING BRAIN & BIG DATA',
      title: 'Data & Analytics Platform',
      desc: 'Unified analytics infrastructure that processes massive requests in real time to train enterprise predictive sensing models.',
      tech: 'BigQuery, GFT Decision'
    },
    'cerebro-decision': {
      badge: 'DECISION MANAGER',
      title: 'GFT Decision Brain',
      desc: 'Proprietary engine for strategic operational decisions and dynamic assignment of collections and optimal transactions.',
      tech: 'BigQuery, PubSub'
    },
    'seguridad': {
      badge: 'PERMANENT ACTIVE SECURITY',
      title: 'Security · Compliance · Observability',
      desc: 'End-to-end continuous monitoring of all NewCo critical health variables, with cryptographic auditability.',
      tech: 'ISO 27001, Cloud Web Sec'
    }
  };

  function setSpecs(id) {
    // Usar el sistema i18n global si está disponible
    if (typeof window.i18n !== 'undefined' && window.i18n.t) {
      var badge = window.i18n.t('spec.' + id + '.badge');
      var title = window.i18n.t('spec.' + id + '.title');
      var desc = window.i18n.t('spec.' + id + '.desc');
      var tech = window.i18n.t('spec.' + id + '.tech');
      
      specsBadge.textContent = badge;
      specsTitle.textContent = title;
      specsDesc.textContent = desc;
      specsTech.textContent = tech;
    } else {
      // Fallback a NODE_SPECS si i18n no está disponible
      var lang = localStorage.getItem('language') || 'en';
      var spec = (lang === 'en' && NODE_SPECS_EN[id]) ? NODE_SPECS_EN[id] : NODE_SPECS[id];
      if (!spec) return;
      specsBadge.textContent = spec.badge;
      specsTitle.textContent = spec.title;
      specsDesc.textContent = spec.desc;
      specsTech.textContent = spec.tech;
    }
    currentSpecId = id;
  }

  // Default spec on load
  setSpecs('entidades');

  function drawLines(activeId) {
    var stageRect = diagramStage.getBoundingClientRect();
    var brainRect = brainNode.getBoundingClientRect();
    var bx = brainRect.left - stageRect.left + brainRect.width / 2;
    var by = brainRect.top - stageRect.top + brainRect.height / 2;

    var html = '';
    nodes.forEach(function (node) {
      if (!node.classList.contains('is-visible')) return;
      var r = node.getBoundingClientRect();
      var nx = r.left - stageRect.left + r.width / 2;
      var ny = r.top - stageRect.top + r.height / 2;
      var isActive = node.dataset.id === activeId;
      html += '<path d="M ' + bx + ' ' + by + ' L ' + nx + ' ' + ny + '" ' +
              'style="opacity:' + (isActive ? 0.9 : 0.22) + '; stroke-width:' + (isActive ? 2 : 1) + ';"></path>';
    });
    diagramSvg.innerHTML = html;
  }

  // Hover interactivity on nodes (state 2)
  nodes.forEach(function (node) {
    node.addEventListener('mouseenter', function () {
      node.classList.add('node-active');
      setSpecs(node.dataset.id);
      drawLines(node.dataset.id);
    });
    node.addEventListener('mouseleave', function () {
      node.classList.remove('node-active');
      drawLines(null);
    });
    node.addEventListener('click', function () {
      setSpecs(node.dataset.id);
    });
  });

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function handleScroll() {
    var rect = pinWrapper.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    var total = rect.height - vh;
    if (total <= 0) return;

    // progreso 0 -> 1 a través de toda la sección pinned
    var scrolled = -rect.top;
    var t = clamp(scrolled / total, 0, 1);

    // Transición concentrada en el primer 60% del scroll; el resto se queda fijo en estado 2
    var tt = clamp(t / 0.6, 0, 1);

    // Blob: encoge y se desvanece
    var blobScale = 1 - tt * 0.35;
    var blobOpacity = clamp(1 - tt * 1.6, 0, 1);
    blobWrap.style.opacity = blobOpacity.toString();
    blobWrap.style.transform = 'scale(' + blobScale + ')';
    blobWrap.style.pointerEvents = blobOpacity > 0.05 ? 'auto' : 'none';

    // Scroll hint fades fast
    scrollHint.style.opacity = clamp(1 - t / 0.15, 0, 1).toString();

    // Framework head fades out as diagram appears
    frameworkHead.style.opacity = clamp(1 - tt * 1.3, 0, 1).toString();

    // Brain node: aparece centrado y pequeño, mismo punto que el blob
    var brainOpacity = clamp((tt - 0.25) / 0.4, 0, 1);
    brainNode.style.opacity = brainOpacity.toString();
    var brainScale = 0.4 + brainOpacity * 0.6;
    brainNode.style.transform = 'translate(-50%, -50%) scale(' + brainScale + ')';

    // Nodos: bloom desde el centro hacia su posición final
    var nodeT = clamp((tt - 0.35) / 0.65, 0, 1);
    nodes.forEach(function (node) {
      if (nodeT > 0.02) {
        node.classList.add('is-visible');
      } else {
        node.classList.remove('is-visible');
      }
      var finalLeft = parseFloat(node.dataset.finalLeft);
      var finalTop = parseFloat(node.dataset.finalTop);
      var curLeft = 50 + (finalLeft - 50) * nodeT;
      var curTop = 50 + (finalTop - 50) * nodeT;
      node.style.left = curLeft + '%';
      node.style.top = curTop + '%';
      node.style.opacity = nodeT.toString();
    });

    // SVG lines fade in late
    diagramSvg.style.opacity = clamp((tt - 0.5) / 0.5, 0, 1).toString();
    if (tt > 0.5) drawLines(currentSpecId);

    // Specs card
    var specsOpacity = clamp((tt - 0.55) / 0.45, 0, 1);
    specsCard.classList.toggle('is-visible', specsOpacity > 0.4);
  }

  // Store final positions (from inline style) before JS takes over
  nodes.forEach(function (node) {
    node.dataset.finalLeft = parseFloat(node.style.left);
    node.dataset.finalTop = parseFloat(node.style.top);
    node.style.left = '50%';
    node.style.top = '50%';
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  window.addEventListener('languageChanged', function () {
    setSpecs(currentSpecId || 'entidades');
  });
  handleScroll();
})();
