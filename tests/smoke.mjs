import assert from "node:assert/strict";

const registry = new Map();

globalThis.HTMLElement = class {
  attachShadow() {
    this.shadowRoot = {
      innerHTML: "",
      querySelectorAll: () => [],
      appendChild: (child) => { this.shadowRoot.child = child; },
    };
    return this.shadowRoot;
  }
  dispatchEvent(event) { this.lastEvent = event; }
};

globalThis.customElements = {
  define: (name, constructor) => registry.set(name, constructor),
  get: (name) => registry.get(name),
};
globalThis.window = { customCards: [] };
globalThis.CustomEvent = class { constructor(type, options) { this.type = type; Object.assign(this, options); } };
globalThis.localStorage = {
  values: new Map(),
  getItem(key) { return this.values.get(key) ?? null; },
  setItem(key, value) { this.values.set(key, value); },
};

await import("../dist/hass-app-health-sync-dashboard-card.js");

const Card = customElements.get("hass-app-health-sync-dashboard-card");
assert.ok(Card, "the custom card should be registered");
assert.ok(customElements.get("hass-app-health-sync-dashboard-card-editor"), "the graphical editor should be registered");
assert.equal(window.customCards[0].type, "hass-app-health-sync-dashboard-card");

// HA Companion App (iOS) sensor names
const companionStates = {
  "sensor.iphone_steps_today": { state: "8426", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "steps" } },
  "sensor.iphone_active_calories_today": { state: "513", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kcal" } },
  "sensor.iphone_heart_rate": { state: "72", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.iphone_heart_rate_variability": { state: "46", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "ms" } },
  "sensor.iphone_flights_climbed_today": { state: "8", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "flights" } },
  "sensor.iphone_exercise_time_today": { state: "34", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "min" } },
  "sensor.iphone_resting_energy_today": { state: "1420", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kcal" } },
  "sensor.iphone_walking_running_distance_today": { state: "6430", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.iphone_vo2_max": { state: "44.2", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mL/(kg·min)" } },
  "sensor.iphone_weight": { state: "78.4", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kg" } },
  "sensor.iphone_resting_heart_rate": { state: "58", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.iphone_blood_pressure_systolic": { state: "118", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mmHg" } },
  "sensor.iphone_blood_pressure_diastolic": { state: "76", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mmHg" } },
  "sensor.iphone_walking_heart_rate_average": { state: "91", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "bpm" } },
  "sensor.iphone_blood_oxygen": { state: "98", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "%" } },
  "sensor.iphone_respiratory_rate": { state: "15.4", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "breaths/min" } },
  "sensor.iphone_body_temperature": { state: "36.6", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "°C" } },
  "sensor.iphone_blood_glucose": { state: "92", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "mg/dL" } },
  "sensor.iphone_body_fat_percentage": { state: "18.2", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "%" } },
  "sensor.iphone_lean_body_mass": { state: "64.1", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "kg" } },
  "sensor.iphone_height": { state: "1.84", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "m" } },
  "sensor.iphone_sleep_duration": { state: "450", last_updated: new Date().toISOString(), attributes: { unit_of_measurement: "min", deep_minutes: 92, core_minutes: 255, rem_minutes: 88, awake_minutes: 15 } },
};

assert.deepEqual(Card.discoverEntities({ states: companionStates }), {
  steps: "sensor.iphone_steps_today",
  active_calories: "sensor.iphone_active_calories_today",
  heart_rate: "sensor.iphone_heart_rate",
  heart_rate_variability: "sensor.iphone_heart_rate_variability",
  sleep_duration: "sensor.iphone_sleep_duration",
  flights_climbed: "sensor.iphone_flights_climbed_today",
  exercise_time: "sensor.iphone_exercise_time_today",
  resting_energy: "sensor.iphone_resting_energy_today",
  distance: "sensor.iphone_walking_running_distance_today",
  vo2_max: "sensor.iphone_vo2_max",
  weight: "sensor.iphone_weight",
  resting_heart_rate: "sensor.iphone_resting_heart_rate",
  blood_pressure_systolic: "sensor.iphone_blood_pressure_systolic",
  blood_pressure_diastolic: "sensor.iphone_blood_pressure_diastolic",
  walking_heart_rate: "sensor.iphone_walking_heart_rate_average",
  blood_oxygen: "sensor.iphone_blood_oxygen",
  respiratory_rate: "sensor.iphone_respiratory_rate",
  body_temperature: "sensor.iphone_body_temperature",
  blood_glucose: "sensor.iphone_blood_glucose",
  body_fat_percentage: "sensor.iphone_body_fat_percentage",
  lean_body_mass: "sensor.iphone_lean_body_mass",
  height: "sensor.iphone_height",
});

