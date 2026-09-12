[English](README.md) | [Deutsch](README.de.md)

# Health-Sync Dashboard Card

[![Version](https://img.shields.io/badge/version-v0.6.2-orange)](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.6%2B-0288d1)](https://www.home-assistant.io)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![Validate](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/actions/workflows/validate.yml/badge.svg)](https://github.com/Caps3n/hass-app-health-sync-dashboard-card/actions/workflows/validate.yml)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-caps3n-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/caps3n)

![Демонстрация Health-Sync Dashboard Card](images/preview.png)

Компактная адаптивная карточка Home Assistant для данных здоровья из
**HA Companion App для iOS** (Apple Health) и
**HA Companion App для Android** (Health Connect).

## Возможности

- Автоматическое обнаружение сущностей Apple Health и Health Connect из HA Companion App
- Графический редактор Home Assistant с ручной заменой любой сущности
- Быстрый первый показ: поиск сущностей кэшируется, история Recorder загружается после появления карточки
- Независимое включение и выключение каждой плитки показателя
- Изменяемый порядок плиток: перетаскивание на компьютере и кнопки-стрелки на телефоне
- Выбор мобильного устройства — для нескольких пользователей на одном дашборде
- Шаги, активные калории, пульс, HRV и сводка сна
- Датчики HA Companion App: пульс покоя/ходьбы, давление, SpO₂, дыхание, температура, глюкоза
- Параметры тела: процент жира, безжировая масса, рост, вес
- Плитки для этажей, тренировок, дистанции ходьбы+бега и VO₂ max
- Индикатор дневной цели шагов
- Раздельные шкалы шагов и калорий на графике активности
- График пульса за 24 часа с почасовой статистикой и резервом из Recorder
- График фаз сна из атрибутов `deep_minutes`, `core_minutes`, `rem_minutes`, `awake_minutes`
- Компактная адаптивная раскладка для Masonry и Sections
- Интерфейс на русском, английском и немецком языках

## Требования

- Home Assistant с включённой историей Recorder
- **HA Companion App для iOS** с включёнными сенсорами Apple Health (*Настройки → Companion App → Health*, Labs), синхронизированными хотя бы один раз  
  **или**  
  **HA Companion App для Android** с включёнными сенсорами Health Connect (Android 9+ с Play Store или Android 14+), синхронизированными хотя бы один раз
- HACS для рекомендуемой установки

### Поддержка датчиков по платформе

| Показатель | iOS Companion | Android Health Connect |
|---|:---:|:---:|
| Шаги | ✓ | ✓ |
| Активные калории | ✓ | ✓ |
| Пульс | ✓ | ✓ |
| HRV | ✓ | ✓ |
| Пульс покоя | ✓ | ✓ |
| Давление | ✓ | ✓ |
| SpO₂ | ✓ | ✓ |
| Частота дыхания | ✓ | ✓ |
| Продолжительность сна | ✓ | ✓ |
| Дистанция | ✓ | ✓ |
| Этажи | ✓ | ✓ |
| VO₂ max | ✓ | ✓ |
| Вес | ✓ | ✓ |
| Рост | ✓ | ✓ |
| Процент жира | ✓ | ✓ |
| Безжировая масса | ✓ | — |
| Температура тела | ✓ | ✓ |
| Глюкоза крови | ✓ | — |
| Время упражнений | ✓ | — |
| Пульс при ходьбе | ✓ | — |
| Энергия покоя | ✓ | ✓ |

## Установка через HACS

[![Открыть в Home Assistant.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Caps3n&repository=hass-app-health-sync-dashboard-card&category=plugin)

1. Откройте **HACS**.
2. В меню с тремя точками выберите **Пользовательские репозитории**.
3. Добавьте `https://github.com/Caps3n/hass-app-health-sync-dashboard-card`.
4. Выберите категорию **Dashboard**.
5. Установите **Health-Sync Dashboard Card** и обновите браузер.

## Добавление карточки

После установки карточка появится в каталоге. Минимальный YAML:

```yaml
type: custom:hass-app-health-sync-dashboard-card
```

Основные параметры:

```yaml
type: custom:hass-app-health-sync-dashboard-card
title: Здоровье
language: ru
days: 7
step_goal: 10000
calorie_goal: 600
show_activity: true
show_sleep: true
show_heart_rate: true

# Необязательно: выбрать конкретное мобильное устройство
# (для двух пользователей на одном дашборде — выбирается в редакторе)
# mobile_device: 0123456789abcdef

# Плитки показателей — все включены по умолчанию
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

# Необязательный порядок плиток
tile_order:
  - heart_rate
  - blood_oxygen
  - steps
  - active_calories
```

Сущности обнаруживаются автоматически. При необходимости можно указать вручную:

```yaml
type: custom:hass-app-health-sync-dashboard-card
entities:
  steps: sensor.my_iphone_steps
  heart_rate: sensor.my_iphone_heart_rate
```

## Благодарности

Большое спасибо [BrainDeLook](https://github.com/BrainDeLook) за создание оригинальной
[HealthSync Dashboard Card](https://github.com/BrainDeLook/healthsync-dashboard-card),
которая послужила основой для этого проекта.

## Лицензия

[MIT](LICENSE)
