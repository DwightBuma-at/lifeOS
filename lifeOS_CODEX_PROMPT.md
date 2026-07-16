# lifeOS — Single-File Personal Productivity App Build Prompt

## 1. Project Overview

Build a premium personal productivity web application named **lifeOS**.

lifeOS is a customized personal operating system intended for one user. Its purpose is to organize daily responsibilities, automate recurring routines, and make personal task management simple, fast, and visually enjoyable.

For the first version, the application will contain only two subsystems:

1. **Daily Tasks**
2. **Gym Routine**

The application must be developed as a single-page website using only:

- HTML5
- Tailwind CSS
- Vanilla JavaScript

All HTML, Tailwind configuration, custom CSS, and JavaScript must be placed inside one file:

```text
index.html
```

Do not create separate CSS or JavaScript files.

---

## 2. Role and Development Standard

Act as a senior frontend developer, UI/UX designer, and product engineer.

The final result must feel like a carefully designed personal productivity product, not a generic dashboard template and not an obvious AI-generated interface.

Focus on:

- Clean visual hierarchy
- Premium Apple-inspired interface design
- Smooth and purposeful interactions
- Practical daily usability
- Mobile responsiveness
- Maintainable code
- Accessibility
- Consistent spacing and typography
- Fast performance
- Local-first data storage

Do not use React, Vue, Angular, jQuery, Bootstrap, or any backend framework.

---

## 3. Main Technical Requirements

### Required stack

Use:

- Semantic HTML5
- Tailwind CSS through CDN
- Vanilla JavaScript
- Browser `localStorage`
- Lucide Icons through CDN

Recommended CDN imports:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
```

### Single-file rule

Everything must remain inside:

```text
index.html
```

The file should contain:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Metadata, fonts, Tailwind setup, and custom styles -->
</head>
<body>
    <!-- Complete application interface -->

    <script>
        // Complete application logic
    </script>
</body>
</html>
```

### Browser support

The application should work properly in current versions of:

- Google Chrome
- Microsoft Edge
- Safari
- Firefox

---

## 4. Product Identity

### Application name

```text
lifeOS
```

### Suggested tagline

```text
Your day, organized.
```

Alternative supporting text:

```text
A personal system for tasks, routines, and progress.
```

### Brand personality

The brand should feel:

- Personal
- Calm
- Organized
- Premium
- Intelligent
- Minimal
- Reliable
- Modern

Avoid making it look:

- Too corporate
- Too colorful
- Too playful
- Like an admin panel
- Like a cryptocurrency dashboard
- Like a generic SaaS template
- Overloaded with charts or widgets

---

## 5. Visual Direction

Use the attached Kaggle navigation image only as a structural reference for the left sidebar.

Important characteristics to follow from the reference:

- Vertical left navigation
- Logo at the top
- Rounded primary action button
- Simple icon and text navigation items
- Spacious layout
- Clean white background
- Minimal visual noise
- Clear active state
- Small expandable navigation indicators

However, do not copy Kaggle branding, wording, logo, colors, or exact dimensions.

Transform the structure into a premium Apple-inspired lifeOS interface.

---

## 6. Apple-Inspired Design System

The design should be influenced by modern Apple and iOS interfaces without directly copying an existing Apple application.

### Overall appearance

Use:

- Soft off-white or light gray page background
- White elevated surfaces
- Large rounded corners
- Thin subtle borders
- Gentle shadows
- Translucent or frosted navigation surfaces where appropriate
- Clear typography
- Generous whitespace
- Smooth animation
- Restrained use of color

### Suggested color tokens

```css
--background: #f5f5f7;
--surface: rgba(255, 255, 255, 0.86);
--surface-solid: #ffffff;
--text-primary: #1d1d1f;
--text-secondary: #6e6e73;
--border: rgba(0, 0, 0, 0.08);
--accent: #007aff;
--accent-hover: #0066d6;
--success: #34c759;
--warning: #ff9f0a;
--danger: #ff3b30;
```

Tailwind colors may be extended to reflect these values.

### Typography

Use a clean system-first font stack:

```css
font-family:
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    "SF Pro Text",
    "Segoe UI",
    sans-serif;
```

