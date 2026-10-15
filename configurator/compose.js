/* Pure AGENTS.md composer. UMD: inlined into the Blogger snippet and required by Node tests. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KiteCompose = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var HEADER = '# Agent Instructions';
  var CHECKLIST_LEAD = 'Always create the below checklist for every prompt:';
  var MANIFESTO = [
    '## Checklist Manifesto',
    'Always use your checklist or todo list tool to track items. Do not leave it to chance that you will remember later.',
    'Immediately before implementing any prompts set up the following tasks as a checklist.',
  ];
  var SKILLS_LEAD = 'Invoke these skills when working on the matching checklist item:';

  function chosen(winds, windIds) {
    var wanted = new Set(windIds);
    return winds.filter(function (w) { return wanted.has(w.id); });
  }

  function includedSkills(winds, windIds, skillNames) {
    var wanted = new Set(skillNames);
    var byName = new Map();
    chosen(winds, windIds).forEach(function (w) {
      (w.skills || []).filter(function (s) { return wanted.has(s); }).forEach(function (s) {
        if (!byName.has(s)) byName.set(s, { name: s, winds: [] });
        byName.get(s).winds.push(w.title);
      });
    });
    return Array.from(byName.values());
  }

  function composeAgentsMd(winds, windIds, skillNames) {
    var picked = chosen(winds, windIds);
    var principles = picked.filter(function (w) { return w.kind === 'principle'; });
    var steps = picked.filter(function (w) { return w.kind === 'checklist'; });
    var top = [HEADER].concat(principles.map(function (w) { return w.body; }));
    if (steps.length) top.push(CHECKLIST_LEAD);

    var blocks = [top.join('\n')];
    if (steps.length) {
      blocks.push(MANIFESTO.concat(steps.map(function (w) { return '- ' + w.checklist; })).join('\n'));
    }
    steps.filter(function (w) { return w.body; }).forEach(function (w) {
      blocks.push('## ' + w.title + '\n' + w.body);
    });

    var skills = includedSkills(winds, windIds, skillNames);
    if (skills.length) {
      blocks.push(['## Skills', SKILLS_LEAD].concat(skills.map(function (s) {
        return '- `' + s.name + '` supports ' + s.winds.join(', ');
      })).join('\n'));
    }
    return blocks.join('\n\n') + '\n';
  }

  function skillPath(name) {
    return '.github/skills/' + name + '/SKILL.md';
  }

  return { composeAgentsMd: composeAgentsMd, includedSkills: includedSkills, skillPath: skillPath };
});
