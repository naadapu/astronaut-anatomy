# Architecture Diagram

## System Overview

```mermaid
flowchart TD
    subgraph data_layer["Data Layer"]
        DATA[("data.js\nRaw dataset · 69 astronauts")]
    end

    subgraph service_layer["Service Layer"]
        DS["dataService.js\ngetGroupNames · getGroup\ngetDegreeCounts · getMilitaryCounts"]
        FS["filterService.js\nFilter state · pub/sub\npassesFilters predicate"]
    end

    subgraph ui_layer["UI Layer"]
        TB["tableBuilder.js\nbuildGroupSection\nbuildAstronautRow · textCell"]
        GD["groups_display.js\ndisplayGroupsInfo · setupFilters"]
        DC["degreeChart.js\ndrawDegreeChart"]
    end

    subgraph browser["Browser DOM"]
        DROPS["Filter dropdowns\ngender · military · degree"]
        TABLE["#groups_info\nAstronaut tables"]
        CANVAS["#degreeChart\nBar chart canvas"]
    end

    DATA -- "export nasa" --> DS
    FS -- "passesFilters" --> DS

    DS -- "getGroupNames · getGroup" --> GD
    DS -- "getDegreeCounts" --> DC
    FS -- "getFilters" --> GD
    FS -- "getFilters" --> DC

    GD -- "filtered astronauts" --> TB
    TB -- "DOM elements" --> TABLE
    DC -- "draw calls" --> CANVAS

    DROPS -- "change event" --> GD
    GD -- "setFilter" --> FS
    FS -. "notify subscribers" .-> GD
    FS -. "notify subscribers" .-> DC
```

## Key

| Arrow | Meaning |
|---|---|
| Solid `-->` | Direct call — one module explicitly invoking another |
| Dashed `-.->` | Pub/sub push — filterService notifying subscribers on state change |

## Notes

- `tableBuilder.js` has no dependency on `filterService` or `dataService` — it receives pre-filtered data and returns DOM elements
- The core runtime cycle is: filter dropdown → `groups_display` → `filterService.setFilter` → notify subscribers → both renderers re-run
- `data.js` and `filterService.js` have no dependencies of their own — they are the base of the dependency graph