Do not depend on locally installed Apple font files.

### Border radius

Use generous but consistent radius values:

- Main panels: `24px`
- Cards: `18px` to `22px`
- Buttons: `12px` to `16px`
- Pills: `999px`

### Shadows

Use subtle layered shadows.

Example:

```css
box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 10px 30px rgba(0, 0, 0, 0.06);
```

Avoid heavy dark shadows.

### Motion

Use transitions between `160ms` and `260ms`.

Animate:

- Sidebar hover states
- Active navigation indicator
- Modal opening
- Toast notifications
- Check completion
- Card hover elevation
- Progress-bar changes
- Mobile sidebar opening and closing

Animations must be subtle and functional.

---

## 7. Application Layout

Create a responsive application shell with the following major regions:

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Top Header                                         │
│         ├────────────────────────────────────────────────────│
│         │ Main Page Content                                  │
│         │                                                    │
│         │                                                    │
└──────────────────────────────────────────────────────────────┘
```

### Desktop layout

- Fixed or sticky left sidebar
- Sidebar width around `250px` to `280px`
- Main content fills the remaining space
- Content should have a sensible maximum width
- Header remains visible while scrolling when practical

### Tablet layout

- Sidebar may collapse to icon-only mode
- Include a visible button to expand it
- Keep touch targets at least `44px`

### Mobile layout

- Sidebar becomes an off-canvas drawer
- Add a hamburger menu button
- Use a dimmed background overlay
- Main content becomes a single column
- Cards should use full width
- Forms and buttons must remain easy to use with one hand

---

## 8. Sidebar Navigation

Create a left sidebar inspired by the supplied reference image.

### Sidebar header

Include:

- A simple custom lifeOS mark or monogram
- The text `lifeOS`
- A sidebar collapse button on desktop
- A close button inside the mobile drawer

Suggested logo concept:

- Rounded square
- Lowercase `l`
- Small circular pulse or orbit detail
- Blue gradient used sparingly

Do not use a copyrighted Apple logo.

### Main action button

Place a prominent rounded button below the logo:

```text
+ Quick Add
```

When clicked, show a compact menu with:

- New Task
- New Workout

### Navigation items

Include:

```text
Overview
Daily Tasks
Gym Routine
Insights
Settings
```

For version one:

- Overview must work
- Daily Tasks must work
- Gym Routine must work
- Insights may show simple calculated summaries
- Settings may contain basic preferences

Suggested Lucide icons:

```text
Overview      → layout-dashboard
Daily Tasks   → circle-check-big
Gym Routine   → dumbbell
Insights      → chart-no-axes-column-increasing
Settings      → settings
```

### Active state

The active navigation item should have:

- Soft blue background
- Blue icon
- Dark text
- Rounded rectangle
- Optional slim blue indicator

### Sidebar footer

Include a small user profile block:

```text
Dwight
Personal Workspace
```

Also include:

- Circular avatar with initials
- Current local date
- Small status indicator such as `System ready`

Do not require login or authentication.

---

## 9. Top Header

The top header should change according to the current selected subsystem.

Include:

- Page title
- Short contextual subtitle
- Current date
- Search field or search button
- Theme toggle
- Notification button
- Mobile menu button

Example for Overview:

```text
Good afternoon, Dwight
Here is what is happening today.
```

Generate the greeting dynamically based on local time:

- Good morning
- Good afternoon
- Good evening

Display the current date using JavaScript.

---

## 10. Overview Subsystem

The Overview is the default landing page.

Its purpose is to summarize the user's day without overwhelming them.

### Hero summary panel

Create a premium summary card containing:

- Greeting
- Current day and date
- Number of unfinished tasks
- Today's workout status
- Overall daily progress
- Motivational message

Example:

```text
You have 4 tasks remaining.
Upper Body workout is planned for today.
```

### Daily progress ring

Create a progress ring using:

- SVG
- CSS
- JavaScript

The progress should combine:

- Completed daily tasks
- Completed workout status

Show percentage in the center.

### Overview cards

Create four compact information cards:

1. Tasks completed
2. Tasks remaining
3. Workout status
4. Current streak

Use large numeric values and small labels.

### Today's priority list

Display a short list of up to five high-priority incomplete tasks.

Each item should have:

- Checkbox
- Task name
- Category
- Priority
- Due time

### Today's workout preview

Display:

- Workout name
- Target muscle group
- Number of exercises
- Estimated duration
- Start Workout button

### Quick action area

Include:

- Add task
- Start workout
- Plan tomorrow
- Reset today's checklist

The reset action must require confirmation.

---

## 11. Daily Tasks Subsystem

The Daily Tasks subsystem is a personal to-do checklist.

### Main capabilities

Users must be able to:

- Add a task
- Edit a task
- Delete a task
- Mark a task complete
- Mark a completed task incomplete
- Set priority
- Set category
- Set due date
- Set optional due time
- Add optional notes
- Search tasks
- Filter tasks
- Sort tasks
- Create recurring daily tasks
- Clear completed tasks
- View task completion progress

### Task fields

Each task should use the following structure:

```javascript
{
    id: "unique-id",
    title: "Morning planning",
    notes: "Review the priorities for today.",
    category: "Personal",
    priority: "High",
    dueDate: "2026-07-16",
    dueTime: "08:00",
    completed: false,
    recurring: false,
    createdAt: "ISO date string",
    completedAt: null
}
```

### Categories

Provide default categories:

```text
Personal
Work
Study
Errands
Health
Other
```

Use a subtle color-coded badge for each category.

### Priority options

```text
Low
Medium
High
```

Priority styling:

- Low: neutral gray
- Medium: soft orange
- High: soft red

### Task list groups

Allow tasks to be viewed in logical groups:

```text
Today
Upcoming
Completed
All Tasks
```

### Filters

Include:

- Status
- Priority
- Category
- Due date
- Search keyword

### Sorting

Include:

- Manual/default
- Due date
- Due time
- Priority
- Creation date
- Alphabetical

### Add and edit task modal

Use a polished modal or side sheet.

Fields:

- Task title
- Notes
- Category
- Priority
- Due date
- Due time
- Repeat daily toggle

Modal actions:

- Cancel
- Save Task

Validate that task title is not empty.

### Task interaction details

When a task is completed:

- Animate the checkbox
- Apply a line-through style
- Lower the visual emphasis
- Update progress immediately
- Save the change to localStorage
- Show a small success toast

### Empty states

Create useful empty states for:

- No tasks
- No search results
- No completed tasks
- No upcoming tasks

Example:

```text
Nothing planned yet.
Add your first task to begin organizing your day.
```

---

## 12. Gym Routine Subsystem

The Gym Routine subsystem manages personal workout routines and exercise completion.

### Main capabilities

Users must be able to:

- Create a workout routine
- Edit a routine
- Delete a routine
- Assign a routine to a day
- Add exercises
- Edit exercises
- Delete exercises
- Reorder exercises
- Mark exercise sets as complete
- Start and finish a workout
- Track workout duration
- Record notes
- Save workout progress
- View recent workout history

### Default weekly routine

Provide example routines that can be edited:

```text
Monday    → Push
Tuesday   → Pull
Wednesday → Legs
Thursday  → Rest
Friday    → Upper Body
Saturday  → Lower Body
Sunday    → Rest
```

### Routine object

Use a data structure similar to:

```javascript
{
    id: "routine-id",
    name: "Push Day",
    day: "Monday",
    focus: "Chest, Shoulders, Triceps",
    estimatedMinutes: 60,
    exercises: [
        {
            id: "exercise-id",
            name: "Bench Press",
            sets: 4,
            reps: "8-10",
            weight: "40 kg",
            restSeconds: 90,
            notes: "",
            completedSets: 0
        }
    ]
}
```

### Workout dashboard

Display:

- Today's assigned routine
- Workout title
- Muscle focus
- Estimated duration
- Exercise count
- Completion percentage
- Start or Continue Workout button

### Exercise cards

Each exercise card must show:

- Exercise name
- Set count
- Rep range
- Weight
- Rest time
- Notes
- Set completion controls
- Edit menu

For set tracking, create small selectable set circles or buttons:

```text
Set 1
Set 2
Set 3
Set 4
```

A completed set should visually change to the success state.

### Active workout mode

When the user starts a workout, open a focused workout interface.

Include:

- Workout title
- Elapsed timer
- Progress percentage
- Current exercise
- Exercise instructions or notes
- Complete Set button
- Rest timer
- Previous and Next exercise buttons
- Finish Workout button

### Rest timer

Provide preset rest durations:

```text
30 sec
60 sec
90 sec
120 sec
```

The timer should:

- Count down
- Display remaining seconds
- Support pause
- Support resume
- Support skip
- Show a visual completion notification

Do not attempt to use push notifications that require special permissions.

### Workout completion

When a workout is finished:

- Save the completion date
- Save total duration
- Save exercise and set progress
- Show a summary modal
- Update daily overview
- Update streak
- Add record to workout history

### Workout history

Display a compact history list containing:

- Date
- Routine name
- Duration
- Completion percentage

---

## 13. Insights Page

The Insights page should use only locally calculated data.

Include:

- Task completion rate
- Number of tasks completed this week
- Number of workouts completed this week
- Current workout streak
- Most productive task category
- Recent activity timeline

Do not create overly complex charts.

A simple seven-day bar chart may be built using HTML and CSS.

No external chart library is required.

When insufficient data is available, show an informative empty state.

---

## 14. Settings Page

Include useful preferences stored in localStorage.

### Preferences

- Light or dark appearance
- Reduced motion
- Default landing page
- Show or hide completed tasks
- Default workout rest duration
- User display name
- Week starts on Monday or Sunday

### Data management

Include:

- Export lifeOS data as JSON
- Import lifeOS data from JSON
- Reset all application data

The reset action must show a confirmation dialog.

Exported data should include:

```javascript
{
    version: 1,
    exportedAt: "ISO date",
    tasks: [],
    routines: [],
    workoutHistory: [],
    settings: {}
}
```

Validate imported JSON before replacing existing data.

---

## 15. Local Storage Architecture

Use a single localStorage key:

```text
lifeOS_data_v1
```

Suggested state structure:

```javascript
const defaultState = {
    version: 1,
    user: {
        name: "Dwight"
    },
    tasks: [],
    routines: [],
    workoutHistory: [],
    settings: {
        theme: "light",
        reducedMotion: false,
        defaultPage: "overview",
        showCompletedTasks: true,
        defaultRestSeconds: 90,
        weekStartsOn: "monday"
    },
    metadata: {
        createdAt: null,
        updatedAt: null
    }
};
```

Create reusable state functions:

```javascript
loadState()
saveState()
resetState()
exportState()
importState()
```

Always protect against invalid or corrupted localStorage data.

Use `try...catch` when parsing JSON.

---

## 16. JavaScript Architecture

Even though everything is inside one HTML file, organize JavaScript clearly.

Use labeled sections:

```javascript
/* =========================================================
   1. Constants and Configuration
========================================================= */