const form = Card.getConfigForm();
const entityPanel = form.schema.find((field) => field.name === "entities");
assert.ok(entityPanel);
assert.deepEqual(entityPanel.schema.map((field) => field.name), [
  "steps", "active_calories", "heart_rate",
  "heart_rate_variability", "sleep_duration",
  "flights_climbed", "exercise_time", "resting_energy", "distance", "vo2_max", "weight",
  "resting_heart_rate", "blood_pressure_systolic", "blood_pressure_diastolic",
  "walking_heart_rate", "blood_oxygen",
  "respiratory_rate", "body_temperature", "blood_glucose",
  "body_fat_percentage", "lean_body_mass", "height",
]);
const tilePanel = form.schema.find((field) => field.icon === "mdi:view-grid-outline");
assert.equal(tilePanel, undefined, "draggable metric switches must not be duplicated in ha-form");
const sectionPanel = form.schema.find((field) => field.icon === "mdi:view-dashboard-outline");
assert.ok(sectionPanel.schema.some((field) => field.name === "show_activity"));

globalThis.document = {
  createElement(name) {
    const Constructor = registry.get(name);
    if (Constructor) return new Constructor();
    return { listeners: {}, addEventListener(type, listener) { this.listeners[type] = listener; } };
  },
};
const editor = Card.getConfigElement();
editor.setConfig({ type: "custom:hass-app-health-sync-dashboard-card", entities: {} });
editor.hass = { language: "en", states: companionStates };
assert.match(editor.shadowRoot.innerHTML, /Automatically discovered 22/);
assert.equal(editor._form.schema[0].name, "title");
const editorForm = editor._form;
const editorMarkup = editor.shadowRoot.innerHTML;
const changedEditorConfig = { type: "custom:hass-app-health-sync-dashboard-card", entities: {}, show_steps_metric: false };
editorForm.listeners["value-changed"]({ detail: { value: changedEditorConfig } });
assert.equal(editor.lastEvent.type, "config-changed");
editor.setConfig(changedEditorConfig);
assert.strictEqual(editor._form, editorForm, "an echoed form change must not recreate the editor");
assert.equal(editor.shadowRoot.innerHTML, editorMarkup, "an echoed form change must preserve editor scroll state");
const externalEditorConfig = { ...changedEditorConfig, show_steps_metric: true };
editor.setConfig(externalEditorConfig);
assert.strictEqual(editor._form, editorForm, "an external config update must reuse the existing form");
assert.deepEqual(editorForm.data, externalEditorConfig);
assert.match(editor.shadowRoot.innerHTML, /Metric tiles/);
editor._moveTile("active_calories", -1);
assert.equal(editor.lastEvent.detail.config.tile_order[0], "active_calories");
assert.equal(editor.lastEvent.detail.config.tile_order[1], "steps");
const reorderedEditorConfig = editor.lastEvent.detail.config;
editor.setConfig(reorderedEditorConfig);
assert.strictEqual(editor._form, editorForm, "changing tile order must preserve the editor form");
editor._setTileVisibility("steps", false);
assert.equal(editor.lastEvent.detail.config.show_steps_metric, false, "a custom tile switch must update its existing visibility option");
editor.setConfig(editor.lastEvent.detail.config);
editorForm.listeners["value-changed"]({ detail: { value: { type: externalEditorConfig.type, entities: {}, show_hrv_metric: false } } });
assert.deepEqual(editor.lastEvent.detail.config.tile_order, reorderedEditorConfig.tile_order, "form changes must preserve custom tile order");
assert.equal(editor.lastEvent.detail.config.show_steps_metric, false, "ha-form changes must preserve custom tile visibility switches");

const card = new Card();
card.setConfig({ language: "en", step_goal: 10000, days: 3 });
card.hass = { language: "en", states: companionStates, callApi: async () => [], callWS: async () => ({}) };
await new Promise((resolve) => setTimeout(resolve, 0));

