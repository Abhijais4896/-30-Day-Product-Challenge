/**
 * Paytm UPI — Payment Resolution Tracker
 * Interactive Prototype Controller & UX Case Study Companion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Screen Elements
  const screens = {
    'screen-1': document.getElementById('screen-1'),
    'screen-2': document.getElementById('screen-2'),
    'screen-3': document.getElementById('screen-3'),
    'screen-4': document.getElementById('screen-4'),
    'screen-5': document.getElementById('screen-5')
  };

  // State Containers in Screen 5
  const escalationFormState = document.getElementById('escalation-form-state');
  const escalationConfirmedState = document.getElementById('escalation-confirmed-state');
  const s5HeaderTitle = document.getElementById('s5-header-title');

  // Top Tabs and Drawer Navigation
  const screenTabs = document.querySelectorAll('.screen-tab');
  const flowPills = document.querySelectorAll('.pill-node');
  const resetBtn = document.getElementById('reset-flow-btn');
  const toggleAnnotationsBtn = document.getElementById('toggle-annotations-btn');
  const caseStudyDrawer = document.getElementById('case-study-drawer');
  const inspectorBody = document.getElementById('inspector-body');

  // Principle Cards in Drawer
  const pCard1 = document.getElementById('card-p1');
  const pCard2 = document.getElementById('card-p2');
  const pCard3 = document.getElementById('card-p3');

  // Current Active Screen Tracker
  let currentScreenId = 'screen-1';

  // Screen Context Descriptions for Case Study Review
  const screenContexts = {
    'screen-1': {
      title: 'Screen 1: Payment Status',
      answers: '1. What happened?',
      highlightPrinciple: 1,
      notes: `
        <strong>Design Rationale:</strong>
        <ul>
          <li><strong>High-Visibility State:</strong> Clearly indicates <em>"Refund in progress"</em> with the confirmed Jiomart merchant refund status.</li>
          <li><strong>Predictable TAT:</strong> Surfaces <em>"Expected by 28 September"</em> immediately upfront, reducing customer support calls.</li>
          <li><strong>Clear Primary Action:</strong> Single primary CTA <em>"Track refund"</em> provides an explicit gateway into deeper resolution details without cognitive overload.</li>
        </ul>
      `
    },
    'screen-2': {
      title: 'Screen 2: What happened? (Timeline)',
      answers: '1. What happened? & 2. Where is my money?',
      highlightPrinciple: 1,
      notes: `
        <strong>Design Rationale:</strong>
        <ul>
          <li><strong>Chronological Granularity:</strong> Shows the exact audit trail: <em>25 Sep (Payment) &rarr; 26 Sep (Partial cancel) &rarr; 26 Sep (Refund initiated) &rarr; 27 Sep (Processing) &rarr; 28 Sep (Expected in bank)</em>.</li>
          <li><strong>Disarming Uncertainty:</strong> Reinforces that merchant action is complete and system is working.</li>
          <li><strong>Targeted CTA:</strong> Directs anxious users with the exact query on their minds: <em>"Where is my money?"</em>.</li>
        </ul>
      `
    },
    'screen-3': {
      title: 'Screen 3: Where is my money? (Network Flow)',
      answers: '2. Where is my money?',
      highlightPrinciple: 2,
      notes: `
        <strong>Design Rationale:</strong>
        <ul>
          <li><strong>Entity Demarcation:</strong> Graphically illustrates the path between <em>Merchant &rarr; Payment Network (NPCI/Gateway) &rarr; Customer Bank</em>.</li>
          <li><strong>Actionable Friction Reduction:</strong> Explicitly informs user: <em>"You don't need to contact the merchant again right now"</em>, avoiding unnecessary merchant escalation loops.</li>
          <li><strong>Two-Tier CTA:</strong> <em>"Got it"</em> for reassurance, paired with a subtle escape hatch: <em>"Something doesn't look right"</em> for edge cases.</li>
        </ul>
      `
    },
    'screen-4': {
      title: 'Screen 4: Something went wrong (Delayed)',
      answers: '3. What do I need to do?',
      highlightPrinciple: 3,
      notes: `
        <strong>Design Rationale:</strong>
        <ul>
          <li><strong>Radical Transparency:</strong> Does NOT falsely claim Paytm knows the internal bank server state. Honestly flags transaction as <em>Delayed</em> after the 28 Sep SLA.</li>
          <li><strong>Diagnostic Snapshot:</strong> Re-surfaces amount (₹2,800), transaction ID (XXXX1234), and dates.</li>
          <li><strong>Zero Blame Shifting:</strong> Directly transitions user from passive waiting into resolution via <em>"Get help"</em>.</li>
        </ul>
      `
    },
    'screen-5': {
      title: 'Screen 5: Escalate Issue & Confirmation',
      answers: '3. What do I need to do?',
      highlightPrinciple: 3,
      notes: `
        <strong>Design Rationale:</strong>
        <ul>
          <li><strong>Zero Data Re-entry:</strong> Automatically binds transaction ID, amount, and timestamp to the ticket. Users never copy-paste 12-digit UTRs.</li>
          <li><strong>Instant Confirmation:</strong> One tap yields <em>Ticket ID: PTM-28491</em> with verified dispatch to the bank switch.</li>
          <li><strong>Definitive Resolution:</strong> Replaces panic with a traceable, official Indian banking dispute reference.</li>
        </ul>
      `
    }
  };

  /**
   * Switch between prototype screens
   * @param {string} targetScreenId 
   */
  function navigateTo(targetScreenId) {
    if (!screens[targetScreenId]) return;

    // Update screen views
    Object.keys(screens).forEach(id => {
      if (id === targetScreenId) {
        screens[id].classList.add('active');
        // Scroll viewport to top
        const scrollArea = screens[id].querySelector('.scrollable');
        if (scrollArea) scrollArea.scrollTop = 0;
      } else {
        screens[id].classList.remove('active');
      }
    });

    currentScreenId = targetScreenId;

    // Update Top Selector Tabs
    screenTabs.forEach(tab => {
      if (tab.getAttribute('data-target') === targetScreenId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Drawer Flow Pills
    flowPills.forEach(pill => {
      if (pill.getAttribute('data-go') === targetScreenId) {
        pill.classList.add('node-active');
      } else {
        pill.classList.remove('node-active');
      }
    });

    // Update Case Study Inspector
    updateInspector(targetScreenId);
  }

  /**
   * Update the Case Study Inspector panel with live context
   * @param {string} screenId 
   */
  function updateInspector(screenId) {
    const data = screenContexts[screenId];
    if (!data) return;

    if (inspectorBody) {
      inspectorBody.innerHTML = `
        <div style="margin-bottom: 8px;">
          <strong style="color: var(--paytm-navy); font-size: 13.5px;">${data.title}</strong>
          <span style="display: block; font-size: 11px; color: var(--slate-500); margin-top: 2px;">Answers: <strong>${data.answers}</strong></span>
        </div>
        ${data.notes}
      `;
    }

    // Highlight corresponding principle card
    [pCard1, pCard2, pCard3].forEach((card, index) => {
      if (!card) return;
      if (index + 1 === data.highlightPrinciple) {
        card.classList.add('active-principle');
      } else {
        card.classList.remove('active-principle');
      }
    });
  }

  /* ========================================================
     SCREEN BUTTON INTERACTIONS
     ======================================================== */

  // SCREEN 1 Interactions
  const btnTrackRefund = document.getElementById('btn-track-refund');
  if (btnTrackRefund) {
    btnTrackRefund.addEventListener('click', () => {
      navigateTo('screen-2');
    });
  }

  // SCREEN 2 Interactions
  const btnWhereIsMoney = document.getElementById('btn-where-is-money');
  const s2BackBtn = document.getElementById('s2-back-btn');

  if (btnWhereIsMoney) {
    btnWhereIsMoney.addEventListener('click', () => {
      navigateTo('screen-3');
    });
  }

  if (s2BackBtn) {
    s2BackBtn.addEventListener('click', () => {
      navigateTo('screen-1');
    });
  }

  // SCREEN 3 Interactions
  const btnGotIt = document.getElementById('btn-got-it');
  const btnSomethingWrong = document.getElementById('btn-something-wrong');
  const s3BackBtn = document.getElementById('s3-back-btn');

  if (btnGotIt) {
    btnGotIt.addEventListener('click', () => {
      navigateTo('screen-2');
    });
  }

  if (btnSomethingWrong) {
    btnSomethingWrong.addEventListener('click', () => {
      navigateTo('screen-4');
    });
  }

  if (s3BackBtn) {
    s3BackBtn.addEventListener('click', () => {
      navigateTo('screen-2');
    });
  }

  // SCREEN 4 Interactions
  const btnGetHelp = document.getElementById('btn-get-help');
  const s4BackBtn = document.getElementById('s4-back-btn');

  if (btnGetHelp) {
    btnGetHelp.addEventListener('click', () => {
      // Ensure Screen 5 is reset to form state
      showEscalationForm();
      navigateTo('screen-5');
    });
  }

  if (s4BackBtn) {
    s4BackBtn.addEventListener('click', () => {
      navigateTo('screen-3');
    });
  }

  // SCREEN 5 Interactions
  const btnEscalateIssue = document.getElementById('btn-escalate-issue');
  const btnTrackIssue = document.getElementById('btn-track-issue');
  const btnReturnHome = document.getElementById('btn-return-home');
  const s5BackBtn = document.getElementById('s5-back-btn');
  const copyTicketBtn = document.getElementById('copy-ticket-btn');

  function showEscalationForm() {
    escalationFormState.classList.add('active');
    escalationConfirmedState.classList.remove('active');
    if (s5HeaderTitle) s5HeaderTitle.textContent = 'Report Issue';
  }

  function showEscalationConfirmed() {
    escalationFormState.classList.remove('active');
    escalationConfirmedState.classList.add('active');
    if (s5HeaderTitle) s5HeaderTitle.textContent = 'Issue Status';
  }

  if (btnEscalateIssue) {
    btnEscalateIssue.addEventListener('click', () => {
      // Transition to confirmation state
      showEscalationConfirmed();
    });
  }

  if (btnTrackIssue) {
    btnTrackIssue.addEventListener('click', () => {
      // Returns to Screen 2 timeline to inspect progress
      navigateTo('screen-2');
    });
  }

  if (btnReturnHome) {
    btnReturnHome.addEventListener('click', () => {
      navigateTo('screen-1');
    });
  }

  if (s5BackBtn) {
    s5BackBtn.addEventListener('click', () => {
      if (escalationConfirmedState.classList.contains('active')) {
        showEscalationForm();
      } else {
        navigateTo('screen-4');
      }
    });
  }

  // Copy Ticket ID Feedback
  if (copyTicketBtn) {
    copyTicketBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('PTM-28491').then(() => {
        copyTicketBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          copyTicketBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        }, 2000);
      }).catch(() => {
        // Fallback
      });
    });
  }

  /* ========================================================
     TOP TABS & SHORTCUT CONTROLS
     ======================================================== */

  screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (targetId === 'screen-5') {
        showEscalationForm();
      }
      navigateTo(targetId);
    });
  });

  flowPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-go');
      if (targetId === 'screen-5') {
        showEscalationForm();
      }
      navigateTo(targetId);
    });
  });

  // Reset Flow
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      showEscalationForm();
      navigateTo('screen-1');
    });
  }

  // Toggle Case Study Drawer / Annotations
  if (toggleAnnotationsBtn && caseStudyDrawer) {
    toggleAnnotationsBtn.addEventListener('click', () => {
      const isHidden = caseStudyDrawer.style.display === 'none';
      if (isHidden) {
        caseStudyDrawer.style.display = 'flex';
        toggleAnnotationsBtn.classList.add('active-toggle');
      } else {
        caseStudyDrawer.style.display = 'none';
        toggleAnnotationsBtn.classList.remove('active-toggle');
      }
    });
  }

  // Initialize Screen 1
  navigateTo('screen-1');
});
