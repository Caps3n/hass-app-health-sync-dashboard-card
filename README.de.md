[English](README.md) | [Русский](README.ru.md)

# Health-Sync Dashboard Card

[![Version](https://img.shields.io/badge/version-v0.6.5-orange)](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.6%2B-0288d1)](https://www.home-assistant.io)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![Validate](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/actions/workflows/validate.yml/badge.svg)](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/actions/workflows/validate.yml)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-caps3n-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/caps3n)

![Health-Sync Dashboard Card Vorschau](images/preview.png)

Eine kompakte, responsive Home Assistant Dashboard-Karte für Gesundheitsdaten aus der
**HA Companion App für iOS** (Apple Health) und der
**HA Companion App für Android** (Health Connect).

## Funktionen

- Automatische Erkennung von Apple Health- und Health Connect-Entitäten der HA Companion App
- Nativer grafischer Karteneditor mit manueller Entitätsauswahl
- Schnelles erstes Rendern: Entitätserkennung wird gecacht, Recorder-Historie lädt nach dem ersten Anzeigen
- Unabhängige Sichtbarkeitsschalter für jede Metrik-Kachel
- Umsortierbare Kacheln per Drag-and-Drop und Pfeilschaltflächen (mobilfreundlich)
- Auswahl des Mobilgeräts — für mehrere Nutzer auf einem Dashboard
- Schritte, aktive Kalorien, Herzfrequenz, HRV und Schlafzusammenfassung
- HA Companion App-Sensoren: Ruhe-/Geh-Herzfrequenz, Blutdruck, SpO₂, Atemfrequenz, Körpertemperatur, Blutzucker
- Körperwerte: Körperfettanteil, Magermasse, Größe, Gewicht
- Kacheln für Stockwerke, Trainingszeit, Geh-/Laufdistanz und VO₂ max
- Schrittfortschrittsbalken
- Unabhängige Schritt- und Kalorienskalen im Aktivitätsdiagramm
- 24-Stunden-Herzfrequenzdiagramm mit stündlicher Statistik und Recorder-Fallback
- Schlafphasendiagramm aus `deep_minutes`, `core_minutes`, `rem_minutes`, `awake_minutes`
- Kompaktes responsives Layout für Masonry- und Sections-Dashboards
- Oberfläche auf Deutsch, Englisch und Russisch

## Voraussetzungen

- Home Assistant mit aktivierter Recorder-Historie
- **HA Companion App für iOS** mit aktivierten Apple Health-Sensoren unter *Einstellungen → Companion App → Health* (Labs), mindestens einmal synchronisiert  
  **oder**  
  **HA Companion App für Android** mit aktivierten Health Connect-Sensoren (Android 9+ mit Play Store oder Android 14+), mindestens einmal synchronisiert
- HACS für die empfohlene Installation

### Sensorunterstützung nach Plattform

| Metrik | iOS Companion | Android Health Connect |
|---|:---:|:---:|
| Schritte | ✓ | ✓ |
| Aktive Kalorien | ✓ | ✓ |
| Herzfrequenz | ✓ | ✓ |
| HRV | ✓ | ✓ |
| Ruheherzfrequenz | ✓ | ✓ |
| Blutdruck | ✓ | ✓ |
| SpO₂ | ✓ | ✓ |
| Atemfrequenz | ✓ | ✓ |
| Schlafdauer | ✓ | ✓ |
| Distanz | ✓ | ✓ |
| Stockwerke | ✓ | ✓ |
| VO₂ max | ✓ | ✓ |
| Gewicht | ✓ | ✓ |
| Größe | ✓ | ✓ |
| Körperfett % | ✓ | ✓ |
| Magermasse | ✓ | — |
| Körpertemperatur | ✓ | ✓ |
| Blutzucker | ✓ | — |
| Trainingszeit | ✓ | — |
| Geh-Herzfrequenz | ✓ | — |
| Ruheenergie | ✓ | ✓ |

## Installation über HACS

[![In Home Assistant öffnen.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Caps3n&repository=hass-app-health-sync-dashboard-card&category=plugin)

1. Öffne **HACS** in Home Assistant.
2. Öffne das Dreipunktmenü und wähle **Benutzerdefinierte Repositories**.
3. Füge `https://github.com/Caps3n/hass-app-health-sync-dashboard-card` hinzu.
4. Wähle **Dashboard** als Kategorie.
5. Lade **Health-Sync Dashboard Card** herunter und aktualisiere den Browser.

## Karte hinzufügen

Die Karte erscheint nach der Installation im grafischen Kartenwähler. Minimales YAML:

```yaml
type: custom:hass-app-health-sync-dashboard-card
```

Häufige Optionen:

```yaml
type: custom:hass-app-health-sync-dashboard-card
title: Gesundheit
language: de
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true

# Optional: bestimmtes Mobilgerät auswählen
# (für zwei Nutzer auf einem Dashboard — im Editor auswählbar)
# mobile_device: 0123456789abcdef

# Metrik-Kacheln — alle standardmäßig aktiviert
show_steps_metric: true
show_calories_metric: true
show_sleep_metric: true
show_heart_metric: true
show_hrv_metric: true
show_flights_metric: true
show_exercise_metric: true
show_resting_energy_metric: true
show_distance_metric: true
show_vo2_max_metric: true
show_weight_metric: true
show_resting_heart_rate_metric: true
show_blood_pressure_systolic_metric: true
show_blood_pressure_diastolic_metric: true
show_walking_heart_rate_metric: true
show_blood_oxygen_metric: true
show_respiratory_rate_metric: true
show_body_temperature_metric: true
show_blood_glucose_metric: true
show_body_fat_percentage_metric: true
show_lean_body_mass_metric: true
show_height_metric: true

# Optionale Kachelreihenfolge
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
```

Entitäten werden automatisch erkannt. Bei Bedarf manuell angeben:

```yaml
type: custom:hass-app-health-sync-dashboard-card
entities:
  steps: sensor.mein_iphone_schritte
  heart_rate: sensor.mein_iphone_herzfrequenz
```

## Danksagung

Herzlichen Dank an [BrainDeLook](https://github.com/BrainDeLook) für die Erstellung der originalen
[HealthSync Dashboard Card](https://github.com/BrainDeLook/healthsync-dashboard-card),
die als Grundlage für dieses Projekt diente.

## Lizenz

[MIT](LICENSE)