assert.match(card.shadowRoot.innerHTML, /<h1>Health<\/h1>/);
assert.match(card.shadowRoot.innerHTML, /overflow-anchor:none/);
assert.match(card.shadowRoot.innerHTML, /8,426/);
assert.match(card.shadowRoot.innerHTML, /6\.43 <small>km<\/small>/);
assert.match(card.shadowRoot.innerHTML, /44\.2 <small>mL\/\(kg·min\)<\/small>/);
assert.match(card.shadowRoot.innerHTML, /mdi:stairs/);
assert.match(card.shadowRoot.innerHTML, /Resting heart rate/);
assert.match(card.shadowRoot.innerHTML, /Blood oxygen/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity" aria-expanded="true"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="sleep"[\s\S]*?<\/button>\s*<div class="chart-body" hidden><div class="chart-body-legend"><span class="legend">/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="heart" aria-expanded="false"/);
assert.match(card.shadowRoot.innerHTML, /data-chart="sleep"/);
assert.match(card.shadowRoot.innerHTML, /class="chart collapsible sleep"/);
assert.match(card.shadowRoot.innerHTML, /\.chart\.sleep \.chart-toggle \.legend \{ display:none!important; \}/);
assert.match(card.shadowRoot.innerHTML, /Sleep stages · 3 days/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />4\.3 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />1\.5 h<\/title>/);
assert.match(card.shadowRoot.innerHTML, />0\.3 h<\/title>/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /(?:NaN|Infinity)/);

const reorderedCard = new Card();
reorderedCard.setConfig({ language: "en", tile_order: ["blood_oxygen", "steps"] });
reorderedCard.hass = { language: "en", states: companionStates, callApi: async () => [], callWS: async () => ({}) };
const reorderedMarkup = reorderedCard.shadowRoot.innerHTML;
assert.ok(reorderedMarkup.indexOf('data-entity="sensor.iphone_blood_oxygen"') < reorderedMarkup.indexOf('data-entity="sensor.iphone_steps_today"'), "custom tile order must control the dashboard layout");
reorderedCard.disconnectedCallback();

const interactionRender = card._render.bind(card);
let interactionRenderCount = 0;
card._render = () => { interactionRenderCount += 1; return interactionRender(); };
card._toggleChart("sleep");
assert.equal(card._expandedChart, "sleep");
assert.equal(interactionRenderCount, 0, "switching charts must not replace the card DOM");
card._toggleChart("heart");
assert.equal(card._expandedChart, "heart");
assert.equal(interactionRenderCount, 0);
assert.match(card.shadowRoot.innerHTML, /data-current-only="true"/);
card._render = interactionRender;
// Three points close together (within 30 min), then a 2-hour gap, then one more — tests solid + gap rendering
card._history["sensor.iphone_heart_rate"] = [
  { t: Date.now() - 7200000, v: 84, a: {} },
  { t: Date.now() - 7000000, v: 0, a: {} },   // invalid — filtered
  { t: Date.now() - 6900000, v: 88, a: {} },
  { t: Date.now() - 3600000, v: 100, a: {} },  // 2-hour gap before this point
];
card._render();
assert.equal(card._isValidHeartRate(0), false);
assert.equal(card._isValidHeartRate(84), true);
assert.match(card.shadowRoot.innerHTML, /data-current-only="false"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, />0 bpm<\/text>/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /class="heart-point"/);
assert.match(card.shadowRoot.innerHTML, /class="chart-hit"/);
assert.match(card.shadowRoot.innerHTML, /data-interpolation="linear"/);
assert.match(card.shadowRoot.innerHTML, /class="heart-trace" d="M [^"]+ L /);
assert.match(card.shadowRoot.innerHTML, /class="heart-gap"/);
assert.match(card.shadowRoot.innerHTML, /Received:/);

let statisticsRequest;
card._hass.callWS = async (request) => {
  statisticsRequest = request;
  return {
    "sensor.iphone_heart_rate": [
      { start: Date.now() - 7200000, mean: 81, min: 72, max: 94 },
      { start: Date.now() - 3600000, mean: 88, min: 78, max: 101 },
    ],
    "sensor.iphone_resting_heart_rate": [
      { start: Date.now() - 7200000, mean: 55, min: 50, max: 60 },
    ],
    "sensor.iphone_walking_heart_rate_average": [
      { start: Date.now() - 5400000, mean: 92, min: 85, max: 99 },
    ],
  };
};
assert.equal(await card._loadHourlyStatistics(new Date(Date.now() - 86400000).toISOString(), new Date().toISOString()), true);
assert.equal(statisticsRequest.type, "recorder/statistics_during_period");
assert.deepEqual(statisticsRequest.types, ["mean", "min", "max"]);
assert.ok(statisticsRequest.statistic_ids.includes("sensor.iphone_heart_rate"), "heart_rate entity in stats request");
assert.ok(statisticsRequest.statistic_ids.includes("sensor.iphone_resting_heart_rate"), "resting_heart_rate entity in stats request");
assert.ok(statisticsRequest.statistic_ids.includes("sensor.iphone_walking_heart_rate_average"), "walking_heart_rate entity in stats request");
card._render();
assert.match(card.shadowRoot.innerHTML, /data-statistics="true"/);
assert.match(card.shadowRoot.innerHTML, /class="heart-gap"/);

