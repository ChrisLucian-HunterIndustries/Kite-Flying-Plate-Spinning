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
  var ADDON_SECTIONS = [
    { key: 'skills', heading: '## Skills', lead: 'Invoke these skills when working on the matching checklist item:' },
    { key: 'mcp', heading: '## MCP Servers', lead: 'Use these MCP servers when working on the matching checklist item:' },
  ];
  var PLATFORMS = {
    copilot: { skillsDir: '.github/skills', mcpPath: '.vscode/mcp.json', mcpKey: 'servers' },
  };
  var DEFAULT_PLATFORM = 'copilot';

  function platformOf(options) {
    return PLATFORMS[(options && options.platform) || DEFAULT_PLATFORM];
  }

  function chosen(winds, windIds) {
    var wanted = new Set(windIds);
    return winds.filter(function (w) { return wanted.has(w.id); });
  }

  function included(winds, windIds, names, key) {
    var wanted = new Set(names);
    var byName = new Map();
    chosen(winds, windIds).forEach(function (w) {
      (w[key] || []).filter(function (n) { return wanted.has(n); }).forEach(function (n) {
        if (!byName.has(n)) byName.set(n, { name: n, winds: [] });
        byName.get(n).winds.push(w.title);
      });
    });
    return Array.from(byName.values());
  }

  function composeAgentsMd(winds, windIds, skillNames, mcpNames) {
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

    var selected = { skills: skillNames || [], mcp: mcpNames || [] };
    ADDON_SECTIONS.forEach(function (section) {
      var addons = included(winds, windIds, selected[section.key], section.key);
      if (!addons.length) return;
      blocks.push([section.heading, section.lead].concat(addons.map(function (a) {
        return '- `' + a.name + '` supports ' + a.winds.join(', ');
      })).join('\n'));
    });
    return blocks.join('\n\n') + '\n';
  }

  function composeMcpJson(catalog, names, options) {
    if (!names.length) return '';
    var servers = {};
    names.forEach(function (n) { servers[n] = catalog[n].server; });
    var config = {};
    config[platformOf(options).mcpKey] = servers;
    return JSON.stringify(config, null, 2) + '\n';
  }

  function mcpPath(options) {
    return platformOf(options).mcpPath;
  }

  function skillPath(name, options) {
    return platformOf(options).skillsDir + '/' + name + '/SKILL.md';
  }

  function bundleFiles(data, windIds, skillNames, mcpNames, options) {
    var names = function (key, picked) {
      return included(data.winds, windIds, picked, key).map(function (a) { return a.name; });
    };
    var files = [{ path: 'AGENTS.md', content: composeAgentsMd(data.winds, windIds, skillNames, mcpNames) }];
    var mcpJson = composeMcpJson(data.mcp, names('mcp', mcpNames), options);
    if (mcpJson) files.push({ path: mcpPath(options), content: mcpJson });
    names('skills', skillNames).forEach(function (n) {
      files.push({ path: skillPath(n, options), content: data.skills[n].content });
    });
    return files;
  }

  return {
    composeAgentsMd: composeAgentsMd, composeMcpJson: composeMcpJson, included: included,
    skillPath: skillPath, mcpPath: mcpPath, bundleFiles: bundleFiles,
  };
});