/* =========================================================
   2. Application State
========================================================= */

/* =========================================================
   3. Storage Helpers
========================================================= */

/* =========================================================
   4. Utility Functions
========================================================= */

/* =========================================================
   5. Navigation and Layout
========================================================= */

/* =========================================================
   6. Overview
========================================================= */

/* =========================================================
   7. Daily Tasks
========================================================= */

/* =========================================================
   8. Gym Routine
========================================================= */

/* =========================================================
   9. Insights
========================================================= */

/* =========================================================
   10. Settings
========================================================= */

/* =========================================================
   11. Modals, Toasts, and Dialogs
========================================================= */

/* =========================================================
   12. Event Listeners and Initialization
========================================================= */
```

### Coding standards

- Use `const` and `let`; never use `var`
- Use descriptive function names
- Keep functions focused
- Avoid duplicated logic
- Avoid excessive global variables
- Use event delegation for repeated list items
- Escape or sanitize user-created text before rendering
- Use `crypto.randomUUID()` with a fallback function
- Use `Intl.DateTimeFormat` for dates
- Use `requestAnimationFrame` where appropriate for visual updates
- Add useful comments, not comments for obvious code
- Do not leave placeholder functions
- Do not leave broken or unfinished buttons
- Do not use fake APIs

### Suggested functions

```javascript
initializeApp()
navigateTo(page)
renderCurrentPage()
renderOverview()
renderTasks()
renderGymRoutine()
renderInsights()
renderSettings()
openTaskModal(taskId)
saveTask()
toggleTask(taskId)
deleteTask(taskId)
openRoutineModal(routineId)
saveRoutine()
startWorkout(routineId)
completeWorkout()
showToast(message, type)
openConfirmDialog(options)
```

---

## 17. Responsive Design Requirements

### Desktop

- Sidebar visible
- Multi-column cards
- Main content centered with comfortable margins
- Task and gym layouts may use two columns

### Tablet

- Sidebar collapsible
- Reduce card columns
- Avoid cramped controls

### Mobile

- Off-canvas sidebar
- Single-column layout
- Sticky mobile header
- Bottom-safe spacing
- Full-width primary buttons where useful
- Modal becomes bottom sheet or full-screen panel
- Minimum touch target size of `44px × 44px`

Test at:

```text
375px
430px
768px
1024px
1440px
```

Avoid horizontal scrolling at all sizes.

---

## 18. Accessibility Requirements

The application should include:

- Semantic landmarks
- Correct heading hierarchy
- Accessible labels
- Keyboard-accessible buttons
- Visible focus states
- `aria-label` for icon-only buttons
- `aria-expanded` for expandable controls
- `aria-current="page"` for active navigation
- Escape key support for modals
- Focus trapping inside active modals
- Sufficient text contrast
- Reduced-motion support
- Meaningful empty states

Do not rely on color alone to communicate status.

---

## 19. Interaction and Feedback Standards

Every user action should provide clear feedback.

Use:

- Toast notifications
- Button loading or pressed states
- Smooth state transitions
- Inline form errors
- Confirmation dialogs for destructive actions
- Empty states
- Disabled states
- Progress indicators

Suggested toast types:

```text
Success
Information
Warning
Error
```

Example messages:

```text
Task added successfully.
Task marked as complete.
Workout saved.
Routine updated.
Data exported.
Unable to import the selected file.
```

---

## 20. Dark Mode

Include a functional dark mode.

Dark mode should use:

- Near-black background, not pure black everywhere
- Dark elevated surfaces
- Soft borders
- Clear readable text
- Adjusted shadows
- The same restrained blue accent

Suggested dark values:

```css
--background-dark: #0f0f10;
--surface-dark: #1c1c1e;
--surface-dark-elevated: #242426;
--text-dark-primary: #f5f5f7;
--text-dark-secondary: #a1a1a6;
--border-dark: rgba(255, 255, 255, 0.10);
```

Respect the saved user preference.

Optionally use system preference as the first default.

---

## 21. Initial Demo Data

On first launch, populate the application with realistic demo data so the UI does not appear empty.

### Sample tasks

```text
Review today's priorities
Reply to important emails
Complete 30 minutes of coding practice
Prepare gym clothes
Plan tomorrow's schedule
```

### Sample Push workout

```text
Bench Press         — 4 sets × 8-10 reps
Incline Dumbbell    — 3 sets × 10 reps
Shoulder Press      — 3 sets × 8-10 reps
Lateral Raise       — 3 sets × 12-15 reps
Tricep Pushdown     — 3 sets × 10-12 reps
```

Ensure the user can delete or modify all demo data.

---

## 22. UI Components to Build

Create reusable visual patterns for:

- Sidebar navigation item
- Header
- Button
- Icon button
- Stat card
- Task card
- Category badge
- Priority badge
- Progress bar
- Progress ring
- Workout card
- Exercise card
- Empty state
- Search field
- Filter dropdown
- Modal
- Bottom sheet
- Confirmation dialog
- Toast
- Toggle switch
- Segmented control
- Skeleton or subtle loading state
- Tooltip where necessary

Maintain consistent spacing and styling across all components.

---

## 23. UX Details

### Quick Add

The Quick Add button should show a small floating menu with:

```text
New Task
New Workout Routine
```

Clicking outside closes the menu.

### Search

Task search should update results while typing.

### Navigation

Page changes should happen instantly without full browser reload.

Use hash navigation or internal JavaScript state, such as:

```text
#overview
#tasks
#gym
#insights
#settings
```

Browser back and forward navigation should continue to work.

### Persistence

Every meaningful user change must be saved automatically.

No separate Save All button should be required.

### Confirmation

Require confirmation before:

- Deleting a task
- Deleting a routine
- Clearing completed tasks
- Resetting today's checklist
- Resetting all data
- Importing data that replaces existing data

---

## 24. Performance Requirements

- Keep the page lightweight
- Avoid unnecessary libraries
- Minimize repeated DOM updates
- Use event delegation
- Avoid large embedded images
- Avoid repeated localStorage writes inside fast loops
- Debounce search input
- Render only the active page
- Keep animations smooth

The app should feel immediate on a normal phone or laptop.

---

## 25. Security and Data Safety

Although this is a local personal app, apply safe frontend practices.

- Never evaluate user input with `eval`
- Avoid inserting raw user text through unsafe `innerHTML`
- Escape user-generated content
- Validate imported JSON
- Validate dates and numeric inputs
- Limit unreasonable input lengths
- Handle missing properties in old saved data
- Do not request unnecessary permissions
- Do not include trackers or analytics scripts
- Do not send data to an external server

---

## 26. Acceptance Criteria

The result is complete only when all of the following are true:

### General

- The entire application exists in one `index.html`
- No build process is required
- Opening `index.html` launches the app
- Navigation works without page reload
- The design is responsive
- Light and dark modes work
- Data remains after refreshing the browser
- All visible primary buttons work
- There are no obvious console errors

### Daily Tasks

- Tasks can be created
- Tasks can be edited
- Tasks can be deleted
- Tasks can be completed and reopened
- Filters work
- Search works
- Sorting works
- Progress updates correctly
- Recurring task behavior is implemented
- Changes persist to localStorage

### Gym Routine

- Routines can be created
- Routines can be edited
- Routines can be deleted
- Exercises can be managed
- A workout can be started
- Sets can be marked complete
- Rest timer works
- Workout can be finished
- Workout history is saved
- Overview reflects workout completion

### Quality

- Interface looks intentional and premium
- It does not look like a generic admin template
- Mobile layout is practical
- Keyboard navigation works
- Empty states are present
- Destructive actions are confirmed
- Code is organized and readable

---

## 27. Required Final Output

Return one complete file:

```text
index.html
```

Do not divide the implementation into multiple files.

Do not provide partial snippets.

Do not use placeholder comments such as:

```javascript
// Add logic here later
```

The generated file must be runnable immediately after saving it.

Before returning the final code:

1. Review the interface structure.
2. Verify all element IDs and selectors.
3. Verify modal open and close behavior.
4. Verify task CRUD operations.
5. Verify routine CRUD operations.
6. Verify workout timer behavior.
7. Verify localStorage persistence.
8. Verify theme persistence.
9. Verify import and export.
10. Check for JavaScript console errors.
11. Check responsive behavior.
12. Remove unused code.

---

# Recommended Markdown Documentation for the Project

For a small project, one prompt file is enough for generating the first version. As lifeOS grows, create the following Markdown files beside `index.html`.

```text
lifeOS/
├── index.html
├── README.md
├── REQUIREMENTS.md
├── DESIGN_SYSTEM.md
├── ARCHITECTURE.md
├── DATA_MODEL.md
├── ROADMAP.md
├── CHANGELOG.md
└── CODEX_PROMPT.md
```

## README.md

Purpose:

- Explain what lifeOS is
- Explain how to run it
- List the current features
- Describe the technology stack
- Provide basic usage instructions

Suggested contents:

```markdown
# lifeOS