// Heart rate chart merges statistics and raw history from heart_rate, resting_heart_rate and walking_heart_rate
card._statistics["sensor.iphone_heart_rate"] = [
  { t: Date.now() - 7200000, v: 81, a: { statistics: true, min: 72, max: 94 } },
];
card._statistics["sensor.iphone_resting_heart_rate"] = [
  { t: Date.now() - 7200000, v: 55, a: { statistics: true, min: 50, max: 60 } },
];
card._history["sensor.iphone_heart_rate"] = [
  { t: Date.now() - 7100000, v: 79, a: {} },
  { t: Date.now() - 6800000, v: 83, a: {} },
  { t: Date.now() - 3600000, v: 100, a: {} },
];
card._history["sensor.iphone_walking_heart_rate_average"] = [
  { t: Date.now() - 5400000, v: 92, a: {} },
];
const hrPoints = card._historyPoints("heart_rate");
assert.ok(hrPoints.some((p) => p.a && p.a.statistics), "statistics points must be included");
assert.ok(hrPoints.some((p) => !p.a?.statistics), "raw history points must be included");
assert.ok(hrPoints.some((p) => p.v === 55), "resting_heart_rate statistics must be merged into heart rate chart");
assert.ok(hrPoints.some((p) => p.v === 92), "walking_heart_rate history must be merged into heart rate chart");
assert.ok(hrPoints.length >= 5, "heart_rate, resting_heart_rate and walking_heart_rate must all be merged");

card.setConfig({
  language: "en", days: 3,
  show_steps_metric: false,
  show_hrv_metric: false,
  show_flights_metric: false,
  show_weight_metric: false,
});
card.hass = card._hass;
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.iphone_steps_today"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.iphone_heart_rate_variability"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.iphone_flights_climbed_today"/);
assert.doesNotMatch(card.shadowRoot.innerHTML, /data-entity="sensor\.iphone_weight"/);
assert.match(card.shadowRoot.innerHTML, /data-entity="sensor\.iphone_active_calories_today"/);
assert.match(card.shadowRoot.innerHTML, /data-chart-toggle="activity"/);

let historyPath = "";
card._hass.callApi = async (_method, path) => {
  historyPath = path;
  return [[
    { entity_id: "sensor.iphone_sleep_duration", state: "432", last_updated: new Date(Date.now() - 86400000).toISOString(), attributes: { deep_minutes: 100, core_minutes: 230, rem_minutes: 90, awake_minutes: 12 } },
  ]];
};
await card._loadHistory(["sensor.iphone_sleep_duration"], "sleep-test");
assert.match(historyPath, /end_time=/);
assert.doesNotMatch(historyPath, /no_attributes/);
assert.equal(card._history["sensor.iphone_sleep_duration"][0].a.deep_minutes, 100);

let renders = 0;
const originalRender = card._render.bind(card);
card._render = () => { renders += 1; return originalRender(); };
card.hass = { ...card._hass, states: { ...companionStates, "sensor.unrelated_temperature": { state: "21", attributes: {} } } };
assert.equal(renders, 0, "unrelated state changes must not rerender the card");
card.hass = { ...card._hass, states: { ...companionStates, "sensor.iphone_heart_rate": { ...companionStates["sensor.iphone_heart_rate"], state: "73" } } };
assert.equal(renders, 1, "a relevant state change must rerender the card");

const originalDiscoverEntities = Card.discoverEntities;
let discoveryCalls = 0;
Card.discoverEntities = function (...args) {
  discoveryCalls += 1;
  return originalDiscoverEntities.apply(this, args);
};
const largeStates = { ...companionStates };
for (let index = 0; index < 4000; index += 1) {
  largeStates[`sensor.unrelated_${index}`] = {
    state: String(index),
    last_updated: new Date().toISOString(),
    attributes: { samples: Array.from({ length: 20 }, (_, sample) => sample + index) },
  };
}
const fastCard = new Card();
fastCard.setConfig({ language: "en", days: 3 });
let deferredHistoryCalls = 0;
const fastHass = {
  language: "en",
  states: largeStates,
  callApi: async () => { deferredHistoryCalls += 1; return []; },
  callWS: async () => ({}),
};
fastCard.hass = fastHass;
assert.equal(deferredHistoryCalls, 0, "Recorder history must not block the first card render");
fastCard.hass = { ...fastHass, states: { ...largeStates, "sensor.unrelated_extra": { state: "1", attributes: {} } } };
fastCard._render();
assert.equal(discoveryCalls, 1, "entity discovery should be cached across ordinary Home Assistant updates and renders");
assert.ok(fastCard._relevantStateSignature().length < 3000, "render signature must not serialize large entity attributes");
fastCard.disconnectedCallback();
Card.discoverEntities = originalDiscoverEntities;

console.log("Smoke test passed");
