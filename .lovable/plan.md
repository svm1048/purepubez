

# The Watchman — AI Network Defense Portal

## Visual Identity
- **Deep black background** (#0a0a0a) with a CRT scan-line overlay animation across the entire viewport
- **Color system**: Matrix Green (#00ff41) for normal, Alert Red (#ff0000) for breaches, Cyber Blue (#00f0ff) for AI analysis
- **Monospace typography** throughout for an authentic terminal feel
- **Glitch text effect** on the logo/title

## Header — Command Bar
- "THE WATCHMAN" logo with a CSS glitch animation
- Pulsing status indicator dot (green = SYSTEM ACTIVE, red = BREACH DETECTED) that reacts to simulated events
- Connection info display: "Interface: lo0 | Port: 1337"

## Top Stats Row — 4 Metric Cards
Four dark cards with glowing borders showing:
1. **Packets Sniffed** — running counter that increments in real-time
2. **Honey Port Status** — "Port 1337: LISTENING" with a green badge
3. **AI Model** — "TensorFlow Lite: ARMED" with a blue indicator
4. **Threats Blocked** — large red number that increments on breach events

## Main Content — Split Layout (60/40)

### Left Panel: Live Traffic Feed (60%)
- Terminal-style scrolling window with green-on-black text
- Auto-generates mock packet logs every 1-2 seconds (TCP connections, various IPs and ports)
- Normal logs in green, critical anomaly logs highlighted in red
- Auto-scrolls to the latest entry

### Right Panel: AI Analysis (40%)
- Animated radial gauge showing "Anomaly Confidence Score" (0-100%)
- Gauge color shifts from green → yellow → red as score increases past 80%
- Score fluctuates in real-time; spikes during breach events
- Below the gauge: a "Flagged IPs" list that grows when anomalies are detected

## Breach Event Simulation
- Every ~30-45 seconds, a breach event auto-triggers:
  - Dashboard border flashes red
  - Header status switches to "BREACH DETECTED" (red pulse)
  - A critical red log appears in the traffic feed
  - Anomaly gauge spikes above 80%
  - Threats Blocked counter increments
  - A new IP is added to the Flagged IPs list
- After ~5 seconds, the system "recovers" and returns to normal green status

## Footer — Kill Switch
- A large, prominent red button: "TERMINATE CONNECTION"
- Styled to look dangerous (red glow, hover effects)
- On click: triggers a visual "connection terminated" animation/overlay, then resets after a few seconds

## Ambient Effects
- Subtle CRT scan-line overlay across the entire screen
- Faint screen flicker animation for immersion
- Glowing border accents on cards and panels