lifeOS is a private, local-first personal productivity application for daily tasks and gym routines.

## Features

- Daily task checklist
- Recurring tasks
- Gym routine planner
- Active workout tracking
- Rest timer
- Local data persistence
- Data import and export
- Light and dark modes

## Technology

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- localStorage

## Run Locally

Download the project and open `index.html` in a modern browser.

## Data Storage

All application data is stored in the browser under the localStorage key `lifeOS_data_v1`.

## Current Version

Version 1.0
```

## REQUIREMENTS.md

Purpose:

- Define exactly what the application must do
- Separate functional and non-functional requirements
- Prevent feature confusion

Suggested sections:

```markdown
# Requirements

## Functional Requirements

### Daily Tasks
- Add, edit, delete, and complete tasks
- Search, filter, and sort tasks
- Support recurring daily tasks

### Gym Routine
- Create routines and exercises
- Track sets
- Run a rest timer
- Save workout history

## Non-Functional Requirements

- Single HTML file
- Responsive design
- Accessible controls
- Local-first data
- No backend
- No framework
```

## DESIGN_SYSTEM.md

Purpose:

- Keep colors, typography, spacing, and component styles consistent

Suggested sections:

```markdown
# Design System

## Principles
- Calm
- Minimal
- Premium
- Personal
- Functional

