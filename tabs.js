const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.target;

    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    panels.forEach(panel => {
      panel.hidden = panel.id !== targetId;
    });
  });
});