## Colors
- Background
- Surface
- Primary text
- Secondary text
- Accent
- Success
- Warning
- Danger

## Typography
- Font stack
- Heading sizes
- Body sizes
- Label sizes

## Spacing
- 4px base scale

## Radius
- Button
- Card
- Panel
- Pill

## Components
- Buttons
- Cards
- Inputs
- Navigation items
- Badges
- Modals
- Toasts
```

## ARCHITECTURE.md

Purpose:

- Describe how the JavaScript and page sections are organized
- Make future development easier

Suggested sections:

```markdown
# Architecture

## Application Type
Single-page local-first web application.

## Main Modules
- State
- Storage
- Navigation
- Tasks
- Gym
- Insights
- Settings
- UI feedback

## Data Flow
User action → state update → localStorage save → UI re-render

## Navigation
Hash-based navigation.

## Persistence
All data is stored in `lifeOS_data_v1`.
```

## DATA_MODEL.md

Purpose:

- Document the shape of tasks, routines, exercises, history, and settings

Suggested sections:

```markdown
# Data Model

## Root State

## User

## Task

## Routine

## Exercise

## Workout History

## Settings

## Version Migration
```

Include JavaScript object examples for every model.

## ROADMAP.md

Purpose:

- Track future features without adding them too early

Suggested roadmap:

```markdown
# Roadmap

## Version 1
- Daily Tasks
- Gym Routine
- Overview
- Local storage
- Import and export

## Version 1.1
- Habit tracker
- Calendar view
- Better weekly insights

## Version 1.2
- Meal planner
- Personal notes
- Pomodoro focus timer

## Future
- Optional cloud sync
- Mobile app version
- Notifications
- Automation rules
```

## CHANGELOG.md

Purpose:

- Record completed updates

Suggested format:

```markdown
# Changelog

## [1.0.0] - YYYY-MM-DD

### Added
- Daily Tasks subsystem
- Gym Routine subsystem
- Overview dashboard
- Theme preferences
- Local data export and import

### Fixed
- None

### Changed
- None
```

## CODEX_PROMPT.md

Purpose:

- Store the complete development prompt
- Use it when asking Codex to generate or revise the application

The contents of this current document may be saved as:

```text
CODEX_PROMPT.md
```

---

# Future Development Rule

When adding a new subsystem, update these documents in this order:

1. `REQUIREMENTS.md`
2. `DATA_MODEL.md`
3. `ARCHITECTURE.md`
4. `DESIGN_SYSTEM.md`, only when new UI patterns are introduced
5. `ROADMAP.md`
6. `CHANGELOG.md`
7. `CODEX_PROMPT.md`

Do not begin coding a major new subsystem until its purpose, data, interactions, and acceptance criteria are documented.

---

# Final Instruction to Codex

Build the complete first version of lifeOS now.

Create a polished, responsive, and fully functional `index.html` based on every requirement in this document.

Prioritize reliable functionality, consistent premium UI/UX, and maintainable Vanilla JavaScript.

Do not return explanations before the code.

Return the complete runnable `index.html` in one code block.
