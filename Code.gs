    <!DOCTYPE html>
    <!-- HYPER-GLASS 2.0 ACTIVATED - PREMIUM UI ENABLED -->
    <html lang="en">

    <head>
        <base target="_top">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Redcliffe Labs X Medibuddy Drop-off</title>

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <!-- Premium Motion Design Engine -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- ⚡ ANTI-FOUC ENGINE — Runs synchronously before first paint -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <script>
            (function () {
                try {
                    // 1. Dark Mode — apply class immediately
                    if (localStorage.getItem('hg_darkMode') === 'true') {
                        document.documentElement.classList.add('dark-mode');
                    }
                    // 2. Theme style preset
                    var savedStyle = localStorage.getItem('hyperGlassThemeStyle');
                    if (savedStyle) {
                        document.documentElement.classList.add('style-' + savedStyle);
                    } else {
                        document.documentElement.classList.add('style-glassmorphism');
                    }
                    // 3. Custom accent colors
                    var p = localStorage.getItem('hg_primary');
                    var d = localStorage.getItem('hg_danger');
                    if (p) document.documentElement.style.setProperty('--primary', p);
                    if (d) document.documentElement.style.setProperty('--danger', d);
                } catch (e) { /* localStorage may be blocked in some iframe contexts */ }
            })();
        </script>

        <style>
            /* ==========================================================================
        1. VARIABLES, RESET & THEMES
        ========================================================================== */
            :root {
                /* === ULTRA PREMIUM PALETTE === */
                --glass-bg: rgba(255, 255, 255, 0.35);
                --glass-border: rgba(255, 255, 255, 0.4);
                --card-bg: rgba(255, 255, 255, 0.45);
                --text-main: #1e293b;
                --text-sub: #475569;
                --primary: #4f46e5;
                --danger: #ef4444;
                --success: #10b981;
                --warning: #f59e0b;
                /* Deep Dimensional Shadows */
                --card-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2);
                --hover-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 1), inset 0 0 25px rgba(255, 255, 255, 0.4);
            }

            /* 🌌 Midnight Aurora (Dark) */
            body.theme-aurora {
                background-color: #0f172a;
                background-image: radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);
                color: #f8fafc;
                --glass-bg: rgba(15, 23, 42, 0.6);
                --card-bg: rgba(30, 41, 59, 0.6);
                --glass-border: rgba(255, 255, 255, 0.1);
                --text-main: #f8fafc;
                --text-sub: #cbd5e1;
                --card-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
            }

            /* 🌊 Ocean Glass — enforce dark text for WCAG AA on light bg */
            body.theme-ocean {
                background-color: #e0f2fe;
                background-image: radial-gradient(at 0% 0%, hsla(208, 98%, 83%, 1) 0, transparent 50%), radial-gradient(at 50% 100%, hsla(217, 91%, 60%, 0.3) 0, transparent 50%);
                --text-main: #0c2340;
                --text-sub: #1e4d70;
                color: #0c2340;
            }

            /* 🍃 Emerald Mist — enforce dark text for WCAG AA on light bg */
            body.theme-emerald {
                background-color: #d1fae5;
                background-image: radial-gradient(at 0% 0%, hsla(160, 84%, 87%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(140, 71%, 54%, 0.2) 0, transparent 50%);
                --text-main: #064e3b;
                --text-sub: #065f46;
                color: #064e3b;
            }

            /* 🌇 Sunset Liquid — enforce dark text for WCAG AA on warm bg */
            body.theme-sunset {
                background-color: #ffedd5;
                background-image: radial-gradient(at 100% 0%, hsla(11, 83%, 82%, 1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(38, 92%, 50%, 0.2) 0, transparent 50%);
                --text-main: #431407;
                --text-sub: #7c2d12;
                color: #431407;
            }

            :root {
                --glass-border-gradient: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(200, 210, 255, 0.4) 50%, rgba(255, 255, 255, 0.7) 100%);
                --primary-dark: #3b6fd4;
                --primary-glow: rgba(91, 141, 238, 0.35);
                --border-light: #e8eaf2;
                --ai-gradient: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
                /* Deep glass card with multilayer depth */
                --card-inset-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -1px 2px rgba(0, 0, 0, 0.05), inset 0 0 40px rgba(255, 255, 255, 0.3);
                --card-drop-shadow: 0 8px 32px rgba(91, 141, 238, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
                --modal-bg: rgba(252, 253, 255, 0.96);
                --input-bg: rgba(255, 255, 255, 0.92);
                --row-bg: rgba(255, 255, 255, 0.45);
                --row-hover: rgba(255, 255, 255, 0.88);
                --expanded-bg: rgba(255, 255, 255, 0.98);
                --details-bg: rgba(248, 250, 255, 0.95);
                --table-header-bg: rgba(255, 255, 255, 0.92);
                /* === VIBRANT JEWEL TONE BADGES === */
                --badge-pend-bg: rgba(220, 38, 38, 0.14);
                --badge-pend-border: rgba(220, 38, 38, 0.35);
                --badge-pend-text: #b91c1c;
                --badge-zero-bg: rgba(5, 150, 105, 0.14);
                --badge-zero-border: rgba(5, 150, 105, 0.35);
                --badge-zero-text: #065f46;
                /* Motion timing */
                --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                --ease-silk: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            /* === MIDNIGHT BLUE DARK MODE — Eliminates reddish cast === */
            body.dark-mode {
                background: #060a1f;
                /* Override the neutral light default */
                background-image:
                    radial-gradient(ellipse 70% 60% at 20% 30%, rgba(30, 60, 140, 0.5) 0%, transparent 60%),
                    radial-gradient(ellipse 60% 70% at 80% 70%, rgba(10, 30, 90, 0.4) 0%, transparent 60%),
                    linear-gradient(145deg, #060a1f 0%, #0c1340 40%, #091030 70%, #050818 100%);
                background-size: 300% 300%;
                --glass-bg: rgba(10, 14, 39, 0.75);
                --glass-border: rgba(99, 130, 255, 0.15);
                --text-main: #e8eefa;
                --text-sub: #7e8eb5;
                --border-light: rgba(99, 130, 255, 0.12);
                --card-bg: rgba(18, 24, 58, 0.88);
                --card-inset-shadow: inset 0 2px 4px rgba(99, 130, 255, 0.15), inset 0 0 60px rgba(30, 50, 120, 0.2);
                --modal-bg: rgba(14, 20, 50, 0.97);
                --input-bg: rgba(22, 30, 70, 0.95);
                --row-bg: rgba(18, 24, 58, 0.5);
                --row-hover: rgba(30, 40, 90, 0.7);
                --expanded-bg: rgba(14, 20, 50, 0.98);
                --details-bg: rgba(10, 14, 39, 0.98);
                --table-header-bg: rgba(12, 17, 44, 0.96);
                --badge-pend-bg: rgba(220, 38, 38, 0.18);
                --badge-pend-text: #f87171;
                --badge-zero-bg: rgba(5, 150, 105, 0.18);
                --badge-zero-text: #34d399;
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                user-select: text;
                font-family: "Inter", sans-serif;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                color: var(--text-main);
                display: flex;
                justify-content: center;
                align-items: center;
                background: #e2e8f0;
                /* Neutral premium default */
                background-size: 300% 300%;
                animation: liquidMeshFlow 18s ease-in-out infinite alternate;
                transition: background 1.2s ease, color 0.3s ease;
                cursor: default;
                /* System Cursor Restored */
            }

            /* Native pointers restored for interactive elements */
            a,
            button,
            input,
            select,
            textarea,
            .glass-card,
            .theme-preset-card,
            .file-drop-area,
            tr {
                cursor: pointer;
            }

            /* ================== GSAP CUSTOM CURSOR ================== */
            #custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: 18px;
                height: 18px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999999;
                mix-blend-mode: exclusion;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px var(--primary-glow);
                transition: width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    background 0.2s;
            }

            #custom-cursor.hovering {
                width: 45px;
                height: 45px;
                background: #ffffff;
                mix-blend-mode: difference;
            }

            #custom-cursor.hidden {
                opacity: 0;
            }

            /* — Cursor Presets — */
            /* Default (Liquid Drop) is the base #custom-cursor style */
            #custom-cursor.preset-minimal-ring {
                width: 22px;
                height: 22px;
                background: transparent;
                border: 2px solid var(--primary);
                mix-blend-mode: normal;
                box-shadow: none;
            }

            #custom-cursor.preset-minimal-ring.hovering {
                width: 38px;
                height: 38px;
                border-color: var(--text-main);
                background: transparent;
            }

            #custom-cursor.preset-neon-dot {
                width: 10px;
                height: 10px;
                background: #fff;
                mix-blend-mode: difference;
                box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.6), 0 0 20px 6px var(--primary-glow);
            }

            #custom-cursor.preset-neon-dot.hovering {
                width: 28px;
                height: 28px;
                box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.5), 0 0 40px 12px var(--primary-glow);
            }

            /* ======================================================== */

            .title-bar,
            .sidebar,
            .toolbar,
            .seg-btn,
            .btn-apple,
            th,
            .glass-card,
            .expand-icon,
            .hamburger {
                user-select: none;
            }

            input,
            textarea,
            select {
                user-select: auto;
            }

            input:disabled,
            select:disabled {
                background: rgba(128, 128, 128, 0.1) !important;
                color: var(--text-sub) !important;
                border-color: transparent !important;
                opacity: 0.8;
            }

            /* === LIQUID MESH BACKGROUND SYSTEM === */
            @keyframes liquidMeshFlow {
                0% {
                    background-position: 0% 20%;
                    filter: hue-rotate(0deg);
                }

                25% {
                    background-position: 60% 0%;
                }

                50% {
                    background-position: 100% 80%;
                    filter: hue-rotate(8deg);
                }

                75% {
                    background-position: 40% 100%;
                }

                100% {
                    background-position: 0% 20%;
                    filter: hue-rotate(0deg);
                }
            }

            /* Floating orb mesh particles */
            body::after {
                content: '';
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 0;
                background:
                    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(147, 197, 253, 0.22) 0%, transparent 70%),
                    radial-gradient(ellipse 50% 60% at 80% 70%, rgba(167, 243, 208, 0.2) 0%, transparent 70%),
                    radial-gradient(ellipse 40% 40% at 60% 10%, rgba(216, 180, 254, 0.18) 0%, transparent 70%);
                animation: orbDrift 20s ease-in-out infinite alternate;
            }

            @keyframes orbDrift {
                0% {
                    transform: translate(0, 0) scale(1);
                }

                33% {
                    transform: translate(3%, 2%) scale(1.03);
                }

                66% {
                    transform: translate(-2%, 4%) scale(0.97);
                }

                100% {
                    transform: translate(1%, -2%) scale(1.01);
                }
            }

            body.theme-green {
                background-image:
                    radial-gradient(ellipse 80% 60% at 15% 25%, rgba(110, 231, 183, 0.45) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 55% at 85% 75%, rgba(52, 211, 153, 0.38) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 80% at 50% 10%, rgba(167, 243, 208, 0.3) 0%, transparent 60%),
                    radial-gradient(ellipse 50% 50% at 70% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 60%),
                    linear-gradient(135deg, #d1fae5 0%, #a7f3d0 35%, #b3e8d0 65%, #ecfdf5 100%);
                background-size: 300% 300%;
            }

            body.theme-orange {
                background-image:
                    radial-gradient(ellipse 80% 60% at 15% 25%, rgba(253, 230, 138, 0.5) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 55% at 85% 75%, rgba(252, 211, 77, 0.4) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 80% at 50% 10%, rgba(251, 191, 36, 0.3) 0%, transparent 60%),
                    linear-gradient(135deg, #fef3c7 0%, #fde68a 40%, #fef9c3 70%, #fffbeb 100%);
                background-size: 300% 300%;
            }

            body.theme-red {
                background-image:
                    radial-gradient(ellipse 80% 60% at 15% 25%, rgba(254, 202, 202, 0.55) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 55% at 85% 75%, rgba(252, 165, 165, 0.45) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 80% at 50% 10%, rgba(248, 113, 113, 0.3) 0%, transparent 60%),
                    linear-gradient(135deg, #fee2e2 0%, #fecaca 40%, #fff1f1 70%, #fef2f2 100%);
                background-size: 300% 300%;
            }

            /* Ambient spinning mesh layer for liquid depth */
            body::before {
                content: '';
                position: absolute;
                inset: -50%;
                background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 60%);
                animation: spin 30s linear infinite;
                pointer-events: none;
                z-index: 0;
            }

            /* Dark mode themes — all use midnight blue deep backdrop */
            body.dark-mode.theme-green,
            body.dark-mode.theme-orange,
            body.dark-mode.theme-red {
                background-image:
                    radial-gradient(ellipse 70% 60% at 20% 30%, rgba(30, 60, 140, 0.6) 0%, transparent 60%),
                    radial-gradient(ellipse 60% 70% at 80% 70%, rgba(10, 30, 90, 0.5) 0%, transparent 60%),
                    linear-gradient(145deg, #060a1f 0%, #0c1340 40%, #091030 70%, #050818 100%);
                background-size: 300% 300%;
            }

            @keyframes gradientBG {
                0% {
                    background-position: 0% 50%;
                }

                50% {
                    background-position: 100% 50%;
                }

                100% {
                    background-position: 0% 50%;
                }
            }

            /* ==========================================================================
        2. UI LAYOUT & SIDEBAR
        ========================================================================== */
            .mac-window {
                width: 100%;
                height: 100%;
                background: var(--glass-bg);
                backdrop-filter: blur(25px);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                position: relative;
                z-index: 1;
                transition: transform 0.3s ease, background 0.3s ease;
            }

            /* 🚀 FLOATING PREMIUM HEADER */
            .title-bar {
                height: 60px;
                margin: 15px 20px;
                padding: 0 25px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid var(--glass-border);
                background: var(--glass-bg);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border-radius: 20px;
                box-shadow: var(--card-shadow);
                flex-shrink: 0;
                z-index: 100;
            }

            .app-title {
                font-weight: 700;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .hamburger {
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: 0.2s;
                display: inline-block;
            }

            .hamburger:hover {
                background: rgba(128, 128, 128, 0.2);
            }

            .live-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
                font-weight: 700;
                color: #059669;
                background: #d1fae5;
                padding: 4px 10px;
                border-radius: 12px;
                cursor: pointer;
                transition: 0.2s;
            }

            .live-indicator:hover {
                background: #a7f3d0;
            }

            .live-dot {
                width: 8px;
                height: 8px;
                background: #10b981;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
                }

                70% {
                    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
                }

                100% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
                }
            }

            .spin {
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            /* === GEAR / THEME CENTER TRIGGER === */
            .theme-toggle {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(200, 215, 255, 0.15) 100%);
                border: 1px solid rgba(200, 215, 255, 0.35);
                font-size: 18px;
                cursor: pointer;
                padding: 6px 10px;
                border-radius: 10px;
                transition: all 0.3s var(--ease-silk);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                color: var(--text-main);
                font-weight: 700;
                font-size: 12px;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 0, 0, 0.08);
            }

            .theme-toggle:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(200, 215, 255, 0.25) 100%);
                transform: scale(1.05);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 4px 14px rgba(91, 141, 238, 0.2);
            }

            /* =====================================================================
            THEME CENTER MODAL
            ===================================================================== */
            #themeCenterModal .modal-content {
                max-width: 780px;
                padding: 0;
                overflow: hidden;
                border-radius: 24px;
            }

            .tc-header {
                background: #0f172a;
                background-image: radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 90% 90%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
                padding: 32px 30px 24px;
                color: #f8fafc;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                position: relative;
                overflow: hidden;
            }

            .tc-header h2,
            .tc-header p {
                position: relative;
                z-index: 1;
            }

            .tc-header h2 {
                font-size: 22px;
                font-weight: 900;
                letter-spacing: -0.5px;
                margin-bottom: 6px;
            }

            .tc-header p {
                font-size: 13px;
                opacity: 0.75;
                font-weight: 500;
            }

            .tc-body {
                padding: 24px 30px;
                overflow-y: auto;
                max-height: 70vh;
            }

            .tc-section-label {
                font-size: 11px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--text-sub);
                margin-bottom: 14px;
                margin-top: 22px;
            }

            .tc-section-label:first-child {
                margin-top: 0;
            }

            /* Theme preset cards */
            .theme-presets-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 14px;
                margin-bottom: 8px;
            }

            .theme-preset-card {
                border-radius: 12px;
                padding: 16px 14px 14px;
                cursor: pointer;
                border: 1px solid var(--glass-border);
                background: var(--input-bg);
                transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
                text-align: center;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            }

            .theme-preset-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                border-color: var(--primary);
            }

            .theme-preset-card.active-theme {
                border-color: var(--primary);
                background: rgba(79, 70, 229, 0.04);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            .theme-preset-card.active-theme .tc-name {
                color: var(--primary);
                font-weight: 900;
            }

            .theme-preset-card .tc-preview {
                width: 100%;
                height: 52px;
                border-radius: 10px;
                margin-bottom: 8px;
            }

            .theme-preset-card .tc-name {
                font-size: 12px;
                font-weight: 800;
                color: var(--text-main);
                margin-bottom: 3px;
            }

            .theme-preset-card .tc-desc {
                font-size: 10px;
                color: var(--text-sub);
                line-height: 1.4;
            }

            /* Custom theme builder */
            .tc-builder {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 14px;
            }

            .tc-field {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .tc-field label {
                font-size: 11px;
                font-weight: 700;
                color: var(--text-sub);
            }

            .tc-field input[type="color"] {
                width: 100%;
                height: 42px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                padding: 3px;
                cursor: pointer;
                background: rgba(248, 250, 252, 0.9);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06) inset;
            }

            .tc-field input[type="file"],
            .tc-field input[type="text"] {
                width: 100%;
                padding: 10px 14px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                background: rgba(248, 250, 252, 0.9);
                color: var(--text-main);
                font-size: 12px;
                font-weight: 500;
                outline: none;
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) inset;
            }

            .tc-field input[type="text"]:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1), 0 1px 2px rgba(0, 0, 0, 0.04) inset;
            }

            .tc-apply-btn {
                width: 100%;
                padding: 12px;
                margin-top: 16px;
                border-radius: 12px;
                background: linear-gradient(135deg, #5b8dee, #a855f7);
                color: white;
                border: none;
                font-size: 14px;
                font-weight: 800;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(91, 141, 238, 0.4);
                transition: all 0.3s var(--ease-spring);
            }

            .tc-apply-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 28px rgba(91, 141, 238, 0.55);
            }

            /* =====================================================================
            6 THEME STYLE DEFINITIONS
            ===================================================================== */

            /* 1. GLASSMORPHISM (default — already applied) */
            body.style-glassmorphism .glass-card {
                backdrop-filter: blur(48px) saturate(200%) brightness(1.05);
                -webkit-backdrop-filter: blur(48px) saturate(200%) brightness(1.05);
                background: rgba(255, 255, 255, 0.72);
                border: 1.5px solid rgba(255, 255, 255, 0.7);
            }

            body.style-glassmorphism .btn-apple {
                backdrop-filter: blur(12px);
                background: rgba(255, 255, 255, 0.82);
            }

            /* 2. SKEUOMORPHISM — dimensional, beveled */
            body.style-skeuomorphism .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: linear-gradient(160deg, #f0f4f8 0%, #dde3ec 100%);
                border: 1px solid #a0aec0;
                border-radius: 14px;
                box-shadow:
                    inset 0 2px 4px rgba(255, 255, 255, 0.9),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.12),
                    4px 6px 12px rgba(0, 0, 0, 0.18),
                    -1px -1px 3px rgba(255, 255, 255, 0.8);
            }

            body.style-skeuomorphism .btn-apple {
                background: linear-gradient(180deg, #f8faff 0%, #d8e0ef 100%);
                border: 1px solid #9aaccc;
                box-shadow:
                    inset 0 1px 2px rgba(255, 255, 255, 0.9),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.1),
                    2px 4px 8px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
            }

            body.style-skeuomorphism .btn-apple:active {
                box-shadow:
                    inset 0 3px 6px rgba(0, 0, 0, 0.15),
                    inset 0 1px 2px rgba(0, 0, 0, 0.1) !important;
                transform: translateY(2px) scale(0.98) !important;
            }

            /* 3. NEO BRUTALISM — stark, raw */
            body.style-neo-brutalism .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: #fffef0;
                border: 2.5px solid #111 !important;
                outline: none !important;
                border-radius: 6px !important;
                box-shadow: 5px 5px 0px #111 !important;
                transition: transform 0.1s ease, box-shadow 0.1s ease;
            }

            body.style-neo-brutalism .glass-card:hover {
                transform: translate(-3px, -3px);
                box-shadow: 8px 8px 0px #111 !important;
            }

            body.style-neo-brutalism .btn-apple {
                background: #ffe135;
                border: 2px solid #111;
                border-radius: 4px !important;
                box-shadow: 3px 3px 0 #111;
                color: #111;
                font-weight: 900;
                transition: transform 0.1s, box-shadow 0.1s;
            }

            body.style-neo-brutalism .btn-apple:hover {
                transform: translate(-2px, -2px);
                box-shadow: 5px 5px 0 #111;
            }

            body.style-neo-brutalism .btn-apple:active {
                transform: translate(2px, 2px) !important;
                box-shadow: 1px 1px 0 #111 !important;
            }

            /* 4. CLAYMORPHISM — puffy, soft */
            body.style-claymorphism .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: linear-gradient(145deg, #ffffff 0%, #e8f0ff 100%);
                border: none !important;
                outline: none !important;
                border-radius: 28px !important;
                box-shadow:
                    8px 8px 24px rgba(160, 180, 240, 0.35),
                    -4px -4px 14px rgba(255, 255, 255, 0.9),
                    inset 0 2px 6px rgba(255, 255, 255, 0.95),
                    inset 0 -2px 6px rgba(140, 160, 220, 0.15) !important;
            }

            body.style-claymorphism .glass-card:hover {
                transform: scale(1.04);
                box-shadow:
                    12px 12px 32px rgba(160, 180, 240, 0.45),
                    -6px -6px 18px rgba(255, 255, 255, 0.95),
                    inset 0 2px 6px rgba(255, 255, 255, 1),
                    inset 0 -2px 6px rgba(140, 160, 220, 0.2) !important;
            }

            body.style-claymorphism .btn-apple {
                border-radius: 20px !important;
                background: linear-gradient(145deg, #ffffff 0%, #e4eaff 100%);
                border: none !important;
                box-shadow:
                    4px 4px 12px rgba(160, 180, 240, 0.3),
                    -2px -2px 8px rgba(255, 255, 255, 0.9),
                    inset 0 1px 3px rgba(255, 255, 255, 0.9) !important;
            }

            body.style-claymorphism .btn-apple:active {
                transform: scale(0.92) !important;
                box-shadow:
                    2px 2px 6px rgba(160, 180, 240, 0.3),
                    inset 0 3px 8px rgba(140, 160, 220, 0.2) !important;
            }

            /* 5. MINIMALISM — clean & typography-focused */
            body.style-minimalism .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(255, 255, 255, 0.5) !important;
                border: 1px solid rgba(0, 0, 0, 0.07) !important;
                outline: none !important;
                box-shadow: none !important;
                border-radius: 8px !important;
                transition: background 0.3s ease;
            }

            body.style-minimalism .glass-card:hover {
                background: rgba(255, 255, 255, 0.85) !important;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06) !important;
            }

            body.style-minimalism .btn-apple {
                background: transparent;
                border: 1px solid rgba(0, 0, 0, 0.12);
                box-shadow: none !important;
                border-radius: 6px !important;
            }

            body.style-minimalism .btn-apple:hover {
                background: rgba(0, 0, 0, 0.04);
                border-color: rgba(0, 0, 0, 0.2);
                box-shadow: none !important;
            }

            /* 6. LIQUID GLASS — animated flowing sheen */
            body.style-liquid-glass .glass-card {
                backdrop-filter: blur(40px) saturate(220%);
                -webkit-backdrop-filter: blur(40px) saturate(220%);
                background: rgba(255, 255, 255, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.75);
                animation: liquidCardGlow 4s ease-in-out infinite alternate;
            }

            @keyframes liquidCardGlow {
                0% {
                    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.9), 0 8px 32px rgba(91, 141, 238, 0.1);
                }

                50% {
                    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.9), 0 8px 32px rgba(168, 85, 247, 0.15);
                }

                100% {
                    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.9), 0 8px 32px rgba(52, 211, 153, 0.12);
                }
            }

            body.style-liquid-glass .glass-card::before {
                background: linear-gradient(115deg,
                        transparent 10%,
                        rgba(147, 197, 253, 0.35) 35%,
                        rgba(216, 180, 254, 0.3) 55%,
                        rgba(167, 243, 208, 0.25) 75%,
                        transparent 90%) !important;
                animation: liquidSweep 3s ease-in-out infinite;
            }

            @keyframes liquidSweep {
                0% {
                    left: -120%;
                }

                100% {
                    left: 160%;
                }
            }

            /* 🚀 ADJUSTED FOR FLOATING HEADER */
            .app-content {
                display: flex;
                height: calc(100vh - 100px);
                width: 100%;
                position: relative;
                gap: 15px;
                padding: 0 20px 20px 20px;
            }

            .sidebar {
                width: 280px;
                flex-shrink: 0;
                background: var(--glass-bg);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid var(--glass-border);
                border-radius: 20px;
                box-shadow: var(--card-shadow);
                padding: 20px 14px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                overflow-y: auto;
                transition: transform 0.3s ease, margin-left 0.3s ease;
                z-index: 100;
            }

            .sidebar.hidden {
                margin-left: -320px;
            }

            /* ✅ FIX: Sidebar action buttons — larger, more prominent */
            .sidebar .btn-apple {
                padding: 11px 16px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                justify-content: center !important;
                border-radius: 12px !important;
                letter-spacing: 0.1px;
            }

            .sidebar .btn-apple.btn-primary {
                box-shadow: 0 4px 14px rgba(91, 141, 238, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
            }

            .sidebar .btn-apple.btn-danger {
                padding: 11px 16px !important;
                font-size: 13px !important;
            }

            .kpi-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            /* === ULTRA-PREMIUM CARD === */
            .glass-card {
                background: var(--card-bg);
                backdrop-filter: blur(40px) saturate(180%);
                -webkit-backdrop-filter: blur(40px) saturate(180%);
                border-radius: 20px;
                padding: 20px;
                border: 1px solid var(--glass-border);
                text-align: center;
                cursor: pointer;
                box-shadow: var(--card-shadow);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                z-index: 2;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .glass-card:hover {
                transform: translateY(-6px);
                box-shadow: var(--hover-shadow);
                border-color: rgba(255, 255, 255, 0.8);
            }

            /* Cursor-reactive specular sheen (GSAP updates --mouse-x/y) */
            .glass-card::after {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(255, 255, 255, 0.22),
                        rgba(200, 220, 255, 0.06) 40%,
                        transparent 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.4s ease;
                z-index: 10;
                border-radius: inherit;
            }

            .glass-card:hover::after {
                opacity: 1;
            }

            /* Liquid light sweep on hover */
            .glass-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -120%;
                width: 55%;
                height: 100%;
                background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.55) 50%, transparent 70%);
                transform: skewX(-18deg);
                transition: 0.65s cubic-bezier(0.25, 0.8, 0.25, 1);
                pointer-events: none;
                z-index: 9;
            }

            .glass-card:hover::before {
                left: 160%;
            }

            .glass-card:hover {
                box-shadow:
                    inset 0 2px 4px rgba(255, 255, 255, 0.95),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.04),
                    inset 0 0 80px rgba(255, 255, 255, 0.3),
                    0 8px 16px rgba(0, 0, 0, 0.06),
                    0 20px 60px rgba(91, 141, 238, 0.18),
                    0 2px 0 rgba(255, 255, 255, 0.9) inset;
                outline-color: rgba(147, 197, 253, 0.6);
            }

            .glass-card:active {
                transform: scale(0.97) translateY(0);
                transition: transform 0.1s ease;
            }

            .glass-card.full-width {
                grid-column: span 2;
            }

            .kpi-num {
                font-size: 26px;
                font-weight: 800;
                letter-spacing: -0.5px;
            }

            .kpi-lbl {
                font-size: 10px;
                font-weight: 700;
                color: var(--text-sub);
                text-transform: uppercase;
                margin-top: 4px;
            }

            .kpi-perc {
                font-size: 11px;
                font-weight: 700;
                margin-top: 4px;
                opacity: 0.8;
            }

            .summary-box {
                background: var(--card-bg);
                border-radius: 12px;
                border: 1px solid var(--glass-border);
                padding: 12px;
                flex: 1;
                display: flex;
                flex-direction: column;
                min-height: 120px;
            }

            .summary-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 11px;
                font-weight: 700;
                color: var(--text-sub);
            }

            .city-list-wrapper {
                flex: 1;
                overflow-y: auto;
            }

            .city-row {
                display: flex;
                justify-content: space-between;
                padding: 8px;
                border-bottom: 1px solid var(--border-light);
                font-size: 12px;
                transition: 0.2s;
            }

            .city-row:hover {
                background: var(--row-hover);
                transform: translateX(4px);
                border-radius: 6px;
            }

            .badge {
                padding: 2px 6px;
                border-radius: 6px;
                font-weight: 700;
                font-size: 10px;
            }

            /* === PASTEL FROSTED BADGES === */
            .badge-pend {
                background: var(--badge-pend-bg);
                color: var(--badge-pend-text);
                backdrop-filter: blur(8px) saturate(160%);
                -webkit-backdrop-filter: blur(8px) saturate(160%);
                border: 1px solid var(--badge-pend-border);
                box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(248, 113, 113, 0.1);
                font-weight: 800;
                letter-spacing: 0.2px;
            }

            .badge-zero {
                background: var(--badge-zero-bg);
                color: var(--badge-zero-text);
                backdrop-filter: blur(8px) saturate(160%);
                -webkit-backdrop-filter: blur(8px) saturate(160%);
                border: 1px solid var(--badge-zero-border);
                box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(52, 211, 153, 0.1);
                font-weight: 800;
                letter-spacing: 0.2px;
            }

            .badge-total {
                background: rgba(248, 250, 255, 0.55);
                color: var(--text-main);
                backdrop-filter: blur(8px) saturate(140%);
                -webkit-backdrop-filter: blur(8px) saturate(140%);
                border: 1px solid rgba(200, 210, 240, 0.45);
                box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6);
                font-weight: 700;
            }

            /* ==========================================================================
        3. MAIN VIEW & TOOLBAR
        ========================================================================== */
            .main-view {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                width: 100%;
            }

            .toolbar {
                padding: 14px 20px;
                background: rgba(128, 128, 128, 0.05);
                border-bottom: 1px solid var(--glass-border);
                display: flex;
                flex-direction: column;
                gap: 12px;
                flex-shrink: 0;
            }

            .toolbar-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }

            .segmented-control {
                background: rgba(128, 128, 128, 0.1);
                padding: 4px;
                border-radius: 10px;
                display: flex;
                gap: 2px;
                overflow-x: auto;
                white-space: nowrap;
                scrollbar-width: none;
            }

            .seg-btn {
                border: none;
                background: transparent;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                color: var(--text-sub);
                cursor: pointer;
                transition: 0.2s;
                white-space: nowrap;
            }

            .seg-btn:hover:not(.active) {
                background: rgba(128, 128, 128, 0.1);
                color: var(--text-main);
            }

            .seg-btn.active {
                background: var(--card-bg);
                color: var(--primary);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .search-wrapper {
                position: relative;
                flex: 1;
                min-width: 200px;
                max-width: 300px;
            }

            .search-input {
                width: 100%;
                padding: 8px 12px 8px 34px;
                border-radius: 18px;
                border: 1px solid var(--glass-border);
                background: var(--input-bg);
                color: var(--text-main);
                font-size: 13px;
                outline: none;
                transition: 0.2s;
            }

            .search-input:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
            }

            .search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
                color: var(--text-sub);
            }

            .filter-row {
                display: flex;
                gap: 8px;
                align-items: center;
                flex-wrap: wrap;
            }

            .filter-input {
                background: var(--input-bg);
                color: var(--text-main);
                border: 1px solid var(--glass-border);
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 12px;
                outline: none;
                transition: 0.2s;
                cursor: pointer;
            }

            /* === PREMIUM LIQUID BUTTONS === */
            .btn-apple {
                background: linear-gradient(160deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 245, 255, 0.85) 100%);
                color: var(--text-main);
                border: 1px solid rgba(200, 215, 255, 0.5);
                border-radius: 10px;
                padding: 7px 14px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-silk), border-color 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                justify-content: center;
                position: relative;
                overflow: hidden;
                z-index: 2;
                will-change: transform;
                /* Subtle inset highlight top edge */
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 3px rgba(0, 0, 0, 0.06);
                letter-spacing: 0.1px;
            }

            /* Iridescent pearlescent liquid wash */
            .btn-apple::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(115deg,
                        transparent 20%,
                        rgba(180, 210, 255, 0.3) 40%,
                        rgba(210, 180, 255, 0.25) 55%,
                        rgba(180, 255, 220, 0.2) 70%,
                        transparent 80%);
                background-size: 300% 100%;
                background-position: -100% 0;
                transition: background-position 0.55s var(--ease-silk);
                pointer-events: none;
                z-index: 1;
                mix-blend-mode: color-dodge;
                border-radius: inherit;
            }

            .btn-apple:hover::before {
                background-position: 100% 0;
            }

            /* Bottom shimmer line */
            .btn-apple::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 10%;
                right: 10%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.6), transparent);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 2;
            }

            .btn-apple:hover::after {
                opacity: 1;
            }

            .btn-apple:hover {
                box-shadow:
                    inset 0 1px 0 rgba(255, 255, 255, 0.95),
                    0 4px 16px rgba(91, 141, 238, 0.2),
                    0 1px 4px rgba(0, 0, 0, 0.06);
                border-color: rgba(147, 197, 253, 0.6);
            }

            .btn-apple:active {
                transform: scale(0.94) !important;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08) !important;
                transition: transform 0.1s ease, box-shadow 0.1s ease !important;
            }

            /* === WCAG AA: Keyboard focus ring for all interactive elements === */
            .btn-apple:focus-visible,
            .seg-btn:focus-visible,
            .tat-btn:focus-visible,
            .filter-input:focus-visible,
            .search-input:focus-visible,
            select:focus-visible,
            input:focus-visible,
            button:focus-visible {
                outline: 2.5px solid var(--primary);
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.18);
            }

            .btn-primary {
                background: linear-gradient(135deg, #5b8dee 0%, #3b6fd4 100%);
                color: white;
                border: none;
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 14px rgba(91, 141, 238, 0.35);
            }

            .btn-primary:hover {
                background: linear-gradient(135deg, #6d98f0 0%, #4d7fe6 100%);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(91, 141, 238, 0.45);
            }

            .btn-danger {
                background: rgba(254, 226, 226, 0.85);
                color: #b91c1c;
                border-color: rgba(248, 113, 113, 0.4);
                backdrop-filter: blur(6px);
                font-weight: 700;
            }

            .btn-danger:hover {
                background: rgba(254, 202, 202, 0.95);
                color: #991b1b;
            }

            .tat-container {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--card-bg);
                padding: 4px 6px 4px 14px;
                border-radius: 12px;
                border: 1px solid var(--glass-border);
            }

            .tat-label {
                font-size: 11px;
                font-weight: 700;
                color: var(--text-sub);
            }

            .tat-toggle {
                background: rgba(128, 128, 128, 0.1);
                padding: 3px;
                border-radius: 10px;
                display: flex;
            }

            .tat-btn {
                border: none;
                background: transparent;
                padding: 5px 12px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 600;
                color: var(--text-sub);
                cursor: pointer;
                transition: 0.2s;
            }

            .tat-btn.active {
                background: var(--input-bg);
                color: var(--primary);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            }

            /* ==========================================================================
        4. TABLE & ROWS ANIMATION
        ========================================================================== */
            .table-container {
                flex: 1;
                overflow-y: auto;
                overflow-x: auto;
                position: relative;
                -webkit-overflow-scrolling: touch;
                max-height: calc(100vh - 220px);
                padding-bottom: 30px;
            }

            .glass-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                font-size: 12px;
                min-width: 600px;
            }

            .glass-table th {
                text-align: left;
                padding: 12px 16px;
                background: var(--table-header-bg);
                position: sticky;
                top: 0;
                z-index: 10;
                border-bottom: 1px solid var(--border-light);
                font-weight: 700;
                color: var(--text-sub);
                backdrop-filter: blur(10px);
                text-transform: uppercase;
                font-size: 10px;
            }

            /* === WCAG AA dark mode: ensure table headers readable === */
            body.dark-mode .glass-table th {
                color: #94a3b8;
                background: var(--table-header-bg);
            }

            body.dark-mode .kpi-lbl,
            body.dark-mode .city-row,
            body.dark-mode .tc-section-label {
                color: #94a3b8;
            }

            body.dark-mode .badge-total {
                background: rgba(30, 40, 90, 0.7);
                color: #cbd5e1;
                border-color: rgba(99, 130, 255, 0.2);
            }

            .compact-row {
                cursor: pointer;
                animation: rowFadeIn 0.4s ease forwards;
                opacity: 0;
                transition: background 0.2s ease;
            }

            @keyframes rowFadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            /* 🔴 DATA PULSE (Phase 2) */
            .pulse-up {
                animation: dataGlow 0.8s ease-out;
            }

            @keyframes dataGlow {
                0%   { background-color: rgba(16, 185, 129, 0.25); }
                100% { background-color: var(--row-bg); }
            }

            .compact-row td {
                padding: 12px 16px;
                /* Thoda zyada padding for premium feel */
                border-bottom: 1px solid var(--border-light);
                border-top: 1px solid transparent;
                /* Added for smooth transition */
                background: var(--row-bg);
                vertical-align: middle;
                transition: all 0.3s ease;
            }

            .compact-row:hover td {
                background: var(--row-hover);
            }

            /* 🔥 CLEAN PREMIUM EXPANDED STATE (MAIN ROW) 🔥 */
            .compact-row.expanded td {
                background: var(--expanded-bg);
                border-bottom: none;
                border-top: 1px solid rgba(128, 128, 128, 0.1);
            }

            .expand-icon {
                display: inline-block;
                font-size: 12px;
                font-weight: 900;
                color: var(--text-sub);
                transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .expanded .expand-icon {
                transform: rotate(180deg) scale(1.3);
                color: var(--primary);
            }

            /* 🔥 CLEAN PREMIUM EXPANDED STATE (DETAILS BOX) 🔥 */
            .details-row td {
                padding: 0;
                border-bottom: none;
                background: transparent;
                cursor: default;
            }

            /* Utility to allow text copying inside cards */
            .allow-text-select {
                user-select: text !important;
                cursor: text !important;
            }

            /* 🔥 3D SEPARATED PREMIUM DETAILS GRID 🔥 */
            .details-content {
                display: grid;
                grid-template-columns: 1.2fr 1fr 0.8fr;
                gap: 20px;
                padding: 20px 24px 30px 24px;
                animation: dropDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform-origin: top;
                background: var(--expanded-bg);
                border-radius: 0 0 16px 16px;
                box-shadow: inset 0 -5px 20px rgba(0, 0, 0, 0.03);
            }

            @keyframes dropDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px) scaleY(0.95);
                }

                to {
                    opacity: 1;
                    transform: translateY(0) scaleY(1);
                }
            }

            /* 3D Floating Inner Cards */
            .details-col {
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: var(--modal-bg);
                /* High Contrast Background! */
                border: 1px solid var(--border-light);
                border-radius: 14px;
                padding: 18px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04);
                transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
            }

            .details-col:hover {
                transform: translateY(-4px);
                box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.05);
            }

            /* 🚀 Compact Premium 3D Buttons (Scaled down to 7px) */
            .premium-btn-wide {
                width: 100%;
                justify-content: center;
                padding: 7px 12px !important;
                /* Height reduced to 7px padding */
                font-size: 11px !important;
                /* Font adjusted for the smaller size */
                font-weight: 800 !important;
                border-radius: 8px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.4) !important;
                text-transform: uppercase;
                letter-spacing: 0.4px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .premium-btn-wide:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 2px 3px rgba(255, 255, 255, 0.6) !important;
            }

            .premium-btn-wide:active {
                transform: scale(0.96) !important;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
            }

            /* High-Density Info Boxes */
            .compact-info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }

            .compact-info-item {
                display: flex;
                flex-direction: column;
                background: var(--input-bg);
                padding: 6px 10px;
                border-radius: 8px;
                border: 1px solid var(--border-light);
            }

            .compact-info-label {
                font-size: 10px;
                color: var(--text-sub);
                text-transform: uppercase;
                font-weight: 800;
                margin-bottom: 2px;
            }

            .compact-info-val {
                font-size: 12px;
                font-weight: 600;
                color: var(--text-main);
            }

            .details-title {
                font-size: 10px;
                font-weight: 800;
                color: var(--text-sub);
                text-transform: uppercase;
            }

            .pill {
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 700;
                background: rgba(128, 128, 128, 0.1);
                color: var(--text-main);
                border: 1px solid var(--border-light);
                display: inline-block;
                margin-right: 4px;
                margin-bottom: 4px;
            }

            .pill-req {
                background: rgba(0, 122, 255, 0.1);
                color: var(--primary);
                border-color: rgba(0, 122, 255, 0.2);
                cursor: pointer;
                display: inline-block;
                width: fit-content;
                margin-top: 4px;
            }

            .pill-dup {
                background: rgba(239, 68, 68, 0.1);
                color: var(--danger);
                border-color: rgba(239, 68, 68, 0.2);
                animation: pulse-red-dup 1.5s infinite;
            }

            .copyable {
                cursor: pointer;
            }

            .copyable:hover {
                text-decoration: underline;
                opacity: 0.7;
            }

            .test-pill {
                display: inline-block;
                background: var(--input-bg);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 11.5px;
                font-weight: 600;
                color: var(--text-main);
                margin: 2px;
                line-height: 1.5;
                cursor: text;
                user-select: text;
            }

            .status-select {
                padding: 6px 24px 6px 8px;
                border-radius: 6px;
                border: 1px solid var(--border-light);
                font-size: 11px;
                font-weight: 700;
                background: var(--input-bg) url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 8px center;
                background-size: 8px;
                appearance: none;
                cursor: pointer;
                width: 100%;
                outline: none;
                transition: 0.2s;
            }

            .tat-timer {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                margin-top: 6px;
                background: rgba(128, 128, 128, 0.1);
                color: var(--text-sub);
            }

            .tat-timer.warn {
                background: rgba(245, 158, 11, 0.1);
                color: var(--warning);
            }

            .tat-timer.danger {
                background: rgba(239, 68, 68, 0.1);
                color: var(--danger);
            }

            .new-booking-input {
                border: 2px solid var(--primary);
                padding: 8px;
                border-radius: 6px;
                font-size: 12px;
                width: 100%;
                font-weight: 600;
                outline: none;
                background: var(--input-bg);
                color: var(--text-main);
                box-shadow: 0 2px 8px rgba(0, 122, 255, 0.1);
            }

            .missing-input,
            .missing-select {
                border: 1px dashed var(--warning);
                border-radius: 6px;
                padding: 6px;
                font-size: 11px;
                font-weight: 600;
                color: var(--warning);
                outline: none;
                background: var(--input-bg);
                cursor: pointer;
            }

            .missing-input:focus,
            .missing-select:focus {
                border-color: var(--primary);
            }

            .clean-input {
                background: var(--input-bg);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                padding: 10px 12px;
                font-size: 13px;
                outline: none;
                transition: 0.2s;
                width: 100%;
                color: var(--text-main);
                font-weight: 500;
            }

            .btn-ai-sparkle {
                background: var(--ai-gradient);
                color: white;
                border: none;
                font-weight: 700;
                box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
                transition: transform 0.2s;
            }

            .btn-ai-sparkle:hover {
                box-shadow: 0 4px 12px rgba(168, 85, 247, 0.5);
                transform: translateY(-1px);
                filter: brightness(1.1);
            }

            .ai-row-insight-box {
                display: none;
                margin-top: 10px;
                padding: 12px;
                border-radius: 8px;
                background: rgba(168, 85, 247, 0.05);
                border: 1px dashed #a855f7;
                font-size: 12px;
                color: var(--text-main);
                line-height: 1.5;
                position: relative;
            }

            .ai-row-insight-box.active {
                display: block;
                animation: fadeIn 0.3s ease-in-out;
            }

            /* ==========================================================================
        5. EDIT & UPLOAD CSV MODAL STYLES
        ========================================================================== */
            .edit-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                text-align: left;
                margin-bottom: 15px;
            }

            .edit-form-grid label {
                font-size: 11px;
                font-weight: 700;
                color: var(--text-sub);
                display: block;
                margin-bottom: 4px;
            }

            .test-edit-container {
                grid-column: span 2;
                background: rgba(128, 128, 128, 0.05);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                padding: 10px;
            }

            .test-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: var(--input-bg);
                border: 1px solid var(--primary);
                color: var(--primary-dark);
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                margin: 0 6px 6px 0;
            }

            .test-badge .remove-test {
                cursor: pointer;
                color: var(--danger);
                font-weight: bold;
                border-left: 1px solid var(--glass-border);
                padding-left: 6px;
            }

            .test-badge .remove-test:hover {
                color: #b91c1c;
            }

            .add-test-row {
                display: flex;
                gap: 8px;
                margin-top: 8px;
            }

            .file-drop-area {
                border: 2px dashed var(--primary);
                border-radius: 12px;
                padding: 40px;
                text-align: center;
                background: rgba(0, 122, 255, 0.05);
                cursor: pointer;
                transition: 0.2s;
            }

            .file-drop-area:hover {
                background: rgba(0, 122, 255, 0.1);
            }

            /* ==========================================================================
        6. MODALS & FULL PAGES
        ========================================================================== */
            .modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(10, 15, 40, 0.45);
                backdrop-filter: blur(18px) saturate(160%);
                -webkit-backdrop-filter: blur(18px) saturate(160%);
                z-index: 2000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }

            .modal-overlay.active {
                display: flex;
                animation: modalFadeIn 0.25s var(--ease-silk);
            }

            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }

                to {
                    opacity: 1;
                    backdrop-filter: blur(18px);
                }
            }

            .modal-content {
                background: rgba(252, 253, 255, 0.92);
                backdrop-filter: blur(40px) saturate(180%);
                -webkit-backdrop-filter: blur(40px) saturate(180%);
                padding: 24px;
                border-radius: 20px;
                width: 100%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow:
                    inset 0 2px 3px rgba(255, 255, 255, 0.8),
                    0 24px 64px rgba(0, 0, 0, 0.22),
                    0 4px 12px rgba(0, 0, 0, 0.1);
                border: 1.5px solid rgba(255, 255, 255, 0.7);
                display: flex;
                flex-direction: column;
                animation: modalPop 0.3s var(--ease-spring);
            }

            @keyframes modalPop {
                from {
                    opacity: 0;
                    transform: scale(0.93) translateY(12px);
                }

                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            .full-page-view {
                position: fixed;
                inset: 0;
                background: var(--glass-bg);
                backdrop-filter: blur(25px);
                z-index: 3000;
                display: none;
                flex-direction: column;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
            }

            .full-page-view.active {
                display: flex;
            }

            .full-page-header {
                height: 60px;
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--glass-border);
                background: rgba(128, 128, 128, 0.1);
                flex-shrink: 0;
            }

            .full-page-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
                background: var(--modal-bg);
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 10px;
            }

            .modal-title {
                font-size: 20px;
                font-weight: 800;
                color: var(--text-main);
            }

            .close-btn {
                background: rgba(128, 128, 128, 0.1);
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-sub);
                transition: 0.2s;
            }

            .audit-table th {
                position: sticky;
                top: 0;
                background: var(--table-header-bg);
                z-index: 5;
            }

            .wa-card {
                border: 1px solid var(--border-light);
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 16px;
                background: var(--card-bg);
                text-align: left;
            }

            .wa-city-header {
                background: rgba(0, 122, 255, 0.05);
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--border-light);
            }

            .wa-city-title {
                font-weight: 800;
                font-size: 14px;
                color: var(--primary-dark);
            }

            .wa-city-body {
                padding: 16px;
                font-family: 'SFMono-Regular', Consolas, monospace;
                font-size: 13px;
                line-height: 1.6;
                color: var(--text-main);
                max-height: 200px;
                overflow-y: auto;
                white-space: pre-wrap;
            }

            .btn-copy-sm {
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 6px;
                padding: 6px 12px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            #comment-history-box {
                background: #ffffff;
                border: 1px solid #d1d5db;
                height: 300px;
                overflow-y: auto;
                padding: 15px;
                font-family: 'SFMono-Regular', Consolas, monospace;
                font-size: 12px;
                line-height: 1.8;
                margin-bottom: 15px;
                white-space: pre-wrap;
                border-radius: 4px;
                color: #1f2937;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
                text-align: left;
            }

            .new-comment-area {
                width: 100%;
                height: 80px;
                padding: 10px;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-family: inherit;
                font-size: 13px;
                resize: none;
                outline: none;
                background: #fff;
                color: #1f2937;
            }

            .new-comment-area:focus {
                border-color: var(--primary);
            }

            /* ==========================================================================
        7. LOADERS, TOAST, POPUPS
        ========================================================================== */
            #loader {
                position: fixed;
                inset: 0;
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .scene-container {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                font-size: 50px;
                width: 150px;
                position: relative;
                height: 60px;
                margin-bottom: 20px;
            }

            #loader-text {
                font-size: 15px;
                font-weight: 700;
                text-align: center;
                max-width: 80%;
                background: var(--card-bg);
                color: var(--primary-dark);
                padding: 12px 24px;
                border-radius: 20px;
                line-height: 1.5;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                border: 1px solid var(--glass-border);
            }

            #toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: #1e293b;
                color: #fff;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                opacity: 0;
                transition: 0.3s;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }

            #toast.show {
                opacity: 1;
                bottom: 50px;
            }

            .mobile-overlay {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                z-index: 90;
                backdrop-filter: blur(3px);
            }

            .mobile-overlay.active {
                display: block;
            }

            .success-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                z-index: 5000;
                text-align: center;
                opacity: 0;
                pointer-events: none;
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .success-popup.show {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
                pointer-events: auto;
            }

            /* ==========================================================================
        /* ==========================================================================
        8. LOGIN & AI CHAT (PREMIUM UI UPDATE)
        ========================================================================== */
            .login-overlay {
                position: fixed;
                inset: 0;
                background: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.3s;
            }

            body.dark-mode .login-overlay {
                background: rgba(15, 23, 42, 0.5);
            }

            .login-overlay.hidden {
                display: none;
                opacity: 0;
                pointer-events: none;
            }

            .login-card {
                background: var(--card-bg);
                padding: 40px 30px;
                border-radius: 24px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
                text-align: center;
                max-width: 400px;
                width: 90%;
                border: 1px solid var(--glass-border);
                position: relative;
                overflow: hidden;
            }

            .brand-animation {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-bottom: 20px;
            }

            .logo-redcliffe {
                height: 35px;
                animation: slideRight 1s ease-out;
                object-fit: contain;
            }

            .logo-medibuddy {
                height: 30px;
                animation: slideLeft 1s ease-out;
                object-fit: contain;
            }

            /* Modern sleek cross icon */
            .modern-x {
                color: var(--text-sub);
                opacity: 0.4;
                width: 16px;
                height: 16px;
                animation: pulseX 2.5s infinite;
            }

            @keyframes slideRight {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }

                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideLeft {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }

                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes pulseX {

                0%,
                100% {
                    transform: scale(1);
                    opacity: 0.3;
                }

                50% {
                    transform: scale(1.2);
                    opacity: 0.7;
                }
            }

            /* Input Fields styling */
            .input-group {
                position: relative;
                margin-bottom: 12px;
                text-align: left;
            }

            .input-icon {
                position: absolute;
                left: 14px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
                opacity: 0.6;
                filter: grayscale(100%);
                pointer-events: none;
            }

            .login-input-modern {
                width: 100%;
                padding: 14px 15px 14px 40px;
                border-radius: 12px;
                border: 1px solid var(--border-light);
                background: var(--input-bg);
                color: var(--text-main);
                font-size: 13px;
                outline: none;
                box-sizing: border-box;
                font-weight: 500;
                transition: 0.2s;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .login-input-modern:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
            }

            /* Primary Modern Button */
            .btn-modern-primary {
                background: linear-gradient(135deg, #007AFF, #005ecb);
                color: white;
                border: none;
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.3s;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(0, 122, 255, 0.3);
            }

            .btn-modern-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 122, 255, 0.4);
                filter: brightness(1.05);
            }

            .btn-modern-primary:active {
                transform: translateY(0);
            }

            .divider {
                display: flex;
                align-items: center;
                text-align: center;
                margin: 20px 0;
                color: var(--text-sub);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .divider::before,
            .divider::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid var(--glass-border);
            }

            .divider span {
                padding: 0 10px;
            }

            .login-btn-google {
                background: var(--input-bg);
                color: var(--text-main);
                border: 1px solid var(--border-light);
                width: 100%;
                padding: 12px;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
            }

            .login-btn-google:hover {
                background: var(--row-hover);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            /* Bottom Profile / AI styling stays same... */
            .user-profile {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                background: rgba(128, 128, 128, 0.1);
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
            }

            .user-profile img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }

            .ai-fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: var(--ai-gradient);
                color: white;
                border: none;
                border-radius: 30px;
                padding: 12px 24px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4);
                z-index: 4000;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: transform 0.2s;
            }

            .ai-fab:hover {
                transform: scale(1.05);
            }

            .ai-panel {
                position: fixed;
                bottom: 80px;
                right: 30px;
                width: 350px;
                height: 500px;
                background: var(--modal-bg);
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                border: 1px solid var(--border-light);
                display: flex;
                flex-direction: column;
                z-index: 4000;
                transform: translateY(20px);
                opacity: 0;
                pointer-events: none;
                transition: 0.3s ease;
                overflow: hidden;
            }

            .ai-panel.active {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
            }

            .ai-header {
                background: var(--ai-gradient);
                padding: 15px 20px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
            }

            .ai-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: var(--details-bg);
            }

            .chat-bubble {
                max-width: 85%;
                padding: 10px 14px;
                border-radius: 15px;
                font-size: 13px;
                line-height: 1.5;
            }

            .chat-ai {
                background: var(--card-bg);
                border: 1px solid var(--border-light);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                color: var(--text-main);
            }

            .chat-user {
                background: #007AFF;
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }

            .ai-footer {
                padding: 15px;
                background: var(--modal-bg);
                border-top: 1px solid var(--border-light);
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .ai-input {
                flex: 1;
                padding: 10px 15px;
                border-radius: 20px;
                border: 1px solid var(--border-light);
                background: var(--input-bg);
                color: var(--text-main);
                font-size: 13px;
                outline: none;
            }

            .ai-send {
                background: #007AFF;
                color: white;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 16px;
            }

            .ai-mic {
                background: transparent;
                border: none;
                font-size: 18px;
                cursor: pointer;
                transition: 0.2s;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .ai-mic:hover {
                background: rgba(128, 128, 128, 0.1);
            }

            .ai-mic.recording {
                background: rgba(239, 68, 68, 0.2);
                color: var(--danger);
                animation: pulse-red 1.5s infinite;
            }

            .speaker-toggle {
                background: transparent;
                border: none;
                font-size: 16px;
                cursor: pointer;
                color: white;
                opacity: 0.8;
                transition: 0.2s;
            }

            .speaker-toggle:hover {
                opacity: 1;
                transform: scale(1.1);
            }

            /* ==========================================================================
        9. GMAIL UI & RESPONSIVE
        ========================================================================== */
            .email-container {
                display: flex;
                height: calc(100vh - 60px);
                background: var(--details-bg);
            }

            .email-sidebar {
                width: 250px;
                background: var(--card-bg);
                border-right: 1px solid var(--border-light);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }

            .city-tab {
                padding: 15px;
                border-bottom: 1px solid var(--border-light);
                cursor: pointer;
                transition: 0.2s;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .city-tab:hover {
                background: rgba(0, 122, 255, 0.05);
            }

            .city-tab.active {
                background: rgba(0, 122, 255, 0.1);
                border-left: 4px solid var(--primary);
            }

            .city-tab-title {
                font-weight: 700;
                font-size: 13px;
                color: var(--text-main);
            }

            .email-compose-area {
                flex: 1;
                padding: 20px;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
                display: none;
            }

            .compose-box {
                background: var(--input-bg);
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid var(--border-light);
                max-width: 800px;
                margin: 0 auto;
                width: 100%;
            }

            .compose-header {
                background: #404040;
                color: white;
                padding: 12px 15px;
                font-size: 14px;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .compose-row {
                display: flex;
                padding: 10px 15px;
                border-bottom: 1px solid var(--border-light);
                align-items: center;
            }

            .compose-label {
                width: 60px;
                font-size: 13px;
                color: var(--text-sub);
            }

            .compose-input {
                flex: 1;
                border: none;
                font-size: 14px;
                outline: none;
                background: transparent;
                color: var(--text-main);
                font-family: inherit;
            }

            .compose-body {
                padding: 20px;
                min-height: 300px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: var(--text-main);
                outline: none;
                overflow-y: auto;
                line-height: 1.6;
            }

            .compose-footer {
                padding: 15px;
                background: rgba(128, 128, 128, 0.05);
                border-top: 1px solid var(--border-light);
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .empty-state {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-sub);
                font-size: 16px;
                font-weight: 600;
                flex-direction: column;
                gap: 10px;
            }


            /* 🟢 STYLE: UNIFIED VISUAL BRANDING (Header) 🟢 */

            /* Global alignment for branding elements */
            .branding-group {
                display: flex;
                align-items: center;
                gap: 12px;
                /* distance between logos and text */
                margin-left: -5px;
                /* fine-tune alignment with hamburger icon */
            }

            /* Container for the two logos and the X spacer */
            .logos-wrapper {
                display: flex;
                align-items: center;
                gap: 5px;
                /* compact distance between logos and X */
            }

            /* Sizing for brand logos (keeping them compact but legible) */
            .brand-logo-img {
                max-height: 25px;
                /* compact height for header, adjust if needed */
                width: auto;
                object-fit: contain;
            }

            /* Styling for the spacer 'X' multiplication symbol character */
            .spacer-x-char {
                font-size: 16px;
                font-weight: 500;
                color: var(--text-main, #333);
                opacity: 0.6;
                /* make it subtle multiply symbol character */
                line-height: 1;
                margin: 0 2px;
                /* slight extra padding around it */
            }

            /* Main branding title text */
            .brand-main-title {
                font-size: 18px;
                /* prominent descriptive name descriptive feature title */
                font-weight: 700;
                color: var(--text-main, #333);
                letter-spacing: -0.3px;
                line-height: 1.2;
            }

            /* Minimal branding id for sidebar (simplify 'LIMS') */
            .sidebar-minimal-logo {
                max-height: 18px;
                /* extra compact for sidebar next to emoji */
                width: auto;
                opacity: 0.8;
            }

            /* 📱 ULTRA COMPACT MOBILE CSS (100% FIXED HEIGHT & SPACE) */
            @media (max-width: 768px) {

                /* 1. Header Space Saving */
                .brand-logo-img {
                    max-height: 20px !important;
                    width: auto !important;
                }

                .brand-main-title {
                    font-size: 13px !important;
                }

                .logos-wrapper {
                    gap: 4px !important;
                }

                #sync-text,
                #user-display-name {
                    display: none !important;
                }

                .title-bar {
                    padding: 0 10px !important;
                    height: 40px !important;
                }

                /* 2. Sidebar Fix (No Black Background) */
                .sidebar {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    height: 100vh !important;
                    background: #ffffff !important;
                    transform: translateX(-100%) !important;
                    margin-left: 0 !important;
                    box-shadow: 5px 0 30px rgba(0, 0, 0, 0.5) !important;
                    z-index: 99999 !important;
                    width: 260px !important;
                    max-width: 80vw !important;
                    padding-bottom: 80px !important;
                    transition: transform 0.3s ease !important;
                }

                body.dark-mode .sidebar {
                    background: #1e293b !important;
                }

                .sidebar.active-mobile {
                    transform: translateX(0) !important;
                }

                /* 3. Compact Filters (2 in a Row) */
                .toolbar {
                    padding: 8px !important;
                    gap: 8px !important;
                }

                .toolbar-row {
                    flex-direction: column !important;
                    align-items: stretch !important;
                    gap: 8px !important;
                }

                .segmented-control {
                    width: 100% !important;
                    padding-bottom: 2px !important;
                }

                .seg-btn {
                    padding: 4px 8px !important;
                    font-size: 11px !important;
                }

                .search-input {
                    padding: 6px 10px 6px 28px !important;
                    font-size: 12px !important;
                    height: 32px !important;
                }

                /* Grid layout for filters */
                .toolbar-row>.filter-row {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 6px !important;
                    width: 100% !important;
                }

                .toolbar-row>.filter-row>span {
                    display: none !important;
                }

                /* Hide 'to' text */

                /* Make inputs/buttons strictly small */
                .filter-input,
                .btn-apple,
                .custom-multi-select .cms-header,
                .tat-container {
                    padding: 4px 8px !important;
                    font-size: 11px !important;
                    height: 32px !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    line-height: normal !important;
                }

                /* Date Fix so text doesn't hide */
                input[type="date"].filter-input {
                    appearance: none !important;
                    -webkit-appearance: none !important;
                    text-align: center !important;
                }

                /* 2 Items per row */
                .toolbar-row>.filter-row>input,
                .toolbar-row>.filter-row>button,
                .toolbar-row>.filter-row>select,
                .toolbar-row>.filter-row>.custom-multi-select {
                    grid-column: span 1 !important;
                }

                /* Long items take full row */
                #pending-time-filter,
                #user-select-container {
                    grid-column: span 2 !important;
                }

                /* TAT container */
                .tat-container {
                    grid-column: span 2 !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    display: flex !important;
                }

                .tat-btn {
                    padding: 2px 8px !important;
                    font-size: 10px !important;
                }

                /* Action Buttons Side-by-Side */
                .toolbar-row>.filter-row>div[style*="display: flex"] {
                    grid-column: span 2 !important;
                    flex-direction: row !important;
                    gap: 6px !important;
                    width: 100% !important;
                }

                .toolbar-row>.filter-row>div[style*="display: flex"]>button {
                    flex: 1 !important;
                    height: 32px !important;
                    font-size: 11px !important;
                    padding: 4px !important;
                }

                /* 4. Table Area (FULL HEIGHT FIX) */
                .main-view {
                    height: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                }

                .table-container {
                    max-height: none !important;
                    flex: 1 !important;
                    padding-bottom: 80px !important;
                }

                .glass-table th,
                .compact-row td {
                    padding: 8px 6px !important;
                    font-size: 10px !important;
                }

                .details-content {
                    flex-direction: column !important;
                    gap: 10px !important;
                    padding: 10px !important;
                }

                .details-col {
                    min-width: 100% !important;
                }

                /* 5. Modals */
                .modal-content,
                .login-card {
                    width: 95% !important;
                    padding: 15px !important;
                    margin: 10px !important;
                    max-height: 90vh !important;
                }

                div[style*="grid-template-columns: 1fr 1fr 1fr"] {
                    grid-template-columns: 1fr !important;
                }
            }

            /* 🔴 NAYA CUSTOM MULTI-SELECT CSS */
            .custom-multi-select {
                position: relative;
                background: var(--input-bg);
                border: 1px solid var(--glass-border);
                border-radius: 8px;
                padding: 0;
                font-size: 12px;
                cursor: pointer;
                min-width: 140px;
                color: var(--text-main);
            }

            .cms-header {
                padding: 6px 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .multi-drop-list {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--modal-bg);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                display: none;
                flex-direction: column;
                max-height: 250px;
                overflow-y: auto;
                z-index: 9999;
                margin-top: 5px;
            }

            .multi-drop-list.show {
                display: flex;
            }

            .multi-drop-list label {
                padding: 8px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: 0.2s;
                border-bottom: 1px solid rgba(128, 128, 128, 0.1);
                font-weight: 500;
            }

            .multi-drop-list label:hover {
                background: var(--row-hover);
            }

            /* 📱 100% FIXED ULTRA COMPACT MOBILE CSS (Desktop Safe) */
            @media (max-width: 768px) {

                /* 1. Header Space Saving */
                .brand-logo-img {
                    max-height: 20px !important;
                    width: auto !important;
                }

                .brand-main-title {
                    font-size: 13px !important;
                }

                .logos-wrapper {
                    gap: 4px !important;
                }

                #sync-text,
                #user-display-name {
                    display: none !important;
                }

                .title-bar {
                    padding: 0 10px !important;
                    height: 44px !important;
                    min-height: 44px !important;
                }

                /* 2. Sidebar Fix */
                .sidebar {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    height: 100vh !important;
                    background: #ffffff !important;
                    transform: translateX(-100%) !important;
                    margin-left: 0 !important;
                    box-shadow: 5px 0 30px rgba(0, 0, 0, 0.5) !important;
                    z-index: 99999 !important;
                    width: 260px !important;
                    max-width: 80vw !important;
                    padding-bottom: 80px !important;
                    transition: transform 0.3s ease !important;
                }

                body.dark-mode .sidebar {
                    background: #1e293b !important;
                }

                .sidebar.active-mobile {
                    transform: translateX(0) !important;
                }

                /* 3. 🛑 STRICT TOOLBAR FIX (No More Stretching) 🛑 */
                .toolbar {
                    padding: 6px !important;
                    display: block !important;
                    flex: none !important;
                    height: auto !important;
                }

                .toolbar-row {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 6px !important;
                    margin-bottom: 6px !important;
                }

                .filter-row {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 6px !important;
                    align-items: center !important;
                    flex: none !important;
                }

                .filter-row>span {
                    display: none !important;
                }

                /* Hide 'to' text to save space */

                /* Force strictly small inputs */
                .filter-input,
                .btn-apple,
                .custom-multi-select,
                .search-input {
                    height: 32px !important;
                    min-height: 32px !important;
                    max-height: 32px !important;
                    font-size: 11px !important;
                    padding: 0 8px !important;
                    margin: 0 !important;
                    box-sizing: border-box !important;
                }

                /* Flex distribute items (2 in a row) */
                .search-wrapper {
                    width: 100% !important;
                    max-width: 100% !important;
                }

                .filter-row>input[type="date"] {
                    flex: 1 1 45% !important;
                    width: 0 !important;
                }

                .filter-row>button.btn-apple {
                    flex: 1 1 45% !important;
                    width: 0 !important;
                    justify-content: center !important;
                }

                .filter-row>select,
                .filter-row>.custom-multi-select {
                    flex: 1 1 45% !important;
                    width: 0 !important;
                }

                /* Fix Multi-select text cutoff */
                .custom-multi-select {
                    padding: 0 !important;
                }

                .cms-header {
                    height: 100% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    padding: 0 8px !important;
                }

                /* TAT & Action Buttons */
                .tat-container {
                    flex: 1 1 100% !important;
                    height: 32px !important;
                    padding: 0 8px !important;
                    justify-content: space-between !important;
                    margin: 0 !important;
                }

                .tat-btn {
                    padding: 2px 8px !important;
                    font-size: 10px !important;
                    height: 24px !important;
                }

                .filter-row>div[style*="display: flex"] {
                    flex: 1 1 100% !important;
                    display: flex !important;
                    flex-direction: row !important;
                    gap: 6px !important;
                    margin: 0 !important;
                }

                .filter-row>div[style*="display: flex"]>button {
                    flex: 1 !important;
                    height: 32px !important;
                }

                /* Segmented control for tabs */
                .segmented-control {
                    width: 100% !important;
                    overflow-x: auto !important;
                    padding: 2px !important;
                }

                .seg-btn {
                    padding: 4px 8px !important;
                    font-size: 11px !important;
                }

                /* 4. Table Area (Perfect Scrolling) */
                .main-view {
                    height: calc(100vh - 44px) !important;
                    display: flex !important;
                    flex-direction: column !important;
                    overflow: hidden !important;
                }

                .table-container {
                    flex: 1 !important;
                    overflow-y: auto !important;
                    height: 100% !important;
                    padding-bottom: 50px !important;
                }

                .glass-table th,
                .compact-row td {
                    padding: 6px 4px !important;
                    font-size: 10px !important;
                }

                .details-content {
                    flex-direction: column !important;
                    gap: 8px !important;
                    padding: 8px !important;
                }
            }

            /* ===================================================================
            ANALYTICS FULL PAGE — PREMIUM REDESIGN v2
            =================================================================== */
            #analyticsFullPage .full-page-content {
                gap: 20px;
                display: flex;
                flex-direction: column;
            }

            /* ── Page background adapts to dark mode ── */
            #analyticsFullPage {
                background: #f1f5f9;
            }

            body.dark-mode #analyticsFullPage {
                background: var(--glass-bg) !important;
            }

            /* ── Filter/control bar ── */
            #analyticsFullPage [style*="display: flex; gap: 20px; margin-bottom: 24px"] {
                background: var(--card-bg) !important;
                backdrop-filter: blur(22px) saturate(160%) !important;
                -webkit-backdrop-filter: blur(22px) saturate(160%) !important;
                border: 1px solid var(--glass-border) !important;
                border-radius: 18px !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
            }

            /* ── KPI stat cards: glassmorphic in dark, clean white in light ── */
            #analyticsFullPage [style*="grid-template-columns: repeat(6, 1fr)"]>div {
                background: var(--card-bg) !important;
                color: var(--text-main) !important;
                border-radius: 16px !important;
                border: 1px solid var(--glass-border) !important;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
                transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease !important;
                overflow: hidden;
                position: relative;
            }

            #analyticsFullPage [style*="grid-template-columns: repeat(6, 1fr)"]>div:hover {
                transform: translateY(-4px) scale(1.01) !important;
                box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1) !important;
            }

            /* ── KPI colored bar: convert left-bar → full-width top bar ── */
            /* Using attribute-contains selector + !important which correctly overrides inline styles */
            #analyticsFullPage [style*="width: 4px; height: 100%"],
            #analyticsFullPage [style*="width: 4px; height: 100%; background"] {
                width: 100% !important;
                height: 3px !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: auto !important;
                border-radius: 16px 16px 0 0 !important;
            }

            /* ── KPI label text adapts to dark mode ── */
            #analyticsFullPage [style*="font-size: 11px; color: #64748b; font-weight: 700"] {
                color: var(--text-sub) !important;
            }

            /* ── KPI numbers: tighten letter-spacing ── */
            #analyticsFullPage [style*="font-size: 32px; font-weight: 900"] {
                font-size: 26px !important;
                letter-spacing: -1.5px !important;
            }

            /* ── Small icon boxes in KPI cards ── */
            #analyticsFullPage [style*="width: 24px; height: 24px; border-radius: 6px"] {
                width: 28px !important;
                height: 28px !important;
                border-radius: 8px !important;
            }

            /* ── Main chart container: dark-mode aware ── */
            #analyticsFullPage [style*="background: white; padding: 24px; border-radius: 16px"] {
                background: var(--card-bg) !important;
                border-radius: 20px !important;
                border: 1px solid var(--glass-border) !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
            }

            /* ── Chart title & label ── */
            #analyticsFullPage [style*="margin: 0 0 4px 0; color: #0f172a"] {
                color: var(--text-main) !important;
            }

            #analyticsFullPage [style*="font-size: 12px; color: #64748b; font-weight: 500"] {
                color: var(--text-sub) !important;
            }

            /* ── Full page header: dark-mode aware ── */
            body.dark-mode #analyticsFullPage .full-page-header {
                background: var(--card-bg) !important;
                border-bottom-color: var(--glass-border) !important;
            }

            body.dark-mode #analyticsFullPage .full-page-header h2,
            body.dark-mode #analyticsFullPage .full-page-header div {
                color: var(--text-main) !important;
            }

            /* ── Segmented control buttons in analytics ── */
            #analyticsFullPage .seg-btn {
                font-size: 11px !important;
                padding: 5px 10px !important;
            }

            /* ── Mini chart sidebar trend widget ── */
            #mini-chart-badge {
                font-variant-numeric: tabular-nums;
            }

            #mini-ppmc-badge,
            #mini-retail-badge {
                font-variant-numeric: tabular-nums;
                transition: color 0.3s ease;
            }

            /* 🟢 GLOBAL CURSOR SHEEN 🟢 */
            #global-sheen {
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 100;
                background: radial-gradient(800px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(168, 85, 247, 0.12), rgba(59, 130, 246, 0.05) 40%, transparent 80%);
                mix-blend-mode: soft-light;
            }
        </style>
    </head>

    <body>
        <script>(function () { try { var a = ['theme-ocean', 'theme-emerald', 'theme-sunset', 'theme-aurora', 'theme-green', 'theme-red', 'theme-orange'], s = localStorage.getItem('saved_premium_theme'), dm = localStorage.getItem('hg_darkMode') === 'true'; document.body.classList.add(a.indexOf(s) !== -1 ? s : 'theme-green'); if (dm) document.body.classList.add('dark-mode'); } catch (e) { document.body.classList.add('theme-green'); } })();</script>
        <!-- HYPER-GLASS 2.0 GLOBAL SHEEN -->
        <div id="global-sheen"></div>
        <div id="login-overlay" class="login-overlay">
            <div class="login-card">
                <div class="brand-animation">
                    <img src="https://lh3.googleusercontent.com/d/1rWGnTk485-dqc_ADtLn_RuSmDzgomV0U" alt="Redcliffe Labs"
                        class="logo-redcliffe" style="height: 35px; object-fit: contain;">

                    <svg class="modern-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>

                    <img src="https://www.medibuddy.in/assets/logos/medibuddyWithName.svg" alt="MediBuddy"
                        class="logo-medibuddy" style="height: 30px;">
                </div>

                <h2
                    style="color: var(--text-main); margin-bottom: 25px; font-size: 18px; font-weight: 800; line-height: 1.4;">
                    Redcliffe Labs × Medibuddy<br>
                    <span style="color: var(--primary); font-size: 15px;">Drop-off Portal Access</span>
                </h2>

                <div class="input-group">
                    <span class="input-icon">✉️</span>
                    <input type="email" id="login-email" class="login-input-modern" placeholder="Email Address">
                </div>

                <div class="input-group">
                    <span class="input-icon">🔒</span>
                    <input type="password" id="login-password" class="login-input-modern" placeholder="Password"
                        onkeypress="if(event.key === 'Enter') window.handleEmailLogin()">
                </div>

                <div style="text-align: right; margin-bottom: 15px;">
                    <span id="forgot-password-text"
                        style="font-size: 11px; color: var(--primary); text-decoration: none; font-weight: 700; cursor: pointer; transition: 0.2s;"
                        onclick="window.handleForgotPassword()" onmouseover="this.style.textDecoration='underline'"
                        onmouseout="this.style.textDecoration='none'">Forgot Password?</span>
                </div>

                <button class="btn-modern-primary" id="email-login-btn" onclick="window.handleEmailLogin()">
                    Login with Email <span style="margin-left:6px; font-size: 16px;">→</span>
                </button>

                <div class="divider"><span>OR</span></div>

                <button class="login-btn-google" id="google-login-btn" onclick="window.handleGoogleLogin()">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google"
                        style="width:18px;">
                    <span id="login-btn-text">Sign in with Google</span>
                </button>

                <div style="margin-top: 25px; font-size: 10px; color: var(--text-sub); font-weight: 600;">
                    Admin Access Required for New Users. Contact Support.
                </div>
            </div>
        </div>

        <div id="toast"></div>

        <div id="successPopup" class="success-popup"
            style="max-width: 480px; width: 90%; max-height: 85vh; display: flex; flex-direction: column; z-index: 99999; padding: 0; overflow: hidden; border: 1px solid var(--glass-border); border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); background: var(--modal-bg);">

            <div
                style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); padding: 35px 20px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; position: relative;">
                <div
                    style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #10b981, #3b82f6, #a855f7);">
                </div>
                <div
                    style="font-size: 55px; line-height: 1; margin-bottom: 15px; animation: popBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    🚀</div>
                <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Task
                    Completed!</h2>
                <p style="color: #64748b; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">Here is the final summary
                    of the process</p>
            </div>

            <div style="padding: 25px 25px 15px 25px;">
                <div id="successPopupText"
                    style="color: var(--text-main); font-size: 14px; font-weight: 600; white-space: pre-wrap; text-align: left; overflow-y: auto; background: var(--details-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--border-light); line-height: 2; max-height: 350px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);">
                    Logs will appear here...
                </div>
            </div>

            <div style="padding: 0 25px 25px 25px;">
                <button class="btn-apple"
                    style="padding: 16px 20px; width: 100%; font-size: 16px; font-weight: 700; justify-content: center; background: #0ea5e9; color: white; border: none; border-radius: 12px; box-shadow: 0 6px 15px rgba(14, 165, 233, 0.3); transition: all 0.2s ease;"
                    onclick="document.getElementById('successPopup').classList.remove('show')"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(14, 165, 233, 0.4)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 15px rgba(14, 165, 233, 0.3)';">
                    Got it, Close!
                </button>
            </div>

            <style>
                @keyframes popBounce {
                    0% {
                        transform: scale(0) translateY(20px);
                        opacity: 0;
                    }

                    50% {
                        transform: scale(1.2) translateY(-10px);
                        opacity: 1;
                    }

                    100% {
                        transform: scale(1) translateY(0);
                    }
                }
            </style>
        </div>

        <button class="ai-fab" onclick="toggleAiPanel()"
            style="position: fixed; bottom: 15px; right: 15px; padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; background: linear-gradient(135deg, #4f46e5, #9333ea); color: white; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 9999; display: flex; align-items: center; gap: 5px; transition: transform 0.2s;">
            ✨ Ask Bisht Ji
        </button>
        <div class="ai-panel" id="aiPanel">
            <div class="ai-header">
                <div>
                    <div style="font-size: 16px;">👨‍💼 Bisht Ji</div>
                    <div style="font-size: 10px; opacity: 0.8;">Redcliffe LIMS AI Expert</div>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;"><button class="speaker-toggle"
                        id="aiSpeakerToggle" onclick="toggleVoiceOutput()">🔊</button><button
                        style="background:none; border:none; color:white; font-size:20px; cursor:pointer;"
                        onclick="toggleAiPanel()">✕</button></div>
            </div>
            <div class="ai-body" id="aiBody">
                <div class="chat-bubble chat-ai">Namaskar bhaiya! Main Bisht Ji hoon. Aaj dashboard data mein kya check
                    karna hai?</div>
            </div>
            <div class="ai-footer">
                <button class="ai-mic" id="aiMicBtn" onclick="toggleDictation()">🎤</button>
                <input type="text" class="ai-input" id="aiInput" placeholder="Ask about today's reports..."
                    onkeypress="if(event.key === 'Enter') sendToBishtJi()">
                <button class="ai-send" onclick="sendToBishtJi()">➤</button>
            </div>
        </div>

        <div id="loader" style="display:none;">
            <div class="scene-container" id="loader-anim" style="font-size: 50px;">⏳</div>
            <div id="loader-text">Loading data...</div>
        </div>

        <div id="uploadCsvModal" class="modal-overlay">
            <div class="modal-content" style="max-width: 500px; text-align: center;">
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title">📥 Import Data</h2>
                    </div><button class="close-btn" onclick="closeModal('uploadCsvModal')">✕</button>
                </div>

                <div style="margin-bottom: 20px; text-align: left;">
                    <label
                        style="font-size: 12px; font-weight: 700; color: var(--text-sub); display: block; margin-bottom: 6px;">Select
                        City for Import:</label>
                    <select id="import-city-select" class="clean-input" onchange="toggleUploadArea()"
                        style="cursor: pointer;">
                        <option value="">-- Choose City --</option>
                    </select>
                </div>

                <div id="import-upload-area" style="display: none; transition: 0.3s;">
                    <div class="file-drop-area" onclick="document.getElementById('csv-file').click()">
                        <div style="font-size: 40px; margin-bottom: 10px;">📄</div>
                        <div style="font-size: 14px; font-weight: 600; color: var(--primary);">Click to select Excel (.xlsx)
                            or CSV file</div>
                        <div style="font-size: 11px; color: var(--text-sub); margin-top: 5px;">Data will be uploaded to the
                            selected city.</div>
                    </div>
                    <input type="file" id="csv-file" accept=".csv, .xlsx, .xls" style="display: none;"
                        onchange="document.getElementById('csv-file-name').innerText = this.files[0] ? this.files[0].name : ''">
                    <div id="csv-file-name"
                        style="margin: 15px 0; font-size: 12px; font-weight: 700; color: var(--success);"></div>
                    <button class="btn-apple btn-primary"
                        style="width: 100%; padding: 12px; justify-content: center; font-size: 14px;"
                        onclick="handleCsvUpload()">Upload & Process</button>
                </div>
            </div>
        </div>

        <div id="dropzoneModal" class="modal-overlay">
            <div class="modal-content" style="max-width: 650px; text-align: center; transition: all 0.3s ease;">
                <div class="modal-header"
                    style="border-bottom: 1px solid var(--border-light); padding-bottom: 15px; margin-bottom: 20px;">
                    <div style="text-align: left;">
                        <h2 class="modal-title" style="color: #a855f7; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 24px;">⚡</span> Smart PDF & ZIP Dropzone
                        </h2>
                        <div style="font-size: 12px; color: var(--text-sub); margin-top: 4px;">Drop multiple PDFs or a
                            single ZIP archive. We'll auto-extract names and mark them 'Shared'.</div>
                    </div>
                    <button class="close-btn" onclick="closeModal('dropzoneModal')">✕</button>
                </div>

                <div id="pdf-drop-area" class="file-drop-area"
                    style="border: 2px dashed #a855f7; background: rgba(168, 85, 247, 0.05); padding: 50px 20px; border-radius: 16px; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);"
                    onclick="document.getElementById('pdf-file-input').click()">
                    <div style="font-size: 50px; margin-bottom: 15px; text-shadow: 0 4px 10px rgba(168, 85, 247, 0.3);">🗂️
                    </div>
                    <div style="font-size: 16px; font-weight: 800; color: #9333ea; margin-bottom: 8px;">Drag & Drop PDFs or
                        a ZIP File Here</div>
                    <div
                        style="font-size: 12px; color: var(--text-sub); background: white; padding: 4px 12px; border-radius: 12px; display: inline-block; border: 1px solid var(--border-light); box-shadow: 0 2px 5px rgba(0,0,0,0.02); font-weight: 600;">
                        Supports .pdf and .zip formats</div>
                </div>

                <div id="pdf-processing-container"
                    style="display: none; margin-top: 20px; text-align: left; animation: dropDown 0.4s ease;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 13px; font-weight: 800; color: var(--text-main);"
                            id="pdf-status-title">Processing Files...</span>
                        <span
                            style="font-size: 11px; font-weight: bold; color: #a855f7; background: #f3e8ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #e9d5ff;"
                            id="pdf-count-badge">0 Files Found</span>
                    </div>
                    <div
                        style="width: 100%; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; margin-bottom: 12px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
                        <div id="pdf-progress-bar"
                            style="width: 0%; height: 100%; background: linear-gradient(90deg, #a855f7, #ec4899); transition: width 0.4s ease, background 0.4s ease;">
                        </div>
                    </div>
                    <div id="pdf-log-box"
                        style="height: 180px; overflow-y: auto; background: #0f172a; color: #f8fafc; padding: 15px; border-radius: 10px; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; line-height: 1.6; box-shadow: inset 0 4px 15px rgba(0,0,0,0.3); border: 1px solid #334155;">
                    </div>
                </div>

                <input type="file" id="pdf-file-input" accept=".pdf, .zip, application/zip" multiple style="display: none;"
                    onchange="handlePdfSelect(this.files)">
            </div>
        </div>
        <div class="mac-window" id="editModal"
            style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 10000; align-items: center; justify-content: center; flex-direction: column; backdrop-filter: blur(8px);">
            <div
                style="width: 90%; max-width: 800px; background: var(--card-bg); padding: 25px; border-radius: 12px; box-shadow: 0 15px 50px rgba(0,0,0,0.6); border: 1px solid var(--border-light); position: relative;">
                <h3
                    style="margin-top: 0; margin-bottom: 15px; color: var(--text-main); font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                    ✏️ Edit Full Record (All changes logged)</h3>

                <input type="hidden" id="edit-rid">
                <input type="hidden" id="edit-city">
                <input type="hidden" id="edit-searchid">
                <input type="hidden" id="edit-pname">

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Booking ID</label><input
                            type="text" id="edit-bid" class="clean-input" style="width:100%;"></div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Patient Name</label><input
                            type="text" id="edit-name" class="clean-input" style="width:100%;"></div>
                    <div style="display:flex; gap:10px;">
                        <div style="flex:1;"><label
                                style="font-size:11px; font-weight:bold; color:var(--text-sub);">Age</label><input
                                type="text" id="edit-age" class="clean-input" style="width:100%;"></div>
                        <div style="flex:1;"><label
                                style="font-size:11px; font-weight:bold; color:var(--text-sub);">Gender</label>
                            <select id="edit-gender" class="clean-input" style="width:100%;">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>

                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Tests /
                            Packages</label><input type="text" id="edit-tests" class="clean-input" style="width:100%;">
                    </div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">FBS/RBS</label>
                        <select id="edit-fbs" class="clean-input" style="width:100%;">
                            <option value="">N/A</option>
                            <option>FBS</option>
                            <option>RBS</option>
                            <option>Only Urine</option>
                        </select>
                    </div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Partner Type</label>
                        <select id="edit-type" class="clean-input" style="width:100%;">
                            <option>Retail</option>
                            <option>PPMC</option>
                            <option>-</option>
                        </select>
                    </div>

                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Barcode No.</label><input
                            type="text" id="edit-barcode" class="clean-input" style="width:100%;"></div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Collection
                            Time</label><input type="text" id="edit-col" class="clean-input" style="width:100%;"
                            placeholder="10:00 AM"></div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Report Status</label>
                        <select id="edit-status" class="clean-input" style="width:100%;">
                            <option>Pending</option>
                            <option>Under processing</option>
                            <option>High TAT</option>
                            <option>Shared</option>
                            <option>N/A</option>
                        </select>
                    </div>

                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Phlebo Name</label><input
                            type="text" id="edit-phlebo" class="clean-input" style="width:100%;"></div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Phlebo Mobile</label><input
                            type="text" id="edit-phone" class="clean-input" style="width:100%;"></div>
                    <div><label style="font-size:11px; font-weight:bold; color:var(--text-sub);">Remarks</label><input
                            type="text" id="edit-rem" class="clean-input" style="width:100%;"></div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button class="btn-apple" style="flex: 1; justify-content: center; background: #e2e8f0; color: #475569;"
                        onclick="document.getElementById('editModal').style.display='none'; resumeSync();">Cancel</button>
                    <button class="btn-apple btn-primary" style="flex: 1; justify-content: center;"
                        onclick="saveFullEdit()">💾 Save & Log Changes</button>
                </div>
            </div>
        </div>

        <div id="commentModal" class="modal-overlay">
            <div class="modal-content" style="max-width: 750px;">
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title" style="font-size: 18px;">Comment History</h2>
                        <div id="comment-subtitle" style="font-size: 12px; color: var(--text-sub); margin-top: 4px;"></div>
                    </div>
                    <button class="close-btn" onclick="closeModal('commentModal')">✕</button>
                </div>
                <div id="comment-history-box">No comments found for this record.</div>
                <textarea id="new-comment-text" class="new-comment-area" placeholder="Add Comment.." onfocus="pauseSync()"
                    onblur="resumeSync()"></textarea>
                <div style="text-align: center;">
                    <button class="btn-apple"
                        style="margin-top: 10px; padding: 8px 30px; border: 1px solid #ccc; font-weight: bold; background: #f8f9fa; color: #333;"
                        onclick="submitNewComment()">Add Comment</button>
                </div>
            </div>
        </div>

        <div id="waModal" class="modal-overlay">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title">📱 Pending Reports List</h2>
                        <div style="font-size: 12px; color: var(--text-sub); margin-top: 4px;">Copy pending Booking IDs to
                            share with local teams.</div>
                    </div>

                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button class="btn-apple btn-primary" style="padding: 6px 14px; font-size: 12px;"
                            onclick="exportPendingBookingCSV()">⬇ Export Booking CSV</button>
                        <button class="close-btn" onclick="closeModal('waModal')">✕</button>
                    </div>
                </div>
                <div id="wa-export-container"></div>
            </div>
        </div>

        <div id="cityModal" class="modal-overlay">
            <div class="modal-content" id="cityReportCard" style="max-width: 900px;">
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title">City Overview</h2>
                        <div style="font-size: 12px; color: var(--text-sub);">Live Sync: <span id="modal-time"></span></div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-apple" onclick="downloadCityCSV()">⬇ CSV</button>
                        <button class="close-btn" onclick="closeModal('cityModal')">✕</button>
                    </div>
                </div>
                <div style="overflow-x: auto;">
                    <table class="glass-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th style="text-align:center;">Total</th>
                                <th style="text-align:right;">Pending</th>
                            </tr>
                        </thead>
                        <tbody id="city-modal-body"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="analyticsFullPage" class="full-page-view" style="background: #f1f5f9;">
            <div class="full-page-header"
                style="background: white; border-bottom: 1px solid #e2e8f0; height: 70px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div
                        style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #3b82f6, #2563eb); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; box-shadow: 0 4px 10px rgba(59,130,246,0.3);">
                        📊</div>
                    <div>
                        <h2 class="modal-title" style="color: #0f172a; font-size: 18px; line-height: 1.2;">Advanced
                            Analytics</h2>
                        <div style="font-size: 11px; color: #64748b; font-weight: 500;">Real-time collection trends &
                            insights</div>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-apple" onclick="fetchTrendStats(true)"
                        style="background: white; border: 1px solid #e2e8f0; color: #334155; box-shadow: 0 2px 4px rgba(0,0,0,0.02);"><span
                            id="sync-trend-icon">🔄</span> Sync Data</button>
                    <button class="btn-apple btn-danger" onclick="closeFullPage('analyticsFullPage')"
                        style="background: #fef2f2; color: #ef4444; border: 1px solid #fecaca;">Close ✕</button>
                </div>
            </div>

            <div class="full-page-content" style="padding: 24px; background: transparent;">

                <div
                    style="display: flex; gap: 20px; margin-bottom: 24px; flex-wrap: wrap; background: white; padding: 16px 24px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.02); justify-content: space-between; align-items: center;">

                    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                        <div>
                            <div
                                style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
                                Custom Date Range</div>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <input type="date" id="trend-date-start" class="filter-input"
                                    style="padding: 8px 12px; background: #f8fafc; border-color: #cbd5e1; font-weight: 600; color: #334155;">
                                <span style="color: #cbd5e1;">→</span>
                                <input type="date" id="trend-date-end" class="filter-input"
                                    style="padding: 8px 12px; background: #f8fafc; border-color: #cbd5e1; font-weight: 600; color: #334155;">
                                <button class="btn-apple btn-primary" onclick="fetchTrendStats(true)"
                                    style="padding: 8px 16px;">Apply</button>
                            </div>
                        </div>

                        <div style="width: 1px; height: 40px; background: #e2e8f0; margin: 0 10px;"></div>

                        <div>
                            <div
                                style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
                                Quick Select</div>
                            <div class="segmented-control"
                                style="background: #f8fafc; padding: 4px; border: 1px solid #e2e8f0; border-radius: 10px;">
                                <button class="seg-btn active" id="btn-trend-7" onclick="setTrendDates(7)">7 Days</button>
                                <button class="seg-btn" id="btn-trend-15" onclick="setTrendDates(15)">15 Days</button>
                                <button class="seg-btn" id="btn-trend-30" onclick="setTrendDates(30)">1 Month</button>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div>
                            <div
                                style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
                                City Filter</div>
                            <select id="full-chart-city" onchange="renderFullChart()" class="clean-input"
                                style="padding: 8px 16px; font-weight: 600; background: #f8fafc; border-color: #cbd5e1; width: 160px;">
                                <option value="ALL">🏢 All Cities</option>
                            </select>
                        </div>
                        <div>
                            <div
                                style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
                                Compare By</div>
                            <div class="segmented-control"
                                style="background: #f8fafc; padding: 4px; border: 1px solid #e2e8f0; border-radius: 10px;">
                                <button class="seg-btn active" id="mode-partner" onclick="toggleChartMode('partner')">🏢
                                    PPMC / Retail</button>
                                <button class="seg-btn" id="mode-source" onclick="toggleChartMode('source')">⚡ API /
                                    Manual</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 24px;">

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #10b981;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Total Collections</div>
                            <div
                                style="background: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                📦</div>
                        </div>
                        <div id="stat-total"
                            style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #f59e0b;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Daily Avg</div>
                            <div
                                style="background: #fef3c7; color: #d97706; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                ⚖️</div>
                        </div>
                        <div id="stat-avg"
                            style="font-size: 32px; font-weight: 900; color: #d97706; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #ef4444;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Total PPMC</div>
                            <div
                                style="background: #fee2e2; color: #dc2626; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                🏥</div>
                        </div>
                        <div id="stat-ppmc"
                            style="font-size: 32px; font-weight: 900; color: #ef4444; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #3b82f6;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Total Retail</div>
                            <div
                                style="background: #dbeafe; color: #2563eb; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                🏪</div>
                        </div>
                        <div id="stat-retail"
                            style="font-size: 32px; font-weight: 900; color: #3b82f6; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #8b5cf6;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                API Sync</div>
                            <div
                                style="background: #ede9fe; color: #7e22ce; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                🤖</div>
                        </div>
                        <div id="stat-api"
                            style="font-size: 32px; font-weight: 900; color: #8b5cf6; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>

                    <div
                        style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #64748b;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div
                                style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Manual Entry</div>
                            <div
                                style="background: #f1f5f9; color: #475569; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                                ✍️</div>
                        </div>
                        <div id="stat-manual"
                            style="font-size: 32px; font-weight: 900; color: #475569; margin-top: 10px; letter-spacing: -1px;">
                            0</div>
                    </div>
                </div>

                <div
                    style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.04); flex: 1; min-height: 450px; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div>
                            <h3 id="full-chart-title"
                                style="margin: 0 0 4px 0; color: #0f172a; font-size: 18px; font-weight: 800;">Collection
                                Trend Overview</h3>
                            <div id="chart-date-label" style="font-size: 12px; color: #64748b; font-weight: 500;">Loading...
                            </div>
                        </div>
                        <div
                            style="font-size: 11px; color: #94a3b8; background: #f8fafc; padding: 6px 12px; border-radius: 20px; border: 1px solid #e2e8f0;">
                            Powered by Redcliffe AI</div>
                    </div>
                    <div style="flex: 1; position: relative; width: 100%;">
                        <canvas id="fullTrendChart"></canvas>
                    </div>
                </div>

            </div>
        </div>

        <div id="auditFullPage" class="full-page-view">
            <div class="full-page-header">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <h2 class="modal-title">🚨 Daily Audit</h2>
                </div>
                <div style="display: flex; gap: 10px;"><button class="btn-apple" onclick="downloadAuditCSV()">⬇ Export
                        CSV</button><button class="btn-apple btn-danger" onclick="closeFullPage('auditFullPage')">Close
                        ✕</button></div>
            </div>
            <div class="full-page-content" style="padding: 20px;">
                <div class="toolbar-row"
                    style="margin-bottom: 20px; background: rgba(128,128,128,0.05); padding: 15px; border-radius: 12px; border: 1px solid var(--glass-border);">
                    <div class="filter-row" style="width: 100%; gap: 15px;">
                        <input type="date" id="audit-date-start" class="filter-input" style="flex:1;"><span>to</span><input
                            type="date" id="audit-date-end" class="filter-input" style="flex:1;">
                        <button class="btn-apple btn-primary" onclick="fetchAuditData()">Fetch Data</button>
                        <button class="btn-apple btn-ai-sparkle" onclick="getAiAuditInsights()">✨ Ask Bisht Ji</button>
                        <select id="audit-filter-city" class="filter-input" onchange="filterAndRenderAudit()">
                            <option value="ALL">All Cities</option>
                        </select>
                        <select id="audit-filter-reason" class="filter-input" onchange="filterAndRenderAudit()">
                            <option value="ALL">All Statuses</option>
                            <option value="On Time">On Time</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>
                </div>
                <div id="audit-ai-box"
                    style="display:none; margin-bottom: 20px; background: var(--details-bg); padding: 15px; border-radius: 12px; border: 1px dashed #a855f7; font-size: 13px;">
                    <strong style="color: #a855f7;">👨‍💼 Bisht Ji's Insight:</strong> <span
                        id="audit-ai-text">Analyzing...</span>
                </div>
                <div class="kpi-grid audit-kpis" style="margin-bottom: 20px; grid-template-columns: repeat(4, 1fr);">
                    <div class="glass-card" style="border-bottom: 4px solid var(--primary);">
                        <div class="kpi-num" id="aud-total">0</div>
                        <div class="kpi-lbl">Total Filtered</div>
                    </div>
                    <div class="glass-card" style="border-bottom: 4px solid var(--success);">
                        <div class="kpi-num" id="aud-ontime">0</div>
                        <div class="kpi-lbl">On Time</div>
                    </div>
                    <div class="glass-card" style="border-bottom: 4px solid var(--danger);">
                        <div class="kpi-num" id="aud-late">0</div>
                        <div class="kpi-lbl">Late (>6h)</div>
                    </div>
                    <div class="glass-card" style="border-bottom: 4px solid var(--warning);">
                        <div class="kpi-num" id="aud-pending">0</div>
                        <div class="kpi-lbl">Pending</div>
                    </div>
                </div>
                <div style="flex: 1; overflow-y: auto; border: 1px solid var(--border-light); border-radius: 12px;">
                    <table class="glass-table audit-table">
                        <thead>
                            <tr>
                                <th>City & ID</th>
                                <th>Timestamps</th>
                                <th>Status & TAT</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody id="audit-body"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="emailGenPage" class="full-page-view">
            <div class="full-page-header">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <h2 class="modal-title">📧 E-mail Generator (Editable Drafts)</h2>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;"><span
                        style="font-size: 12px; font-weight: 600;">Sender Name:</span><input type="text" id="sender-name"
                        class="filter-input" style="width: 180px;" disabled><button class="btn-apple btn-danger"
                        onclick="closeFullPage('emailGenPage')">Close ✕</button></div>
            </div>
            <div class="email-container">
                <div class="email-sidebar" id="email-tabs-container"></div>
                <div class="email-compose-area" id="email-compose-area">
                    <div class="compose-box">
                        <div class="compose-header"><span>New Message / Reply All Draft</span></div>
                        <div class="compose-row"><span class="compose-label">To</span><input type="text" id="em-to"
                                class="compose-input"></div>
                        <div class="compose-row"><span class="compose-label">Cc</span><input type="text" id="em-cc"
                                class="compose-input"></div>
                        <div class="compose-row"><span class="compose-label">Subject</span><input type="text" id="em-sub"
                                class="compose-input"></div>
                        <div id="em-body" class="compose-body" contenteditable="true" onfocus="pauseSync()"
                            onblur="resumeSync()"></div>
                        <div class="compose-footer">
                            <button class="btn-apple btn-primary" style="padding: 10px 20px; font-size: 14px;"
                                onclick="generateFinalDraft()">🚀 Generate Mail</button>
                            <button onclick="markAlreadyEmailed()"
                                style="background-color: #ef4444; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                                🗑️ Mark as Already Emailed
                            </button>
                            <button class="btn-apple btn-ai-sparkle" style="padding: 10px 20px; font-size: 14px;"
                                onclick="optimizeDraftWithBishtJi()">✨ Bisht Ji Optimize Text</button>
                        </div>
                    </div>
                </div>
                <div class="empty-state" id="email-empty-state">
                    <div style="font-size: 50px;">📬</div>
                    <div>Select a City to preview and edit draft</div>
                </div>
            </div>
        </div>

        <div id="bulkTrfModal" class="full-page-view">
            <div class="full-page-header">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <h2 class="modal-title" style="color:#ec4899;">📸 Bulk TRF Scanner & AI Matcher</h2>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-apple" style="background: rgba(128,128,128,0.1); color: var(--text-main);"
                        onclick="minimizeTrfModal()">🔽 Minimize to Background</button>
                    <button class="btn-apple btn-danger" onclick="closeFullPage('bulkTrfModal')">Close ✕</button>
                </div>
            </div>

            <div class="full-page-content" style="padding: 20px 30px; height: calc(100% - 60px); box-sizing: border-box;">

                <div style="display: flex; width: 100%; height: 100%; gap: 20px;">

                    <div
                        style="flex: 6; display: flex; flex-direction: column; align-items: center; overflow-y: auto; padding-right: 10px;">
                        <div id="trf-drop-area" class="file-drop-area"
                            style="border: 2px dashed #ec4899; background: rgba(236, 72, 153, 0.05); width: 100%; max-width: 600px; padding: 40px; text-align: center; border-radius: 12px; cursor: pointer; transition: 0.3s;"
                            onclick="document.getElementById('trf-file-input').click()">
                            <div style="font-size: 50px; margin-bottom: 10px;">📸</div>
                            <div style="font-size: 16px; font-weight: 700; color: #ec4899;">Drag & Drop Multiple TRF Images
                                Here</div>
                            <div style="font-size: 12px; color: var(--text-sub); margin-top: 5px;">Supports PNG, JPG, JPEG
                            </div>
                        </div>
                        <input type="file" id="trf-file-input" accept="image/*" multiple style="display: none;"
                            onchange="handleTrfFiles(this.files)">

                        <div id="trf-main-progress-container"
                            style="display:none; flex-direction: column; gap: 8px; width: 100%; max-width: 600px; margin-top: 20px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px;">
                                <span id="trf-status-text" style="color: #ec4899;">Scanning...</span>
                                <span id="trf-main-count">0/0</span>
                            </div>
                            <div
                                style="width: 100%; background: var(--border-light); height: 12px; border-radius: 6px; overflow: hidden;">
                                <div id="trf-main-bar"
                                    style="height: 100%; width: 0%; background: linear-gradient(90deg, #ec4899, #8b5cf6); transition: width 0.3s ease;">
                                </div>
                            </div>
                            <div id="trf-log-box"
                                style="height: 250px; overflow-y: auto; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; font-size: 12px; font-family: monospace; border-radius: 8px; margin-top: 10px;">
                            </div>
                        </div>
                    </div>

                    <div
                        style="flex: 4; border: 1px solid #e2e8f0; background: #f8fafc; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; height: 100%; max-height: 500px;">
                        <div
                            style="padding: 15px; background: white; border-bottom: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <b style="color: #0f172a; font-size: 14px;">⏳ Awaiting Details</b>
                                <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Data not found in sheet yet
                                </div>
                            </div>
                            <button onclick="fetchPendingTRFs()" class="btn-apple"
                                style="padding: 6px 10px; font-size: 11px; background: #e0f2fe; color: #2563eb; border: 1px solid #bae6fd;">🔄
                                Refresh</button>
                        </div>

                        <div id="pending-trf-list" style="padding: 15px; overflow-y: auto; flex: 1;">
                            <div style="text-align:center; color:#94a3b8; font-size:12px; margin-top:40px;">Click Refresh to
                                load TRFs ⏳</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="floating-trf-widget"
            style="display:none; position: fixed; bottom: 20px; left: 20px; width: 260px; background: var(--card-bg); border: 1px solid #ec4899; border-radius: 12px; box-shadow: 0 10px 30px rgba(236,72,153,0.3); padding: 15px; z-index: 9999; cursor: pointer; backdrop-filter: blur(10px);"
            onclick="openFullPage('bulkTrfModal'); this.style.display='none';">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 800; color: #ec4899;">📸 TRF Background Sync</span>
                <span id="float-trf-count" style="font-size: 11px; font-weight: 700; color: var(--text-sub);">0/0</span>
            </div>
            <div style="width: 100%; background: var(--border-light); height: 6px; border-radius: 4px; overflow: hidden;">
                <div id="float-trf-bar"
                    style="height: 100%; width: 0%; background: linear-gradient(90deg, #ec4899, #8b5cf6); transition: width 0.3s ease;">
                </div>
            </div>
            <div id="float-trf-text"
                style="font-size: 11px; color: var(--text-sub); font-weight: 600; margin-top: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Processing...</div>
        </div>

        <div id="floating-trf-viewer"
            style="display: none; position: fixed; right: 20px; bottom: 20px; width: 450px; height: 550px; background: var(--card-bg); border-radius: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.4); z-index: 999999; border: 1px solid var(--border-light); flex-direction: column; overflow: hidden;">
            <div id="trf-drag-header"
                style="background: #f1f5f9; padding: 10px 15px; cursor: grab; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
                <b style="font-size:13px; color:#334155;">📸 TRF Manager</b>
                <div style="display:flex; gap:8px;">
                    <button id="trf-ocr-btn" class="btn-apple"
                        style="padding:4px 8px; font-size:10px; background:#fef08a; color:#854d0e; display:none;"
                        onclick="readTrfText()">📄 Read Text</button>
                    <button id="trf-rotate-btn" class="btn-apple"
                        style="padding:4px 8px; font-size:10px; background:#f3e8ff; color:#7e22ce; display:none;"
                        onclick="rotateTrf()">🔄 Rotate</button>
                    <a id="trf-zoom-btn" href="#" target="_blank" class="btn-apple"
                        style="padding:4px 8px; font-size:10px; background:#e0f2fe; color:#2563eb; text-decoration:none; display:none;">🔍
                        Zoom</a>
                    <button id="trf-delete-btn" class="btn-apple"
                        style="padding:4px 8px; font-size:10px; background:#fee2e2; color:#ef4444;"
                        onclick="deleteCurrentTrf()">🗑️ Delete</button>
                    <button class="btn-apple" style="padding:4px 8px; font-size:10px; background:#e2e8f0; color:#475569;"
                        onclick="document.getElementById('floating-trf-viewer').style.display='none'">✕ Close</button>
                </div>
            </div>

            <iframe id="trf-iframe" style="flex:1; width:100%; border:none; background:#000; display:none;"></iframe>

            <div id="trf-ocr-panel"
                style="display:none; height: 180px; background: #f8fafc; border-top: 1px solid #cbd5e1; padding: 12px; overflow-y: auto; font-size: 11px; color: #334155; line-height: 1.5;">
                <div style="text-align:center; margin-top: 30px; color:#94a3b8;">🤖 AI is reading the TRF... Please wait...
                </div>
            </div>

            <div id="trf-upload-area"
                style="flex:1; display:none; flex-direction:column; align-items:center; justify-content:center; padding: 20px; background: #f8fafc; text-align:center;">
                <div style="border: 2px dashed #ec4899; border-radius: 12px; width: 100%; height: 100%; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; background:rgba(236, 72, 153, 0.05); transition: 0.3s;"
                    onclick="document.getElementById('manual-trf-input').click()"
                    onmouseover="this.style.background='rgba(236, 72, 153, 0.1)'"
                    onmouseout="this.style.background='rgba(236, 72, 153, 0.05)'">
                    <div style="font-size: 50px; margin-bottom: 10px;">📤</div>
                    <div style="font-size: 16px; font-weight: bold; color: #ec4899;">Click to Upload TRF</div>
                    <div style="font-size: 12px; color: var(--text-sub); margin-top: 5px;">Upload clearly visible TRF photo
                    </div>
                </div>
            </div>

            <input type="hidden" id="viewer-rid">
            <input type="hidden" id="viewer-city">
        </div>

        <input type="file" id="manual-trf-input" accept="image/*" style="display:none;"
            onchange="uploadSingleTrf(this.files)">

        <div id="trfConfirmModal" class="modal-overlay" style="z-index: 100000;">
            <div class="modal-content" style="max-width: 450px; text-align: center;">
                <div style="font-size: 45px; margin-bottom: 5px;">🤔</div>
                <h2 style="color: var(--warning); margin-bottom: 10px; font-size: 18px;">Partial Match Found!</h2>
                <div id="trf-confirm-text"
                    style="font-size: 13px; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: #fffbeb; padding: 15px; border-radius: 8px; border: 1px solid #fde68a; text-align: left;">
                    Checking details...</div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button class="btn-apple"
                        style="flex: 1; background: var(--success); color: white; border: none; font-size: 14px; padding: 10px;"
                        onclick="handleTrfConfirm(true)">✅ Yes, Upload It</button>
                    <button class="btn-apple"
                        style="flex: 1; background: var(--danger); color: white; border: none; font-size: 14px; padding: 10px;"
                        onclick="handleTrfConfirm(false)">❌ No, Skip It</button>
                </div>
            </div>
        </div>

        <!-- ========================================== -->
        <!-- 🎨 ADVANCED THEME CENTER MODAL (PHASE 2) -->
        <!-- ========================================== -->
        <div id="themeCenterModal" class="modal-overlay" style="z-index: 100000;">
            <div class="modal-content">
                <div class="tc-header">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h2>🎨 Hyper-Glass 2.0 Studio</h2>
                            <p>Customize your workspace aesthetic with premium styles.</p>
                        </div>
                        <button class="close-btn"
                            style="background: rgba(255,255,255,0.2); color:white; width: 36px; height: 36px;"
                            onclick="closeModal('themeCenterModal')">✕</button>
                    </div>
                </div>

                <div class="tc-body">
                    <div class="tc-section-label">Premium Presets</div>
                    <div class="theme-presets-grid">
                        <div class="theme-preset-card active-theme" onclick="setThemeStyle('glassmorphism', this)">
                            <div class="tc-preview"
                                style="background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.9);">
                            </div>
                            <div class="tc-name">Glassmorphism</div>
                            <div class="tc-desc">Deep frosted blur</div>
                        </div>
                        <div class="theme-preset-card" onclick="setThemeStyle('skeuomorphism', this)">
                            <div class="tc-preview"
                                style="background: linear-gradient(160deg, #f0f4f8, #dde3ec); border: 1px solid #a0aec0; box-shadow: inset 0 2px 4px white, inset 0 -2px 4px rgba(0,0,0,0.1), 2px 3px 6px rgba(0,0,0,0.15);">
                            </div>
                            <div class="tc-name">Skeuomorphism</div>
                            <div class="tc-desc">Dimensional realism</div>
                        </div>
                        <div class="theme-preset-card" onclick="setThemeStyle('neo-brutalism', this)">
                            <div class="tc-preview"
                                style="background: #fffef0; border: 2.5px solid #111; box-shadow: 4px 4px 0 #111;"></div>
                            <div class="tc-name">Neo Brutalism</div>
                            <div class="tc-desc">Stark & raw contrast</div>
                        </div>
                        <div class="theme-preset-card" onclick="setThemeStyle('claymorphism', this)">
                            <div class="tc-preview"
                                style="background: #ffffff; border-radius: 16px; box-shadow: 6px 6px 14px rgba(160,180,240,0.4), -4px -4px 10px white, inset 0 2px 6px white, inset 0 -2px 6px rgba(140,160,220,0.2);">
                            </div>
                            <div class="tc-name">Claymorphism</div>
                            <div class="tc-desc">Soft puffy depth</div>
                        </div>
                        <div class="theme-preset-card" onclick="setThemeStyle('minimalism', this)">
                            <div class="tc-preview" style="background: white; border: 1px solid #e2e8f0;"></div>
                            <div class="tc-name">Minimalism</div>
                            <div class="tc-desc">Clean typography</div>
                        </div>
                        <div class="theme-preset-card" onclick="setThemeStyle('liquid-glass', this)">
                            <div class="tc-preview"
                                style="background: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 15px rgba(168,85,247,0.2);">
                            </div>
                            <div class="tc-name">Liquid Glass</div>
                            <div class="tc-desc">Animated flowing core</div>
                        </div>
                    </div>

                    <div class="tc-section-label">Cursor Ecosystem</div>
                    <div class="tc-builder" style="grid-template-columns: repeat(3, 1fr);">
                        <div class="tc-field" style="grid-column: span 3;">
                            <label style="margin-bottom: 8px; display: block;">Cursor Style Preset</label>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <button class="tc-cursor-btn" id="cursor-btn-liquid-drop"
                                    onclick="setCursorPreset('liquid-drop', this)"
                                    style="flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border-light); background: var(--card-bg); color: var(--text-main); font-size: 12px; font-weight: 700; transition: 0.2s; cursor: pointer;">
                                    💧 Liquid Drop
                                </button>
                                <button class="tc-cursor-btn" id="cursor-btn-minimal-ring"
                                    onclick="setCursorPreset('minimal-ring', this)"
                                    style="flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border-light); background: var(--card-bg); color: var(--text-main); font-size: 12px; font-weight: 700; transition: 0.2s; cursor: pointer;">
                                    ○ Minimal Ring
                                </button>
                                <button class="tc-cursor-btn" id="cursor-btn-neon-dot"
                                    onclick="setCursorPreset('neon-dot', this)"
                                    style="flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border-light); background: var(--card-bg); color: var(--text-main); font-size: 12px; font-weight: 700; transition: 0.2s; cursor: pointer;">
                                    ✦ Neon Dot
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="tc-section-label">Custom Engine Builder</div>
                    <div class="tc-builder">
                        <div class="tc-field">
                            <label>Base Primary Accent</label>
                            <input type="color" id="tc-color-primary" value="#5b8dee">
                        </div>
                        <div class="tc-field">
                            <label>Danger/Alert Accent</label>
                            <input type="color" id="tc-color-danger" value="#dc2626">
                        </div>
                        <div class="tc-field" style="grid-column: span 2;">
                            <label>Inject Custom Wallpaper (URL)</label>
                            <input type="text" id="tc-bg-url" placeholder="https://images.unsplash.com/... (optional)">
                        </div>
                        <div class="tc-field" style="grid-column: span 2;">
                            <button class="tc-apply-btn" onclick="applyCustomTheme()">⚡ INJECT CUSTOM PARAMETERS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mac-window" id="mainWindow">
            <div class="title-bar">
                <div class="app-title" id="dynamic-app-title">
                    <div class="hamburger" onclick="toggleSidebar()">☰</div>
                    <div class="branding-group">
                        <div class="logos-wrapper">
                            <img src="https://lh3.googleusercontent.com/d/1rWGnTk485-dqc_ADtLn_RuSmDzgomV0U"
                                alt="Redcliffe Labs" class="brand-logo-img" style="height: 28px; object-fit: contain;">
                            <span class="spacer-x-char">✖</span>
                            <img src="https://www.medibuddy.in/assets/logos/medibuddyWithName.svg" alt="MediBuddy"
                                class="brand-logo-img">
                        </div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="live-indicator" onclick="window.forceDashboardRefresh()">
                        <div class="live-dot" id="sync-dot"></div>
                        <span id="sync-text">Force Sync</span> 🔄
                    </div>

                    <div class="user-profile" onclick="window.handleLogout(event)" title="Click to Logout">
                        <img id="user-avatar" src="https://ui-avatars.com/api/?name=User&background=007AFF&color=fff"
                            alt="User">
                        <span id="user-display-name">Loading...</span>
                    </div>

                    <button type="button" class="theme-toggle" id="dark-light-btn" onclick="toggleTheme()"
                        title="Toggle Dark Mode" style="border-radius: 50%; width: 36px; height: 36px;">🌙</button>

                    <div style="position: relative; display: inline-block;">
                        <button type="button" class="theme-toggle"
                            onclick="document.getElementById('theme-dropdown').classList.toggle('show')"
                            title="Change Theme Colors"
                            style="background: var(--glass-bg); border-radius: 50%; width: 36px; height: 36px;">🎨</button>

                        <div id="theme-dropdown" class="multi-drop-list"
                            style="right: 0; left: auto; width: 180px; padding: 10px; border-radius: 16px; background: var(--modal-bg); backdrop-filter: blur(25px); border: 1px solid var(--glass-border); top: 110%;">
                            <div
                                style="font-size: 10px; font-weight: 800; color: var(--text-sub); margin-bottom: 8px; text-transform: uppercase;">
                                Color Presets</div>
                            <div onclick="setUiTheme('theme-ocean')"
                                style="padding: 6px 10px; cursor:pointer; border-radius: 6px; margin-bottom: 6px; background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; border: 1px solid #bae6fd; transition: 0.2s;"
                                onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='none'">🌊
                                Ocean Glass</div>
                            <div onclick="setUiTheme('theme-emerald')"
                                style="padding: 6px 10px; cursor:pointer; border-radius: 6px; margin-bottom: 6px; background: #d1fae5; color: #047857; font-size: 11px; font-weight: 700; border: 1px solid #a7f3d0; transition: 0.2s;"
                                onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='none'">🍃
                                Emerald Mist</div>
                            <div onclick="setUiTheme('theme-sunset')"
                                style="padding: 6px 10px; cursor:pointer; border-radius: 6px; margin-bottom: 6px; background: #ffedd5; color: #c2410c; font-size: 11px; font-weight: 700; border: 1px solid #fed7aa; transition: 0.2s;"
                                onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='none'">🌇
                                Sunset Liquid</div>
                            <div onclick="setUiTheme('theme-aurora')"
                                style="padding: 6px 10px; cursor:pointer; border-radius: 6px; background: #1e293b; color: #f8fafc; font-size: 11px; font-weight: 700; border: 1px solid #334155; transition: 0.2s;"
                                onmouseover="this.style.filter='brightness(1.2)'" onmouseout="this.style.filter='none'">🌌
                                Midnight Aurora</div>
                        </div>
                    </div>

                    <button type="button" class="theme-toggle" id="theme-btn" onclick="openModal('themeCenterModal')"
                        title="Advanced Settings" style="border-radius: 50%; width: 36px; height: 36px;">⚙️</button>
                </div>
            </div>
            <div class="app-content">
                <div id="mobile-overlay" class="mobile-overlay" onclick="toggleSidebar()"></div>
                <div class="sidebar" id="sidebar">
                    <div class="kpi-grid">
                        <div class="glass-card full-width" id="card-pending" style="border-bottom: 3px solid var(--danger);"
                            onclick="switchTab('pending')">
                            <div class="kpi-num" style="color: var(--danger);" id="kpi-pending">0</div>
                            <div class="kpi-lbl">Pending</div>
                        </div>
                        <div class="glass-card" id="card-create" style="border-bottom: 3px solid var(--primary);"
                            onclick="switchTab('create')">
                            <div class="kpi-num" style="color: var(--primary);" id="kpi-create">0</div>
                            <div class="kpi-lbl">To Create</div>
                        </div>
                        <div class="glass-card" id="card-incomplete" style="border-bottom: 3px solid var(--warning);"
                            onclick="switchTab('incomplete')">
                            <div class="kpi-num" style="color: var(--warning);" id="kpi-incomplete">0</div>
                            <div class="kpi-lbl">Incomplete</div>
                        </div>
                        <div class="glass-card full-width" id="card-shared" style="border-bottom: 3px solid var(--success);"
                            onclick="switchTab('shared')">
                            <div class="kpi-num" style="color: var(--success);" id="kpi-shared">0</div>
                            <div class="kpi-lbl">Shared</div>
                        </div>
                        <div class="glass-card full-width" id="card-log" style="border-bottom: 3px solid var(--text-main);"
                            onclick="switchTab('log')">
                            <div class="kpi-num" id="kpi-log">0</div>
                            <div class="kpi-lbl">Todays Logs</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-size: 11px; color: var(--text-sub); font-weight: 600;">Last Synced:
                        <span id="last-update" style="color:var(--text-main);">--:--</span>
                    </div>
                    <div class="summary-box">
                        <div class="summary-header"><span>CITY SUMMARY</span><span style="cursor:pointer;"
                                onclick="openModal('cityModal')">⤢</span></div>
                        <div class="city-list-wrapper" id="city-summary" style="max-height: 150px;"></div>
                    </div>

                    <div
                        style="background: var(--card-bg); backdrop-filter: blur(30px); border-radius: 18px; border: 1px solid var(--glass-border); padding: 14px 14px 12px; margin-top: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.07); display: flex; flex-direction: column; gap: 10px; min-height: 220px; transition: all 0.3s ease; overflow: hidden; position: relative;">
                        <!-- Premium top accent gradient bar -->
                        <div
                            style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #10b981 0%, #3b82f6 60%, transparent 100%); border-radius: 18px 18px 0 0; pointer-events: none;">
                        </div>
                        <!-- Header row -->
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 3px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div
                                    style="width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(16,185,129,0.35);">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                    </svg>
                                </div>
                                <div>
                                    <div
                                        style="font-size: 11px; font-weight: 800; color: var(--text-main); letter-spacing: -0.2px; line-height: 1.2;">
                                        Collection Trend</div>
                                    <div
                                        style="font-size: 9px; font-weight: 600; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.5px;">
                                        Last 7 days</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <select id="mini-chart-city" onchange="renderMiniChart()"
                                    style="font-size: 9px; padding: 2px 5px; border-radius: 5px; border: 1px solid var(--border-light); background: var(--input-bg); color: var(--text-main); outline: none; cursor: pointer; font-weight: 700; max-width: 76px;">
                                    <option value="ALL">All Cities</option>
                                </select>
                                <button onclick="openFullPage('analyticsFullPage'); renderFullChart();"
                                    title="Full Analytics"
                                    style="background: var(--input-bg); border: 1px solid var(--border-light); color: var(--text-sub); width: 22px; height: 22px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; transition: 0.2s; flex-shrink: 0; padding: 0;"
                                    onmouseover="this.style.borderColor='var(--primary)';this.style.color='var(--primary)'"
                                    onmouseout="this.style.borderColor='var(--border-light)';this.style.color='var(--text-sub)'">⤢</button>
                            </div>
                        </div>
                        <!-- KPI Stats: Total + PPMC/Retail Split -->
                        <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 8px;">
                            <div
                                style="background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.05)); border: 1px solid rgba(16,185,129,0.2); border-radius: 10px; padding: 9px 11px;">
                                <div
                                    style="font-size: 9px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 3px;">
                                    7-Day Total</div>
                                <div id="mini-chart-badge"
                                    style="font-size: 24px; font-weight: 900; color: #065f46; letter-spacing: -0.5px; line-height: 1.1;">
                                    --</div>
                            </div>
                            <div style="display: grid; grid-template-rows: 1fr 1fr; gap: 5px;">
                                <div
                                    style="background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.18); border-radius: 7px; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center;">
                                    <span
                                        style="font-size: 9px; font-weight: 800; color: #ef4444; text-transform: uppercase; letter-spacing: 0.3px;">PPMC</span>
                                    <span id="mini-ppmc-badge"
                                        style="font-size: 14px; font-weight: 900; color: #dc2626; line-height: 1;">--</span>
                                </div>
                                <div
                                    style="background: rgba(59,130,246,0.07); border: 1px solid rgba(59,130,246,0.18); border-radius: 7px; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center;">
                                    <span
                                        style="font-size: 9px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.3px;">Retail</span>
                                    <span id="mini-retail-badge"
                                        style="font-size: 14px; font-weight: 900; color: #2563eb; line-height: 1;">--</span>
                                </div>
                            </div>
                        </div>
                        <!-- Chart Canvas -->
                        <div style="flex: 1; position: relative; width: 100%; min-height: 95px;">
                            <canvas id="miniTrendChart"></canvas>
                        </div>
                    </div>

                    <button class="btn-apple btn-primary"
                        style="margin-bottom: 5px; box-shadow: 0 4px 10px rgba(0,122,255,0.3);"
                        onclick="openModal('uploadCsvModal')">📥 Import Data</button>
                    <button class="btn-apple" style="background:rgba(168, 85, 247, 0.1); color:#a855f7; margin-bottom: 5px;"
                        onclick="openModal('dropzoneModal')">📂 Smart PDF Dropzone</button>
                    <button class="btn-apple" style="background:rgba(59, 130, 246, 0.1); color:#3b82f6; margin-bottom: 5px;"
                        onclick="openEmailGenerator()">📧 E-mail Generator</button>
                    <button class="btn-apple" style="background:rgba(234, 179, 8, 0.1); color:#eab308; margin-bottom: 5px;"
                        onclick="handleApiButtonClick()">
                        🤖 API Auto-Match
                    </button>
                    <button class="btn-apple"
                        style="background:rgba(16,185,129,0.1); color:var(--success); margin-bottom: 5px;"
                        onclick="openModal('waModal')">📱 WA Export</button>

                    <button class="btn-apple" style="background:rgba(236, 72, 153, 0.1); color:#ec4899; margin-bottom: 5px;"
                        onclick="openFullPage('bulkTrfModal')">📸 Bulk TRF Scanner</button>

                    <div id="mini-trf-progress-container"
                        style="display:none; flex-direction: column; gap: 4px; padding: 10px; background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 8px; margin-bottom: 5px;">
                        <div
                            style="font-size: 10px; font-weight: 700; color: var(--text-sub); display: flex; justify-content: space-between;">
                            <span>TRF Uploading...</span><span id="mini-trf-count">0/0</span>
                        </div>
                        <div
                            style="width: 100%; background: var(--border-light); height: 6px; border-radius: 4px; overflow: hidden;">
                            <div id="mini-trf-bar"
                                style="height: 100%; width: 0%; background: #ec4899; transition: width 0.3s ease;"></div>
                        </div>
                    </div>

                    <button class="btn-apple btn-danger" onclick="openFullPage('auditFullPage')">🚨 Daily Audit</button>
                </div>

                <div class="main-view">
                    <div class="toolbar">
                        <div class="toolbar-row">
                            <div class="segmented-control">
                                <button class="seg-btn active" id="tab-pending"
                                    onclick="switchTab('pending')">Pending</button>
                                <button class="seg-btn" id="tab-create" onclick="switchTab('create')">To Create</button>
                                <button class="seg-btn" id="tab-incomplete"
                                    onclick="switchTab('incomplete')">Incomplete</button>
                                <button class="seg-btn" id="tab-shared" onclick="switchTab('shared')">Shared</button>
                                <button class="seg-btn" id="tab-log" onclick="switchTab('log')">Todays Logs</button>
                            </div>
                            <div class="search-wrapper"><span class="search-icon" id="search-icon">🔍</span><input
                                    type="text" id="search-input" class="search-input" placeholder="Search ID, Name..."
                                    oninput="handleSearch()" onfocus="pauseSync()" onblur="resumeSync()"></div>
                        </div>
                        <div class="toolbar-row">
                            <div class="filter-row" style="flex:1;">
                                <input type="date" id="date-start" class="filter-input"><span>to</span><input type="date"
                                    id="date-end" class="filter-input">
                                <button class="btn-apple btn-primary" onclick="fetchData(false)">Apply</button><button
                                    class="btn-apple" onclick="resetFilters()">Reset</button><select
                                    id="pending-time-filter" class="filter-input"
                                    style="display: inline-block; cursor:pointer;" onchange="updateUI()">
                                    <option value="ALL">All Pending</option>
                                    <option value="OLD">Old Pending (Old)</option>
                                    <option value="TODAY">Today's Pending</option>
                                </select>
                                <div class="custom-multi-select" id="city-select-container">
                                    <div class="cms-header"
                                        onclick="document.getElementById('city-drop').classList.toggle('show')"><span
                                            id="city-drop-text">All Cities</span> ▾</div>
                                    <div id="city-drop" class="multi-drop-list" onclick="event.stopPropagation()"></div>
                                </div>
                                <div class="custom-multi-select" id="type-select-container">
                                    <div class="cms-header"
                                        onclick="document.getElementById('type-drop').classList.toggle('show')"><span
                                            id="type-drop-text">All Partners</span> ▾</div>
                                    <div id="type-drop" class="multi-drop-list" onclick="event.stopPropagation()"></div>
                                </div>
                                <div class="custom-multi-select" id="user-select-container">
                                    <div class="cms-header"
                                        onclick="document.getElementById('user-drop').classList.toggle('show')"><span
                                            id="user-drop-text">All Users</span> ▾</div>
                                    <div id="user-drop" class="multi-drop-list" onclick="event.stopPropagation()">
                                        <label><input type="checkbox" value="ALL" checked
                                                onchange="handleMultiCheck('user')"> All Users</label>
                                        <label><input type="checkbox" value="API" onchange="handleMultiCheck('user')"> API
                                            User</label>
                                        <label><input type="checkbox" value="Manual" onchange="handleMultiCheck('user')">
                                            Manual User</label>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-row" style="gap: 10px; width: 100%; justify-content: space-between;">
                                <div class="tat-container">
                                    <span class="tat-label">TAT Base:</span>
                                    <div class="tat-toggle"
                                        style="background: #f1f5f9; padding: 4px; border-radius: 8px; display: inline-flex; gap: 4px;">
                                        <button class="tat-btn" id="tat-col" onclick="setTatBase('col')"
                                            style="border:none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; background: transparent; color: #64748b;">Col.</button>
                                        <button class="tat-btn" id="tat-sub" onclick="setTatBase('sub')"
                                            style="border:none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; background: transparent; color: #64748b;">Sub.</button>
                                        <button class="tat-btn" id="tat-creat" onclick="setTatBase('creat')"
                                            style="border:none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; background: #3b82f6; color: #fff;">Creat.</button>
                                    </div>
                                </div>

                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <button id="copy-trf-btn" onclick="showIncompleteTRFPopup()"
                                        style="display:none; background:#ef4444; color:white; border:none; padding:8px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:13px; box-shadow:0 2px 4px rgba(239, 68, 68, 0.3); transition: 0.2s;">
                                        📋 Copy Missing TRFs
                                    </button>

                                    <button class="btn-apple btn-primary" onclick="openSmartExportModal()"
                                        style="background: linear-gradient(135deg, #6366f1, #8b5cf6); border: none; padding: 8px 14px; font-size: 13px;">
                                        ✨ Smart Export
                                    </button>
                                </div>
                            </div>


                            <div class="table-container">
                                <table class="glass-table">
                                    <thead>
                                        <tr>
                                            <th width="15%">Date / Loc</th>
                                            <th width="20%">IDs (Bkg/Req)</th>
                                            <th width="30%">Patient Details</th>
                                            <th width="25%">Status & Action</th>
                                            <th width="10%" style="text-align: right;">Exp</th>
                                        </tr>
                                    </thead>
                                    <tbody id="main-list"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <meta id="gas-env" data-is-sheet="<?= typeof isSheetContext !== 'undefined' ? isSheetContext : false ?>"
                    data-user-email="<?= typeof userEmail !== 'undefined' ? userEmail : '' ?>">
                <script>
                    (function () { var m = document.getElementById('gas-env'); window.ENV_IS_SHEET = m.dataset.isSheet === 'true'; window.ENV_USER_EMAIL = m.dataset.userEmail || ''; })();
                </script>

                <script type="module">
                    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
                    import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
                    import { getDatabase, ref, set, onValue, remove, onDisconnect } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

                    window.firebaseRef = ref;
                    window.firebaseSet = set;
                    window.firebaseOnValue = onValue;
                    window.firebaseRemove = remove;
                    window.firebaseOnDisconnect = onDisconnect;

                    const firebaseConfig = {
                        apiKey: "AIzaSyCn9xu7X_mPSEup983RVh2TIZd5gr1g7UQ",
                        authDomain: "redcliffelabsxmedibuddy.firebaseapp.com",
                        projectId: "redcliffelabsxmedibuddy",
                        storageBucket: "redcliffelabsxmedibuddy.firebasestorage.app",
                        messagingSenderId: "394770690215",
                        appId: "1:394770690215:web:9e3afcfcc422fb0b64eb82",
                        measurementId: "G-ERXLB7YDRF"
                    };

                    const app = initializeApp(firebaseConfig);
                    const auth = getAuth(app);
                    const provider = new GoogleAuthProvider();
                    const database = getDatabase(app);
                    window.firebaseDB = database;

                    // 🚀 PRO-MAX: Firebase User Preferences Engine
                    window.saveUserPreferences = function () {
                        if (!window.currentUser || !window.firebaseDB) return;
                        const prefRef = window.firebaseRef(window.firebaseDB, 'users/' + window.currentUser.name.replace(/[^a-zA-Z0-9]/g, '') + '/preferences');
                        const prefs = {
                            theme: localStorage.getItem('saved_premium_theme') || 'theme-green',
                            style: localStorage.getItem('hyperGlassThemeStyle') || 'glassmorphism',
                            darkMode: localStorage.getItem('hg_darkMode') === 'true',
                            cursor: localStorage.getItem('hg_cursorPreset') || 'liquid-drop',
                            timestamp: Date.now()
                        };
                        window.firebaseSet(prefRef, prefs).catch(e => console.error("Pref save error:", e));
                    };

                    window.loadUserPreferences = function () {
                        if (!window.currentUser || !window.firebaseDB) {
                            bootFastApp();
                            return;
                        }
                        const prefRef = window.firebaseRef(window.firebaseDB, 'users/' + window.currentUser.name.replace(/[^a-zA-Z0-9]/g, '') + '/preferences');
                        window.firebaseOnValue(prefRef, (snapshot) => {
                            const prefs = snapshot.val();
                            if (prefs) {
                                if (prefs.theme) { localStorage.setItem('saved_premium_theme', prefs.theme); window.setUiTheme(prefs.theme, true); }
                                if (prefs.style) { localStorage.setItem('hyperGlassThemeStyle', prefs.style); window.setThemeStyle(prefs.style); }
                                if (prefs.darkMode !== undefined) {
                                    localStorage.setItem('hg_darkMode', prefs.darkMode);
                                    if (prefs.darkMode) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
                                    let themeBtn = document.getElementById('theme-btn');
                                    if (themeBtn) themeBtn.innerHTML = '⚙️';
                                }
                                if (prefs.cursor) { localStorage.setItem('hg_cursorPreset', prefs.cursor); window.setCursorPreset(prefs.cursor); }
                            }
                            bootFastApp();
                        }, { onlyOnce: true });
                    };

                    window.handleEmailLogin = function () {
                        const email = document.getElementById('login-email').value.trim(); const pass = document.getElementById('login-password').value;
                        if (!email || !pass) { showToast("Enter email and password!"); return; }
                        document.getElementById('email-login-btn').innerText = "Authenticating...";

                        signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
                            // 🚀 FIX: Agar Sheet mein galti se logout ho gaya tha, toh manully UI hide karo aur data load karo
                            if (window.ENV_IS_SHEET) {
                                let user = userCredential.user;
                                let dName = user.displayName || user.email.split('@')[0];
                                window.currentUser = { name: dName, email: user.email };
                                document.getElementById('login-overlay').classList.add('hidden');
                                document.getElementById('sender-name').value = window.currentUser.name;
                                document.getElementById('user-display-name').innerText = window.currentUser.name;
                                document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(window.currentUser.name)}&background=007AFF&color=fff`;

                                document.getElementById('email-login-btn').innerHTML = "Login with Email <span style='margin-left:6px; font-size: 16px;'>→</span>";
                                bootFastApp();
                            }
                        }).catch((error) => {
                            alert("Login Failed: " + error.message);
                            document.getElementById('email-login-btn').innerHTML = "Login with Email <span style='margin-left:6px; font-size: 16px;'>→</span>";
                        });
                    };

                    window.handleGoogleLogin = function () {
                        // 🚀 FIX: Google Sheet ke andar popups block hote hain, toh user ko guide kar do
                        if (window.ENV_IS_SHEET) {
                            alert("⚠️ Google Security Notice\n\nGoogle Sign-In popup is blocked inside Google Sheets.\n\nIf you accidentally logged out, please either use 'Login with Email' OR close this popup and click 'Open Live Dashboard' again to auto-login!");
                            return;
                        }

                        let btnText = document.getElementById('login-btn-text');
                        btnText.innerText = "Authenticating...";

                        signInWithPopup(auth, provider).then((result) => {
                            btnText.innerText = "Sign in with Google";
                        }).catch((error) => {
                            btnText.innerText = "Sign in with Google";
                            if (error.code !== 'auth/popup-closed-by-user') {
                                alert("❌ Google Login Failed!\n\nReason: " + error.message);
                            }
                        });

                        // Failsafe for Normal Web App
                        setTimeout(() => {
                            if (btnText.innerText === "Authenticating...") {
                                btnText.innerText = "Sign in with Google";
                                alert("⚠️ Google Popup Blocked!\n\nPlease check if your browser is blocking popups for this site.");
                            }
                        }, 10000);
                    };

                    window.handleForgotPassword = function () {
                        const email = document.getElementById('login-email').value.trim();
                        if (!email) {
                            showToast("Enter your email address first to reset password!");
                            document.getElementById('login-email').focus();
                            return;
                        }
                        document.getElementById('forgot-password-text').innerText = "Sending Link...";
                        sendPasswordResetEmail(auth, email)
                            .then(() => {
                                showToast("Password reset link sent to your email!");
                                document.getElementById('forgot-password-text').innerText = "Forgot Password?";
                            })
                            .catch((error) => {
                                alert("Error: " + error.message);
                                document.getElementById('forgot-password-text').innerText = "Forgot Password?";
                            });
                    };

                    window.handleLogout = function (event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }

                        // 1. UI aur memory instantly clear karo
                        window.currentUser = null;
                        document.getElementById('login-overlay').classList.remove('hidden');
                        document.getElementById('main-list').innerHTML = '';
                        document.getElementById('login-btn-text').innerText = "Sign in with Google";
                        document.getElementById('email-login-btn').innerHTML = "Login with Email <span style='margin-left:6px; font-size: 16px;'>→</span>";
                        document.getElementById('login-email').value = "";
                        document.getElementById('login-password').value = "";

                        if (typeof showToast === 'function') showToast("Logged out successfully! 👋");

                        // 2. Firebase session clear karo (Agar active hai toh)
                        if (typeof signOut === 'function' && auth) {
                            signOut(auth).catch(e => console.log("Auth signout bypassed"));
                        }
                    };

                    // 🚀 BOOT ENGINE — Always fetches fresh data; no stale cache flash
                    function bootFastApp() {
                        try {
                            // Always load fresh from server — shows proper loader
                            // Quick Resume removed: stale cache was causing blank table state
                            fetchData(false);
                        } catch (e) { fetchData(false); }
                    }

                    // 🚀 THE MAGIC: AUTO-LOGIN FOR SHEET USERS
                    if (window.ENV_IS_SHEET && window.ENV_USER_EMAIL) {
                        let email = window.ENV_USER_EMAIL;
                        let rawName = email.split('@')[0];
                        let cleanName = rawName.replace(/\./g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                        window.currentUser = { name: cleanName, email: email };

                        document.getElementById('login-overlay').classList.add('hidden');
                        document.getElementById('sender-name').value = window.currentUser.name;
                        document.getElementById('user-display-name').innerText = window.currentUser.name;
                        document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(window.currentUser.name)}&background=007AFF&color=fff`;

                        bootFastApp(); // ⚡ FAST BOOT
                    }
                    // Agar direct Web App url se khola hai toh wahi purana Firebase wala kaam chalega
                    else {
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                let dName = user.displayName || user.email.split('@')[0];
                                window.currentUser = { name: dName, email: user.email };
                                document.getElementById('login-overlay').classList.add('hidden');
                                document.getElementById('sender-name').value = window.currentUser.name;
                                document.getElementById('user-display-name').innerText = window.currentUser.name;
                                document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(window.currentUser.name)}&background=007AFF&color=fff`;

                                bootFastApp(); // ⚡ FAST BOOT
                                // ☁️ Load user's saved preferences from Firebase (cross-device sync)
                                // Delayed slightly so GSAP cursor IIFE and theme engine are initialized
                                setTimeout(function () {
                                    if (typeof window.loadUserPreferences === 'function') {
                                        window.loadUserPreferences();
                                    }
                                }, 800);
                            } else { document.getElementById('login-overlay').classList.remove('hidden'); }
                        });
                    }
                </script>

                <script>
                    const $ = (id) => document.getElementById(id) || document.createElement('div');
                    function toggleTheme() { document.body.classList.toggle('dark-mode'); $('theme-btn').innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'; updateThemeBackground(); }
                    function showToast(msg) { const t = $('toast'); t.innerText = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500); }
                    function copyTxt(txt) { if (!txt || txt === '-') return; const t = document.createElement("textarea"); t.value = txt; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.focus(); t.select(); try { document.execCommand('copy'); showToast('Copied!'); } catch (e) { } document.body.removeChild(t); }
                    function closeModal(id) { $(id).classList.remove('active'); }
                    function openModal(id) {
                        $(id).classList.add('active');
                        if (id === 'cityModal') $('modal-time').innerText = new Date().toLocaleString();
                        if (id === 'waModal') renderWaModal();
                        if (id === 'uploadCsvModal') {
                            const select = $('import-city-select');
                            if (select) {
                                select.innerHTML = '<option value="">-- Choose City --</option>' + (globalData.cities || []).map(c => `<option value="${c}">${c}</option>`).join('');
                                select.value = '';
                                $('import-upload-area').style.display = 'none';
                                $('csv-file').value = '';
                                $('csv-file-name').innerText = '';
                            }
                        }
                    }

                    function toggleUploadArea() { $('import-upload-area').style.display = $('import-city-select').value !== "" ? 'block' : 'none'; }
                    function openFullPage(id) { $(id).classList.add('active'); if (id === 'auditFullPage') { if (!$('audit-date-start').value) { const t = new Date().toISOString().slice(0, 10); $('audit-date-start').value = t; $('audit-date-end').value = t; } fetchAuditData(); } }
                    function closeFullPage(id) { $(id).classList.remove('active'); }
                    function toggleSidebar() { const sb = $('sidebar'), overlay = $('mobile-overlay'); if (window.innerWidth <= 768) { sb.classList.toggle('active-mobile'); overlay.classList.toggle('active'); } else { sb.classList.toggle('hidden'); } }

                    /* 🟢 ANTI-FLICKER LOGIC (BULLETPROOF SHIELD) 🟢 */
                    let isTyping = false;
                    let syncTimeout = null;
                    function pauseSync() {
                        clearTimeout(syncTimeout); // Purane timer ko cancel karo
                        isTyping = true; // Screen strictly lock
                    }
                    function resumeSync() {
                        clearTimeout(syncTimeout);
                        // 3 Seconds tak lock rakhega taaki Google Sheet aaram se save kar le
                        syncTimeout = setTimeout(() => { isTyping = false; }, 3000);
                    }

                    /* 🎮 PRO-LEVEL CORPORATE LIGHT THEME ENGINE 🎮 */

                    function getDynamicLoaderData(type) {
                        let rawName = window.currentUser && window.currentUser.name ? window.currentUser.name : 'Bisht';
                        let cleanName = rawName.split(/[\s.]+/)[0];
                        let fName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase() + " Ji";

                        // 🚀 EKDAAM PROFESSIONAL TEXTS
                        const vibes = {
                            'init': {
                                title: "SYSTEM INITIALIZATION", color1: "#0ea5e9", color2: "#3b82f6",
                                msgs: [
                                    { text: `Welcome back, ${fName}. Securing your workspace...`, anim: '🔐' },
                                    { text: `Establishing secure connection to the database...`, anim: '📡' },
                                    { text: `Loading dashboard modules and recent logs...`, anim: '📊' }
                                ]
                            },
                            'fetch': {
                                title: "SYNCING DATA", color1: "#10b981", color2: "#059669",
                                msgs: [
                                    { text: `Fetching latest records from the server...`, anim: '🔄' },
                                    { text: `Updating dashboard with real-time data...`, anim: '⚡' },
                                    { text: `Synchronizing your workspace, please wait...`, anim: '⏱️' }
                                ]
                            },
                            'api': {
                                title: "API AUTO-MATCH", color1: "#8b5cf6", color2: "#6366f1",
                                msgs: [
                                    { text: `Connecting to partner APIs securely...`, anim: '🔗' },
                                    { text: `Cross-referencing bookings with external data...`, anim: '🔍' },
                                    { text: `Processing automated matches. This may take a moment...`, anim: '⚙️' }
                                ]
                            },
                            'audit': {
                                title: "GENERATING AUDIT", color1: "#f59e0b", color2: "#d97706",
                                msgs: [
                                    { text: `Analyzing TAT and daily performance metrics...`, anim: '📈' },
                                    { text: `Compiling audit logs for the selected date range...`, anim: '📑' },
                                    { text: `Calculating deviations and generating final report...`, anim: '🧮' }
                                ]
                            },
                            'pdf': {
                                title: "PROCESSING FILES", color1: "#ec4899", color2: "#db2777",
                                msgs: [
                                    { text: `Extracting data from the uploaded documents...`, anim: '📄' },
                                    { text: `Reading filenames and matching with database...`, anim: '🔎' },
                                    { text: `Updating status to Shared across all matched records...`, anim: '✅' }
                                ]
                            },
                            'import': {
                                title: "IMPORTING CSV", color1: "#14b8a6", color2: "#0d9488",
                                msgs: [
                                    { text: `Validating CSV structure and headers...`, anim: '🧾' },
                                    { text: `Processing records and checking for duplicates...`, anim: '♻️' },
                                    { text: `Securely uploading data to the main server...`, anim: '☁️' }
                                ]
                            },
                            'ai': {
                                title: "AI PROCESSING", color1: "#a855f7", color2: "#7e22ce",
                                msgs: [
                                    { text: `Bisht Ji AI is analyzing the requested data...`, anim: '🤖' },
                                    { text: `Processing natural language query...`, anim: '🧠' },
                                    { text: `Generating insights based on current dashboard state...`, anim: '✨' }
                                ]
                            }
                        };

                        let category = 'fetch';
                        if (typeof isFirstLoad !== 'undefined' && isFirstLoad) {
                            category = 'init';
                        } else if (type && vibes[type]) {
                            category = type;
                        } else {
                            if (document.getElementById('uploadCsvModal') && document.getElementById('uploadCsvModal').classList.contains('active')) category = 'import';
                            else if (document.getElementById('apiAutoModal') && document.getElementById('apiAutoModal').style.display === 'flex') category = 'api';
                            else if (document.getElementById('auditFullPage') && document.getElementById('auditFullPage').classList.contains('active')) category = 'audit';
                            else if (document.getElementById('search-input') && document.getElementById('search-input').value !== "") category = 'fetch';
                        }

                        let selectedVibe = vibes[category];
                        let msg = selectedVibe.msgs[Math.floor(Math.random() * selectedVibe.msgs.length)];

                        return { title: selectedVibe.title, color1: selectedVibe.color1, color2: selectedVibe.color2, text: msg.text, anim: msg.anim };
                    }

                    function showLoader(type = 'fetch') {
                        let loaderData = getDynamicLoaderData(type);
                        let loaderEl = document.getElementById('loader');

                        clearTimeout(window.loaderHideTimeout); // 🚀 FIX: Prevent accidental hides during transitions

                        if (loaderEl && (!window.isPremiumLoaderSet)) {
                            loaderEl.innerHTML = `
                <div id="loader-backdrop" style="position: fixed; inset: 0; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; justify-content: center; align-items: center; z-index: 99999; transition: opacity 0.3s ease;">
                    <div style="background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05); border-radius: 20px; padding: 35px 40px; width: auto; min-width: 320px; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; animation: loaderPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
                        
                        <button onclick="hideLoader(); if(typeof showToast === 'function') showToast('Loader closed manually.');" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 16px; color: #94a3b8; cursor: pointer; transition: 0.2s; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.color='#ef4444'; this.style.background='#fee2e2';" onmouseout="this.style.color='#94a3b8'; this.style.background='transparent';">✕</button>

                        <div style="position: relative; width: 60px; height: 60px; margin-bottom: 20px;">
                            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; animation: spin 2s linear infinite;">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="${loaderData.color1}" />
                                        <stop offset="100%" stop-color="${loaderData.color2}" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" stroke-width="8" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="url(#gradient)" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="150" stroke-dashoffset="50" style="animation: dash 1.5s ease-in-out infinite;" />
                            </svg>
                            <div id="loader-anim" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; transition: transform 0.3s ease;">${loaderData.anim}</div>
                        </div>

                        <h2 id="loader-title" style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; letter-spacing: 1px; color: ${loaderData.color1}; text-transform: uppercase; font-family: 'Inter', sans-serif;">${loaderData.title}</h2>
                        <p id="loader-text" style="color: #475569; font-size: 14px; font-weight: 500; margin: 0; transition: opacity 0.3s ease;">${loaderData.text}</p>

                        <div id="loader-long-warning" style="display: none; margin-top: 15px; font-size: 11px; color: #d97706; background: #fef3c7; padding: 6px 12px; border-radius: 8px; border: 1px solid #fde68a; font-weight: 600;">
                            ⏳ Large file detected. Processing securely...
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes loaderPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    @keyframes dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 100, 200; stroke-dashoffset: -30; } 100% { stroke-dasharray: 100, 200; stroke-dashoffset: -125; } }
                </style>
                `;
                            window.isPremiumLoaderSet = true;
                        }

                        let titleEl = document.getElementById('loader-title');
                        let txtEl = document.getElementById('loader-text');
                        let animEl = document.getElementById('loader-anim');
                        let gradientStart = document.querySelector('#gradient stop:first-child');
                        let gradientEnd = document.querySelector('#gradient stop:last-child');
                        let warningEl = document.getElementById('loader-long-warning');

                        if (titleEl) { titleEl.innerText = loaderData.title; titleEl.style.color = loaderData.color1; }
                        if (gradientStart) gradientStart.setAttribute('stop-color', loaderData.color1);
                        if (gradientEnd) gradientEnd.setAttribute('stop-color', loaderData.color2);
                        if (txtEl) txtEl.innerText = loaderData.text;
                        if (animEl) animEl.innerHTML = loaderData.anim;
                        if (warningEl) warningEl.style.display = 'none';

                        if (loaderEl) {
                            loaderEl.style.display = 'block';
                            let backdrop = document.getElementById('loader-backdrop');
                            if (backdrop) backdrop.style.opacity = '1';
                        }

                        clearInterval(window.jokeInterval);
                        clearTimeout(window.longWaitTimeout);

                        window.longWaitTimeout = setTimeout(() => {
                            if (warningEl) warningEl.style.display = 'block';
                        }, 12000);

                        window.jokeInterval = setInterval(() => {
                            let newLoaderData = getDynamicLoaderData(type);
                            if (txtEl) {
                                txtEl.style.opacity = '0';
                                if (animEl) animEl.style.transform = 'scale(0.8)';
                                setTimeout(() => {
                                    txtEl.innerText = newLoaderData.text;
                                    if (animEl) { animEl.innerHTML = newLoaderData.anim; animEl.style.transform = 'scale(1)'; }
                                    txtEl.style.opacity = '1';
                                }, 300);
                            }
                        }, 3500);
                    }

                    function hideLoader() {
                        if (typeof isFirstLoad !== 'undefined') isFirstLoad = false;

                        // 🚀 CHART DATA MANGWAO JAB LOADER HATE
                        if (typeof fetchTrendStats === 'function') fetchTrendStats();

                        clearInterval(window.jokeInterval);
                        clearTimeout(window.longWaitTimeout);

                        let backdrop = document.getElementById('loader-backdrop');
                        let loaderEl = document.getElementById('loader');

                        if (backdrop) {
                            backdrop.style.opacity = '0';
                            window.loaderHideTimeout = setTimeout(() => {
                                if (loaderEl) loaderEl.style.display = 'none';
                            }, 300);
                        } else if (loaderEl) {
                            loaderEl.style.display = 'none';
                        }

                        let syncDot = document.getElementById('sync-dot');
                        if (syncDot) syncDot.classList.remove('spin');
                        let searchIcon = document.getElementById('search-icon');
                        if (searchIcon) searchIcon.innerHTML = '🔍';
                    }

                    // =========================================================
                    // 📸 BULK TRF, FLOATING VIEWER & UPLOAD LOGIC
                    // =========================================================
                    let trfQueue = [];
                    let totalTrfs = 0;
                    let processedTrfs = 0;
                    let currentUploadRid = null;
                    let currentUploadCity = null;

                    // 🟢 1. FLOATING WINDOW DRAG LOGIC
                    function dragElement(elmnt) {
                        if (!elmnt) return; // 🛡️ NULL GUARD: prevent crash if element missing
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                        var dragHeader = document.getElementById("trf-drag-header");
                        if (dragHeader) {
                            dragHeader.onmousedown = dragMouseDown;
                        }
                        function dragMouseDown(e) { e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; }
                        function elementDrag(e) { e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; elmnt.style.bottom = "auto"; elmnt.style.right = "auto"; }
                        function closeDragElement() { document.onmouseup = null; document.onmousemove = null; }
                    }
                    dragElement(document.getElementById("floating-trf-viewer"));

                    // 🟢 ROTATION TRACKER
                    let currentTrfRotation = 0;

                    // 🟢 ROTATE TRF FUNCTION
                    window.rotateTrf = function () {
                        currentTrfRotation += 90;
                        if (currentTrfRotation >= 360) currentTrfRotation = 0;

                        let iframe = document.getElementById('trf-iframe');

                        // Smooth animation lagane ke liye transition
                        iframe.style.transition = "transform 0.3s ease-in-out";

                        // Agar image tedhi (90/270) ho, toh usko thoda chota (0.8 scale) kar dete hain taki window se bahar na jaye
                        if (currentTrfRotation === 90 || currentTrfRotation === 270) {
                            iframe.style.transform = `rotate(${currentTrfRotation}deg) scale(0.8)`;
                        } else {
                            iframe.style.transform = `rotate(${currentTrfRotation}deg) scale(1)`;
                        }
                    };

                    // 🟢 3. SINGLE TRF UPLOAD (From Floating Window)
                    window.uploadSingleTrf = function (files) {
                        if (!files || files.length === 0) return;
                        document.getElementById('floating-trf-viewer').style.display = 'none'; // Window band karo

                        let file = files[0];
                        let reader = new FileReader();
                        reader.onload = function (e) {
                            showToast("⏳ Uploading Manual TRF to Background...");
                            let base64 = e.target.result.split(',')[1];

                            google.script.run
                                .withSuccessHandler(res => {
                                    showToast(res);
                                    fetchData(true); // Hard Refresh
                                })
                                .withFailureHandler(err => { showToast("❌ Error: " + err.message); })
                                .manualAttachTRF(currentUploadCity, currentUploadRid, base64, file.type);
                        };
                        reader.readAsDataURL(file);
                    };

                    // 🟢 4. DELETE TRF
                    window.deleteCurrentTrf = function () {
                        if (!confirm("Are you sure you want to remove this TRF?")) return;
                        let rid = document.getElementById('viewer-rid').value;
                        let city = document.getElementById('viewer-city').value;
                        document.getElementById('floating-trf-viewer').style.display = 'none';
                        showToast("🗑️ Removing TRF Link...");

                        google.script.run
                            .withSuccessHandler(res => { showToast(res); fetchData(true); })
                            .removeTRFLink(city, rid);
                    };


                    // 🟢 5. BULK TRF SCANNER LOGIC (With Logs)
                    window.minimizeTrfModal = function () {
                        closeFullPage('bulkTrfModal'); // 🔴 Naya Fix: Ab ye properly band aur open hoga

                        if (processedTrfs < totalTrfs) {
                            let widget = document.getElementById('floating-trf-widget');
                            if (widget) widget.style.display = 'block';
                            showToast("TRF Scanner running in background! 📸");
                        }
                    };

                    /* 🟢 NAYA SMART PDF DROPZONE LOGIC 🟢 */
                    document.addEventListener("DOMContentLoaded", () => {
                        const dropArea = document.getElementById('pdf-drop-area');
                        if (dropArea) {
                            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                                dropArea.addEventListener(eventName, preventDefaults, false);
                            });
                            function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }
                            ['dragenter', 'dragover'].forEach(eventName => {
                                dropArea.addEventListener(eventName, () => dropArea.style.backgroundColor = 'rgba(168, 85, 247, 0.2)', false);
                            });
                            ['dragleave', 'drop'].forEach(eventName => {
                                dropArea.addEventListener(eventName, () => dropArea.style.backgroundColor = 'rgba(168, 85, 247, 0.05)', false);
                            });
                            dropArea.addEventListener('drop', (e) => {
                                let dt = e.dataTransfer;
                                let files = dt.files;
                                handlePdfSelect(files);
                            });
                        }
                    });

                    // 🚀 JSZIP SUPER ENGINE: Extracts PDF names from ZIP files instantly
                    // 🚀 JSZIP SUPER ENGINE WITH PRO UX LOGS
                    function handlePdfSelect(files) {
                        if (!files || files.length === 0) return;

                        let dropArea = document.getElementById('pdf-drop-area');
                        let procContainer = document.getElementById('pdf-processing-container');
                        let logBox = document.getElementById('pdf-log-box');
                        let progBar = document.getElementById('pdf-progress-bar');
                        let countBadge = document.getElementById('pdf-count-badge');
                        let statusTitle = document.getElementById('pdf-status-title');

                        // UX: Drop area ko chota karo, Logs box dikhao
                        dropArea.style.padding = "20px";
                        dropArea.style.opacity = "0.6";
                        dropArea.style.transform = "scale(0.95)";
                        procContainer.style.display = "block";
                        logBox.innerHTML = ""; // Purane logs saaf
                        progBar.style.width = "5%";
                        progBar.style.background = "linear-gradient(90deg, #a855f7, #ec4899)";
                        statusTitle.style.color = "var(--text-main)";

                        const addLog = (msg, type = "info") => {
                            let color = type === "error" ? "#fca5a5" : (type === "success" ? "#86efac" : (type === "warn" ? "#fde047" : "#cbd5e1"));
                            let icon = type === "error" ? "❌" : (type === "success" ? "✅" : (type === "warn" ? "⚠️" : "⚡"));
                            logBox.innerHTML += `<div style="color: ${color}; margin-bottom: 6px;">${icon} ${msg}</div>`;
                            logBox.scrollTop = logBox.scrollHeight;
                        };

                        addLog("Initializing extraction engine...", "info");

                        let fileNames = [];
                        let promises = [];

                        for (let i = 0; i < files.length; i++) {
                            let file = files[i];

                            // 1. Agar file ZIP hai
                            if (file.name.toLowerCase().endsWith('.zip') || file.type === 'application/zip' || file.type === 'application/x-zip-compressed') {
                                addLog(`ZIP archive detected: [${file.name}]. Unpacking...`, "warn");
                                progBar.style.width = "30%";

                                promises.push(
                                    JSZip.loadAsync(file).then(function (zip) {
                                        let pdfCount = 0;
                                        Object.keys(zip.files).forEach(function (filename) {
                                            if (!zip.files[filename].dir && filename.toLowerCase().endsWith('.pdf') && !filename.includes('__MACOSX')) {
                                                let cleanName = filename.split('/').pop();
                                                if (cleanName) { fileNames.push(cleanName); pdfCount++; }
                                            }
                                        });
                                        addLog(`Successfully extracted ${pdfCount} PDFs from ZIP.`, "success");
                                    }).catch(err => {
                                        addLog(`Failed to read ZIP archive! Corrupted file?`, "error");
                                        console.error(err);
                                    })
                                );
                            }
                            // 2. Agar Normal PDF hai
                            else if (file.name.toLowerCase().endsWith('.pdf')) {
                                fileNames.push(file.name);
                                addLog(`Captured PDF: ${file.name}`, "info");
                            }
                            // 3. Koi aur file daal di galti se
                            else {
                                addLog(`Ignored unsupported file type: ${file.name}`, "error");
                            }
                        }

                        // Jab browser sab file padh le, tab agla step
                        Promise.all(promises).then(() => {
                            progBar.style.width = "60%";
                            countBadge.innerText = `${fileNames.length} Files Ready`;

                            if (fileNames.length === 0) {
                                addLog("No valid PDF files found to process. Aborting.", "error");
                                statusTitle.innerText = "Extraction Failed";
                                progBar.style.background = "#ef4444";
                                dropArea.style.opacity = "1";
                                dropArea.style.transform = "scale(1)";
                                return;
                            }

                            addLog(`Total ${fileNames.length} valid filenames collected.`, "info");
                            addLog(`Establishing secure connection to Database...`, "warn");
                            statusTitle.innerText = "Syncing with Google Sheets...";

                            // 🚀 BACKEND KO BHEJO
                            google.script.run
                                .withSuccessHandler(res => {
                                    progBar.style.width = "100%";
                                    progBar.style.background = "#10b981"; // Success Green
                                    statusTitle.innerText = "Sync Complete!";
                                    statusTitle.style.color = "#10b981";
                                    addLog(`Server Response: Data successfully synced!`, "success");

                                    // Thoda delay dekar success popup dikhao
                                    setTimeout(() => {
                                        closeModal('dropzoneModal');
                                        document.getElementById('successPopupText').innerText = res;
                                        document.getElementById('successPopup').classList.add('show');

                                        // Reset UI chupchap background mein agle time ke liye
                                        setTimeout(() => {
                                            dropArea.style.padding = "50px 20px";
                                            dropArea.style.opacity = "1";
                                            dropArea.style.transform = "scale(1)";
                                            procContainer.style.display = "none";
                                        }, 500);

                                    }, 1200);

                                    fetchData(true); // Dashboard Refresh
                                })
                                .withFailureHandler(err => {
                                    progBar.style.background = "#ef4444"; // Error Red
                                    statusTitle.innerText = "Server Error";
                                    statusTitle.style.color = "#ef4444";
                                    addLog(`CRITICAL ERROR: ${err.message}`, "error");
                                    dropArea.style.opacity = "1";
                                    dropArea.style.transform = "scale(1)";
                                })
                                .smartBulkMarkShared(fileNames);
                        });
                    }

                    /* 🟢 EXCEL / CSV UPLOAD LOGIC 🟢 */
                    /* 🟢 EXCEL / CSV UPLOAD LOGIC (BULLETPROOF) 🟢 */
                    function handleCsvUpload() {
                        let fileInput = document.getElementById('csv-file');
                        let citySelect = document.getElementById('import-city-select');

                        let file = fileInput ? fileInput.files[0] : null;
                        let selectedCity = citySelect ? citySelect.value : "";

                        // Agar file ya city select nahi ki hai, toh screen par saaf Alert aayega
                        if (!selectedCity) { alert("⚠️ Please select a city first from the dropdown!"); return; }
                        if (!file) { alert("⚠️ Please select a file first!"); return; }

                        showLoader('fetch');
                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        let reader = new FileReader();
                        reader.onload = function (e) {
                            let data = e.target.result;
                            let csvText = "";
                            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                                let workbook = XLSX.read(data, { type: 'binary' });
                                let firstSheet = workbook.SheetNames[0];
                                csvText = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheet]);
                            } else {
                                csvText = data;
                            }

                            google.script.run
                                .withSuccessHandler(res => {
                                    hideLoader();
                                    closeModal('uploadCsvModal');

                                    let popup = document.getElementById('successPopup');
                                    let popupText = document.getElementById('successPopupText');

                                    // Agar html wala popup sahi jagah hai, toh wahan dikhayega
                                    if (popup && popupText) {
                                        popupText.textContent = res; // innerText ki jagah textContent lagaya taaki Excel Tabs (\t) na ude
                                        popupText.style.whiteSpace = "pre"; // Excel layout ko straight rakhne ke liye
                                        popupText.style.overflowX = "auto"; // Taki lamba text scroll ho sake
                                        popupText.style.userSelect = "text"; // Aaram se mouse se copy karne ke liye
                                        popupText.style.fontFamily = "monospace"; // Data ekdum straight table jaisa dikhega
                                        popupText.style.textAlign = "left"; // Text ko left side align karne ke liye
                                        popup.classList.add('show');
                                    } else {
                                        // 🔴 NAYA: Agar HTML popup nahi mila, toh directly Screen Alert bhej dega!
                                        alert("🚀 UPLOAD STATUS:\n\n" + res);
                                    }

                                    if (fileInput) fileInput.value = "";
                                    let fileNameDisplay = document.getElementById('csv-file-name');
                                    if (fileNameDisplay) fileNameDisplay.innerText = "";

                                    fetchData(true); // Background me sheet refresh
                                })
                                .withFailureHandler(err => {
                                    hideLoader();
                                    alert("❌ System Error processing file: " + err.message);
                                })
                                .processClientCSV(csvText, userName, selectedCity);
                        };

                        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                            reader.readAsBinaryString(file);
                        } else {
                            reader.readAsText(file);
                        }
                    }

                    /* 🟢 FULL RECORD EDIT LOGIC (FIXED IDs & FUNCTION NAMES) 🟢 */
                    function openEditModal(rid) {
                        const item = globalData[currentTab].find(i => i.rid === rid);
                        if (!item) return;

                        $('edit-city').value = item.city || "";
                        $('edit-bid').value = item.bookingId || "";
                        $('edit-searchid').value = item.bookingId || item.refId || "";
                        $('edit-pname').value = item.name || "";

                        $('edit-name').value = item.name || "";
                        $('edit-age').value = item.age || "";
                        $('edit-gender').value = item.gender || "";
                        $('edit-type').value = item.type !== '-' ? item.type : "";
                        $('edit-barcode').value = (item.barcode && item.barcode !== 'Not given') ? item.barcode : "";
                        $('edit-col').value = item.colTime !== '-' ? item.colTime : "";
                        $('edit-phlebo').value = item.phleboName || "";
                        $('edit-phone').value = item.phleboPhone || "";
                        $('edit-fbs').value = item.fbs || "";
                        $('edit-rem').value = item.remarks || "";
                        $('edit-status').value = item.status || "Pending";
                        $('edit-tests').value = item.tests ? item.tests.join(', ') : "";

                        document.getElementById('editModal').style.display = 'flex';
                    }

                    /* 🟢 FULL RECORD EDIT LOGIC (FIXED IDs & FUNCTION NAMES) 🟢 */
                    // ... (baaki functions yahan hain) ...

                    function saveFullEdit() {
                        let city = $('edit-city').value;
                        let bid = $('edit-bid').value;
                        let searchId = $('edit-searchid').value || bid;
                        let oldName = $('edit-pname').value;

                        let newData = {
                            bookingId: bid,
                            name: $('edit-name').value,
                            age: $('edit-age').value,
                            gender: $('edit-gender').value,
                            type: $('edit-type').value,
                            barcode: $('edit-barcode').value,
                            colTime: $('edit-col').value,
                            phleboName: $('edit-phlebo').value,
                            phleboPhone: $('edit-phone').value,
                            fbs: $('edit-fbs').value,
                            status: $('edit-status').value,
                            remarks: $('edit-rem').value,
                            tests: $('edit-tests').value
                        };

                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        showLoader('fetch');
                        google.script.run.withSuccessHandler(res => {
                            hideLoader();

                            // 1. Edit window ko gayab karna
                            document.getElementById('editModal').style.display = 'none';

                            // 2. 🚀 MAIN FIX: Jo row open thi usko memory se band karna (Lock hatana)
                            currentlyExpandedRow = null;
                            resumeSync();

                            // 3. Exact changes ka bada Pop-up dikhana
                            alert(res);

                            // 4. Dusre tab/users ko update ping bhejna
                            if (window.fireGlobalSyncPing) window.fireGlobalSyncPing("STATUS_UPDATE", searchId, newData.status);

                            // 5. Screen ko jabardasti fresh data ke sath Paint karna (isSilent = false)
                            fetchData(false);

                        }).withFailureHandler(err => {
                            hideLoader();
                            alert("Error: " + err);
                            resumeSync();
                        }).editFullRecord(city, searchId, oldName, newData, userName);
                    }

                    /* 🟢 COMMENTS MODAL LOGIC 🟢 */
                    let currentCommentId = "";
                    function openCommentModal(rid, bookingOrReqId, patientName) {
                        currentCommentId = bookingOrReqId;
                        $('comment-subtitle').innerText = `Patient: ${patientName} | ID: ${bookingOrReqId}`;
                        $('new-comment-text').value = "";
                        $('comment-history-box').innerHTML = "Fetching comments... ⏳";
                        openModal('commentModal');

                        google.script.run.withSuccessHandler(res => {
                            $('comment-history-box').innerHTML = res.replace(/\n/g, '<br>');
                        }).withFailureHandler(err => {
                            $('comment-history-box').innerHTML = "Failed to load comments: " + err;
                        }).getRecordComments(bookingOrReqId);
                    }

                    let _commentInFlight = false;
                    function submitNewComment() {
                        let txt = $('new-comment-text').value.trim();
                        if (!txt) return showToast("Comment cannot be empty!");
                        if (!currentCommentId) return showToast("Error: No ID found for comment.");
                        if (_commentInFlight) return; // prevent double-submit

                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";
                        _commentInFlight = true;
                        $('new-comment-text').disabled = true;

                        google.script.run.withSuccessHandler(res => {
                            _commentInFlight = false;
                            $('new-comment-text').disabled = false;
                            $('new-comment-text').value = "";
                            showToast(res);
                            openCommentModal(null, currentCommentId, ""); // Refresh history
                        }).withFailureHandler(err => {
                            _commentInFlight = false;
                            $('new-comment-text').disabled = false;
                            if (typeof showToast === 'function') showToast('⚠️ Comment failed: ' + (err.message || err));
                        }).addNewComment(currentCommentId, userName, txt);
                    }

                    /* 🟢 WA MODAL 🟢 */
                    function renderWaModal() {
                        try {
                            let source = getFilteredData(globalData.pending);
                            let grouped = {};

                            source.forEach(i => {
                                let c = (i.loc && i.loc.trim() !== "" && i.loc !== "-") ? i.loc.trim() : (i.city || "Unknown");
                                if (!grouped[c]) grouped[c] = new Set();

                                let id = (i.bookingId && i.bookingId !== "--" && i.bookingId !== "") ? i.bookingId : "Pending ID";
                                let nameStr = (i.name && i.name.trim() !== "") ? i.name.trim() : "Unknown";

                                // 🔴 EKDAAM CLEAN FORMAT: Sirf Booking ID | Name
                                grouped[c].add(`${id} | ${nameStr}`);
                            });

                            let container = $('wa-export-container');
                            container.innerHTML = "";
                            let has = false;

                            for (let loc in grouped) {
                                let arr = Array.from(grouped[loc]);
                                if (arr.length > 0) {
                                    has = true;
                                    let txt = `*${loc.toUpperCase()} (${arr.length})*\n` + arr.join('\n');
                                    container.innerHTML += `<div class="wa-card"><div class="wa-city-header"><span class="wa-city-title">${loc.toUpperCase()} (${arr.length})</span><button class="btn-copy-sm" data-text="${encodeURIComponent(txt)}" onclick="copySpecificText(this)">📋 Copy</button></div><div class="wa-city-body">${arr.join('<br>')}</div></div>`;
                                }
                            }
                            if (!has) container.innerHTML = `<div style="text-align:center; padding: 40px; color:var(--text-sub);">No pending reports found.</div>`;
                        } catch (e) {
                            $('wa-export-container').innerHTML = `Error loading list: ${e.message}`;
                        }
                    }

                    function copySpecificText(btn) { const text = decodeURIComponent(btn.getAttribute('data-text')); const textArea = document.createElement("textarea"); textArea.value = text; textArea.style.position = "fixed"; textArea.style.opacity = "0"; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { document.execCommand('copy'); const originalText = btn.innerHTML; btn.innerHTML = "✓ Copied"; btn.style.backgroundColor = "#10b981"; setTimeout(() => { btn.innerHTML = originalText; btn.style.backgroundColor = ""; }, 2000); showToast("Copied!"); } catch (err) { showToast('Copy failed.'); } document.body.removeChild(textArea); }

                    // 🔴 NAYA FUNCTION: CSV Export karne ke liye (Sirf 2 Column: Booking, City)
                    function exportPendingBookingCSV() {
                        let source = getFilteredData(globalData.pending);
                        if (source.length === 0) { showToast("No pending records to export!"); return; }

                        let csv = "Booking,City\n"; // Headers
                        source.forEach(i => {
                            let id = (i.bookingId && i.bookingId !== "--" && i.bookingId !== "") ? i.bookingId : "Pending ID";
                            let c = (i.loc && i.loc.trim() !== "" && i.loc !== "-") ? i.loc.trim() : (i.city || "Unknown");
                            csv += `"${id}","${c}"\n`; // Rows
                        });

                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Pending_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
                        a.click();
                    }

                    /* 🟢 DATA & STATE 🟢 */
                    let globalData = { pending: [], create: [], incomplete: [], shared: [], log: [], summary: [], cities: [], partnerTypes: [] };
                    let currentTab = 'pending'; let tatBaseIdx = 'creat'; let VISIBLE_COUNT = 15; let currentlyExpandedRow = null; let typingTimer;

                    // 🚀 PERF: Memoized per-item via _cdt cache key to avoid re-parsing on every sort/render
                    function parseAnyDateTime(dateStr, timeStr) {
                        if (!dateStr) return null;
                        const cacheKey = (dateStr || '') + '|' + (timeStr || '');
                        if (parseAnyDateTime._cache && parseAnyDateTime._cache.has(cacheKey)) return parseAnyDateTime._cache.get(cacheKey);
                        if (!parseAnyDateTime._cache) parseAnyDateTime._cache = new Map();
                        // 🚀 PERF: Cap cache at 2000 entries to prevent unbounded memory growth in long sessions
                        if (parseAnyDateTime._cache.size > 2000) parseAnyDateTime._cache.clear();
                        let dt = new Date(); let dParts = String(dateStr).trim().match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
                        if (dParts) dt = new Date(parseInt(dParts[3]), parseInt(dParts[2]) - 1, parseInt(dParts[1])); else { let d = new Date(dateStr); if (!isNaN(d.getTime())) dt = d; } dt.setHours(0, 0, 0, 0);
                        if (!timeStr || timeStr === '-' || timeStr.toLowerCase() === 'n/a' || timeStr === '--') { parseAnyDateTime._cache.set(cacheKey, dt); return dt; }
                        let tClean = String(timeStr).trim().replace(/[.,;]/g, ':').replace(/\s*(am|pm)/i, ' $1').toUpperCase(); let tParts = tClean.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AP]M)?/);
                        if (tParts) { let h = parseInt(tParts[1]), m = parseInt(tParts[2]), ampm = tParts[4]; if (ampm === 'PM' && h < 12) h += 12; if (ampm === 'AM' && h === 12) h = 0; dt.setHours(h, m, 0, 0); }
                        parseAnyDateTime._cache.set(cacheKey, dt);
                        return dt;
                    }

                    function setTatBase(base) { tatBaseIdx = base; document.querySelectorAll('.tat-btn').forEach(b => b.classList.remove('active')); $('tat-' + base).classList.add('active'); updateTimers(); }
                    function getLocalTodayDate() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
                    function resetDates() { const t = getLocalTodayDate(); $('date-start').value = t; $('date-end').value = t; }

                    function resetFilters() {
                        let oldStart = document.getElementById('date-start') ? document.getElementById('date-start').value : "";
                        let oldEnd = document.getElementById('date-end') ? document.getElementById('date-end').value : "";

                        resetDates();

                        let newStart = document.getElementById('date-start') ? document.getElementById('date-start').value : "";
                        let newEnd = document.getElementById('date-end') ? document.getElementById('date-end').value : "";

                        // 1. Reset Checkboxes and Search
                        document.querySelectorAll('#city-drop input').forEach(c => c.checked = (c.value === "ALL"));
                        document.querySelectorAll('#type-drop input').forEach(c => c.checked = (c.value === "ALL"));
                        document.querySelectorAll('#user-drop input').forEach(c => c.checked = (c.value === "ALL"));

                        let cityTxt = document.getElementById('city-drop-text');
                        let typeTxt = document.getElementById('type-drop-text');
                        let userTxt = document.getElementById('user-drop-text');
                        if (cityTxt) cityTxt.innerText = "All Cities";
                        if (typeTxt) typeTxt.innerText = "All Partners";
                        if (userTxt) userTxt.innerText = "All Users";

                        let searchInp = document.getElementById('search-input');
                        let searchIcon = document.getElementById('search-icon');
                        if (searchInp) searchInp.value = "";
                        if (searchIcon) searchIcon.innerHTML = '🔍';

                        // 🔴 NAYA JADOO: Pending Filter ko wapas 'All Pending' par lana
                        let pFilter = document.getElementById('pending-time-filter');
                        if (pFilter) pFilter.value = 'ALL';

                        switchTab('pending', true);

                        // ULTRA-SMART LOGIC: Agar Date change nahi hui hai, toh download mat karo! Instantly dikhao.
                        if (oldStart === newStart && oldEnd === newEnd && globalData.pending && globalData.pending.length > 0) {
                            updateUI();
                            showToast("Filters Reset Instantly! ⚡");
                        } else {
                            // Agar purani date thi (jaise last week) aur aaj par reset kiya hai, tabhi fetch karo.
                            globalData.log = []; globalData.shared = []; globalData.create = []; globalData.incomplete = []; globalData.pending = [];
                            updateUI();

                            let fName = window.currentUser && window.currentUser.name ? window.currentUser.name.split(' ')[0] : 'Bhaiya';
                            let jokes = [
                                `✨ ${fName} bhai, bas ek lamba saans lijiye, aaj ka taaza data aa raha hai... 🧘‍♂️`,
                                `🚀 Sabar ka fal meetha hota hai ${fName} ji! Data bas raste mein hi hai... 🍎`,
                                `🕵️‍♂️ Ekdum fresh reports nikal raha hoon ${fName} aapke liye, bas 2 second... ⏳`,
                                `🏃‍♂️ Bhag ke gaya hoon server room ${fName} bhai, bas table bharne hi wala hai... 💨`,
                                `😎 Relax ${fName}! System apna kaam kar raha hai, aap agla step sochiye... 🧠`,
                                `⚙️ Purana data screen se hata diya hai ${fName}, naya data background me load ho raha hai... 🧹`
                            ];
                            let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

                            let mainList = document.getElementById('main-list');
                            if (mainList) {
                                mainList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:50px; font-weight:800; color:#ec4899; font-size:15px; animation: rowFadeIn 0.4s ease forwards;">${randomJoke}</td></tr>`;
                            }
                            showToast('Loading Today\'s Data... 📅');
                            fetchData(true);
                        }
                    }

                    function handleSearch() {
                        // 🚀 PERF: Debounced 180ms — prevents full re-render on every keystroke
                        clearTimeout(typingTimer);
                        typingTimer = setTimeout(() => {
                            snapshotFilters();
                            updateUI();
                        }, 180);
                        let searchVal = $('search-input').value.trim();
                        $('search-icon').innerHTML = searchVal.length > 0 ? '🔍' : '🔍';
                    }

                    // 🔴 FIX: Now strictly checks specific columns instead of dumping whole JSON, preventing accidental data loss!
                    function isStrictlyValidRecord(item) {
                        let s = String(item.status || "").toLowerCase();
                        let r = String(item.remarks || "").toLowerCase();
                        let id = String(item.bookingId || "").toLowerCase().replace(/\s+/g, '');

                        // Sirf tab hide karega agar intentionally status ya remark me cancel/reject likha ho
                        if (s.includes("not collect") || s.includes("cancel") || s.includes("reject")) return false;
                        if (r.includes("cancel") || r.includes("reject")) return false;
                        if (id.includes("cancel") || id.includes("reject") || id.includes("notcollect")) return false;

                        return true;
                    }

                    let isFetching = false;
                    let currentFetchId = 0; // 🔴 NAYA: Overlapping requests ko rokne ke liye

                    // 🚀 NAYA: Manual click karne par saare locks tod do aur data laao
                    window.forceDashboardRefresh = function () {
                        showToast('Hard Syncing with Server... ⚡');
                        isTyping = false; // Typing lock hatao
                        isFetching = false; // Purana fetch cancel karo
                        currentlyExpandedRow = null; // Khuli hui row ko band karo taaki fresh data dikhe
                        fetchData(false); // false = Full screen loader aayega aur confirm update hoga
                    };

                    function fetchData(isSilent = false) {
                        if (!window.currentUser) return;
                        if (isSilent && isTyping) return;

                        // 🚀 STRICT LOCK REMOVED: Row open hone par bhi data fetch hoga

                        if (isFetching && isSilent) return; // Background sync ko aapas me takrane se rokna

                        currentFetchId++; // Har naye click par ek naya ID
                        let myFetchId = currentFetchId;
                        isFetching = true;

                        if (!isSilent) showLoader('fetch'); else $('sync-dot').classList.add('spin');

                        // ── ⏱️ 10-SECOND LOADER FAILSAFE ─────────────────────────────────────────
                        // Nuclear option: if the backend hangs, the success handler throws, or
                        // hideLoader is never reached for ANY reason, this forcibly clears the
                        // loading screen after 10 seconds so the UI is never permanently stuck.
                        // ⏱️ 25-second loader failsafe with accessible retry button
                        const fetchSafetyTimer = !isSilent ? setTimeout(function () {
                            console.warn('⚠️ fetchData safety timer fired — forcibly hiding loader after 25s.');
                            var loaderEl = document.getElementById('loader');
                            if (loaderEl) loaderEl.style.display = 'none';
                            var bd = document.getElementById('loader-backdrop');
                            if (bd) bd.style.opacity = '0';
                            var sd = document.getElementById('sync-dot');
                            if (sd) sd.classList.remove('spin');
                            isFetching = false;
                            // Show accessible retry notice in table
                            const tbody = document.getElementById('main-list');
                            if (tbody) {
                                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px 20px;">
                                    <div style="font-size:32px; margin-bottom:12px;">⏌</div>
                                    <div style="font-size:15px; font-weight:700; color:var(--text-main); margin-bottom:6px;">Connection timed out</div>
                                    <div style="font-size:13px; color:var(--text-sub); margin-bottom:18px;">The server took too long to respond. Please try again.</div>
                                    <button class="btn-apple btn-primary" onclick="window.forceDashboardRefresh()" style="padding:10px 24px; font-size:13px; font-weight:700;" aria-label="Retry loading dashboard data">
                                        🔄 Retry
                                    </button>
                                </td></tr>`;
                            }
                        }, 25000) : null;

                        google.script.run
                            .withSuccessHandler((data) => {
                                if (fetchSafetyTimer) clearTimeout(fetchSafetyTimer); // Defuse the failsafe — all good
                                // 🔴 NAYA FIX: Agar aapne Apply daba diya hai, toh background wale purane data ko screen par aane se roko
                                if (myFetchId !== currentFetchId) return;

                                // 🔴 NAYA FIX: Ab ID random nahi hogi. Isse refresh hone par khuli hui row band nahi hogi!
                                const assignId = (arr) => arr.forEach((i, index) => {
                                    let baseId = (i.bookingId && i.bookingId !== "--" && i.bookingId !== "") ? i.bookingId : ((i.refId && i.refId !== "--" && i.refId !== "") ? i.refId : i.name);
                                    i.rid = 'row-' + String(baseId).replace(/[^a-zA-Z0-9]/g, '') + '-' + String(i.city).replace(/[^a-zA-Z0-9]/g, '') + '-idx-' + index;
                                    // 🚀 PERF: Pre-build searchIndex once at load time (avoids rebuilding on every filter call)
                                    if (!i.searchIndex) i.searchIndex = [i.bookingId, i.name, i.city, i.refId, i.phleboName, i.drName, i.referredBy, i.barcode, i.type, i.loc].filter(Boolean).join(' ').toLowerCase();
                                    // 🚀 PERF: Pre-parse date once per item so sort/filter don't re-parse
                                    if (!i._parsedDate) { let pd = parseAnyDateTime(i.date, null); i._parsedDate = pd ? pd.getTime() : 0; }
                                });

                                globalData = {
                                    pending: data.pending.filter(i => isStrictlyValidRecord(i)),
                                    create: data.create.filter(i => isStrictlyValidRecord(i)),
                                    incomplete: data.incomplete.filter(i => isStrictlyValidRecord(i)),
                                    shared: data.shared.filter(i => isStrictlyValidRecord(i)),
                                    log: data.log.filter(i => isStrictlyValidRecord(i)),
                                    summary: data.summary,
                                    cities: data.cities,
                                    partnerTypes: data.partnerTypes
                                };

                                assignId(globalData.pending); assignId(globalData.create); assignId(globalData.incomplete); assignId(globalData.shared); assignId(globalData.log);

                                // 🚀 ULTRA-FAST BOOT FIX: Data ko browser memory mein save kar lo
                                try { localStorage.setItem('offline_dashboard_cache', JSON.stringify(globalData)); } catch (e) { }

                                // ── 🛡️ BULLETPROOF UI RENDER ───────────────────────────────────────
                                // updateUI() or renderList() crashing must NEVER prevent hideLoader().
                                try {
                                    if (!isTyping) {
                                        updateUI();
                                        if ($('emailGenPage').classList.contains('active')) renderEmailGenerator(true);
                                    }
                                } catch (uiError) {
                                    console.error('🔴 updateUI() crashed — forcing hideLoader() anyway:', uiError);
                                    if (typeof showToast === 'function') showToast('⚠️ UI render error. Try Force Sync.');
                                }

                                // 🚀 THE MAGIC FIX: Agar silent (background) task tha, toh main loader band mat karo!
                                if (!isSilent) {
                                    hideLoader();
                                } else {
                                    let syncDot = document.getElementById('sync-dot');
                                    if (syncDot) syncDot.classList.remove('spin');
                                }

                                isFetching = false;

                            }).withFailureHandler((err) => {
                                if (fetchSafetyTimer) clearTimeout(fetchSafetyTimer);
                                if (myFetchId !== currentFetchId) return;
                                console.error('[fetchData] Backend error:', err);

                                // 🛡️ RELIABILITY: On failure try offline cache so dashboard never goes blank
                                if (Object.keys(globalData.pending || {}).length === 0) {
                                    try {
                                        const cached = localStorage.getItem('offline_dashboard_cache');
                                        if (cached) {
                                            const parsed = JSON.parse(cached);
                                            if (parsed && parsed.pending) {
                                                globalData = parsed;
                                                updateUI();
                                                if (typeof showToast === 'function') showToast('⚠️ Network error. Showing cached data.');
                                            }
                                        }
                                    } catch (_) { /* cache miss — ignore */ }
                                } else {
                                    if (typeof showToast === 'function') showToast('⚠️ Sync failed. Showing last data.');
                                }

                                if (!isSilent) {
                                    hideLoader();
                                } else {
                                    let syncDot = document.getElementById('sync-dot');
                                    if (syncDot) syncDot.classList.remove('spin');
                                }

                                isFetching = false;
                            }).getDashboardData($('date-start').value, $('date-end').value, $('search-input').value.trim());
                    }

                    /* 🟢 APPLY FILTERS & CUSTOM SELECT LOGIC 🟢 */
                    function handleMultiCheck(type) {
                        const drop = $(type + '-drop');
                        const checkboxes = Array.from(drop.querySelectorAll('input[type="checkbox"]'));
                        const allBox = checkboxes.find(c => c.value === "ALL");
                        const clicked = event.target;

                        if (clicked.value === "ALL" && clicked.checked) {
                            checkboxes.forEach(c => { if (c.value !== "ALL") c.checked = false; });
                        } else if (clicked.checked) {
                            allBox.checked = false;
                        }

                        let selected = checkboxes.filter(c => c.checked).map(c => c.value);
                        if (selected.length === 0) { allBox.checked = true; selected = ["ALL"]; }

                        const textSpan = $(type + '-drop-text');
                        if (selected.includes("ALL")) textSpan.innerText = type === 'city' ? "All Cities" : (type === 'type' ? "All Partners" : "All Users");
                        else if (selected.length === 1) textSpan.innerText = selected[0];
                        else textSpan.innerText = selected.length + " Selected";

                        updateUI();
                    }

                    // Dropdown ke bahar click karne par use band karna
                    document.addEventListener('click', function (e) {
                        if (!e.target.closest('.custom-multi-select')) {
                            document.querySelectorAll('.multi-drop-list').forEach(d => d.classList.remove('show'));
                        }
                    });

                    function getFilteredData(source) {
                        // 🚀 PERF: Snapshot all filter state once — avoids 3 separate querySelectorAll per call
                        const _cityBoxes = getFilteredData._cityBoxes;
                        const _typeBoxes = getFilteredData._typeBoxes;
                        const _userBoxes = getFilteredData._userBoxes;
                        const _searchF   = getFilteredData._searchF;

                        let res = source || [];
                        if (_cityBoxes && _cityBoxes.length > 0 && !_cityBoxes.includes("ALL")) res = res.filter(i => _cityBoxes.includes(i.city));
                        if (_typeBoxes && _typeBoxes.length > 0 && !_typeBoxes.includes("ALL")) res = res.filter(i => _typeBoxes.includes((i.type || "").trim()));

                        if (_userBoxes && _userBoxes.length > 0 && !_userBoxes.includes("ALL")) {
                            res = res.filter(i => {
                                if (_userBoxes.includes("API") && i.isApi) return true;
                                if (_userBoxes.includes("Manual") && !i.isApi) return true;
                                return false;
                            });
                        }

                        if (_searchF) res = res.filter(i => (i.searchIndex && i.searchIndex.includes(_searchF)));

                        // Old vs Today Pending Filter — uses pre-parsed _parsedDate for speed
                        if (currentTab === 'pending') {
                            let pFilter = document.getElementById('pending-time-filter');
                            if (pFilter && pFilter.value !== 'ALL') {
                                let todayTs = getFilteredData._todayTs;
                                if (!todayTs) { let t = new Date(); t.setHours(0,0,0,0); todayTs = t.getTime(); }
                                if (pFilter.value === 'OLD')   res = res.filter(item => (item._parsedDate || 0) < todayTs);
                                if (pFilter.value === 'TODAY') res = res.filter(item => (item._parsedDate || 0) >= todayTs);
                            }
                        }

                        return res;
                    }
                    // 🚀 PERF: Call this before renderList() to snapshot DOM filter state once
                    function snapshotFilters() {
                        const cityBoxVals  = Array.from(document.querySelectorAll('#city-drop input:checked') || []).map(c => c.value);
                        const typeBoxVals  = Array.from(document.querySelectorAll('#type-drop input:checked') || []).map(c => c.value);
                        const userBoxVals  = Array.from(document.querySelectorAll('#user-drop input:checked') || []).map(c => c.value);
                        // 🛡️ RELIABILITY: treat empty arrays as ALL — prevents first-render blank table
                        // when dropdowns haven't been populated yet
                        getFilteredData._cityBoxes = cityBoxVals.length  ? cityBoxVals  : ['ALL'];
                        getFilteredData._typeBoxes = typeBoxVals.length  ? typeBoxVals  : ['ALL'];
                        getFilteredData._userBoxes = userBoxVals.length  ? userBoxVals  : ['ALL'];
                        getFilteredData._searchF   = ($('search-input') ? $('search-input').value : '').toLowerCase().trim();
                        // 🛡️ RELIABILITY: Always recompute todayTs — prevents stale date in overnight sessions (>midnight)
                        let t = new Date(); t.setHours(0,0,0,0); getFilteredData._todayTs = t.getTime();
                    }

                    function updateThemeBackground() {
                        // 🔒 RESPECT USER'S CUSTOM THEME — only auto-switch for default green/orange/red
                        const savedTheme = localStorage.getItem('saved_premium_theme');
                        const autoThemes = ['theme-green', 'theme-orange', 'theme-red', null, undefined, ''];
                        if (!autoThemes.includes(savedTheme)) return; // User chose ocean/emerald/sunset/aurora — never override

                        let fPending = getFilteredData(globalData.pending);
                        let baseClass = fPending.length >= 16 ? 'theme-red' : (fPending.length > 0 ? 'theme-orange' : 'theme-green');

                        // 🔴 SURGICAL: Only swap the color-theme class, preserve dark-mode + style- classes
                        const ALL_COLOR_THEMES = ['theme-ocean', 'theme-emerald', 'theme-sunset', 'theme-aurora', 'theme-green', 'theme-red', 'theme-orange'];
                        ALL_COLOR_THEMES.forEach(t => document.body.classList.remove(t));
                        document.body.classList.add(baseClass);

                        // 🚀 Re-apply style class if it was accidentally removed
                        const savedStyle = localStorage.getItem('hyperGlassThemeStyle');
                        if (savedStyle && !document.body.classList.contains('style-' + savedStyle)) {
                            document.body.classList.add('style-' + savedStyle);
                        }
                        // 🚀 Re-apply dark mode if it was accidentally removed
                        if (localStorage.getItem('hg_darkMode') === 'true' && !document.body.classList.contains('dark-mode')) {
                            document.body.classList.add('dark-mode');
                        }
                    }

                    // 🚀🚀 ELITE: rAF-coalescing gate — collapses rapid-fire updateUI() calls to 1 render/frame
                    // Multiple triggers (Firebase tick + filter change + TAT change) within the same event loop
                    // now produce exactly one DOM update instead of N.
                    let _uiRafId = null;
                    const _updateUICore = function _updateUICore() {
                        _uiRafId = null;

                        // \ud83d\ude80 Phase 1 snapshot: empty checkboxes → treated as ALL (safe for first render)
                        // Phase 2 snapshot (after step 7) updates again when dropdowns are populated.
                        snapshotFilters();

                        // 1. Last Update Time check
                        const lastUpdateEl = $('last-update');
                        if (lastUpdateEl) {
                            lastUpdateEl.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }

                        // 2. Data Filtering — all calls now reuse the snapshotted filter state
                        let fPending = getFilteredData(globalData.pending),
                            fCreate = getFilteredData(globalData.create),
                            fIncomplete = getFilteredData(globalData.incomplete),
                            fShared = getFilteredData(globalData.shared),
                            fLog = getFilteredData(globalData.log);

                        // 3. 🟢 PENDING SPLIT: Old vs Today (Strictly Column A Date)
                        let totalPending = fPending.length;
                        let todayForComparison = new Date();
                        todayForComparison.setHours(0, 0, 0, 0);

                        let oldPendingCount = 0;
                        let todayPendingCount = 0;

                        fPending.forEach(item => {
                            let dStr = String(item.date || "").trim().split(" ")[0];
                            let itemDate = new Date(0);
                            let parts = dStr.split(/[-/]/);

                            if (parts.length === 3) {
                                let p1 = parseInt(parts[0], 10), p2 = parseInt(parts[1], 10), p3 = parseInt(parts[2], 10);
                                if (p3 > 1000) { itemDate = p2 > 12 ? new Date(p3, p1 - 1, p2) : new Date(p3, p2 - 1, p1); }
                                else if (p1 > 1000) { itemDate = new Date(p1, p2 - 1, p3); }
                            } else {
                                let d = new Date(dStr); if (!isNaN(d.getTime())) itemDate = d;
                            }
                            itemDate.setHours(0, 0, 0, 0);

                            // 🚀 DIRECT COMPARE: Sirf aur sirf Column A ki date match karni hai!
                            if (itemDate.getTime() < todayForComparison.getTime()) oldPendingCount++;
                            else todayPendingCount++;
                        });

                        // Updating Pending KPI with Split Colors
                        const kpiPend = $('kpi-pending');
                        if (kpiPend) {
                            kpiPend.innerHTML = `
                ${totalPending}
                <div style="font-size: 11px; font-weight: 700; margin-top: 6px; display: flex; gap: 5px; justify-content: center;">
                    <span style="color: #ef4444; background: rgba(239,68,68,0.1); padding: 1px 4px; border-radius: 4px;" title="Old Pending">Old: ${oldPendingCount}</span>
                    <span style="color: var(--text-sub);">|</span>
                    <span style="color: #3b82f6; background: rgba(59,130,246,0.1); padding: 1px 4px; border-radius: 4px;" title="Today's Pending">Tdy: ${todayPendingCount}</span>
                </div>
            `;
                        }

                        // 4. Standard KPI Updates
                        // 🚀 FIX: Backend already filtered Shared for "Today", so we just use the length directly
                        if ($('kpi-create')) $('kpi-create').innerText = fCreate.length;
                        if ($('kpi-incomplete')) $('kpi-incomplete').innerText = fIncomplete.length;
                        if ($('kpi-shared')) $('kpi-shared').innerText = fShared.length;

                        // 5. 🟢 LOGS SPLIT: API vs Manual (From your latest requirements)
                        let totalLogs = fLog.length;
                        let apiLogsCount = fLog.filter(item => item.isApi === true).length;
                        let manualLogsCount = totalLogs - apiLogsCount;

                        const kpiLog = $('kpi-log');
                        if (kpiLog) {
                            kpiLog.innerHTML = `
                ${totalLogs}
                <div style="font-size: 11px; font-weight: 700; margin-top: 6px; display: flex; gap: 5px; justify-content: center;">
                    <span style="color: #10b981; background: rgba(16,185,129,0.1); padding: 1px 4px; border-radius: 4px;">API: ${apiLogsCount}</span>
                    <span style="color: var(--text-sub);">|</span>
                    <span style="color: #eab308; background: rgba(234,179,8,0.1); padding: 1px 4px; border-radius: 4px;">Man: ${manualLogsCount}</span>
                </div>
            `;

                            // 🟢 DYNAMIC LABEL: "TODAYS LOGS" -> "TOTAL LOGS"
                            let logLabel = kpiLog.nextElementSibling;
                            let dateInput = $('date-start');
                            if (logLabel && dateInput) {
                                let d = new Date();
                                let todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                logLabel.innerText = (dateInput.value && dateInput.value !== todayStr) ? "TOTAL LOGS" : "TODAYS LOGS";
                            }
                        }

                        // 6. Tabs Visibility & Count (Essential for navigation)
                        const toggleTab = (id, count) => {
                            const btn = $('tab-' + id);
                            if (btn) {
                                btn.style.display = count === 0 ? 'none' : 'inline-block';
                                if (count > 0) {
                                    let label = id.charAt(0).toUpperCase() + id.slice(1);
                                    if (id === 'log') label = 'All Logs';
                                    btn.innerText = `${label} (${count})`;
                                }
                            }
                        };
                        toggleTab('pending', fPending.length);
                        toggleTab('create', fCreate.length);
                        toggleTab('incomplete', fIncomplete.length);
                        toggleTab('shared', fShared.length);
                        toggleTab('log', fLog.length);

                        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
                        if ($('tab-' + currentTab)) $('tab-' + currentTab).classList.add('active');

                        if (typeof updateThemeBackground === "function") updateThemeBackground();

                        // 7. Dropdown Population (City & Partner Type)
                        const cityDrop = $('city-drop');
                        if (cityDrop && cityDrop.children.length === 0 && globalData.cities) {
                            cityDrop.innerHTML = `<label><input type="checkbox" value="ALL" checked onchange="handleMultiCheck('city')"> All Cities</label>` +
                                globalData.cities.map(c => `<label><input type="checkbox" value="${c}" onchange="handleMultiCheck('city')"> ${c}</label>`).join('');
                        }

                        const typeDrop = $('type-drop');
                        if (typeDrop && typeDrop.children.length === 0 && globalData.partnerTypes) {
                            typeDrop.innerHTML = `<label><input type="checkbox" value="ALL" checked onchange="handleMultiCheck('type')"> All Partners</label>` +
                                globalData.partnerTypes.map(t => `<label><input type="checkbox" value="${t}" onchange="handleMultiCheck('type')"> ${t}</label>`).join('');
                        }

                        // 🚀 CRITICAL: Snapshot filters AFTER dropdowns are populated
                        // so first-render always has valid checked checkboxes to read
                        snapshotFilters();
                        // 8. City Summary & Modal Table (Accurate Unique Counting)
                        let cityStats = {};
                        if (globalData.cities) {
                            globalData.cities.forEach(c => { cityStats[c] = { total: 0, pending: 0 }; });

                            // 🚀 THE FIX: Map ka use karke double-counting hamesha ke liye khatam. (Ignore fLog overlap)
                            let uniqueAll = new Map();
                            [...fPending, ...fCreate, ...fIncomplete, ...fShared].forEach(item => {
                                if (item && item.rid) uniqueAll.set(item.rid, item);
                            });

                            let uniquePending = new Map();
                            [...fPending, ...fCreate, ...fIncomplete].forEach(item => {
                                if (item && item.rid) uniquePending.set(item.rid, item);
                            });

                            // Calculate True Totals (Shared + Pending + Incomplete + Create)
                            uniqueAll.forEach(item => {
                                if (cityStats[item.city]) cityStats[item.city].total++;
                            });

                            // Calculate True Pending (Pending + Incomplete + Create)
                            uniquePending.forEach(item => {
                                if (cityStats[item.city]) cityStats[item.city].pending++;
                            });

                            let sumHtml = '', modalSumHtml = '';
                            Object.keys(cityStats).sort().forEach(city => {
                                let stats = cityStats[city];
                                if (stats.total === 0 && stats.pending === 0) return;
                                const pBadge = stats.pending > 0 ? 'badge-pend' : 'badge-zero';
                                sumHtml += `<div class="city-row"><span>${city}</span><div><span class="badge badge-total" title="Total Sample Mapped">${stats.total}</span> <span class="badge ${pBadge}" title="Currently Pending">${stats.pending}</span></div></div>`;
                                modalSumHtml += `<tr><td style="padding: 12px; font-weight: 700;">${city}</td><td align="center"><span style="font-weight:900; color:#3b82f6;">${stats.total}</span></td><td align="right"><span class="badge ${pBadge}">${stats.pending}</span></td></tr>`;
                            });

                            if ($('city-summary')) $('city-summary').innerHTML = sumHtml || '<div style="padding:10px; font-size:11px;">No data matching filters</div>';
                            if ($('city-modal-body')) $('city-modal-body').innerHTML = modalSumHtml || '<tr><td colspan="3" style="text-align:center;">No data matching filters</td></tr>';
                        }

                        // 9. Final Render Trigger
                        if (typeof renderList === "function") renderList();
                    }; // end _updateUICore

                    function updateUI() {
                        if (_uiRafId) return; // already queued for this frame — drop duplicate
                        _uiRafId = requestAnimationFrame(_updateUICore);
                    }

                    function switchTab(t, avoidRender = false) { currentTab = t; currentlyExpandedRow = null; document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active')); if ($('tab-' + t)) $('tab-' + t).classList.add('active'); if (window.innerWidth <= 768) { $('sidebar').classList.remove('active-mobile'); $('mobile-overlay').classList.remove('active'); } if (!avoidRender) { VISIBLE_COUNT = 15; renderList(); } }
                    function showNext10() { VISIBLE_COUNT += 15; renderList(); }

                    /* 🟢 RENDER MAIN LIST (ULTRA COMPACT, COPYABLE REF BY & UPDATED TAT) 🟢 */
                    function renderList() {
                        const tbody = $('main-list'); tbody.innerHTML = '';
                        // 🚀 Always re-snapshot before standalone renderList calls (e.g. showNext10, switchTab)
                        snapshotFilters();
                        let data = getFilteredData(globalData[currentTab]);

                        // 🔴 SORTING LOGIC: PPMC Priority + pre-parsed datetime (avoids re-parsing on each comparison)
                        const isRevSort = (currentTab === 'log' || currentTab === 'shared');
                        data.sort((a, b) => {
                            let aIsPPMC = (a.type || "").toLowerCase().includes("ppmc") ? 1 : 0;
                            let bIsPPMC = (b.type || "").toLowerCase().includes("ppmc") ? 1 : 0;
                            if (aIsPPMC !== bIsPPMC) return bIsPPMC - aIsPPMC;
                            // 🚀 Use cached parseAnyDateTime (memoized) — zero re-parse cost
                            let tA = (parseAnyDateTime(a.date, a.colTime) || new Date(0)).getTime();
                            let tB = (parseAnyDateTime(b.date, b.colTime) || new Date(0)).getTime();
                            return isRevSort ? tB - tA : tA - tB;
                        });

                        if (data.length === 0) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px;">No records found. 🎉</td></tr>'; return; }

                        // 🚀🚀 ELITE VIRTUAL SCROLL: Only render visible rows for 200+ datasets.
                        // A top + bottom spacer maintains the true scroll height without rendering offscreen TR nodes.
                        const VIRT_THRESHOLD = 200;
                        const useVirtual = data.length > VIRT_THRESHOLD;
                        const PAGE = useVirtual ? 40 : VISIBLE_COUNT; // virtual: always render 40 rows from top
                        const dataToRender = data.slice(0, useVirtual ? PAGE : VISIBLE_COUNT);

                        // Spacer row at bottom simulates full scroll height (row ~52px avg)
                        const bottomCount = Math.max(0, data.length - dataToRender.length);
                        const ROW_HEIGHT_APPROX = 52;

                        const frag = document.createDocumentFragment();
                        if (useVirtual && bottomCount > 0) {
                            const spacer = document.createElement('tr');
                            spacer.id = 'vscroll-spacer';
                            spacer.style.height = (bottomCount * ROW_HEIGHT_APPROX) + 'px';
                            spacer.style.display = 'block';
                            // Will be added after real rows
                        }
                        const dataToShow = dataToRender;

                        dataToShow.forEach((item, index) => {
                            const rid = item.rid;
                            let uniqueRIds = [...new Set(item.rIds || (item.refId ? [item.refId] : []))].filter(Boolean);
                            let reqIdsStr = uniqueRIds.join(",");
                            let isNeedsCreation = (item.bookingId === "" || item.bookingId === "--");

                            // 🌟 COMPACT IDs
                            let rIdPills = uniqueRIds.map(id => `<div class="pill pill-req copyable" onclick="copyTxt('${id}'); event.stopPropagation();" style="margin-top:2px; font-size:9px; padding:2px 5px;">Req: ${id}</div>`).join('');

                            let ids = isNeedsCreation ? `<div style="color:var(--danger); font-weight:800; font-size:11px; margin-bottom:2px;">No ID</div>` : `<div class="copyable" style="font-weight:800; font-size:13px; margin-bottom:2px;" onclick="copyTxt('${item.bookingId}'); event.stopPropagation();">${item.bookingId}</div>`;
                            ids += `<div style="display:flex; flex-direction:column; gap:2px;">${rIdPills}</div>`;

                            // 🚀 FIX: REFERRED BY - COMPACT & CLICK TO COPY
                            let refName = item.drName || item.referredBy || item.refBy;
                            if (refName && refName.trim() !== "" && refName !== "-" && refName.toLowerCase() !== "na") {
                                let safeRefName = refName.replace(/'/g, "\\'");
                                ids += `<div class="copyable" title="Click to copy" onclick="copyTxt('${safeRefName}'); event.stopPropagation();" style="margin-top: 4px; padding: 2px 4px; background: #fef2f2; border-left: 2px solid #ef4444; border-radius: 0 3px 3px 0; display: inline-block; cursor: pointer; width: fit-content;">
                                <div style="font-size: 8px; color: #b91c1c; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2px; line-height: 1;">Ref By:</div>
                                <div style="font-size: 10px; font-weight: 700; color: #7f1d1d; margin-top: 1px; line-height: 1.1;">${refName}</div>
                            </div>`;
                            }

                            let safeName = item.name ? item.name.replace(/'/g, "\\'") : "";
                            let rawTrfLink = item.trfLink ? item.trfLink : '';
                            let eyeColor = item.trfLink ? "#ec4899" : "#64748b";
                            let eyeBg = item.trfLink ? "#fdf2f8" : "#f1f5f9";

                            let trfViewBtn = `<button class="btn-apple" style="background:${eyeBg}; color:${eyeColor}; border: 1px solid ${item.trfLink ? '#fbcfe8' : '#e2e8f0'}; padding:2px 6px; font-size:9px; margin-top:2px;" onclick="openFloatingTrf('${rawTrfLink}', '${rid}', '${item.city}'); event.stopPropagation()">👁️ TRF</button><br>`;

                            // 🌟 COMPACT DETAILS
                            let details = `<div style="font-weight:800; font-size:12px; margin-bottom:2px;" class="copyable p-name" onclick="copyTxt('${safeName}'); event.stopPropagation();">${item.name}</div>${trfViewBtn}<div class="badges" style="margin-top:2px; display:flex; flex-wrap:wrap; gap:2px;">`;
                            if (item.age) details += `<span class="pill" style="padding:2px 5px; font-size:9px;">👤 ${item.age}/${item.gender || '?'}</span>`;
                            if (item.fbs) details += `<span class="pill" style="padding:2px 5px; font-size:9px;">🩸 ${item.fbs}</span>`;
                            if (item.isApi) details += `<span class="pill" style="padding:2px 5px; font-size:9px; background: #f3e8ff; color: #7e22ce; border: 1px solid #d8b4fe; font-weight: 700;">💜 API Bkg</span>`;
                            if (item.barcode && item.barcode !== 'Not given' && item.barcode !== '-' && item.barcode.toLowerCase() !== 'na') details += `<span class="pill copyable" style="padding:2px 5px; font-size:9px;" onclick="copyTxt('${item.barcode}'); event.stopPropagation();">🏷️ ${item.barcode}</span>`;

                            let isPPMC = (item.type || "").toLowerCase().includes("ppmc");
                            let typeColor = isPPMC ? 'background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5;' : 'background: rgba(100,116,139,0.1); color: var(--text-main);';
                            if (item.type && item.type !== '-') details += `<span class="pill" style="padding:2px 5px; font-size:9px; ${typeColor}">🏢 ${item.type}</span>`;

                            if (item.isDuplicate) details += `<span class="pill pill-dup" style="padding:2px 5px; font-size:9px;">⚠️ Dup</span>`;
                            if (item.caseType === 'Add-on') details += `<span class="pill" style="padding:2px 5px; font-size:9px; background: rgba(236, 72, 153, 0.1); color: #ec4899; border-color: rgba(236, 72, 153, 0.2);">➕ Add-on</span>`;
                            if (item.caseType === 'Missing') details += `<span class="pill" style="padding:2px 5px; font-size:9px; background: rgba(249, 115, 22, 0.1); color: #f97316; border-color: rgba(249, 115, 22, 0.2);">❓ Missing</span>`;

                            let logsText = item.auditLogs || "";
                            if (logsText.includes("[AI-AUTO]")) {
                                let filledMatch = logsText.match(/\[AI-AUTO\] Filled: (.*?)\./);
                                let filledWhat = filledMatch ? filledMatch[1] : "data";
                                details += `<span class="pill" style="padding:2px 5px; font-size:9px; background: linear-gradient(135deg, #faf5ff, #f3e8ff); color: #9333ea; border: 1px solid #d8b4fe; font-weight: bold; cursor: help;" title="AI ne khud bhara: ${filledWhat}">✨ AI Filled</span>`;
                            }
                            if (logsText.includes("[AI-DOUBT]")) {
                                let doubtMatch = logsText.match(/\[AI-DOUBT\] Unreadable: (.*?)\./);
                                let doubtWhat = doubtMatch ? doubtMatch[1] : "Kuch samajh nahi aaya";
                                details += `<span class="pill" style="padding:2px 5px; font-size:9px; background: #fff7ed; color: #ea580c; border: 1px solid #fdba74; font-weight: bold; cursor: help;" title="TRF theek se nahi padha gaya. Doubt in: ${doubtWhat}">⚠️ AI Doubt</span>`;
                            }

                            details += `</div>`;

                            let actionHtml = '', stLow = (item.status || '').toLowerCase(), sColor = stLow.includes('share') ? 'var(--success)' : (stLow.includes('high') ? 'var(--danger)' : (stLow.includes('process') ? 'var(--warning)' : 'var(--text-main)'));

                            if (currentTab === 'create') {
                                let apiBtn = !isPPMC ? `<button class="btn-apple" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-color: rgba(139, 92, 246, 0.3); font-size: 9px; padding: 4px 6px; margin-left: 4px;" onclick="handleInstantBookingPaste('${rid}', {value:'API Bkg'}, '${item.city}', '${item.bookingId}', '${safeName}', '${reqIdsStr}'); event.stopPropagation()" title="Mark as API">⚡ API</button>` : '';
                                actionHtml = `<div style="font-size:9px; font-weight:700; color:var(--text-sub); margin-bottom:2px;">Paste ID & Enter:</div>
                    <div style="display:flex; align-items:stretch;">
                        <input type="text" class="new-booking-input" placeholder="Booking ID..." style="flex:1; padding:2px 4px; font-size:10px;" onchange="handleInstantBookingPaste('${rid}', this, '${item.city}', '${item.bookingId}', '${safeName}', '${reqIdsStr}')" onfocus="pauseSync()" onblur="resumeSync()" onclick="event.stopPropagation()">
                        ${apiBtn}
                    </div>`;
                            }
                            else if (currentTab === 'incomplete') actionHtml = `<div style="display:flex; flex-direction:column; gap:4px; max-width:240px;" onclick="event.stopPropagation()"><div style="display:flex; gap:2px; flex-wrap:wrap;"><input type="text" id="inc-col-${rid}" value="${(item.colTime && item.colTime !== '-') ? item.colTime : ''}" placeholder="Col Time" style="width:115px; padding:2px 4px; font-size:10px;" onfocus="pauseSync()" onblur="resumeSync()" ${item.colTime && item.colTime !== '-' ? 'disabled class="clean-input"' : 'class="missing-input"'}><input type="text" id="inc-age-${rid}" value="${item.age || ''}" placeholder="Age" style="width:45px; padding:2px 4px; font-size:10px;" onfocus="pauseSync()" onblur="resumeSync()" ${item.age ? 'disabled class="clean-input"' : 'class="missing-input"'}><select id="inc-gender-${rid}" style="width:65px; padding:2px 4px; font-size:10px;" onfocus="pauseSync()" onblur="resumeSync()" ${item.gender ? 'disabled class="clean-input"' : 'class="missing-select"'}><option value="">Sex</option><option ${item.gender === 'Male' ? 'selected' : ''}>Male</option><option ${item.gender === 'Female' ? 'selected' : ''}>Female</option></select><select id="inc-fbs-${rid}" style="width:85px; padding:2px 4px; font-size:10px; color:#d97706;" onfocus="pauseSync()" onblur="resumeSync()" ${item.fbs ? 'disabled class="clean-input"' : 'class="missing-select"'}><option value="">FBS/RBS</option><option value="FBS" ${item.fbs === 'FBS' ? 'selected' : ''}>FBS</option><option value="RBS" ${item.fbs === 'RBS' ? 'selected' : ''}>RBS</option><option value="Only Urine" ${item.fbs === 'Only Urine' ? 'selected' : ''}>Only Urine</option><option value="N/A" ${item.fbs === 'N/A' ? 'selected' : ''}>N/A</option></select></div><div style="display:flex; gap:2px;"><input type="text" id="inc-bid-${rid}" value="${!isNeedsCreation ? item.bookingId : ''}" placeholder="Booking ID" style="width:100%; padding:2px 4px; font-size:10px;" onfocus="pauseSync()" onblur="resumeSync()" ${!isNeedsCreation ? 'disabled class="clean-input"' : 'class="missing-input"'}></div><button class="btn-apple btn-primary" style="padding: 4px; font-size: 10px; justify-content: center; width: 100%; font-weight:700;" onclick="updateIncompleteRow('${rid}', '${item.city}', '${item.bookingId}', '${safeName}', '${reqIdsStr}', event)">💾 Smart Save</button></div>`;
                            else actionHtml = `<select class="status-select" id="status-${rid}" style="color:${sColor}; border-color:${sColor}; padding: 2px 6px; font-size:11px;" onchange="autoSaveRow('${rid}', this, '${item.city}', '${item.bookingId}', '${safeName}', '${reqIdsStr}')" onfocus="pauseSync()" onblur="resumeSync()" onclick="event.stopPropagation()"><option value="Pending" ${stLow.includes('pending') || stLow === '' ? 'selected' : ''}>Pending</option><option value="Under processing" ${stLow.includes('process') ? 'selected' : ''}>Under processing</option><option value="High TAT" ${stLow.includes('high') ? 'selected' : ''}>High TAT</option><option value="N/A" ${stLow === 'n/a' || stLow === 'na' ? 'selected' : ''}>N/A</option><option value="Shared" ${stLow.includes('share') ? 'selected' : ''}>Shared</option></select>`;

                            // 🔴 NAYA DYNAMIC TAT LOGIC (Sirf 2 options: Col ya Creat)
                            let timerHtml = '';
                            if (isNeedsCreation) {
                                timerHtml = `<div class="tat-timer" style="background: rgba(128,128,128,0.1); color: var(--text-sub); padding: 2px 6px; font-size:9px;">⏳ Pending Creation</div>`;
                            } else if (currentTab === 'incomplete') {
                                timerHtml = `<div class="tat-timer" style="background: rgba(245, 158, 11, 0.1); color: var(--warning); padding: 2px 6px; font-size:9px;">⏳ Awaiting Details</div>`;
                            } else {
                                let tatInfo = getDynamicTat(item);
                                timerHtml = `<div style="font-size: 9px; font-weight: 700; color: ${tatInfo.color}; display: flex; align-items: center; margin-top: 3px; background: ${tatInfo.color}15; padding: 2px 6px; border-radius: 4px; border: 1px solid ${tatInfo.color}40; width: max-content;">
                                    ⏰ ${tatInfo.text} ${tatInfo.badge}
                                </div>`;
                            }

                            let rowClass = isNeedsCreation ? 'compact-row row-highlight' : 'compact-row';
                            let expClass = (currentlyExpandedRow === rid) ? 'expanded' : '';

                            let phleboInfo = '';
                            if (item.phleboName) phleboInfo = `<div>💉 Phlebo: <b style="color:var(--text-main);">${item.phleboName}</b> ${item.phleboPhone ? `<span style="font-size:10px; color:var(--text-sub);">(${item.phleboPhone})</span>` : ''}</div>`;
                            let locInfo = item.loc ? `<div style="font-size:9px; font-weight:600; color:var(--text-sub); margin-top:1px;">📍 ${item.loc}</div>` : '';

                            let mixedStyle = item.isMixed ? 'background: rgba(126, 34, 206, 0.08) !important; border-left: 4px solid #7e22ce !important;' : '';

                            // 🌟 COMPACT TD PADDING
                            let tdStyle = 'padding: 6px 8px; vertical-align: top; border-bottom: 1px solid var(--border-light);';

                            const row = `
                <tr class="${rowClass} ${expClass}" id="${rid}" style="animation-delay: ${index * 0.02}s; ${mixedStyle}; cursor:pointer;" onclick="toggleRow('${rid}', event)">
                    <td style="${tdStyle} white-space:nowrap;"><div style="font-weight:700; color:var(--primary-dark); font-size:12px; margin-bottom:2px;">${item.city}</div><div style="font-size:10px; color:var(--text-sub); font-weight:600;">📅 ${item.date}</div><div style="font-size:9px; font-weight:600; color:var(--text-sub); margin-top:1px;">🕒 ${item.colTime || '-'}</div>${locInfo}</td>
                    <td style="${tdStyle}">${ids}</td>
                    <td style="${tdStyle}">${details}</td>
                    <td style="${tdStyle}">${actionHtml}<br>${timerHtml}</td>
                    <td style="${tdStyle} text-align: right; vertical-align: middle;"><span class="expand-icon" id="icon-${rid}">▼</span></td>
                </tr>
                <tr class="details-row" style="display:${expClass ? 'table-row' : 'none'};" id="details-${rid}">
                    <td colspan="5" style="padding:0;">
                        <div class="details-content allow-text-select" onmousedown="event.stopPropagation();" onclick="event.stopPropagation();">
                            
                            <div class="details-col allow-text-select">
                                <span class="details-title" style="color: var(--primary);">📦 Package Details</span>
                                <div style="margin-bottom:8px; display: flex; flex-wrap: wrap; gap: 6px;">
                                    ${item.tests ? item.tests.map(t => `<div class="allow-text-select" style="display:inline-block; background: var(--input-bg); padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; color: var(--text-main); border: 1px solid var(--border-light); cursor: text;">${t}</div>`).join('') : '<span style="font-size:11px; color:var(--text-sub);">No tests assigned</span>'}
                                </div>
                                
                                <div class="compact-info-grid">
                                    <div class="compact-info-item" style="grid-column: span 2; background: rgba(79, 70, 229, 0.05); border-color: rgba(79, 70, 229, 0.15);">
                                        <span class="compact-info-label" style="color: var(--primary);">💉 Phlebotomist</span>
                                        <span class="compact-info-val allow-text-select" style="font-size: 13px; font-weight: 700; cursor: text;">${item.phleboName || 'Unassigned'} ${item.phleboPhone ? `<span style="font-size: 11px; font-weight: 500; color: var(--text-sub);">(${item.phleboPhone})</span>` : ''}</span>
                                    </div>
                                    <div class="compact-info-item">
                                        <span class="compact-info-label">🩸 Col. Time</span>
                                        <span class="compact-info-val">${item.colTime || '-'}</span>
                                    </div>
                                    <div class="compact-info-item">
                                        <span class="compact-info-label">📥 Sub. Time</span>
                                        <span class="compact-info-val">${item.subTime || '-'}</span>
                                    </div>
                                    <div class="compact-info-item" style="grid-column: span 2;">
                                        <span class="compact-info-label">⚡ Bkg Creation</span>
                                        <span class="compact-info-val" style="color:var(--primary); font-size: 12px;">${item.latestSubTime || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="details-col allow-text-select">
                                <span class="details-title" style="color: var(--warning);">⚙️ Remarks & Actions</span>
                                <input type="text" class="clean-input" style="padding:10px 12px; font-size:12px; border: 1px dashed var(--border-light); border-radius: 8px;" id="note-${rid}" value="${item.remarks || ''}" placeholder="Type operational notes here..." onchange="autoSaveRow('${rid}', null, '${item.city}', '${item.bookingId}', '${safeName}', '${reqIdsStr}')" onfocus="pauseSync()" onblur="resumeSync()" ${currentTab === 'log' ? 'disabled' : ''}>
                                
                                <button class="btn-apple premium-btn-wide" style="background: var(--input-bg); border: 1px solid var(--border-light); color: var(--text-main);" onclick="openEditModal('${rid}');">
                                    ✏️ Edit Full Record
                                </button>
                                
                                <div style="margin-top: auto; padding-top: 12px; border-top: 1px dashed var(--border-light); position: relative;">
                                    <span class="details-title" style="color:#a855f7;">🤖 AI Assistant</span>
                                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                                        <button type="button" class="btn-apple btn-ai-sparkle premium-btn-wide" onclick="pauseSync(); categorizeTestsAI('${rid}');">🪄 Breakdown Tests</button>
                                    </div>
                                    <div style="display: flex; gap: 6px; margin-top: 8px;">
                                        <input type="text" id="ai-search-${rid}" class="clean-input" style="padding: 10px 12px; font-size: 12px; flex: 1; border-color: #a855f7; border-style: dashed;" placeholder="Search test names..." onfocus="pauseSync()" onblur="resumeSync()" onkeypress="if(event.key === 'Enter') searchAltTestName('${rid}')">
                                        <button type="button" class="btn-apple btn-primary" style="padding: 10px 14px; background: #a855f7; border-radius: 8px; box-shadow: 0 4px 10px rgba(168,85,247,0.3);" onclick="searchAltTestName('${rid}')">🔍</button>
                                    </div>
                                    
                                    <div id="ai-result-box-${rid}" class="allow-text-select" style="margin-top: 12px; background: var(--input-bg); border: 1px solid #a855f7; padding: 16px; border-radius: 10px; display: none; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; white-space: pre-wrap; line-height: 1.6; position: relative; box-shadow: inset 0 2px 8px rgba(168,85,247,0.1);">
                                        <div style="position: absolute; top: 8px; right: 8px;">
                                            <button type="button" onclick="document.getElementById('ai-result-box-${rid}').style.display='none';" style="background: rgba(239, 68, 68, 0.1); border: none; cursor: pointer; color: var(--danger); font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 6px; transition: 0.2s;">✕ Close</button>
                                        </div>
                                        <div id="ai-result-content-${rid}" class="allow-text-select" style="padding-top: 10px; cursor: text;"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="details-col allow-text-select">
                                <span class="details-title" style="color: var(--success);">💬 Comms & Logs</span>
                                <button class="btn-apple premium-btn-wide" style="background: rgba(0, 122, 255, 0.05); color: var(--primary); border: 1px solid rgba(0, 122, 255, 0.2);" onclick="openCommentModal('${rid}', '${item.bookingId || item.refId}', '${safeName.replace(/'/g, "\\'")}');">
                                    💬 View / Add Comments
                                </button>
                                <div style="margin-top: 16px; font-size: 11px; color: var(--text-sub); text-align: center; font-style: italic; line-height: 1.5;">
                                    Activity logs and external communications are stored here. Select text freely from anywhere in this window.
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;
                            frag.appendChild((() => { const t = document.createElement('tbody'); t.innerHTML = row; return t.firstChild; })());
                        });

                        // 🚀 PERF: Single DOM write via DocumentFragment (eliminates per-row reflow)
                        tbody.appendChild(frag);

                        // Append bottom spacer for virtual scroll
                        if (typeof useVirtual !== 'undefined' && useVirtual && bottomCount > 0) {
                            const spacer = document.createElement('tr');
                            spacer.id = 'vscroll-spacer';
                            const spacerTd = document.createElement('td');
                            spacerTd.colSpan = 5;
                            spacerTd.style.height = (bottomCount * ROW_HEIGHT_APPROX) + 'px';
                            spacerTd.style.padding = '0';
                            spacer.appendChild(spacerTd);
                            tbody.appendChild(spacer);
                        } else if (VISIBLE_COUNT < data.length) {
                            tbody.insertAdjacentHTML('beforeend', `<tr><td colspan="5" style="text-align:center; padding:15px;"><button class="btn-apple" onclick="showNext10(); event.stopPropagation();">Load More (${data.length - VISIBLE_COUNT} remaining)</button></td></tr>`);
                        }

                        // 🚀 NAYA FIX: List refresh hone ke baad Locks ko wapas paint karo
                        if (typeof window.updateLiveLocksUI === 'function') {
                            window.updateLiveLocksUI();
                        }
                    }

                    /* 🟢 SMART TOGGLE ROW 🟢 */
                    function toggleRow(rid, event) {
                        if (event) {
                            let t = event.target.tagName;
                            if (t === 'INPUT' || t === 'SELECT' || t === 'BUTTON' || event.target.classList.contains('copyable')) return;
                        }

                        let detailsRow = document.getElementById('details-' + rid);
                        let mainRow = document.getElementById(rid);
                        let icon = document.getElementById('icon-' + rid);

                        if (currentlyExpandedRow === rid) {
                            detailsRow.style.display = 'none';
                            mainRow.classList.remove('expanded');
                            if (icon) icon.innerText = '▼';
                            currentlyExpandedRow = null;
                            if (typeof releaseLockFirebase === 'function') releaseLockFirebase(rid);
                        } else {
                            if (currentlyExpandedRow) {
                                let oldDetails = document.getElementById('details-' + currentlyExpandedRow);
                                let oldMain = document.getElementById(currentlyExpandedRow);
                                let oldIcon = document.getElementById('icon-' + currentlyExpandedRow);
                                if (oldDetails) oldDetails.style.display = 'none';
                                if (oldMain) oldMain.classList.remove('expanded');
                                if (oldIcon) oldIcon.innerText = '▼';
                                if (typeof releaseLockFirebase === 'function') releaseLockFirebase(currentlyExpandedRow);
                            }

                            detailsRow.style.display = 'table-row';
                            mainRow.classList.add('expanded');
                            if (icon) icon.innerText = '▲';
                            currentlyExpandedRow = rid;
                            if (typeof acquireLockFirebase === 'function') acquireLockFirebase(rid);
                        }
                    }

                    function updateTimers() { document.querySelectorAll('.dynamic-timer').forEach(el => { const ds = el.dataset; const status = (ds.status || '').toLowerCase(); let baseStr = tatBaseIdx === 'col' ? ds.col : (tatBaseIdx === 'sub' ? ds.sub : ds.creat); if (!baseStr || baseStr === '-' || baseStr === '--' || baseStr === 'N/A') { if (tatBaseIdx === 'creat') baseStr = ds.sub; if (!baseStr || baseStr === '-' || baseStr === 'N/A') baseStr = ds.col; } const baseTime = parseAnyDateTime(ds.date, baseStr); if (!baseTime) { el.innerHTML = '⏳ Awaiting Time Data'; el.className = 'tat-timer timer-neutral'; return; } if (status.includes('share')) { const shareTime = parseAnyDateTime(ds.date, ds.share); if (shareTime) { let diff = shareTime - baseTime; if (diff < 0) diff += 86400000; const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000); el.innerHTML = `✅ Shared in ${h}h ${m}m`; el.className = 'tat-timer timer-done'; } else { el.innerHTML = '✅ Shared (No Time)'; el.className = 'tat-timer timer-done'; } } else { const targetTime = baseTime.getTime() + 21600000; const now = new Date().getTime(); const left = targetTime - now; if (left > 0) { const h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000); el.innerHTML = `⏱️ ${h}h ${m}m left`; el.className = left < 3600000 ? 'tat-timer timer-warn' : 'tat-timer timer-safe'; } else { const late = Math.abs(left), h = Math.floor(late / 3600000), m = Math.floor((late % 3600000) / 60000); el.innerHTML = `🚨 Late by ${h}h ${m}m`; el.className = 'tat-timer timer-danger'; } } }); }

                    /* 🟢 INSTANT AUTO SAVE & OPTIMISTIC UI (100% FAST) 🟢 */
                    // 🛡️ RELIABILITY: Per-row in-flight lock — prevents duplicate updateRecord calls from rapid changes
                    const _autoSaveInFlight = new Set();

                    function autoSaveRow(rid, changedEl, city, bId, patientName, reqIdsStr) {
                        if (_autoSaveInFlight.has(rid)) return; // drop duplicate while save is in-flight
                        let newStatus = document.getElementById('status-' + rid) ? document.getElementById('status-' + rid).value : "N/A";
                        let newRemarks = document.getElementById('note-' + rid) ? document.getElementById('note-' + rid).value : "";
                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        // 1. Dropdown ka color turant Green/Yellow karo
                        if (changedEl && changedEl.tagName === "SELECT" && changedEl.classList.contains("status-select")) {
                            const sColor = newStatus.toLowerCase().includes('share') ? 'var(--success)' : (newStatus.toLowerCase().includes('high') ? 'var(--danger)' : (newStatus.toLowerCase().includes('process') ? 'var(--warning)' : 'var(--text-main)'));
                            changedEl.style.color = sColor; changedEl.style.borderColor = sColor;
                        }

                        // 2. Firebase Ping - Dusre users ki screen par animation bhejo
                        if (changedEl && changedEl.classList.contains('status-select')) {
                            if (typeof window.fireGlobalSyncPing === 'function') {
                                window.fireGlobalSyncPing('STATUS_UPDATE', rid, newStatus);
                            }
                        }

                        // 3. KHUD KI SCREEN SE TURANT GAYAB KARO (0.2 sec magic)
                        let stLow = newStatus.toLowerCase();
                        // 🛡️ Snapshot old status for rollback on failure
                        let _prevStatus = changedEl && changedEl.tagName === 'SELECT' ? changedEl.dataset.prevVal || changedEl.value : null;
                        if (changedEl && changedEl.tagName === 'SELECT') changedEl.dataset.prevVal = changedEl.value;

                        if (currentTab !== 'shared' && currentTab !== 'log' && stLow.includes('share')) {
                            let row = document.getElementById(rid);
                            let detailsRow = document.getElementById('details-' + rid);

                            // Turant slide-out animation do
                            if (row) {
                                row.style.transition = "all 0.3s ease-out";
                                row.style.opacity = "0";
                                row.style.transform = "translateX(50px)";

                                // 0.3 second baad screen se hamesha ke liye delete kar do
                                setTimeout(() => {
                                    if (row) row.remove();
                                    if (detailsRow) detailsRow.remove();
                                }, 300);
                            }

                            // Background Data array se bhi hata do taaki tab switch karne par wapas na aaye
                            if (typeof globalData !== 'undefined' && globalData[currentTab]) {
                                let idx = globalData[currentTab].findIndex(i => i.rid === rid);
                                if (idx > -1) {
                                    let item = globalData[currentTab].splice(idx, 1)[0];
                                    item.status = newStatus;
                                    if (globalData.shared) globalData.shared.unshift(item);
                                }
                            }
                            showToast("Moved to Shared!");
                        } else {
                            if (changedEl && changedEl.tagName !== "INPUT") changedEl.style.opacity = '0.5';
                        }

                        // 4. Background mein chup-chap Google Sheet me save karo
                        _autoSaveInFlight.add(rid);
                        google.script.run.withSuccessHandler(res => {
                            _autoSaveInFlight.delete(rid);
                            if (changedEl) changedEl.style.opacity = '1';
                            // Agar record Shared nahi hua hai, tabhi refresh karo
                            if (!stLow.includes('share')) {
                                fetchData(true);
                            }
                        }).withFailureHandler(err => {
                            _autoSaveInFlight.delete(rid);
                            if (changedEl) changedEl.style.opacity = '1';
                            // 🛡️ Rollback select to previous value so UI stays consistent
                            if (changedEl && changedEl.tagName === 'SELECT' && _prevStatus) changedEl.value = _prevStatus;
                            if (typeof showToast === 'function') showToast('⚠️ Save failed. Please retry.');
                            else console.error('autoSaveRow failed:', err);
                        }).updateRecord(city, bId, patientName, newStatus, newRemarks, "", reqIdsStr, "", "", "", "", userName);
                    }

                    let _incompleteInFlight = new Set();
                    function updateIncompleteRow(rid, city, oldBid, name, reqIdsStr, event) {
                        if (event) event.stopPropagation();
                        if (_incompleteInFlight.has(rid)) return; // prevent double-submit
                        let nBid = $('inc-bid-' + rid) ? $('inc-bid-' + rid).value.trim() : "";
                        let na = $('inc-age-' + rid) ? $('inc-age-' + rid).value : "";
                        let ng = $('inc-gender-' + rid) ? $('inc-gender-' + rid).value : "";
                        let nfbs = $('inc-fbs-' + rid) ? $('inc-fbs-' + rid).value : "";
                        let ncol = $('inc-col-' + rid) ? $('inc-col-' + rid).value : "";

                        let hasPatientDetails = (na !== "" && ng !== "" && nfbs !== "" && ncol !== "");
                        let hasBookingId = (nBid !== "");

                        // Validations: Requires either Booking ID OR Patient details to proceed
                        if (!hasPatientDetails && !hasBookingId) {
                            showToast("Please fill Booking ID OR all Patient Details!");
                            return;
                        }

                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        // Optimistic UI update
                        let idx = globalData.incomplete.findIndex(i => i.rid === rid);
                        if (idx > -1) {
                            let item = globalData.incomplete.splice(idx, 1)[0];
                            item.bookingId = nBid; item.age = na; item.gender = ng; item.fbs = nfbs; item.colTime = ncol;

                            if (hasBookingId) {
                                globalData.pending.unshift(item); // ID found -> Send to Pending
                                showToast("ID Found! Moved to Pending.");
                            } else {
                                globalData.create.unshift(item); // No ID but details full -> Send to 'To Create'
                                showToast("Details Saved! Moved to To Create.");
                            }
                        }

                        currentlyExpandedRow = null;
                        updateUI();

                        _incompleteInFlight.add(rid);
                        google.script.run.withSuccessHandler(() => {
                            _incompleteInFlight.delete(rid);
                            fetchData(true);
                        }).withFailureHandler((e) => {
                            _incompleteInFlight.delete(rid);
                            if (typeof showToast === 'function') showToast('⚠️ Update failed: ' + (e.message || e));
                            fetchData(true);
                        }).updateRecord(city, oldBid, name, "", $('note-' + rid) ? $('note-' + rid).value : "", nBid, reqIdsStr, na, ng, nfbs, ncol, userName);
                    }

                    let _pasteInFlight = new Set();
                    function handleInstantBookingPaste(rid, el, city, oldBid, name, reqIdsStr) {
                        let nb = el.value.trim();
                        if (!nb || _pasteInFlight.has(rid)) return;
                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        // Optimistic UI update
                        let idx = globalData.create.findIndex(i => i.rid === rid);
                        if (idx > -1) {
                            let item = globalData.create.splice(idx, 1)[0];
                            item.bookingId = nb;
                            globalData.pending.unshift(item);
                        }

                        currentlyExpandedRow = null;
                        updateUI();
                        showToast("ID Added! Moved to Pending.");

                        _pasteInFlight.add(rid);
                        google.script.run.withSuccessHandler(() => {
                            _pasteInFlight.delete(rid);
                            fetchData(true);
                        }).withFailureHandler(e => {
                            _pasteInFlight.delete(rid);
                            if (typeof showToast === 'function') showToast('⚠️ ID save failed: ' + (e.message || e));
                            fetchData(true);
                        }).updateRecord(city, oldBid, name, "", $('note-' + rid) ? $('note-' + rid).value : "", nb, reqIdsStr, "", "", "", "", userName);
                    }

                    function categorizeTestsAI(rid) {
                        const box = document.getElementById('ai-result-box-' + rid);
                        const content = document.getElementById('ai-result-content-' + rid);
                        const item = globalData[currentTab].find(i => i.rid === rid);
                        if (!item || !item.tests || item.tests.length === 0) { showToast("No tests to categorize."); return; }

                        box.style.display = 'block';
                        content.innerHTML = `Categorizing ${item.tests.length} tests... ⏳`;

                        // 🔴 ULTIMATE STRICT PROMPT FOR GROQ
                        const prompt = `You are a strict Medical Lab Director. Categorize the input tests into exactly 4 MUTUALLY EXCLUSIVE groups. 
    CRITICAL RULE: A test can ONLY belong to ONE category. NEVER repeat a test in multiple categories.

    INPUT DATA:
    ${item.tests.join(' | ')}

    CATEGORY RULES:
    1. LFT: Liver tests ONLY (ALT, AST, ALP, Bilirubin, GGT, Albumin, Globulin, Total Protein). STRICT: NEVER put KFT or Kidney Function Test here!
    2. KFT: Kidney tests ONLY (BUN, Urea, Creatinine, Uric Acid, Electrolytes, "Kidney Function Test", "KFT").
    3. Urine: Any test explicitly containing "Urine", "CUE", "Cotinine", or "Nicotine".
    4. Others: Everything else (RBS, FBS, HbA1c, Lipid, CBC, Haemogram, HbsAg, HIV, ESR, Iron, etc.).

    INSTRUCTION: 
    Do not output any explanations. Output EXACTLY 4 lines in this exact format using short names:

    LFT (count): [Test1|Test2]
    KFT (count): [Test1|Test2]
    Urine (count): [Test1|Test2]
    Others (count): [Test1|Test2]`;

                        google.script.run
                            .withSuccessHandler(res => {
                                // 🔴 NAYA JADOO: AI ke "Enter" (\n) ko HTML ke "<br>" me badal diya taaki 4 alag lines aayen
                                let formattedRes = res ? res.replace(/\n/g, '<br>') : "No result from AI.";

                                content.innerHTML = `<b style="color:#a855f7; font-size:13px; display:block; margin-bottom:8px;">📊 Test Breakdown:</b><div style="line-height: 1.6; font-size: 11.5px; font-weight: 500;">${formattedRes}</div>`;
                            })
                            .withFailureHandler(err => {
                                content.innerHTML = `<span style="color:var(--danger)">Error fetching categories: ${err.message}</span>`;
                            })
                            .callGeminiAPI(prompt, 0.0); // ✅ FIX: Isey wapas callGeminiAPI kar diya hai kyunki backend function ka naam yahi hai
                    }

                    function searchAltTestName(rid) {
                        const input = $('ai-search-' + rid);
                        const q = input.value.trim();
                        if (!q) return;

                        const box = $('ai-result-box-' + rid);
                        const content = $('ai-result-content-' + rid);

                        box.style.display = 'block';
                        content.innerHTML = `Searching alternative names for "${q}"... ⏳`;

                        const prompt = `What are the common medical alternative names or abbreviations for the lab test: "${q}"? Give a very short, direct answer in 1-2 lines.`;

                        google.script.run.withSuccessHandler(res => {
                            content.innerHTML = `<b style="color:#a855f7; font-size:14px; display:block; margin-bottom:8px;">🔍 Search Result for "${q}":</b><div style="line-height: 1.8; color: var(--text-main); font-weight: 500;">${res}</div>`;
                            input.value = "";
                        }).withFailureHandler(err => {
                            content.innerHTML = `<span style="color:var(--danger)">Error searching.</span>`;
                        }).callGrokAPI(prompt, 0.1); // 🔴 Yahan bhi callGrokAPI laga diya hai
                    }

                    /* 🟢 GMAIL STYLE E-MAIL GENERATOR LOGIC 🟢 */
                    const emailConfig = {
                        cc: "appointments@redcliffelabs.com, jayraj@redcliffelabs.com, sandeep.rawat@redcliffelabs.com, dropoff@redcliffelabs.com",
                        to: {
                            "Delhi NCR": "srnoida@redcliffelabs.com, bhagwan.singh@redcliffelabs.com, diveak.rustogi@redcliffelabs.com, abhishekrajput485@gmail.com, abhishek.negi@redcliffelabs.com, laboperations.faridabad@redcliffelabs.com, laboperations.gurgaon@redcliffelabs.com",
                            "Mumbai": "laboperations.mumbai@redcliffelabs.com, bhupendra.singh@redcliffelabs.com",
                            "Lucknow": "laboperations.lucknow@redcliffelabs.com, raghvendra.shukla@redcliffelabs.com, bushra.sarwar@redcliffelabs.com",
                            "Chandigarh": "laboperation.chandigarh@redcliffelabs.com, anita.bhatti@redcliffelabs.com",
                            "Jaipur": "laboperations.jaipur@redcliffelabs.com, deepak.deepak@redcliffelabs.com",
                            "Chennai": "dhivakar.r@redcliffelabs.com, laboperations.chennai@redcliffelabs.com",
                            "Mohali": "laboperation.chandigarh@redcliffelabs.com, anita.bhatti@redcliffelabs.com",
                            "Kolkata": "laboperations.kolkata@redcliffelabs.com, sandip.kundu@redcliffelabs.com",
                            "Pune": "laboperations.pune@redcliffelabs.com, laboperations.punepcmc@redcliffelabs.com, sumit.tiwari@redcliffelabs.com"
                        }
                    };
                    let cityEmailGroups = {}; let currentActiveCity = null;

                    function openEmailGenerator() { $('emailGenPage').classList.add('active'); renderEmailGenerator(); }

                    function renderEmailGenerator(preserveSelection = false) {
                        cityEmailGroups = {};

                        let allData = [
                            ...(globalData.pending || []),
                            ...(globalData.log || []),
                            ...(globalData.create || [])
                        ];

                        let uniqueMap = new Map();
                        allData.forEach(item => {
                            if (item && item.bookingId && item.bookingId !== "--" && item.bookingId !== "") {
                                uniqueMap.set(item.bookingId, item);
                            }
                        });

                        let mergedData = Array.from(uniqueMap.values());

                        // 🌟 NAYA DATE FILTER (BULLETPROOF DATE PARSING)
                        let today = new Date();
                        today.setHours(0, 0, 0, 0);

                        mergedData.forEach(item => {
                            let bId = String(item.bookingId).trim();
                            let mStatus = item.mailStatus ? String(item.mailStatus).trim().toLowerCase() : "";

                            let isToday = false;
                            if (item.date) {
                                // 🚀 FIX: Time ko pehle hatao taaki date parsing fail na ho
                                let dStr = String(item.date).trim().split(" ")[0];
                                let itemDate = new Date(0); // Default

                                let parts = dStr.split(/[-/]/);
                                if (parts.length === 3) {
                                    let p1 = parseInt(parts[0], 10);
                                    let p2 = parseInt(parts[1], 10);
                                    let p3 = parseInt(parts[2], 10);

                                    if (p3 > 1000) {
                                        // DD/MM/YYYY ya MM/DD/YYYY
                                        if (p2 > 12) itemDate = new Date(p3, p1 - 1, p2);
                                        else itemDate = new Date(p3, p2 - 1, p1);
                                    } else if (p1 > 1000) {
                                        // YYYY-MM-DD
                                        itemDate = new Date(p1, p2 - 1, p3);
                                    }
                                } else {
                                    let d = new Date(dStr);
                                    if (!isNaN(d.getTime())) itemDate = d;
                                }

                                itemDate.setHours(0, 0, 0, 0);

                                // Compare with Today
                                if (itemDate.getTime() === today.getTime()) {
                                    isToday = true;
                                }
                            }

                            // 🛡️ FIX: skip if mailStatus is "sent" OR is a URL (old bug: URL stored in col-G treated as not-sent)
                            let isMailSent = (mStatus === "sent") || (mStatus.startsWith("http"));
                            if (!isMailSent && isToday) {
                                if (!cityEmailGroups[item.city]) cityEmailGroups[item.city] = [];
                                cityEmailGroups[item.city].push(item);
                            }
                        });

                        const tabsContainer = document.getElementById('email-tabs-container');
                        if (!tabsContainer) return;
                        tabsContainer.innerHTML = '';
                        let hasData = false;

                        for (let city in cityEmailGroups) {
                            hasData = true;
                            const count = cityEmailGroups[city].length;
                            const div = document.createElement('div');
                            div.className = `city-tab ${currentActiveCity === city ? 'active' : ''}`;
                            div.onclick = (e) => selectEmailCity(city, e);
                            div.innerHTML = `<span class="city-tab-title">${city}</span> <span class="badge badge-pend">${count}</span>`;
                            tabsContainer.appendChild(div);
                        }

                        if (!hasData) {
                            tabsContainer.innerHTML = `<div style="padding: 20px; color: var(--text-sub); text-align: center; font-size: 12px;">No pending emails for today.</div>`;
                            document.getElementById('email-compose-area').style.display = 'none';
                            document.getElementById('email-empty-state').style.display = 'flex';
                            document.getElementById('email-empty-state').innerHTML = `<div style="font-size: 50px;">🎉</div><div>All drafts generated for today!</div>`;
                        } else if (!preserveSelection || !cityEmailGroups[currentActiveCity]) {
                            selectEmailCity(Object.keys(cityEmailGroups)[0]);
                        }
                    }

                    function getFormattedDateForSubject() { const d = new Date(), months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], date = d.getDate(); let nth = "th"; if (date === 1 || date === 21 || date === 31) nth = "st"; else if (date === 2 || date === 22) nth = "nd"; else if (date === 3 || date === 23) nth = "rd"; return date + nth + " " + months[d.getMonth()]; }

                    function selectEmailCity(city, event) {
                        currentActiveCity = city;
                        document.querySelectorAll('.city-tab').forEach(el => el.classList.remove('active'));
                        if (event && event.currentTarget) event.currentTarget.classList.add('active');
                        else if (document.querySelector('.city-tab')) document.querySelector('.city-tab').classList.add('active');

                        $('email-empty-state').style.display = 'none';

                        // 🚀 THE CSS NUKE: Purane saare design locks todne ke liye
                        if (!document.getElementById('css-nuke')) {
                            let style = document.createElement('style');
                            style.id = 'css-nuke';
                            style.innerHTML = `
                    /* Main right side area ko poora failana */
                    #email-compose-area { flex: 1 !important; width: 100% !important; max-width: 100% !important; padding: 20px !important; box-sizing: border-box !important; overflow-y: auto !important; height: calc(100vh - 100px) !important; }
                    /* Dark header aur white box ke wrapper ko 100% width dena */
                    #email-compose-area > div, #email-compose-area > form { width: 100% !important; max-width: 100% !important; margin: 0 !important; }
                    /* Saare Text boxes (To, Cc, Subject) ko lamba karna */
                    #email-compose-area input { width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
                `;
                            document.head.appendChild(style);
                        }

                        let composeArea = document.getElementById('email-compose-area');
                        if (composeArea) composeArea.style.display = 'block';

                        const toEmails = emailConfig.to[city] || "update_email@redcliffelabs.com";
                        const sender = $('sender-name').value || "Kuldeep Singh Bisht";
                        const dateStr = getFormattedDateForSubject();

                        $('em-to').value = toEmails;
                        $('em-cc').value = emailConfig.cc;
                        $('em-sub').value = `Medibuddy Sample Drop Off || ${dateStr} || ${city}`;

                        let chkDiv = document.getElementById('bkg-selector');
                        if (!chkDiv) {
                            chkDiv = document.createElement('div');
                            chkDiv.id = 'bkg-selector';
                            chkDiv.style.cssText = "margin-top:10px; margin-bottom:10px; padding:10px; background:#f0fdf4; border-radius:6px; border:1px dashed #22c55e; width: 100% !important; box-sizing: border-box !important;";
                            let emBody = document.getElementById('em-body');
                            emBody.parentNode.insertBefore(chkDiv, emBody);
                        }

                        let checkboxesHtml = `<div style="font-size:12px; font-weight:bold; margin-bottom:8px; color:#166534;">✅ Tick/Untick Booking IDs to manage the table below:</div><div style="display:flex; flex-wrap:wrap; gap:8px;">`;
                        cityEmailGroups[city].forEach((item) => {
                            checkboxesHtml += `<label style="font-size:12px; cursor:pointer; background:#fff; border:1px solid #ccc; padding:4px 8px; border-radius:4px; display:flex; align-items:center; gap:4px;">
                    <input type="checkbox" checked value="${item.bookingId}" class="mail-bkg-cb" onchange="buildEmailTable()"> <b>${item.bookingId}</b>
                </label>`;
                        });
                        checkboxesHtml += `</div>`;
                        chkDiv.innerHTML = checkboxesHtml;

                        window.tempCityItems = cityEmailGroups[city];
                        window.tempSender = sender;

                        buildEmailTable();
                    }

                    window.buildEmailTable = function () {
                        let selectedIds = Array.from(document.querySelectorAll('.mail-bkg-cb:checked')).map(cb => cb.value);

                        let tableHtml = `<table border="1" cellspacing="0" cellpadding="6" style="border-collapse: collapse; width: 600px; max-width: 100%; text-align: center; vertical-align: middle; margin-top: 10px; margin-bottom: 15px; border: 1px solid black; font-size:13px;">
            <tr style="background-color: yellow; font-weight: bold;">
                <th style="border: 1px solid black; padding:6px;">Red Cliffe booking ID</th>
                <th style="border: 1px solid black; padding:6px;">Name</th>
                <th style="border: 1px solid black; padding:6px;">Age</th>
                <th style="border: 1px solid black; padding:6px;">Gender</th>
            </tr>`;

                        window.tempCityItems.forEach(item => {
                            if (selectedIds.includes(item.bookingId)) {
                                let printAge = item.age ? item.age : '';
                                tableHtml += `<tr>
                        <td style="border: 1px solid black; font-weight: bold; color: #007AFF; padding:6px;">${item.bookingId}</td>
                        <td style="border: 1px solid black; padding:6px;">${item.name}</td>
                        <td style="border: 1px solid black; padding:6px;">${printAge}</td>
                        <td style="border: 1px solid black; padding:6px;">${item.gender || ''}</td>
                    </tr>`;
                            }
                        });
                        tableHtml += `</table>`;

                        let emBody = document.getElementById('em-body');

                        emBody.innerHTML = `
            <div style="font-family: Arial, sans-serif; font-size: 13px; color: #333; text-align: left;">
                <p style="margin:0 0 5px 0;">Hi Team,</p>
                <p style="margin:0 0 5px 0;">Kindly find the Booking ids mentioned below.</p>
                <p style="margin:0 0 10px 0;">Kindly update the FBS/RBS status and age as per the TRF.</p>
            </div>
            ${tableHtml}
            <div style="font-family: Arial, sans-serif; font-size: 13px; color: #333; text-align: left;">
                <p style="margin:0;">Regards,<br><b>${window.tempSender}</b><br>Strategic Alliances (B2B Operations)<br>Redcliffelabs</p>
            </div>`;

                        // Text area ko bhi 100% chauda aur thoda lamba kar diya
                        emBody.style.width = "100%";
                        emBody.style.maxWidth = "100%";
                        emBody.style.height = "280px";
                        emBody.style.overflowY = "auto";
                        emBody.style.border = "1px solid #ccc";
                        emBody.style.padding = "15px";
                        emBody.style.backgroundColor = "#fff";
                        emBody.style.boxSizing = "border-box";
                        emBody.style.marginBottom = "20px";
                    };

                    function optimizeDraftWithBishtJi() { const bodyHtml = $('em-body').innerHTML; showLoader('ai'); let instruction = "Rewrite the intro and outro to sound highly professional and urgent. Keep the HTML table untouched and center aligned."; google.script.run.withSuccessHandler(res => { $('em-body').innerHTML = res; hideLoader(); showToast("Text Optimized by Bisht Ji ✨"); }).withFailureHandler(err => { hideLoader(); alert("Bisht Ji Optimizer error: " + err); }).optimizeEmailWithBishtJi(bodyHtml, instruction); }

                    let _draftInFlight = false;
                    function generateFinalDraft() {
                        if (!currentActiveCity || !cityEmailGroups[currentActiveCity]) return;
                        if (_draftInFlight) { showToast('⏳ Draft already being sent...'); return; }

                        const to = $('em-to').value, cc = $('em-cc').value, sub = $('em-sub').value, bodyHtml = $('em-body').innerHTML;

                        const bIdsArray = Array.from(document.querySelectorAll('.mail-bkg-cb:checked')).map(cb => cb.value);
                        if (bIdsArray.length === 0) { showToast("⚠️ No Booking IDs selected!"); return; }

                        _draftInFlight = true;
                        showLoader('email');
                        google.script.run.withSuccessHandler(res => {
                            _draftInFlight = false;
                            hideLoader();
                            $('successPopupText').innerText = res;
                            $('successPopup').classList.add('show');

                            let allLists = [globalData.pending, globalData.log, globalData.create];
                            allLists.forEach(list => {
                                if (list) {
                                    list.forEach(item => {
                                        if (item.city === currentActiveCity && bIdsArray.includes(item.bookingId)) {
                                            item.mailStatus = "Sent";
                                        }
                                    });
                                }
                            });

                            renderEmailGenerator();
                            fetchData(true);
                        }).withFailureHandler(err => {
                            _draftInFlight = false;
                            hideLoader();
                            if (typeof showToast === 'function') showToast('⚠️ Draft failed: ' + (err.message || err));
                        }).createCityEmailDraft(currentActiveCity, sub, bodyHtml, to, cc, bIdsArray);
                    }

                    let _markInFlight = false;
                    function markAlreadyEmailed() {
                        if (!currentActiveCity || !cityEmailGroups[currentActiveCity]) return;
                        if (_markInFlight) { showToast('⏳ Already processing...'); return; }

                        const bIdsArray = Array.from(document.querySelectorAll('.mail-bkg-cb:checked')).map(cb => cb.value);
                        if (bIdsArray.length === 0) { showToast("⚠️ No Booking IDs selected!"); return; }

                        if (!confirm(`Kya aap waqai in ${bIdsArray.length} bookings ko list se hatana chahte hain? (Draft generate nahi hoga)`)) return;

                        _markInFlight = true;
                        showLoader('email');
                        google.script.run.withSuccessHandler(res => {
                            _markInFlight = false;
                            hideLoader();
                            showToast("✅ " + res);

                            let allLists = [globalData.pending, globalData.log, globalData.create];
                            allLists.forEach(list => {
                                if (list) {
                                    list.forEach(item => {
                                        if (item.city === currentActiveCity && bIdsArray.includes(item.bookingId)) {
                                            item.mailStatus = "Sent";
                                        }
                                    });
                                }
                            });

                            renderEmailGenerator();
                        }).withFailureHandler(err => {
                            _markInFlight = false;
                            hideLoader();
                            if (typeof showToast === 'function') showToast('⚠️ Mark failed: ' + (err.message || err));
                        }).markMailsAsSentDB(bIdsArray);
                    }
                    /* 🟢 AI CHAT (BISHT JI) 🟢 */
                    function toggleAiPanel() { $('aiPanel').classList.toggle('active'); } let isVoiceOutputEnabled = true, recognition = null; if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) { const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition; recognition = new SpeechRec(); recognition.lang = 'hi-IN'; recognition.onstart = () => $('aiMicBtn').classList.add('recording'); recognition.onresult = (e) => { $('aiInput').value = e.results[0][0].transcript; sendToBishtJi(); }; recognition.onend = () => $('aiMicBtn').classList.remove('recording'); }
                    function toggleDictation() { if (recognition) { if ($('aiMicBtn').classList.contains('recording')) recognition.stop(); else recognition.start(); } } function toggleVoiceOutput() { isVoiceOutputEnabled = !isVoiceOutputEnabled; $('aiSpeakerToggle').innerText = isVoiceOutputEnabled ? "🔊" : "🔇"; window.speechSynthesis.cancel(); } function speakText(text) { if (!isVoiceOutputEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); let u = new SpeechSynthesisUtterance(text.replace(/[*#]/g, '')); u.lang = 'en-IN'; window.speechSynthesis.speak(u); }
                    let aiCooldownActive = false;
                    function sendToBishtJi() {
                        const input = $('aiInput'); const msg = input.value.trim();
                        if (!msg || aiCooldownActive) return;
                        input.value = '';
                        $('aiBody').innerHTML += `<div class="chat-bubble chat-user">${msg}</div>`;
                        const typingId = 'typing-' + Date.now();
                        $('aiBody').innerHTML += `<div class="chat-bubble chat-ai" id="${typingId}">Bisht Ji analyzing data... ⏳</div>`;
                        $('aiBody').scrollTop = $('aiBody').scrollHeight;
                        lockAiControls(true);
                        let rawData = getFilteredData(globalData.log), uniqueRecordsMap = new Map();
                        rawData.forEach(i => { let uniqueKey = i.bookingId && i.bookingId !== "--" && i.bookingId !== "" ? i.bookingId : `${i.name}_${i.city}`; if (!uniqueRecordsMap.has(uniqueKey)) uniqueRecordsMap.set(uniqueKey, { Loc: i.city, Date: i.date, ID: i.bookingId, Age: i.age, Stat: i.status, ColT: i.colTime, SubT: i.subTime, CreT: i.latestSubTime, ShrT: i.shareTime }); });
                        let compressedData = Array.from(uniqueRecordsMap.values());
                        let payload = JSON.stringify({ context: { dates: `${$('date-start').value} to ${$('date-end').value}`, cityFilter: $('city-filter').value }, uniqueData: compressedData });
                        google.script.run.withSuccessHandler(res => {
                            const bubble = $(typingId); bubble.innerHTML = res; speakText(res);
                            startAiCooldown(5, "Wait: ");
                            $('aiBody').scrollTop = $('aiBody').scrollHeight;
                        }).withFailureHandler(err => {
                            $(typingId).innerHTML = "Error analyzing data.";
                            lockAiControls(false); // 🛡️ Release lock on failure so user can retry
                        }).askBishtJiAdvanced(msg, payload);
                    }
                    function lockAiControls(l) { aiCooldownActive = l; $('aiInput').disabled = l; $('aiMicBtn').style.opacity = l ? '0.5' : '1'; document.querySelector('.ai-send').style.opacity = l ? '0.5' : '1'; } function startAiCooldown(sec, prefix) { let r = sec; const int = setInterval(() => { $('aiInput').placeholder = prefix + r + "s"; r--; if (r < 0) { clearInterval(int); $('aiInput').placeholder = "Ask Bisht Ji..."; lockAiControls(false); } }, 1000); }

                    /* 🟢 AUDIT REPORT LOGIC 🟢 */
                    let globalAuditData = [];

                    function fetchAuditData() {
                        showLoader('fetch');
                        const s = $('audit-date-start').value;
                        const e = $('audit-date-end').value;
                        google.script.run.withSuccessHandler(res => {
                            globalAuditData = res.reports;
                            let cSel = $('audit-filter-city');
                            let currVal = cSel.value;
                            cSel.innerHTML = '<option value="ALL">All Cities</option>' + res.cities.map(c => `<option value="${c}">${c}</option>`).join('');
                            cSel.value = res.cities.includes(currVal) ? currVal : "ALL";
                            filterAndRenderAudit();
                            hideLoader();
                        }).withFailureHandler(err => { hideLoader(); alert("Audit Error: " + err); }).getAuditAnalytics(s, e);
                    }

                    function filterAndRenderAudit() {
                        const city = $('audit-filter-city').value;
                        const reason = $('audit-filter-reason').value;

                        let filtered = globalAuditData;
                        if (city !== "ALL") filtered = filtered.filter(r => r.city === city);
                        if (reason !== "ALL") filtered = filtered.filter(r => r.reason === reason);

                        let tbody = $('audit-body'); tbody.innerHTML = '';
                        let onTime = 0, late = 0;

                        filtered.forEach(r => {
                            if (r.reason === 'Late') late++; else onTime++;
                            let bg = r.reason === 'Late' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)';
                            tbody.innerHTML += `<tr style="background:${bg}; border-bottom:1px solid var(--border-light);">
                    <td style="padding:10px;"><div style="font-weight:700;">${r.city}</div><div style="font-size:11px; color:var(--text-sub);">${r.bId} | ${r.name}</div></td>
                    <td style="padding:10px; font-size:11px; line-height:1.6;"><div>Sub: <b>${r.subTime || '-'}</b></div><div>Creat: <b>${r.latestSubTime || '-'}</b></div><div>Share: <b style="color:var(--primary);">${r.shareTime || '-'}</b></div></td>
                    <td style="padding:10px;"><div class="badge" style="background:${r.reasonColor}; color:white;">${r.reason}</div><div style="font-size:11px; margin-top:4px; font-weight:700;">TAT: ${r.tat}</div></td>
                    <td style="padding:10px; font-size:11px; color:var(--text-sub);">${r.remarks || '-'}</td>
                </tr>`;
                        });

                        if (filtered.length === 0) tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">No audit records found.</td></tr>';

                        $('aud-total').innerText = filtered.length;
                        $('aud-ontime').innerText = onTime;
                        $('aud-late').innerText = late;
                        $('aud-pending').innerText = "0";
                    }

                    function getAiAuditInsights() {
                        $('audit-ai-box').style.display = 'block';
                        $('audit-ai-text').innerText = 'Bisht Ji is analyzing audit data... ⏳';
                        google.script.run.withSuccessHandler(res => { $('audit-ai-text').innerText = res; }).withFailureHandler(err => { $('audit-ai-text').innerText = "Error getting insights."; }).getAiAuditSummary($('audit-date-start').value, $('audit-date-end').value);
                    }

                    function downloadAuditCSV() {
                        showLoader('fetch');
                        const s = $('audit-date-start').value, e = $('audit-date-end').value, c = $('audit-filter-city').value, r = $('audit-filter-reason').value;
                        google.script.run.withSuccessHandler(csv => {
                            hideLoader(); const blob = new Blob([csv], { type: 'text/csv' }); const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a'); a.href = url; a.download = `Audit_${s}.csv`; a.click();
                        }).withFailureHandler(err => { hideLoader(); alert(err); }).downloadAuditCsv(s, e, c, 'ALL', r, '');
                    }
                    // =========================================================
                    // 🟢 ZERO-DELAY FIREBASE REALTIME SYNC (NO QUOTA LIMIT) 🟢
                    // =========================================================
                    function canAutoSync() {
                        if (document.visibilityState !== 'visible') return false;
                        if (isTyping) return false;
                        // 🚀 LOCK REMOVED: Ab row open hone par bhi sync nahi rukega
                        if (document.querySelector('.modal-overlay.active')) return false; // Fixed spelling typo here
                        if (document.querySelector('.full-page-view.active')) return false;
                        if (!window.currentUser) return false;
                        return true;
                    }

                    // 1. FIREBASE MAGIC: Direct Millisecond Sync (Bina Google ke)
                    setTimeout(() => {
                        if (!window.firebaseDB) return;
                        const syncRef = window.firebaseRef(window.firebaseDB, 'global_sync/latest_action');

                        window.firebaseOnValue(syncRef, (snapshot) => {
                            const action = snapshot.val();

                            // Agar action null hai ya main khud kar raha hu, to ignore karo
                            if (!action || !window.currentUser || action.user === window.currentUser.name) return;

                            // Sirf turant wale (pichle 10 sec) actions ko allow karo
                            if (Date.now() - action.timestamp < 10000) {

                                // 🟢 1. Agar kisi ne Dropdown se Status change kiya hai
                                if (action.type === "STATUS_UPDATE") {
                                    let idx = globalData.pending.findIndex(i => i.rid === action.rid);
                                    if (idx > -1) {
                                        let item = globalData.pending[idx];
                                        item.status = action.status;

                                        // Agar dusre ne 'Shared' kiya hai to pending se hata kar shared me daal do!
                                        if (action.status.toLowerCase() === 'shared') {
                                            globalData.pending.splice(idx, 1);
                                            globalData.shared.unshift(item);
                                            updateUI(); // ⚡ TURANT SCREEN UPDATE (0 Delay)
                                            if (typeof showToast === 'function') showToast(`⚡ ${action.user} marked ${item.name} as Shared!`);
                                        } else {
                                            updateUI();
                                        }
                                    }
                                }

                                // 🚀 2. NAYA: Agar kisi ne Incomplete Tab se "Smart Save" kiya hai!
                                if (action.type === "SMART_SAVE") {
                                    let idx = globalData.incomplete.findIndex(i => i.rid === action.rid);
                                    if (idx > -1) {
                                        let item = globalData.incomplete.splice(idx, 1)[0]; // Incomplete se hatao

                                        // Naya data item mein daalo
                                        item.bookingId = action.status.bId;
                                        item.age = action.status.age;
                                        item.gender = action.status.gender;
                                        item.fbs = action.status.fbs;
                                        item.colTime = action.status.colTime;
                                        item.status = "Pending";

                                        let targetTab = action.status.bId ? 'pending' : 'create';
                                        if (globalData[targetTab]) globalData[targetTab].unshift(item); // Naye tab mein daalo

                                        updateUI(); // ⚡ TURANT SCREEN UPDATE
                                        if (typeof showToast === 'function') showToast(`⚡ ${action.user} updated a Missing TRF!`);
                                    }
                                }
                            }
                        });
                    }, 3000);

                    // 2. Apni taraf se Pura Data Bhejna
                    window.fireGlobalSyncPing = function (actionType, rowId, newValue) {
                        if (!window.firebaseDB) return;
                        const syncRef = window.firebaseRef(window.firebaseDB, 'global_sync/latest_action');
                        window.firebaseSet(syncRef, {
                            type: actionType,
                            rid: rowId,
                            status: newValue,
                            user: window.currentUser.name,
                            timestamp: Date.now()
                        });
                    };

                    // 3. Safety Net (Agar internet chala jaye toh har 3 minute me ek baar background check)
                    setInterval(() => {
                        if (canAutoSync()) fetchData(true);
                    }, 180000); // 180 seconds (3 mins)

                    document.addEventListener('visibilitychange', () => {
                        if (canAutoSync()) fetchData(true);
                    });
                </script>
                <div id="smartExportModal" class="modal-overlay">
                    <div class="modal-content" style="max-width: 600px;">
                        <div class="modal-header">
                            <div>
                                <h2 class="modal-title">✨ Smart Excel Export</h2>
                                <div style="font-size: 12px; color: var(--text-sub); margin-top: 4px;">Tick the columns.
                                    Data exports based on Dashboard filters.</div>
                            </div>
                            <button class="close-btn"
                                onclick="document.getElementById('smartExportModal').classList.remove('active'); setTimeout(() => document.getElementById('smartExportModal').style.display='none', 200);">✕</button>
                        </div>

                        <div id="export-checkboxes"
                            style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0 10px 0; max-height: 250px; overflow-y: auto; padding: 15px; border: 1px solid var(--border-light); border-radius: 8px; background: #f9fafb;">
                        </div>

                        <div style="margin-bottom: 15px; display: flex; flex-direction: column; gap: 8px;">
                            <div style="padding: 10px; background: #fff3cd; border: 1px solid #ffe69c; border-radius: 6px;">
                                <label
                                    style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: bold; color: #664d03; cursor: pointer;">
                                    <input type="checkbox" id="include-missing-cb" style="width: 16px; height: 16px;">
                                    Include Missing Booking IDs / 'To Create' / Incomplete Cases
                                </label>
                            </div>

                            <div style="padding: 10px; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px;">
                                <label
                                    style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: bold; color: #842029; cursor: pointer;">
                                    <input type="checkbox" id="include-cancelled-cb" style="width: 16px; height: 16px;">
                                    Include 'Not Collected' / 'Cancelled' / 'Rejected' Cases
                                </label>
                            </div>
                        </div>

                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-light);">
                            <div style="display: flex; gap: 10px;">
                                <button class="btn-apple"
                                    style="padding: 6px 12px; font-size: 12px; background: white; color: black; border: 1px solid #ccc;"
                                    onclick="selectAllExport(true)">Tick All</button>
                                <button class="btn-apple"
                                    style="padding: 6px 12px; font-size: 12px; background: white; color: black; border: 1px solid #ccc;"
                                    onclick="selectAllExport(false)">Untick All</button>
                            </div>
                            <button class="btn-apple btn-primary" style="background: #10b981;"
                                onclick="executeSmartExport()">📊 Download Excel</button>
                        </div>
                    </div>
                </div>

                <script>
                    /* 🟢 SMART EXCEL EXPORT LOGIC (CLEAN & COMPLETE) 🟢 */
                    const exportColumnsMap = [
                        { id: "city", label: "City", default: true },
                        { id: "date", label: "Date", default: true },
                        { id: "bookingId", label: "Booking ID", default: true },
                        { id: "refId", label: "Request ID", default: true },
                        { id: "name", label: "Patient Name", default: true },
                        { id: "age", label: "Age", default: true },
                        { id: "gender", label: "Gender", default: true },
                        { id: "fbs", label: "FBS/RBS", default: true },
                        { id: "type", label: "Partner Type", default: true },
                        { id: "tests", label: "Tests (Package)", default: true },
                        { id: "barcode", label: "Barcode No", default: true },
                        { id: "colTime", label: "Collection Time", default: true },
                        { id: "phleboName", label: "Phlebo Name", default: true },
                        { id: "phleboPhone", label: "Phlebo Mobile", default: true },
                        { id: "subTime", label: "Initial Sub Time", default: true },
                        { id: "latestSubTime", label: "Booking Creation Time", default: true },
                        { id: "status", label: "Status", default: true },
                        { id: "remarks", label: "Remarks", default: true },
                        { id: "shareTime", label: "Report Shared Time", default: true },
                        { id: "caseType", label: "Case Type (Add-on/Missing)", default: false },
                        { id: "isDuplicate", label: "Is Duplicate", default: false },
                        { id: "mailStatus", label: "Mail Status", default: false },
                        { id: "auditLogs", label: "Audit/Comment Logs", default: false }
                    ];

                    function openSmartExportModal() {
                        try {
                            let container = document.getElementById('export-checkboxes');
                            if (!container) return;

                            container.innerHTML = "";
                            exportColumnsMap.forEach(col => {
                                let checked = col.default ? "checked" : "";
                                container.innerHTML += `
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                            <input type="checkbox" class="export-col-cb" value="${col.id}" data-label="${col.label}" ${checked} style="width: 16px; height: 16px;">
                            ${col.label}
                        </label>
                    `;
                            });

                            let modal = document.getElementById('smartExportModal');
                            if (modal) {
                                modal.style.display = 'flex';
                                setTimeout(() => modal.classList.add('active'), 10);
                            }
                        } catch (e) {
                            console.error("Modal Error: ", e);
                        }
                    }

                    function selectAllExport(selectState) {
                        document.querySelectorAll('.export-col-cb').forEach(cb => cb.checked = selectState);
                    }

                    function executeSmartExport() {
                        try {
                            let selectedCols = [];
                            document.querySelectorAll('.export-col-cb:checked').forEach(cb => {
                                selectedCols.push({ id: cb.value, label: cb.getAttribute('data-label') });
                            });

                            if (selectedCols.length === 0) {
                                showToast("⚠️ Please tick at least one column!");
                                return;
                            }

                            let sEl = document.getElementById('date-start');
                            let eEl = document.getElementById('date-end');
                            let sVal = sEl ? sEl.value : "";
                            let eVal = eEl ? eEl.value : "";

                            let sDate = sVal ? new Date(sVal) : new Date(0);
                            let eDate = eVal ? new Date(eVal) : new Date('2099-12-31');
                            sDate.setHours(0, 0, 0, 0);
                            eDate.setHours(23, 59, 59, 999);

                            let cityF = document.getElementById('city-filter') ? document.getElementById('city-filter').value : "ALL";
                            let partnerF = document.getElementById('partner-filter') ? document.getElementById('partner-filter').value : "ALL";
                            let searchBox = document.getElementById('search-box');
                            let searchF = searchBox ? searchBox.value.toLowerCase().trim() : "";

                            let includeMissing = document.getElementById('include-missing-cb') ? document.getElementById('include-missing-cb').checked : false;
                            // 🔴 NAYA JADOO: Cancelled Checkbox Read
                            let includeCancelled = document.getElementById('include-cancelled-cb') ? document.getElementById('include-cancelled-cb').checked : false;

                            let activeData = [...(globalData.log || [])];

                            if (includeMissing) {
                                if (globalData.create) activeData = activeData.concat(globalData.create);
                                if (globalData.incomplete) activeData = activeData.concat(globalData.incomplete);
                            }
                            if (includeCancelled && globalData.cancelled) {
                                activeData = activeData.concat(globalData.cancelled);
                            }

                            // Remove exact object duplicates
                            activeData = [...new Set(activeData)];

                            let finalFilteredData = activeData.filter(i => {
                                if (!i) return false;

                                if (sVal !== "" || eVal !== "") {
                                    let dStr = String(i.date || "").trim();
                                    let rDate = new Date(dStr);
                                    if (isNaN(rDate.getTime())) {
                                        let parts = dStr.split(/[-/]/);
                                        if (parts.length === 3) {
                                            rDate = new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
                                        }
                                    }
                                    if (!isNaN(rDate.getTime())) {
                                        rDate.setHours(12, 0, 0, 0);
                                        if (rDate < sDate || rDate > eDate) return false;
                                    }
                                }

                                if (cityF !== "ALL" && i.city !== cityF) return false;
                                if (partnerF !== "ALL" && i.type !== partnerF) return false;
                                if (searchF && !(i.searchIndex || "").includes(searchF)) return false;

                                return true;
                            });

                            if (finalFilteredData.length === 0) {
                                showToast("⚠️ No data found! Check your dashboard dates and filters.");
                                return;
                            }

                            let tableHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <meta charset="utf-8">
                    <style>
                        table { border-collapse: collapse; font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; }
                        th { background-color: #1F4E78; color: #FFFFFF; font-weight: bold; text-align: center; vertical-align: middle; padding: 10px 15px; border: 1px solid #B4C6E7; white-space: nowrap; }
                        td { border: 1px solid #D9D9D9; vertical-align: middle; padding: 6px 10px; white-space: nowrap; text-align: center; }
                        .wrap-text { white-space: normal; min-width: 250px; text-align: left; word-wrap: break-word; }
                        .text-col { mso-number-format:"\\@"; } 
                    </style>
                </head>
                <body>`;

                            tableHtml += `<table><tr>`;
                            selectedCols.forEach(col => {
                                tableHtml += `<th>${col.label}</th>`;
                            });
                            tableHtml += `</tr>`;

                            finalFilteredData.forEach(i => {
                                tableHtml += `<tr>`;
                                selectedCols.forEach(col => {
                                    let val = i[col.id];

                                    let isLongText = (col.id === 'tests' || col.id === 'remarks' || col.id === 'auditLogs');
                                    let isId = (col.id === 'barcode' || col.id === 'bookingId' || col.id === 'refId' || col.id === 'phleboPhone');

                                    if (col.id === 'tests') val = (i.tests || []).join(", ");
                                    if (col.id === 'refId') val = (i.rIds && i.rIds.length > 0) ? i.rIds.join(", ") : (i.refId || "");
                                    if (col.id === 'barcode') val = (i.barcode || "").toString().replace(/[\[\]"]/g, '');
                                    if (col.id === 'auditLogs') val = (i.auditLogs || "").replace(/\n/g, ", ");

                                    // Khali cells ko N/A banana
                                    if (val === undefined || val === null || val.toString().trim() === "" || val === "-" || val === "--") {
                                        val = "N/A";
                                    }

                                    let cellClass = "";
                                    if (isLongText) cellClass = "wrap-text";
                                    if (isId) cellClass += " text-col";

                                    let extraStyle = (val === "N/A") ? "color: #888888; font-style: italic;" : "";

                                    tableHtml += `<td class="${cellClass.trim()}" style="${extraStyle}">${val}</td>`;
                                });
                                tableHtml += `</tr>`;
                            });

                            tableHtml += `</table></body></html>`;

                            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Clean_Professional_Report_${new Date().toISOString().slice(0, 10)}.xls`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);

                            document.getElementById('smartExportModal').classList.remove('active');
                            setTimeout(() => document.getElementById('smartExportModal').style.display = 'none', 200);

                            showToast("✅ Clean Professional Excel Downloaded!");
                        } catch (err) {
                            console.error("Export Crash Protected: ", err);
                        }
                    }
                </script>
                <div id="apiAutoModal"
                    style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 99999; align-items: center; justify-content: center; flex-direction: column; backdrop-filter: blur(8px);">
                    <div
                        style="width: 100%; max-width: 600px; padding: 0; overflow: hidden; border: 1px solid var(--glass-border); border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); background: var(--modal-bg);">

                        <div
                            style="background: linear-gradient(135deg, #fefce8, #f8fafc); padding: 25px 25px 20px; text-align: left; border-bottom: 1px solid #e2e8f0; position: relative;">
                            <div
                                style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706);">
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div>
                                    <h2
                                        style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
                                        <span style="font-size: 26px;">🤖</span> API Auto-Match
                                    </h2>
                                    <p style="color: #64748b; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">Drop
                                        your CSV file to auto-match and update bookings instantly.</p>
                                </div>
                                <button
                                    style="background: transparent; border: none; font-size: 20px; color: #ef4444; cursor: pointer; font-weight: bold; transition: 0.2s;"
                                    onclick="document.getElementById('apiAutoModal').style.display='none'"
                                    onmouseover="this.style.transform='scale(1.2)'"
                                    onmouseout="this.style.transform='scale(1)'">✕</button>
                            </div>
                        </div>

                        <div style="padding: 30px 25px;">
                            <div id="api-drop-area" class="file-drop-area"
                                style="border: 2px dashed #f59e0b; background: rgba(245, 158, 11, 0.05); padding: 50px 20px; border-radius: 16px; text-align: center; cursor: pointer; transition: all 0.3s ease;"
                                onclick="document.getElementById('api-csv-file').click()"
                                onmouseover="this.style.backgroundColor='rgba(245, 158, 11, 0.1)'"
                                onmouseout="this.style.backgroundColor='rgba(245, 158, 11, 0.05)'">
                                <div id="api-drop-icon"
                                    style="font-size: 50px; margin-bottom: 15px; text-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
                                    📄</div>
                                <div id="api-drop-text"
                                    style="font-size: 16px; font-weight: 800; color: #d97706; margin-bottom: 8px;">Drag &
                                    Drop CSV Here</div>
                                <div id="api-drop-subtext"
                                    style="font-size: 12px; color: var(--text-sub); background: white; padding: 4px 12px; border-radius: 12px; display: inline-block; border: 1px solid var(--border-light); box-shadow: 0 2px 5px rgba(0,0,0,0.02); font-weight: 600;">
                                    Or click to browse files</div>
                            </div>

                            <input type="file" id="api-csv-file" accept=".csv" style="display: none;"
                                onchange="handleApiFileSelect(this.files)">

                            <div id="api-btn-container" style="display: none; margin-top: 20px;">
                                <button class="btn-apple"
                                    style="padding: 16px 20px; width: 100%; font-size: 16px; font-weight: 700; justify-content: center; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; border: none; border-radius: 12px; box-shadow: 0 6px 15px rgba(245, 158, 11, 0.3); transition: all 0.2s ease;"
                                    id="api-start-btn" onclick="processApiAutoMatch()"
                                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(245, 158, 11, 0.4)';"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 15px rgba(245, 158, 11, 0.3)';">
                                    🚀 Start Auto-Match
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mac-window" id="apiReportModal"
                    style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #ffffff; z-index: 10000; flex-direction: column; overflow: hidden;">
                    <div
                        style="padding: 15px 25px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <h3
                            style="margin: 0; color: #1e293b; font-size: 18px; display: flex; align-items: center; gap: 10px;">
                            📊 CA Exact Match Report</h3>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <button onclick="document.getElementById('apiReportModal').style.display='none'"
                                style="display: flex; align-items: center; gap: 8px; background: #eff6ff; border: 1px solid #bfdbfe; color: #3b82f6; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">
                                <span style="font-size: 18px; line-height: 0; margin-top: -4px;">_</span> Minimize
                            </button>
                            <button onclick="closeApiReportPermanently()"
                                style="background: transparent; border: none; cursor: pointer; color: #ef4444; font-size: 20px; font-weight: bold; padding: 0 5px;">✕</button>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: row; flex: 1; overflow: hidden;">
                        <div
                            style="flex: 1; padding: 30px; border-right: 1px solid #e2e8f0; background: white; overflow-y: auto;">
                            <h4 style="color: #475569; font-size: 13px; text-transform: uppercase; margin-bottom: 15px;">
                                Data Found in CSV</h4>
                            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                                <div
                                    style="flex: 1; background: #f3e8ff; border: 1px solid #d8b4fe; padding: 20px; border-radius: 12px; text-align: center;">
                                    <div style="font-size: 28px; font-weight: 800; color: #7e22ce;" id="rep-api-count">0
                                    </div>
                                    <div style="font-size: 12px; color: #6b21a8; font-weight: bold;">API BOOKINGS</div>
                                </div>
                                <div
                                    style="flex: 1; background: #fef3c7; border: 1px solid #fde68a; padding: 20px; border-radius: 12px; text-align: center;">
                                    <div style="font-size: 28px; font-weight: 800; color: #b45309;" id="rep-man-count">0
                                    </div>
                                    <div style="font-size: 12px; color: #92400e; font-weight: bold;">MANUAL BOOKINGS</div>
                                </div>
                            </div>
                            <h4 style="color: #475569; font-size: 13px; text-transform: uppercase; margin-bottom: 15px;">
                                System Action Summary</h4>
                            <ul
                                style="list-style: none; padding: 0; margin: 0; font-size: 15px; color: #334155; line-height: 2.5;">
                                <li
                                    style="display: flex; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 10px;">
                                    <span>🔵 Already Filled in Sheet:</span> <b id="rep-already">0</b>
                                </li>
                                <li
                                    style="display: flex; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 10px;">
                                    <span>🚩 Retroactively Flagged API:</span> <b id="rep-flagged"
                                        style="color: #8b5cf6;">0</b>
                                </li>
                                <li
                                    style="display: flex; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 10px;">
                                    <span>🟢 Newly Auto-Filled:</span> <b id="rep-new" style="color: #10b981;">0</b>
                                </li>
                            </ul>
                        </div>
                        <div style="flex: 1.5; padding: 30px; background: #f8fafc; overflow-y: auto; position: relative;">
                            <button onclick="copyRightSideData()"
                                style="position: absolute; top: 25px; right: 30px; padding: 8px 16px; background: white; color: #10b981; border: 1px solid #10b981; border-radius: 8px; cursor: pointer; font-weight: bold;">📋
                                Copy Data</button>
                            <h4 style="color: #ef4444; font-size: 15px;">⚠️ CSV Duplicates</h4>
                            <div id="rep-dup-box"
                                style="white-space: pre; font-family: monospace; font-size: 12px; background: white; border: 1px solid #fca5a5; padding: 15px; border-radius: 10px; overflow-x: auto; margin-bottom: 30px;">
                                No duplicates found.</div>
                            <h4 style="color: #f97316; font-size: 15px;">❌ Extra Bookings</h4>
                            <div id="rep-notfound-box"
                                style="white-space: pre; font-family: monospace; font-size: 12px; background: white; border: 1px solid #fed7aa; padding: 15px; border-radius: 10px; overflow-x: auto;">
                                All entries mapped successfully!</div>
                        </div>
                    </div>
                </div>

                <script>
                    /* 🟢 GLOBAL STATE 🟢 */
                    let selectedApiFile = null;
                    window.isApiReportActive = false;
                    window.currentTatBase = 'creat';

                    /* 🟢 DOM READY: DRAG & DROP INITIALIZATION 🟢 */
                    document.addEventListener("DOMContentLoaded", () => {
                        const dropArea = document.getElementById('api-drop-area');
                        if (dropArea) {
                            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
                                dropArea.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
                            });
                            ['dragenter', 'dragover'].forEach(name => {
                                dropArea.addEventListener(name, () => dropArea.style.backgroundColor = 'rgba(234, 179, 8, 0.15)', false);
                            });
                            ['dragleave', 'drop'].forEach(name => {
                                dropArea.addEventListener(name, () => dropArea.style.backgroundColor = 'rgba(234, 179, 8, 0.05)', false);
                            });
                            dropArea.addEventListener('drop', (e) => { handleApiFileSelect(e.dataTransfer.files); });
                        }
                    });

                    /* 🟢 API ENGINE FUNCTIONS (PREMIUM UX UPDATED) 🟢 */

                    // 🚀 Global Cache: File ko memory mein safe rakhne ke liye
                    window.apiCsvTextCache = "";

                    window.handleApiFileSelect = function (files) {
                        if (!files || files.length === 0) return;
                        selectedApiFile = files[0];

                        // UI Update: Reading status
                        document.getElementById('api-drop-icon').innerHTML = "⏳";
                        document.getElementById('api-drop-text').innerHTML = `<span style="color:#b45309;">${selectedApiFile.name}</span>`;
                        document.getElementById('api-drop-subtext').innerText = "Reading file into memory...";
                        document.getElementById('api-btn-container').style.display = 'none';

                        // 🚀 Read file IMMEDIATELY on drop
                        let reader = new FileReader();
                        reader.onload = function (e) {
                            window.apiCsvTextCache = e.target.result; // Store raw text instantly

                            // UI Update: Success status (Green glow)
                            document.getElementById('api-drop-icon').innerHTML = "✅";
                            document.getElementById('api-drop-text').innerHTML = `<span style="color:#10b981;">File Ready: ${selectedApiFile.name}</span>`;
                            document.getElementById('api-drop-subtext').innerText = "Click the button below to start processing";
                            document.getElementById('api-drop-area').style.borderColor = "#10b981";
                            document.getElementById('api-drop-area').style.backgroundColor = "rgba(16, 185, 129, 0.05)";
                            document.getElementById('api-btn-container').style.display = 'block'; // Show button container
                        };
                        reader.onerror = function () {
                            alert("❌ Browser blocked reading the file. Try clicking to upload instead of drag-and-drop.");
                            resetApiModal();
                        };
                        reader.readAsText(selectedApiFile);
                    };

                    window.handleApiButtonClick = function () {
                        const reportModal = document.getElementById('apiReportModal');
                        const autoModal = document.getElementById('apiAutoModal');

                        // 🕵️‍♂️ Check: Kya data pehle se process ho chuka hai?
                        if (window.isApiReportActive) {
                            // Agar report memory mein hai, toh seedha Full-Screen Report dikhao
                            if (reportModal) {
                                reportModal.style.setProperty('display', 'flex', 'important');
                                const oldMinTab = document.getElementById('min-apiReportModal');
                                if (oldMinTab) oldMinTab.remove();
                            }
                            if (autoModal) autoModal.style.display = 'none';

                        } else {
                            // Agar koi report nahi hai, toh Drag-Drop screen dikhao
                            if (autoModal) autoModal.style.setProperty('display', 'flex', 'important');
                            if (reportModal) reportModal.style.display = 'none';
                        }
                    };

                    window.closeApiReportPermanently = function () {
                        if (confirm("This will clear the current report data. Continue?")) {
                            document.getElementById('apiReportModal').style.display = 'none';
                            window.isApiReportActive = false;
                            resetApiModal();
                        }
                    };

                    window.processApiAutoMatch = function () {
                        // 🚀 Check memory cache instead of trying to read the file again
                        if (!window.apiCsvTextCache) {
                            alert("⚠️ File data is missing. Please drop the CSV again.");
                            return;
                        }

                        // 1. Disable button to prevent double-click issues
                        let startBtn = document.getElementById('api-start-btn');
                        if (startBtn) {
                            startBtn.disabled = true;
                            startBtn.innerText = "⏳ Analyzing CSV...";
                        }

                        // 2. Hide File Drop Modal & Show Global Loader
                        document.getElementById('apiAutoModal').style.display = 'none';
                        if (typeof showLoader === 'function') showLoader('api');

                        // 3. Send cached text directly to backend
                        google.script.run
                            .withSuccessHandler(resString => {
                                // Loader hatana aur button wapas theek karna
                                if (typeof hideLoader === 'function') hideLoader();
                                if (startBtn) {
                                    startBtn.disabled = false;
                                    startBtn.innerText = "🚀 Start Auto-Match";
                                }

                                try {
                                    if (!resString) throw new Error("Empty response from server");

                                    let data = JSON.parse(resString);

                                    // Populate Dashboard Numbers
                                    document.getElementById('rep-api-count').innerText = data.apiCount || 0;
                                    document.getElementById('rep-man-count').innerText = data.manualCount || 0;
                                    document.getElementById('rep-already').innerText = data.alreadyFilled || 0;
                                    document.getElementById('rep-flagged').innerText = data.retroFlagged || 0;
                                    document.getElementById('rep-new').innerText = data.newlyFilled || 0;

                                    // Populate Duplicates
                                    let dupHtml = "Booking ID\tName\tAgent\tBooking Time\n";
                                    if (data.duplicates && data.duplicates.length > 0) {
                                        data.duplicates.forEach(d => {
                                            dupHtml += d.isSeparator ? "-----------------------------------\n" : `${d.bid}\t${d.rawName}\t${d.agent}\t${d.time}\n`;
                                        });
                                        document.getElementById('rep-dup-box').textContent = dupHtml;
                                    } else {
                                        document.getElementById('rep-dup-box').textContent = "No duplicates found. ✅";
                                    }

                                    // Populate Extra Bookings
                                    let nfHtml = "Booking ID\tName\tAge\tGender\tCity\tAgent\tBooking Time\n";
                                    if (data.notFound && data.notFound.length > 0) {
                                        data.notFound.forEach(d => { nfHtml += `${d.bid}\t${d.rawName}\t${d.age}\t${d.gender}\t${d.city}\t${d.agent}\t${d.bTime}\n`; });
                                        document.getElementById('rep-notfound-box').textContent = nfHtml;
                                    } else {
                                        document.getElementById('rep-notfound-box').textContent = "All entries mapped successfully! ✅";
                                    }

                                    // ZABARDASTI MODAL SCREEN PAR LAANA AUR FLAG ON KARNA
                                    window.isApiReportActive = true;
                                    let reportModal = document.getElementById('apiReportModal');
                                    if (reportModal) {
                                        reportModal.style.setProperty('display', 'flex', 'important');
                                        reportModal.style.zIndex = '100000';
                                    }

                                    if (typeof showToast === 'function') showToast("✅ Auto-Match Complete!");
                                    if (typeof fetchData === 'function') fetchData(true);

                                } catch (parseErr) {
                                    alert("❌ Report Error: Could not display data.\nReason: " + parseErr.message);
                                }
                            })
                            .withFailureHandler(err => {
                                if (typeof hideLoader === 'function') hideLoader();
                                if (startBtn) {
                                    startBtn.disabled = false;
                                    startBtn.innerText = "🚀 Start Auto-Match";
                                }
                                alert("❌ Backend Error: " + err.message);
                            })
                            .backendApiAutoMatch(window.apiCsvTextCache);
                    };

                    window.copyRightSideData = function () {
                        let combinedText = "=== CSV DUPLICATES ===\n" + document.getElementById('rep-dup-box').textContent +
                            "\n\n=== EXTRA BOOKINGS ===\n" + document.getElementById('rep-notfound-box').textContent;
                        let textArea = document.createElement("textarea");
                        textArea.value = combinedText;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        if (typeof showToast === 'function') showToast("✅ Data Copied!");
                    };

                    function resetApiModal() {
                        selectedApiFile = null;
                        window.apiCsvTextCache = ""; // 🚀 Clear cache on reset

                        // Reset Premium UI
                        if (document.getElementById('api-drop-icon')) document.getElementById('api-drop-icon').innerHTML = "📄";
                        if (document.getElementById('api-drop-text')) document.getElementById('api-drop-text').innerHTML = "Drag & Drop CSV Here";
                        if (document.getElementById('api-drop-subtext')) document.getElementById('api-drop-subtext').innerText = "Or click to browse files";

                        let dropArea = document.getElementById('api-drop-area');
                        if (dropArea) {
                            dropArea.style.borderColor = "#f59e0b";
                            dropArea.style.backgroundColor = "rgba(245, 158, 11, 0.05)";
                        }

                        if (document.getElementById('api-btn-container')) document.getElementById('api-btn-container').style.display = 'none';
                        if (document.getElementById('api-csv-file')) document.getElementById('api-csv-file').value = "";

                        // Reset Button status
                        let startBtn = document.getElementById('api-start-btn');
                        if (startBtn) {
                            startBtn.disabled = false;
                            startBtn.innerText = "🚀 Start Auto-Match";
                        }
                    }
                    // =========================================================
                    // ⏱️ DYNAMIC TAT ENGINE (Col: 8h, Sub: 6h, Creat: 6h)
                    // =========================================================
                    window.currentTatBase = window.currentTatBase || 'creat'; // Duplicate error se bachne ke liye safe declaration

                    window.setTatBase = function (base) {
                        window.currentTatBase = base;

                        // 🚀 BRAMHASTRA: Sabhi buttons ko pehle transparent karega, aur sirf dabaye hue ko Blue karega
                        ['col', 'sub', 'creat'].forEach(b => {
                            let el = document.getElementById('tat-' + b);
                            if (el) {
                                if (b === base) {
                                    el.style.background = '#3b82f6'; // Active Blue
                                    el.style.color = '#ffffff';
                                    el.style.borderColor = '#2563eb';
                                } else {
                                    el.style.background = 'transparent'; // Inactive Grey
                                    el.style.color = '#64748b';
                                    el.style.borderColor = '#e2e8f0';
                                }
                            }
                        });

                        // UI Refresh (List ko naye base ke hisaab se update karna)
                        if (typeof updateUI === 'function') updateUI();
                        else if (typeof renderList === 'function') renderList();
                    };

                    // 2. Exact Time Diff Formatter (Days, Hours, Mins)
                    window.formatTatDiff = function (ms) {
                        if (ms < 0) ms = 0;
                        let days = Math.floor(ms / 86400000);
                        let hours = Math.floor((ms % 86400000) / 3600000);
                        let mins = Math.floor((ms % 3600000) / 60000);

                        if (days > 0) return `${days}d ${hours}h ${mins}m`;
                        if (hours > 0) return `${hours}h ${mins}m`;
                        return `${mins}m`;
                    };

                    // 3. Card ke liye Smart TAT Calculator (BULLETPROOF DATE & TIME)
                    window.getDynamicTat = function (item) {
                        let baseTimeStr = "";
                        let targetHours = 6;

                        // A. Kis time se hisaab lagana hai?
                        let activeBase = window.currentTatBase || 'creat';
                        if (activeBase === 'col') {
                            baseTimeStr = item.colTime;
                            targetHours = 8; // Collection ke liye 8 Ghante
                        } else if (activeBase === 'sub') {
                            baseTimeStr = item.subTime;
                            targetHours = 6; // Submission ke liye 6 Ghante
                        } else {
                            baseTimeStr = item.latestSubTime;
                            targetHours = 6; // Creation ke liye 6 Ghante
                        }

                        if (!baseTimeStr || baseTimeStr === "-" || baseTimeStr === "N/A" || baseTimeStr === "--") {
                            return { text: "No Base Time", color: "#94a3b8", badge: "" };
                        }

                        // B. 🚀 SUPER DATE PARSER (Fixes 0m ON TIME bug)
                        let itemDate = new Date();
                        if (item.date) {
                            let dStr = String(item.date).trim().split(" ")[0]; // Sirf date wala part lega
                            let monthMap = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
                            let parts = dStr.split(/[-/]/);

                            if (parts.length === 3) {
                                let p1 = parts[0], p2 = parts[1].toLowerCase(), p3 = parts[2];
                                if (p3.length === 4) {
                                    if (isNaN(p2)) {
                                        itemDate = new Date(p3, monthMap[p2.substring(0, 3)], p1); // DD-MMM-YYYY (e.g. 15-Mar-2026)
                                    } else if (parseInt(p1) <= 12 && parseInt(p2) > 12) {
                                        itemDate = new Date(p3, parseInt(p1) - 1, p2); // MM/DD/YYYY (e.g. 3/14/2026)
                                    } else {
                                        itemDate = new Date(p3, parseInt(p2) - 1, p1); // DD/MM/YYYY (e.g. 14/3/2026)
                                    }
                                } else if (p1.length === 4) {
                                    itemDate = new Date(p1, parseInt(p2) - 1, p3); // YYYY-MM-DD
                                }
                            } else {
                                let d = new Date(dStr);
                                if (!isNaN(d.getTime())) itemDate = d;
                            }
                        }
                        itemDate.setHours(0, 0, 0, 0);

                        // C. 🚀 SUPER TIME PARSER (Fixes "Invalid Time" hyphen bug)
                        function parseTime(tStr, baseD) {
                            if (!tStr) return null;
                            let d = new Date(baseD.getTime());

                            // Jadoo: Ab ye bina hyphen par confuse hue sidha Time ko pakdega (jaise 07:00 ya 10:15:00)
                            let match = String(tStr).match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*([APap][Mm])?/);
                            if (match) {
                                let h = parseInt(match[1]);
                                let m = parseInt(match[2]);
                                let ampm = match[3] ? match[3].toUpperCase() : null;

                                if (ampm === 'PM' && h < 12) h += 12;
                                if (ampm === 'AM' && h === 12) h = 0;

                                d.setHours(h, m, 0, 0);
                                return d;
                            }
                            return null;
                        }

                        let startD = parseTime(baseTimeStr, itemDate);
                        if (!startD) return { text: "Invalid Time", color: "#94a3b8", badge: "" };

                        // D. End Time Calculation
                        let endD = new Date(); // Current Live Time
                        if (item.status && String(item.status).toLowerCase().includes("share") && item.shareTime && item.shareTime !== "-") {
                            let sD = parseTime(item.shareTime, itemDate);
                            if (sD) {
                                if (sD < startD && (startD.getHours() > 18 && sD.getHours() < 6)) sD.setDate(sD.getDate() + 1);
                                endD = sD;
                            }
                        }

                        // E. Final TAT Math
                        let diffMs = endD.getTime() - startD.getTime();
                        if (diffMs < -10000000) diffMs += 86400000; // Raat ke hisaab ko theek karna

                        let diffHours = diffMs / 3600000;
                        let isLate = diffHours > targetHours;

                        // 🚀 NAYA JADOO: High TAT walo ko identify karna
                        let isHighTatStatus = item.status && String(item.status).toLowerCase().includes("high tat");

                        let color, bg, label;

                        if (isHighTatStatus) {
                            // High TAT ke liye Special Purple Badge (Bina Late bole)
                            color = "#8b5cf6"; // Dark Purple
                            bg = "#ede9fe";    // Light Purple Background
                            label = "HIGH TAT";
                        } else {
                            // Normal tests ke liye Red/Green
                            color = isLate ? "#ef4444" : "#10b981";
                            bg = isLate ? "#fee2e2" : "#d1fae5";
                            label = isLate ? "LATE" : "ON TIME";
                        }

                        return {
                            text: window.formatTatDiff(diffMs),
                            color: color,
                            badge: `<span style="background: ${bg}; color: ${color}; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-left: 5px;">${label}</span>`
                        };
                    }; // <-- Function yahan khatam hota hai
                    // =========================================================
                    // 🚀 1. SMART LOCAL DATA MOVER & KPI UPDATER
                    // =========================================================
                    function moveLocallyAndUpdateKpi(rid, sourceTab, targetTab, updates) {
                        if (!globalData[sourceTab]) return;

                        let idx = globalData[sourceTab].findIndex(i => i.rid === rid);
                        if (idx > -1) {
                            let item = globalData[sourceTab][idx];

                            // 1. Source Tab se hatao
                            globalData[sourceTab].splice(idx, 1);

                            // 2. Data Update karo (Status/ID jo bhi change hua)
                            Object.assign(item, updates);

                            // 3. Naye tab me daalo
                            if (!globalData[targetTab]) globalData[targetTab] = [];
                            globalData[targetTab].unshift(item);

                            // 4. Dono KPI Turant Change Karo
                            let srcKpi = document.getElementById('kpi-' + sourceTab);
                            let tgtKpi = document.getElementById('kpi-' + targetTab);
                            if (srcKpi) srcKpi.innerText = Math.max(0, parseInt(srcKpi.innerText) - 1);
                            if (tgtKpi) tgtKpi.innerText = parseInt(tgtKpi.innerText) + 1;
                        }
                    }

                    // =========================================================
                    // 🚀 2. PRO UX FLYING BUBBLE (RANDOM CURVED MOTION)
                    // =========================================================
                    window.triggerSmartFlyAnimation = function (rowId, text, targetKpiId) {
                        let rowEl = document.getElementById(rowId);
                        let detailsRow = document.getElementById('details-' + rowId);
                        let targetEl = document.getElementById(targetKpiId) || document.querySelector('.seg-control');

                        if (!rowEl || !targetEl) return;

                        // A. Coordinates Nikalna
                        let startRect = rowEl.getBoundingClientRect();
                        let endRect = targetEl.getBoundingClientRect();

                        let startX = startRect.left + (startRect.width / 2);
                        let startY = startRect.top + 20;
                        let endX = endRect.left + (endRect.width / 2);
                        let endY = endRect.top + (endRect.height / 2);

                        // 🔴 PRO UX JADOO: Har baar naya Curved Rasta (Arc) banana
                        let direction = Math.random() > 0.5 ? 1 : -1;
                        let midX = (startX + endX) / 2 + (Math.random() * 150 * direction); // Left ya Right arc
                        let midY = Math.min(startY, endY) - 50 - (Math.random() * 80); // Upar ki taraf uchhal

                        // B. Bubble Create Karna
                        let bubble = document.createElement('div');
                        bubble.innerHTML = text;
                        bubble.style.position = 'fixed';
                        bubble.style.left = '0px';
                        bubble.style.top = '0px';
                        bubble.style.background = 'linear-gradient(135deg, #a855f7, #ec4899)'; // Cool Purple-Pink Gradient
                        bubble.style.color = 'white';
                        bubble.style.padding = '10px 20px';
                        bubble.style.borderRadius = '30px';
                        bubble.style.fontSize = '13px';
                        bubble.style.fontWeight = '800';
                        bubble.style.zIndex = '999999';
                        bubble.style.boxShadow = '0 10px 25px rgba(236, 72, 153, 0.5)';
                        bubble.style.pointerEvents = 'none';
                        bubble.style.transform = `translate(${startX}px, ${startY}px) scale(0)`;
                        document.body.appendChild(bubble);

                        // C. Row Collapse Animation (Ekdum Smooth)
                        let initialHeight = rowEl.offsetHeight;
                        rowEl.style.overflow = 'hidden';
                        rowEl.style.height = initialHeight + 'px';
                        rowEl.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

                        // Force CSS to notice the height before setting it to 0
                        void rowEl.offsetHeight;

                        rowEl.style.height = '0px';
                        rowEl.style.paddingTop = '0px';
                        rowEl.style.paddingBottom = '0px';
                        rowEl.style.opacity = '0';
                        rowEl.style.border = 'none';
                        if (detailsRow) detailsRow.style.display = 'none';

                        // D. Fly Animation (Web Animations API)
                        // Step 1: Pop Out
                        let popIn = bubble.animate([
                            { transform: `translate(${startX}px, ${startY}px) scale(0)`, opacity: 0 },
                            { transform: `translate(${startX}px, ${startY}px) scale(1.1)`, opacity: 1 },
                            { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1 }
                        ], { duration: 400, easing: 'ease-out', fill: 'forwards' });

                        // Step 2: Fly & Curve
                        popIn.onfinish = () => {
                            rowEl.style.display = 'none'; // Row gayab

                            let fly = bubble.animate([
                                { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1 },
                                { transform: `translate(${midX}px, ${midY}px) scale(0.8)`, opacity: 0.9 },
                                { transform: `translate(${endX}px, ${endY}px) scale(0.2)`, opacity: 0.5 }
                            ], { duration: 700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' });

                            // Step 3: Hit KPI Target & Bounce
                            fly.onfinish = () => {
                                bubble.remove();
                                if (rowEl) rowEl.remove();

                                targetEl.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                                targetEl.style.transform = 'scale(1.3)';
                                targetEl.style.color = '#ec4899';
                                targetEl.style.background = 'rgba(236, 72, 153, 0.15)';
                                targetEl.style.borderRadius = '8px';

                                setTimeout(() => {
                                    targetEl.style.transform = 'scale(1)';
                                    targetEl.style.color = '';
                                    targetEl.style.background = '';
                                }, 300);
                            };
                        };
                    };

                    // =========================================================
                    // 🟢 3. CREATE TAB: SUBMIT BOOKING ID LOGIC 
                    // =========================================================
                    window.saveNewBookingId = function (rid, inputId, city, oldBid, pName, reqIdsStr) {
                        let inputEl = document.getElementById(inputId);
                        let newBid = inputEl ? inputEl.value.trim() : "";
                        if (!newBid) { showToast("⚠️ Kripya Booking ID daalein!"); return; }

                        pauseSync();

                        moveLocallyAndUpdateKpi(rid, currentTab, 'pending', { bookingId: newBid, status: 'Pending' });
                        triggerSmartFlyAnimation(rid, '💾 Saved! Moving to Pending', 'kpi-pending');

                        google.script.run
                            .withSuccessHandler(() => { resumeSync(); })
                            .withFailureHandler(err => { showToast("❌ Error: " + err.message); resumeSync(); })
                            .updateRecord(city, oldBid, pName, null, null, newBid, reqIdsStr, null, null, null, null, window.currentUser.name);
                    };

                    // =========================================================
                    // 🟢 4. STATUS DROPDOWN (GHOST BUSTER MEMORY 👻)
                    // =========================================================
                    window.autoSaveRow = function (rid, changedEl, city, bId, patientName, reqIdsStr) {
                        let newStatus = document.getElementById('status-' + rid) ? document.getElementById('status-' + rid).value : "N/A";
                        let newRemarks = document.getElementById('note-' + rid) ? document.getElementById('note-' + rid).value : "";
                        let userName = window.currentUser ? window.currentUser.name : "A Teammate";
                        let stLow = newStatus.toLowerCase();
                        let isShared = stLow.includes('share');

                        // 👻 THE GHOST MEMORY: Sirf isi card ko 8 sec tak wapas aane se rokega
                        window.ghostMemory = window.ghostMemory || {};
                        window.ghostMemory[rid] = { stat: newStatus, time: Date.now() };

                        // 1. ⚡ ACTUAL MEMORY MOVE 
                        if (typeof globalData !== 'undefined') {
                            let targetTab = isShared ? 'shared' : 'pending';
                            let sourceTab = isShared ? 'pending' : 'shared';

                            for (let t in globalData) {
                                let item = globalData[t].find(i => i.rid === rid || i.bookingId === rid);
                                if (item) { item.status = newStatus; item.remarks = newRemarks; }
                            }

                            let sIdx = globalData[sourceTab] ? globalData[sourceTab].findIndex(i => i.rid === rid || i.bookingId === rid) : -1;
                            if (sIdx > -1) {
                                let movedItem = globalData[sourceTab].splice(sIdx, 1)[0];
                                if (globalData[targetTab]) globalData[targetTab].unshift(movedItem);
                            }
                        }

                        // 2. ⚡ FIREBASE PING
                        if (changedEl && changedEl.classList.contains("status-select")) {
                            if (typeof window.firebaseDB !== 'undefined' && window.firebaseDB) {
                                try {
                                    const ref = window.firebaseRef(window.firebaseDB, 'live_status_updates/' + rid);
                                    window.firebaseSet(ref, { stat: newStatus, usr: userName, time: Date.now() });
                                } catch (e) { }
                            }

                            // 3. ⚡ KHUD KI SCREEN SE TURANT GAYAB KARO
                            changedEl.style.color = isShared ? 'var(--success)' : 'var(--warning)';

                            let row = document.getElementById(rid);
                            let dRow = document.getElementById('details-' + rid);

                            let shouldHide = false;
                            if (isShared && currentTab === 'pending') shouldHide = true;
                            if (!isShared && currentTab === 'shared') shouldHide = true;

                            if (shouldHide && row) {
                                row.style.setProperty('display', 'none', 'important');
                                if (dRow) dRow.style.setProperty('display', 'none', 'important');
                                showToast(isShared ? "🚀 Moved to Shared!" : "📥 Back to Pending!");
                                if (typeof updateUI === 'function') updateUI();
                            }
                        } else if (changedEl) {
                            changedEl.style.opacity = '0.5';
                        }

                        // 4. ⚡ GOOGLE SHEET (Background save)
                        setTimeout(() => {
                            google.script.run
                                .withSuccessHandler(() => { if (changedEl) changedEl.style.opacity = '1'; })
                                .withFailureHandler(() => { if (changedEl) changedEl.style.opacity = '1'; })
                                .updateRecord(city, bId, patientName, newStatus, newRemarks, "", reqIdsStr, "", "", "", "", userName);
                        }, 10);
                    };
                    // =========================================================
                    // 🟢 5. INCOMPLETE TAB: SMART SAVE LOGIC (WALKIE-TALKIE ENABLED)
                    // =========================================================
                    window.updateIncompleteRow = function (rid, city, oldBid, name, reqIdsStr, event) {
                        if (event) event.stopPropagation();

                        let nBid = document.getElementById('inc-bid-' + rid) ? document.getElementById('inc-bid-' + rid).value.trim() : "";
                        let na = document.getElementById('inc-age-' + rid) ? document.getElementById('inc-age-' + rid).value : "";
                        let ng = document.getElementById('inc-gender-' + rid) ? document.getElementById('inc-gender-' + rid).value : "";
                        let nfbs = document.getElementById('inc-fbs-' + rid) ? document.getElementById('inc-fbs-' + rid).value : "";
                        let ncol = document.getElementById('inc-col-' + rid) ? document.getElementById('inc-col-' + rid).value : "";

                        let hasPatientDetails = (na !== "" && ng !== "" && nfbs !== "" && ncol !== "");
                        let hasBookingId = (nBid !== "");

                        if (!hasPatientDetails && !hasBookingId) {
                            if (typeof showToast === 'function') showToast("⚠️ Please fill Booking ID OR all Patient Details!");
                            return;
                        }

                        let userName = window.currentUser ? window.currentUser.name : "Unknown User";

                        // 1. Khud ki screen par turant update (Optimistic UI)
                        let targetTab = nBid ? 'pending' : 'create';
                        let txt = nBid ? '✅ Saved! To Pending' : '✅ Saved! To Create';

                        moveLocallyAndUpdateKpi(rid, 'incomplete', targetTab, {
                            colTime: ncol, age: na, gender: ng, fbs: nfbs, bookingId: nBid, status: 'Pending'
                        });

                        triggerSmartFlyAnimation(rid, txt, 'kpi-' + targetTab);

                        // 🚀 2. WALKIE-TALKIE PING: Dusre sabhi users ko batao ki ye update ho gaya hai!
                        if (typeof window.fireGlobalSyncPing === 'function') {
                            window.fireGlobalSyncPing('SMART_SAVE', rid, {
                                bId: nBid, age: na, gender: ng, fbs: nfbs, colTime: ncol
                            });
                        }

                        let notesVal = document.getElementById('note-' + rid) ? document.getElementById('note-' + rid).value : "";

                        // 3. Background mein chup-chap Google Sheet mein save karo (No loading, no refreshing)
                        google.script.run
                            .withFailureHandler((e) => {
                                alert("Save Error: " + e.message);
                                if (typeof fetchData === 'function') fetchData(true); // Sirf fail hone par wapas refresh karo
                            })
                            .updateRecord(city, oldBid, name, "", notesVal, nBid, reqIdsStr, na, ng, nfbs, ncol, userName);
                    };
                    // =========================================================
                    // 🟢 TRF DRAG AND DROP ENGINE FIX 🟢
                    // =========================================================
                    document.addEventListener("DOMContentLoaded", () => {
                        const trfDropArea = document.getElementById('trf-drop-area');
                        if (trfDropArea) {
                            // Default browser action ko rokna taaki file dusre tab me na khule
                            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                                trfDropArea.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
                            });

                            // Hover karne par color dark pink karna
                            ['dragenter', 'dragover'].forEach(eventName => {
                                trfDropArea.addEventListener(eventName, () => trfDropArea.style.backgroundColor = 'rgba(236, 72, 153, 0.2)', false);
                            });

                            // Mouse hatane par wapas light pink karna
                            ['dragleave', 'drop'].forEach(eventName => {
                                trfDropArea.addEventListener(eventName, () => trfDropArea.style.backgroundColor = 'rgba(236, 72, 153, 0.05)', false);
                            });

                            // File Drop karne par handleTrfFiles function ko files bhej dena
                            trfDropArea.addEventListener('drop', (e) => {
                                let dt = e.dataTransfer;
                                let files = dt.files;
                                if (typeof handleTrfFiles === 'function') {
                                    handleTrfFiles(files);
                                }
                            });
                        }
                    });
                    /// Base64 Helper
                    function getBase64(file) {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result.split(',')[1]);
                            reader.onerror = error => reject(error);
                        });
                    }
                    // =========================================================
                    // 🚀 SUPER-FAST IMAGE COMPRESSOR & QUEUE SYSTEM
                    // =========================================================

                    // 1. IMAGE COMPRESSOR (5MB photo ko 150KB banayega, Speed 10x badhegi)
                    // 1. ULTRA-FAST IMAGE COMPRESSOR (Prevents Network Timeouts)
                    function getCompressedBase64(file) {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (event) => {
                                const img = new Image();
                                img.src = event.target.result;
                                img.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    const MAX_WIDTH = 800; // 🚀 Reduced for extreme speed
                                    let scaleSize = MAX_WIDTH / img.width;
                                    if (scaleSize > 1) scaleSize = 1;

                                    canvas.width = img.width * scaleSize;
                                    canvas.height = img.height * scaleSize;

                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                                    // 🚀 Aggressive compression to ensure GAS never times out
                                    const compressedData = canvas.toDataURL('image/jpeg', 0.5);
                                    resolve(compressedData.split(',')[1]);
                                };
                                img.onerror = error => reject(error);
                            };
                            reader.onerror = error => reject(error);
                        });
                    }

                    // 2. TURBO UPLOAD ENGINE (True Error Exposer & Aesthetic UI)
                    async function handleTrfFiles(files) {
                        if (!files || files.length === 0) return;

                        let dropArea = document.getElementById('trf-drop-area');
                        let parentCol = dropArea.parentElement;

                        dropArea.style.padding = "10px 20px";
                        dropArea.style.minHeight = "auto";
                        let dropIcon = dropArea.querySelector('div:nth-child(1)');
                        let dropSub = dropArea.querySelector('div:nth-child(3)');
                        if (dropIcon) dropIcon.style.display = "none";
                        if (dropSub) dropSub.style.display = "none";

                        let headerBox = document.getElementById('trf-progress-header');
                        let statusBox = document.getElementById('trf-status-box');

                        if (!headerBox) {
                            headerBox = document.createElement('div');
                            headerBox.id = 'trf-progress-header';
                            headerBox.style.cssText = "margin-top:15px; margin-bottom:15px; width:100%; display:flex; justify-content:space-between; align-items:center; font-family:'Inter', sans-serif;";
                            parentCol.insertBefore(headerBox, dropArea.nextSibling);
                        }

                        if (!statusBox) {
                            statusBox = document.createElement('div');
                            statusBox.id = 'trf-status-box';
                            statusBox.style.cssText = "flex:1; width:100%; min-height:450px; max-height:calc(100vh - 200px); overflow-y:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.02); display:flex; flex-direction:column; font-family:'Inter', sans-serif;";
                            parentCol.insertBefore(statusBox, headerBox.nextSibling);
                        }

                        statusBox.innerHTML = '';
                        let totalFiles = files.length;
                        let summary = { matched: [], parked: [], linked: [], skipped: [], smartSkipped: [] };

                        const addLog = (type, title, subtitle, filename) => {
                            let colors = {
                                success: { icon: "✓", color: "#059669", line: "#34d399" },
                                info: { icon: "i", color: "#0284c7", line: "#7dd3fc" },
                                warning: { icon: "⧖", color: "#d97706", line: "#fcd34d" },
                                error: { icon: "✕", color: "#dc2626", line: "#fca5a5" },
                                smart: { icon: "↺", color: "#0d9488", line: "#5eead4" }
                            };
                            let theme = colors[type];

                            let logHtml = `<div style="display:flex; align-items:center; padding:12px 20px; border-bottom:1px solid #f1f5f9; transition:background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                <div style="flex-shrink:0; font-size:14px; font-weight:400; color:${theme.color}; width:20px; text-align:center;">${theme.icon}</div>
                <div style="flex-shrink:0; width:2px; height:24px; background:${theme.line}; margin:0 15px; border-radius:2px;"></div>
                <div style="flex:1; min-width:0; display:flex; align-items:center; justify-content:space-between;">
                    <div>
                        <span style="font-size:13px; color:#1e293b; font-weight:500;">${title}</span>
                        <span style="font-size:12px; color:#64748b; font-weight:400; margin-left:8px;">— ${subtitle}</span>
                    </div>
                    <span style="font-size:11px; color:#94a3b8; font-family:monospace; margin-left:15px;">${filename}</span>
                </div>
            </div>`;
                            statusBox.insertAdjacentHTML('beforeend', logHtml);
                            statusBox.scrollTop = statusBox.scrollHeight;
                        };

                        let allPendingRecords = [...(globalData.pending || []), ...(globalData.incomplete || []), ...(globalData.create || [])];

                        for (let i = 0; i < totalFiles; i++) {
                            let file = files[i];
                            let pct = Math.round((i / totalFiles) * 100);

                            const updateHeader = (statusText, subText = "") => {
                                headerBox.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:14px; height:14px; border:2px solid #e2e8f0; border-top-color:#6366f1; border-radius:50%; animation:spin 1s linear infinite;"></div>
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-size:14px; font-weight:600; color:#0f172a;">${statusText}</span>
                            ${subText ? `<span style="font-size:11px; color:#64748b; font-weight:400;">${subText}</span>` : ''}
                        </div>
                    </div>
                    <div style="font-size:12px; font-weight:500; color:#64748b; border:1px solid #e2e8f0; padding:4px 12px; border-radius:20px;">${pct}% • File ${i + 1} of ${totalFiles}</div>
                `;
                            };

                            let uniqueFileId = "TRF_DONE_" + file.name + "_" + file.size;
                            if (localStorage.getItem(uniqueFileId)) {
                                addLog("smart", "Cache Hit", "Already processed previously", file.name);
                                summary.smartSkipped.push(file.name);
                                continue;
                            }

                            let success = false;
                            let retryCount = 0;
                            let lastErrorMsg = "";

                            // 🚀 ONLY 2 RETRIES TO SAVE TIME
                            while (!success && retryCount < 2) {
                                updateHeader("Analyzing Image...", "Gemini AI extracting text");
                                let base64Data = await getCompressedBase64(file);

                                let aiResult = await new Promise((resolve) => {
                                    google.script.run
                                        .withSuccessHandler(resolve)
                                        .withFailureHandler(err => resolve({ status: "Error", message: "Google Network Drop: " + err.message }))
                                        .analyzeTrfImage(base64Data);
                                });

                                if (aiResult.status === "Error") {
                                    lastErrorMsg = aiResult.message; // 🚀 YAHAN STORE HOGA ASLI ERROR
                                    retryCount++;
                                    if (retryCount < 2) {
                                        updateHeader("Retrying...", "Attempt 2/2");
                                        await new Promise(r => setTimeout(r, 2000));
                                        continue;
                                    } else {
                                        break; // Loop todo, error dikhao
                                    }
                                }

                                success = true;
                                let aiData = aiResult.data;

                                updateHeader("Searching Database...", "Matching patient details locally");

                                let matchedRecord = null;
                                let cleanAiBarcode = aiData.barcode ? String(aiData.barcode).toLowerCase().replace(/[^a-z0-9]/g, '') : "";
                                let aiNameClean = (aiData.name || "").toLowerCase().replace(/^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby)\s*/i, '').replace(/[^a-z0-9]/gi, '').trim();

                                for (let r of allPendingRecords) {
                                    let sBarcode = r.barcode ? String(r.barcode).toLowerCase().replace(/[^a-z0-9]/g, '') : "";
                                    let sNameClean = (r.name || "").toLowerCase().replace(/^(mr\.|mrs\.|ms\.|dr\.|master|miss|baby)\s*/i, '').replace(/[^a-z0-9]/gi, '').trim();

                                    let isBarcodeMatch = (cleanAiBarcode && cleanAiBarcode !== "na" && sBarcode !== "" && sBarcode.includes(cleanAiBarcode));
                                    let isNameMatch = false;

                                    if (aiNameClean.length > 3 && sNameClean.length > 3 && (sNameClean.includes(aiNameClean) || aiNameClean.includes(sNameClean))) {
                                        let sAgeClean = String(r.age || "").match(/\d+/) ? String(r.age).match(/\d+/)[0] : "";
                                        let aiAgeClean = String(aiData.age || "").match(/\d+/) ? String(aiData.age).match(/\d+/)[0] : "";
                                        let isAgeMatch = (sAgeClean === "" || (aiAgeClean !== "" && Math.abs(parseInt(sAgeClean) - parseInt(aiAgeClean)) <= 2));
                                        if (isAgeMatch) isNameMatch = true;
                                    }

                                    if (isBarcodeMatch || isNameMatch) { matchedRecord = r; break; }
                                }

                                updateHeader("Saving to Server...", "Uploading TRF to Drive");

                                let finalSaveResult;
                                let currentUserName = window.currentUser ? window.currentUser.name : "System";

                                if (matchedRecord) {
                                    let targetId = matchedRecord.bookingId || matchedRecord.refId || matchedRecord.name;
                                    finalSaveResult = await new Promise((resolve) => {
                                        google.script.run.withSuccessHandler(resolve).withFailureHandler(e => resolve({ status: "Error", message: "Save failed: " + e.message }))
                                            .directAttachTrf(base64Data, file.name, matchedRecord.city, targetId, aiData, currentUserName);
                                    });

                                    if (finalSaveResult.status === "Matched") {
                                        addLog("success", `Attached to ${targetId}`, `${matchedRecord.name}`, file.name);
                                        summary.matched.push(`${targetId} | ${matchedRecord.name}`);
                                        localStorage.setItem(uniqueFileId, "true");
                                    } else if (finalSaveResult.status === "Already Linked") {
                                        addLog("info", `Already Linked`, `${matchedRecord.name} already has TRF`, file.name);
                                        summary.linked.push(matchedRecord.name);
                                        localStorage.setItem(uniqueFileId, "true");
                                    } else {
                                        addLog("error", `Save Failed`, finalSaveResult.message, file.name);
                                        summary.skipped.push(file.name);
                                    }
                                } else {
                                    finalSaveResult = await new Promise((resolve) => {
                                        google.script.run.withSuccessHandler(resolve).withFailureHandler(e => resolve({ status: "Error", message: "Park failed: " + e.message }))
                                            .parkTrfInWaitingRoom(base64Data, file.name, aiData);
                                    });

                                    if (finalSaveResult.status === "Parked" || finalSaveResult.status === "Already Parked") {
                                        addLog("warning", `Waiting Room`, `No match for ${aiData.name || 'Unknown'}`, file.name);
                                        summary.parked.push(aiData.name || 'Unknown');
                                        localStorage.setItem(uniqueFileId, "true");
                                    } else {
                                        addLog("error", `Park Failed`, finalSaveResult.message, file.name);
                                        summary.skipped.push(file.name);
                                    }
                                }
                            }

                            if (!success) {
                                // 🚀 YAHAN DIKHEGA ASLI ERROR!
                                addLog("error", "Analysis Failed", lastErrorMsg || "Unknown Error", file.name);
                                summary.skipped.push(`${file.name} (Error)`);
                            }
                        }

                        headerBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <div style="font-size:16px;">✨</div>
                <span style="font-size:14px; font-weight:600; color:#10b981;">Scan Complete</span>
            </div>
            <div style="font-size:12px; font-weight:500; color:#64748b;">100%</div>
        `;

                        let finalHtml = `<div style="padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-radius:0 0 12px 12px; margin-top: auto;">
            <h4 style="margin:0 0 15px 0; color:#334155; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Final Execution Summary</h4>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap:12px; margin-bottom:0;">
                <div style="background:#ffffff; padding:12px; border-radius:8px; text-align:center; border: 1px solid #e2e8f0;">
                    <div style="font-size:20px; font-weight:800; color:#10b981;">${summary.matched.length}</div>
                    <div style="font-size:10px; font-weight:600; color:#64748b; text-transform:uppercase; margin-top:4px;">Matched</div>
                </div>
                <div style="background:#ffffff; padding:12px; border-radius:8px; text-align:center; border: 1px solid #e2e8f0;">
                    <div style="font-size:20px; font-weight:800; color:#f59e0b;">${summary.parked.length}</div>
                    <div style="font-size:10px; font-weight:600; color:#64748b; text-transform:uppercase; margin-top:4px;">Waiting</div>
                </div>
                <div style="background:#ffffff; padding:12px; border-radius:8px; text-align:center; border: 1px solid #e2e8f0;">
                    <div style="font-size:20px; font-weight:800; color:#3b82f6;">${summary.linked.length}</div>
                    <div style="font-size:10px; font-weight:600; color:#64748b; text-transform:uppercase; margin-top:4px;">Already In</div>
                </div>
                <div style="background:#ffffff; padding:12px; border-radius:8px; text-align:center; border: 1px solid #e2e8f0;">
                    <div style="font-size:20px; font-weight:800; color:#0d9488;">${summary.smartSkipped.length}</div>
                    <div style="font-size:10px; font-weight:600; color:#64748b; text-transform:uppercase; margin-top:4px;">Cached</div>
                </div>
                <div style="background:#ffffff; padding:12px; border-radius:8px; text-align:center; border: 1px solid #e2e8f0;">
                    <div style="font-size:20px; font-weight:800; color:#ef4444;">${summary.skipped.length}</div>
                    <div style="font-size:10px; font-weight:600; color:#64748b; text-transform:uppercase; margin-top:4px;">Failed</div>
                </div>
            </div>
        </div>`;

                        statusBox.insertAdjacentHTML('beforeend', finalHtml);
                        statusBox.scrollTop = statusBox.scrollHeight;

                        if (typeof fetchPendingTRFs === "function") fetchPendingTRFs();
                        if (typeof fetchData === "function") fetchData(true);
                    }
                    // =========================================================
                    // 🟢 WAITING ROOM LOGIC (FRONTEND API) - UPDATED
                    // =========================================================
                    function fetchPendingTRFs() {
                        let listContainer = document.getElementById('pending-trf-list');
                        if (!listContainer) return;

                        listContainer.innerHTML = '<div style="text-align:center; color:#94a3b8; font-size:12px; margin-top:40px;">Fetching pending TRFs... ⏳</div>';

                        google.script.run.withSuccessHandler(function (response) {
                            let trfs = JSON.parse(response);
                            if (trfs.length === 0) {
                                listContainer.innerHTML = '<div style="text-align:center; color:#10b981; font-size:13px; margin-top:40px; font-weight:bold;">🎉 All Clear!<br><span style="color:#64748b; font-weight:normal; font-size: 11px;">No pending TRFs found.</span></div>';
                                return;
                            }

                            // 1. MASTER COPY TEXT PREPARATION
                            let allPendingText = "*🚨 ALL PENDING TRFs 🚨*\n\n";

                            // 2. MASTER COPY BUTTON UI
                            let html = `
            <div style="margin-bottom: 15px; text-align: center;">
                <button onclick="copyWaitingData(this, \`ALL_PENDING_PLACEHOLDER\`)" style="background:#8b5cf6; color:white; border:none; padding:10px 12px; border-radius:6px; font-size:12px; font-weight:bold; cursor:pointer; width:100%; box-shadow: 0 2px 4px rgba(139,92,246,0.3);">
                    📋 Copy ALL Pending TRFs Info
                </button>
            </div>`;

                            trfs.forEach(function (item, index) {
                                let textToCopy = `*Pending TRF Details:*\nName: ${item.name}\nAge: ${item.age}\nGender: ${item.gender}\nBarcode: ${item.barcode}\n_Please update the sheet so it can auto-sync!_`;

                                // Add to master list
                                allPendingText += `*${index + 1}. ${item.name}*\nAge: ${item.age} | Gen: ${item.gender}\nBarcode: ${item.barcode}\n---\n`;

                                html += `
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
                        <b style="font-size: 13px; color: #334155;">${item.name}</b>
                        <span style="font-size: 10px; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 10px;">${item.time.split(' ')[1]}</span>
                    </div>
                    <div style="font-size: 11px; color: #475569; margin-bottom: 10px; line-height: 1.5; background: #f8fafc; padding: 8px; border-radius: 6px;">
                        🧑 Age: <b>${item.age}</b> | ⚧️ Gen: <b>${item.gender}</b><br>
                        🏷️ Barcode: <b style="color: #ec4899;">${item.barcode}</b>
                    </div>
                    
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                        <button onclick="window.open('${item.link}', '_blank')" style="flex: 1; min-width: 45%; padding: 6px; font-size: 11px; background: #fdf2f8; color: #ec4899; border: 1px solid #fbcfe8; border-radius: 4px; cursor: pointer;">👁️ View</button>
                        
                        <button onclick="copyWaitingData(this, \`${textToCopy}\`)" style="flex: 1; min-width: 45%; padding: 6px; font-size: 11px; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; border-radius: 4px; cursor: pointer;">📋 Copy</button>
                        
                        <button onclick="attachTRFManually(${item.rowId}, '${item.link}')" style="flex: 1; min-width: 45%; padding: 6px; font-size: 11px; background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; border-radius: 4px; cursor: pointer; margin-top: 4px;">🔗 Attach to ID</button>
                        
                        <button onclick="deleteTRF(${item.rowId})" style="flex: 1; min-width: 45%; padding: 6px; font-size: 11px; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; margin-top: 4px;">🗑️ Delete</button>
                    </div>
                </div>`;
                            });

                            // Finalize copy text replacement
                            html = html.replace('ALL_PENDING_PLACEHOLDER', allPendingText.replace(/`/g, '\\`'));
                            listContainer.innerHTML = html;

                        }).getPendingTRFs();
                    }

                    // 🟢 NEW FRONTEND FUNCTIONS
                    function deleteTRF(rowId) {
                        if (!confirm("Are you sure you want to permanently delete this TRF from the Waiting Room?")) return;
                        google.script.run.withSuccessHandler(res => {
                            showToast("🗑️ " + res);
                            fetchPendingTRFs(); // Reload list
                        }).withFailureHandler(err => alert("Error: " + err.message)).deletePendingTRF(rowId);
                    }

                    function attachTRFManually(rowId, link) {
                        let bId = prompt("Enter the exact Booking ID to attach this TRF:");
                        if (!bId || bId.trim() === "") return;
                        google.script.run.withSuccessHandler(res => {
                            showToast("✅ " + res);
                            fetchPendingTRFs(); // Reload list
                        }).withFailureHandler(err => alert("Error: " + err.message)).manualAttachPendingTRF(rowId, bId.trim(), link);
                    }

                    function copyWaitingData(btn, text) {
                        navigator.clipboard.writeText(text).then(() => {
                            let oldText = btn.innerHTML;
                            btn.innerHTML = "✅ Copied!";
                            btn.style.background = "#16a34a";
                            btn.style.color = "white";
                            setTimeout(() => {
                                btn.innerHTML = oldText;
                                btn.style.background = "#f0fdf4";
                                btn.style.color = "#16a34a";
                            }, 2000);
                        });
                    }
                    // 🟢 JADOO BUTTON FUNCTION (Read Text)
                    window.readTrfText = function () {
                        let rawLink = document.getElementById('trf-zoom-btn').href; // Original Drive link yahan chhupa hota hai
                        let ocrPanel = document.getElementById('trf-ocr-panel');
                        let ocrBtn = document.getElementById('trf-ocr-btn');

                        // Panel khol do aur loading dikhao
                        ocrPanel.style.display = 'block';
                        ocrPanel.innerHTML = '<div style="text-align:center; margin-top: 40px;"><span style="font-size:20px;">🤖</span><br><b style="color:#ec4899;">AI is reading the TRF...</b><br><span style="color:#64748b;">It takes about 3 seconds</span></div>';

                        // Button ko disable kardo jab tak load ho raha hai
                        ocrBtn.disabled = true;
                        ocrBtn.innerHTML = "⏳ Reading...";
                        ocrBtn.style.opacity = "0.6";

                        google.script.run.withSuccessHandler(function (text) {
                            // Line breaks theek karke render karna
                            let formattedText = text.replace(/\n/g, '<br>');

                            // Output dikhana
                            ocrPanel.innerHTML = `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                    <b style="color:#ec4899;">📄 Extracted TRF Data:</b>
                                    <button onclick="document.getElementById('trf-ocr-panel').style.display='none'" style="border:none; background:none; cursor:pointer; color:#ef4444; font-size:10px; font-weight:bold;">✕ Close</button>
                                </div>
                                <div style="font-family: monospace;">${formattedText}</div>`;

                            // Button ko wapas normal karna
                            ocrBtn.disabled = false;
                            ocrBtn.innerHTML = "📄 Read Text";
                            ocrBtn.style.opacity = "1";
                        }).extractFullTextFromDriveLink(rawLink);
                    };

                    // 🟢 openFloatingTrf ko thoda sa modify karna hoga taaki naya window khulte waqt OCR panel chhup jaye
                    window.openFloatingTrf = function (link, rid, city) {
                        currentTrfRotation = 0;
                        let iframe = document.getElementById('trf-iframe');
                        if (iframe) {
                            iframe.style.transition = "none";
                            iframe.style.transform = "rotate(0deg) scale(1)";
                        }

                        document.getElementById('viewer-rid').value = rid;
                        document.getElementById('viewer-city').value = city;

                        let uploadArea = document.getElementById('trf-upload-area');
                        let delBtn = document.getElementById('trf-delete-btn');
                        let zoomBtn = document.getElementById('trf-zoom-btn');
                        let rotateBtn = document.getElementById('trf-rotate-btn');
                        let ocrBtn = document.getElementById('trf-ocr-btn'); // Naya Button
                        let ocrPanel = document.getElementById('trf-ocr-panel'); // Naya Panel

                        // Har baar naya TRF kholne par text panel band kar do
                        if (ocrPanel) ocrPanel.style.display = 'none';

                        if (link && link.trim() !== '') {
                            let viewLink = link.replace('/view?usp=drivesdk', '/preview').replace('/view', '/preview');

                            iframe.src = viewLink;
                            iframe.style.display = 'block';
                            if (uploadArea) uploadArea.style.display = 'none';
                            if (delBtn) delBtn.style.display = 'block';
                            if (rotateBtn) rotateBtn.style.display = 'block';
                            if (ocrBtn) ocrBtn.style.display = 'block'; // Read Text button on

                            if (zoomBtn) {
                                zoomBtn.href = link;
                                zoomBtn.style.display = 'block';
                            }
                        } else {
                            iframe.src = '';
                            iframe.style.display = 'none';
                            if (uploadArea) uploadArea.style.display = 'flex';
                            if (delBtn) delBtn.style.display = 'none';
                            if (zoomBtn) zoomBtn.style.display = 'none';
                            if (rotateBtn) rotateBtn.style.display = 'none';
                            if (ocrBtn) ocrBtn.style.display = 'none';

                            currentUploadRid = rid;
                            currentUploadCity = city;
                        }

                        document.getElementById('floating-trf-viewer').style.display = 'flex';
                    };
                    // ========================================================
                    // 🚀 FIREBASE INSTANT LISTENER (THE WALKIE-TALKIE)
                    // ========================================================
                    setTimeout(() => {
                        if (typeof window.firebaseDB !== 'undefined') {
                            const syncRef = window.firebaseRef(window.firebaseDB, 'global_sync/last_update');

                            let _lastSyncTs = 0;
                            let _syncInitDone = false; // skip first connect-fire
                            window.firebaseOnValue(syncRef, (snapshot) => {
                                const lastUpdate = snapshot.val();
                                const now = Date.now();
                                if (!_syncInitDone) { _syncInitDone = true; _lastSyncTs = now; return; } // skip stale initial value
                                // 🛡️ Drop sync bursts within 2s of each other — prevents fetch storms
                                if (lastUpdate && typeof isTyping !== 'undefined' && !isTyping) {
                                    if (now - _lastSyncTs < 2000) return; // coalesce
                                    _lastSyncTs = now;
                                    if (typeof fetchData === 'function') fetchData(true);
                                }
                            });
                        }
                    }, 3000);

                    // ========================================================
                    // 👻 THE GHOST BUSTER ENGINE (0.05 Sec Auto-Hide Shield)
                    // ========================================================
                    // 🚀 PERF FIX: Throttled from 50ms → 500ms (10× CPU reduction, same UX)
                    setInterval(() => {
                        if (window.ghostMemory) {
                            let now = Date.now();
                            for (let rid in window.ghostMemory) {
                                let ghost = window.ghostMemory[rid];

                                // 8 second tak card par nazar rakhega
                                if (now - ghost.time < 8000) {
                                    let stLow = ghost.stat.toLowerCase();
                                    let row = document.getElementById(rid);
                                    let dRow = document.getElementById('details-' + rid);

                                    let shouldHide = false;
                                    if (stLow.includes('share') && typeof currentTab !== 'undefined' && currentTab === 'pending') shouldHide = true;
                                    if (!stLow.includes('share') && typeof currentTab !== 'undefined' && currentTab === 'shared') shouldHide = true;

                                    // Agar Google sheet ne galti se card wapas draw kar diya, toh ye use turant hide karega
                                    if (shouldHide && row && row.style.display !== 'none') {
                                        row.style.setProperty('display', 'none', 'important');
                                        if (dRow) dRow.style.setProperty('display', 'none', 'important');
                                    }
                                } else {
                                    // 8 second baad iska kaam khatam
                                    delete window.ghostMemory[rid];
                                }
                            }
                        }
                    }, 500);

                    // ========================================================
                    // 🔒 REAL-TIME CARD LOCKING (BULLETPROOF PRESENCE SYSTEM)
                    // ========================================================
                    let activeLocks = {};

                    function getMyName() {
                        if (typeof window.currentUser !== 'undefined' && window.currentUser.name) return window.currentUser.name;
                        let headerName = document.getElementById('user-display-name');
                        if (headerName && headerName.innerText && headerName.innerText !== "Loading...") return headerName.innerText.trim();
                        return "A Teammate";
                    }

                    // 🚀 BRAMHASTRA: ID ko stable banane ke liye array index (-idx-) hata do
                    function getStableLockId(rid) {
                        return rid ? rid.split('-idx-')[0] : "";
                    }

                    window.acquireLockFirebase = function (rid) {
                        if (typeof window.firebaseDB === 'undefined' || !window.firebaseDB) return;
                        let myName = getMyName();
                        let stableId = getStableLockId(rid); // Use stable ID
                        if (!stableId) return;

                        if (typeof activeLocks !== 'undefined') {
                            for (let oldStableId in activeLocks) {
                                if (activeLocks[oldStableId] && activeLocks[oldStableId].user === myName) {
                                    const oldRef = window.firebaseRef(window.firebaseDB, 'locked_cards/' + oldStableId);
                                    window.firebaseRemove(oldRef);
                                }
                            }
                        }

                        const lockRef = window.firebaseRef(window.firebaseDB, 'locked_cards/' + stableId);
                        window.firebaseSet(lockRef, { user: myName, time: Date.now() });
                    };

                    window.releaseLockFirebase = function (rid) {
                        if (typeof window.firebaseDB === 'undefined' || !window.firebaseDB) return;
                        let stableId = getStableLockId(rid); // Use stable ID
                        if (!stableId) return;

                        const lockRef = window.firebaseRef(window.firebaseDB, 'locked_cards/' + stableId);
                        window.firebaseRemove(lockRef);
                    };

                    setTimeout(() => {
                        if (typeof window.firebaseDB !== 'undefined' && window.firebaseDB) {
                            const lockRef = window.firebaseRef(window.firebaseDB, 'locked_cards');
                            window.firebaseOnValue(lockRef, (snapshot) => {
                                activeLocks = snapshot.val() || {};
                                updateLiveLocksUI();
                            });

                            if (!document.getElementById('lock-pulse-css')) {
                                document.head.insertAdjacentHTML('beforeend', '<style id="lock-pulse-css">@keyframes lockPulse { 0% {opacity: 1;} 50% {opacity: 0.5;} 100% {opacity: 1;} } .live-lock-badge { animation: lockPulse 1.5s infinite; }</style>');
                            }
                        }
                    }, 2000);

                    window.updateLiveLocksUI = function () {
                        const allRows = document.querySelectorAll('.compact-row');
                        let myName = getMyName();

                        allRows.forEach(row => {
                            const rid = row.id;
                            const stableId = getStableLockId(rid); // Compare locks using stable ID
                            const lockData = activeLocks[stableId];
                            let lockBadge = row.querySelector('.live-lock-badge');

                            // Agar koi aur user is card ko dekh raha hai (pichle 10 min mein)
                            if (lockData && lockData.user !== myName && (Date.now() - lockData.time < 600000)) {
                                if (!lockBadge) {
                                    const td = row.querySelector('td:nth-child(2)');
                                    if (td) {
                                        td.insertAdjacentHTML('beforeend', `<div class="live-lock-badge" style="margin-top:6px; padding:3px 6px; background:#fee2e2; border:1px solid #ef4444; border-radius:4px; font-size:9px; font-weight:bold; color:#b91c1c; display:inline-block; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">👁️ ${lockData.user} is viewing...</div>`);
                                    }
                                } else {
                                    lockBadge.innerHTML = `👁️ ${lockData.user} is viewing...`;
                                }
                                row.style.backgroundColor = "rgba(254, 226, 226, 0.4)";
                            } else {
                                if (lockBadge) lockBadge.remove();
                                row.style.backgroundColor = "";
                            }
                        });
                    };

                    window.addEventListener('beforeunload', () => {
                        if (typeof currentlyExpandedRow !== 'undefined' && currentlyExpandedRow) {
                            releaseLockFirebase(currentlyExpandedRow);
                        }
                    });;

                    // ========================================================
                    // 🚀 FIREBASE WEBSOCKET RECEIVER (TWO-WAY MOVE 0.01 SEC)
                    // ========================================================
                    setTimeout(() => {
                        if (typeof window.firebaseDB !== 'undefined' && window.firebaseDB) {
                            const liveRef = window.firebaseRef(window.firebaseDB, 'live_status_updates');

                            window.firebaseOnValue(liveRef, (snapshot) => {
                                const updates = snapshot.val() || {};
                                let myName = getMyName();

                                for (let rid in updates) {
                                    let data = updates[rid];

                                    if (data.usr !== myName && (Date.now() - data.time < 120000)) {
                                        let stLow = data.stat.toLowerCase();
                                        let isShared = stLow.includes('share');

                                        // ⚡ MEMORY MOVE DUSRI SCREEN PAR (O(1) via Map lookup)
                                        if (typeof globalData !== 'undefined') {
                                            let targetTab = isShared ? 'shared' : 'pending';
                                            let sourceTab = isShared ? 'pending' : 'shared';

                                            // Update status across all tabs without O(n) scan per tab
                                            ['pending','create','incomplete','shared','log'].forEach(t => {
                                                if (!Array.isArray(globalData[t])) return;
                                                let item = globalData[t].find(i => i.rid === rid || i.bookingId === rid);
                                                if (item) item.status = data.stat;
                                            });

                                            let srcArr = globalData[sourceTab];
                                            let sIdx = srcArr ? srcArr.findIndex(i => i.rid === rid || i.bookingId === rid) : -1;
                                            if (sIdx > -1) {
                                                let movedItem = srcArr.splice(sIdx, 1)[0];
                                                if (globalData[targetTab]) globalData[targetTab].unshift(movedItem);
                                            }
                                        }

                                        // ⚡ UI MANIPULATION
                                        let row = document.getElementById(rid);
                                        if (row) {
                                            let select = row.querySelector('.status-select');
                                            if (select && select.value !== data.stat) {
                                                select.value = data.stat;
                                                select.style.color = isShared ? 'var(--success)' : 'var(--warning)';

                                                let dRow = document.getElementById('details-' + rid);
                                                let shouldHide = false;
                                                if (isShared && typeof currentTab !== 'undefined' && currentTab === 'pending') shouldHide = true;
                                                if (!isShared && typeof currentTab !== 'undefined' && currentTab === 'shared') shouldHide = true;

                                                if (shouldHide) {
                                                    row.style.setProperty('display', 'none', 'important');
                                                    if (dRow) dRow.style.setProperty('display', 'none', 'important');
                                                    if (typeof updateUI === 'function') updateUI();
                                                } else {
                                                    row.style.display = 'table-row';
                                                }

                                                let td = row.querySelector('td:nth-child(3)');
                                                if (td) {
                                                    let old = row.querySelector('.instant-action-badge');
                                                    if (old) old.remove();

                                                    let badgeBg = isShared ? '#dcfce7' : '#fef08a';
                                                    let badgeColor = isShared ? '#166534' : '#854d0e';

                                                    td.insertAdjacentHTML('beforeend', `<div class="instant-action-badge" style="margin-top:6px; padding:4px 8px; background:${badgeBg}; border:1px solid ${badgeColor}; border-radius:6px; font-size:10px; font-weight:900; color:${badgeColor}; display:inline-block;">🚀 ${data.stat} by ${data.usr}</div>`);

                                                    setTimeout(() => { let b = row.querySelector('.instant-action-badge'); if (b) b.remove(); }, 4000);
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }, 1500);
                    // ========================================================
                    // 🚀 INCOMPLETE TRF COPY GENERATOR
                    // ========================================================
                    window.showIncompleteTRFPopup = function () {
                        let incompleteList = globalData.incomplete || [];

                        // Agar incomplete data nahi hai toh alert dikhao
                        if (incompleteList.length === 0) {
                            if (typeof showToast === 'function') showToast("⚠️ No incomplete records found!");
                            else alert("No incomplete records found!");
                            return;
                        }

                        // 1. Text Format banana
                        let textToCopy = "Hi Team,\n\nTRF not received for the below bookings. Kindly check and update:\n\n";

                        incompleteList.forEach(item => {
                            let rId = (item.rIds && item.rIds.length > 0) ? item.rIds.join(", ") : (item.refId || "N/A");
                            let cxName = item.name || "Unknown";
                            let phlebo = item.phleboName || "Not Assigned";

                            // Format: Request ID || Cx Name || Phlebo Name
                            textToCopy += `${rId} || ${cxName} || ${phlebo}\n`;
                        });

                        // 2. Pop-up (Modal) Banana aur Screen par dikhana
                        let modalHtml = `
            <div id="trf-modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:99999; display:flex; justify-content:center; align-items:center;">
                <div style="background:#fff; padding:20px; border-radius:8px; width:550px; max-width:90%; box-shadow:0 10px 25px rgba(0,0,0,0.3); animation: fadeIn 0.3s ease-in-out;">
                    <h3 style="margin-top:0; color:#1e293b; font-family:sans-serif;">📋 Missing TRF Details</h3>
                    <textarea id="trf-copy-text" style="width:100%; height:250px; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:13px; margin-bottom:15px; resize:none; box-sizing:border-box; outline:none;" readonly>${textToCopy}</textarea>
                    <div style="display:flex; justify-content:flex-end; gap:12px;">
                        <button onclick="document.getElementById('trf-modal-overlay').remove()" style="padding:8px 16px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; color:#475569; font-weight:bold; transition:0.2s;">Cancel</button>
                        <button onclick="copyTRFText()" style="padding:8px 16px; background:#8b5cf6; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(139, 92, 246, 0.3); transition:0.2s;">📋 Copy & Close</button>
                    </div>
                </div>
            </div>`;

                        document.body.insertAdjacentHTML('beforeend', modalHtml);
                    };

                    // 3. Copy Karne ka function
                    window.copyTRFText = function () {
                        let copyTextArea = document.getElementById("trf-copy-text");
                        copyTextArea.select();
                        copyTextArea.setSelectionRange(0, 99999); // Mobile compatibility

                        navigator.clipboard.writeText(copyTextArea.value).then(() => {
                            if (typeof showToast === 'function') showToast("✅ Text Copied to Clipboard!");
                            else alert("Copied successfully!");
                            document.getElementById('trf-modal-overlay').remove(); // Copy hote hi popup band
                        }).catch(err => {
                            alert("Copy failed! Please select and copy manually.");
                        });
                    };
                    // ========================================================
                    // 🚀 AUTO-HIDE/SHOW "COPY TRF" BUTTON ENGINE
                    // ========================================================
                    // 🚀 PERF: Replaced 500ms polling with event-driven tab-switch hook
                    (function setupCopyTRFBtnVisibility() {
                        function syncCopyTRFBtn() {
                            let copyBtn = document.getElementById('copy-trf-btn');
                            if (!copyBtn) return;
                            let show = (typeof currentTab !== 'undefined' && currentTab === 'incomplete') &&
                                    (typeof globalData !== 'undefined' && globalData.incomplete && globalData.incomplete.length > 0);
                            copyBtn.style.display = show ? 'inline-block' : 'none';
                        }
                        // Call once on init and then hook into switchTab
                        syncCopyTRFBtn();
                        const _origSwitchTab = window.switchTab || switchTab;
                        const _hookedSwitchTab = function(t, avoidRender) { _origSwitchTab(t, avoidRender); syncCopyTRFBtn(); };
                        // Expose as override so HTML onclick="switchTab(...)" picks it up
                        window._syncCopyTRFBtn = syncCopyTRFBtn;
                    })();
                    /* 🟢 ULTRA PRO MAX: MINIMIZE MODAL ENGINE 🟢 */
                    window.minimizeModal = function (modalId, title) {
                        let modalEl = document.getElementById(modalId);
                        if (!modalEl) return;

                        // 1. Modal ko chupana (Data delete kiye bina display none kar diya)
                        modalEl.style.display = 'none';

                        // 2. Floating Dock dhoondhna ya naya banana
                        let dock = document.getElementById('minimized-dock');
                        if (!dock) {
                            dock = document.createElement('div');
                            dock.id = 'minimized-dock';
                            dock.style.cssText = 'position: fixed; bottom: 30px; left: 20px; z-index: 999999; display: flex; flex-direction: column; gap: 12px;';
                            document.body.appendChild(dock);
                        }

                        // 3. Agar already minimize nahi hai, toh ek floating tab banao
                        if (!document.getElementById('min-' + modalId)) {
                            let minTab = document.createElement('div');
                            minTab.id = 'min-' + modalId;
                            minTab.title = "Click to restore";

                            // Premium Glassmorphism Style
                            minTab.style.cssText = 'background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.4); padding: 10px 16px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); cursor: pointer; display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 14px; color: #1e293b; transition: all 0.2s ease;';

                            minTab.innerHTML = `
                    <span style="display:flex; align-items:center; justify-content:center; background:#eff6ff; color:#3b82f6; width:28px; height:28px; border-radius:6px; font-size:16px;">📊</span>
                    <span style="white-space:nowrap;">${title}</span>
                    <span style="color:#10b981; margin-left:10px; font-size:14px; font-weight:bold; background: #d1fae5; padding: 2px 8px; border-radius: 4px;">⤢ Open</span>
                `;

                            // Hover Animation
                            minTab.onmouseover = () => { minTab.style.transform = 'translateY(-3px)'; minTab.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.2)'; };
                            minTab.onmouseout = () => { minTab.style.transform = 'translateY(0)'; minTab.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'; };

                            // Restore Animation & Logic
                            minTab.onclick = function () {
                                // Modal ko wapas flex/block se dikhana (taaki wo beech me aa jaye)
                                modalEl.style.display = 'flex';
                                minTab.remove(); // Dock se hata do
                            };

                            dock.appendChild(minTab);
                        }
                    };
                    // =========================================================
                    // 🚀 PRO-LEVEL TREND ANALYTICS ENGINE (SMOOTH UI)
                    // =========================================================
                    let miniChartObj = null;
                    let fullChartObj = null;
                    let rawTrendStats = null;
                    let currentChartMode = 'partner'; // 'partner' or 'source'

                    function initTrendDates() {
                        let e = new Date();
                        let s = new Date(e.getTime() - (29 * 86400000));
                        if (document.getElementById('trend-date-end')) document.getElementById('trend-date-end').value = e.toISOString().slice(0, 10);
                        if (document.getElementById('trend-date-start')) document.getElementById('trend-date-start').value = s.toISOString().slice(0, 10);
                    }

                    window.setTrendDates = function (days) {
                        let e = new Date();
                        let s = new Date(e.getTime() - ((days - 1) * 86400000));
                        document.getElementById('trend-date-end').value = e.toISOString().slice(0, 10);
                        document.getElementById('trend-date-start').value = s.toISOString().slice(0, 10);

                        // Manage Buttons Active State
                        ['7', '15', '30'].forEach(d => {
                            let btn = document.getElementById('btn-trend-' + d);
                            if (btn) { if (d == days) btn.classList.add('active'); else btn.classList.remove('active'); }
                        });

                        fetchTrendStats(true);
                    };

                    window.toggleChartMode = function (mode) {
                        currentChartMode = mode;
                        document.getElementById('mode-partner').classList.remove('active');
                        document.getElementById('mode-source').classList.remove('active');
                        document.getElementById('mode-' + mode).classList.add('active');
                        renderFullChart();
                    };

                    function fetchTrendStats(forceBackend = false) {
                        let sInput = document.getElementById('trend-date-start');
                        let eInput = document.getElementById('trend-date-end');
                        if (!sInput || !sInput.value) initTrendDates();

                        let start = sInput.value;
                        let end = eInput.value;

                        let miniBadge = document.getElementById('mini-chart-badge');
                        let syncIcon = document.getElementById('sync-trend-icon');
                        if (miniBadge) miniBadge.innerText = "Syncing... ⏳";
                        if (syncIcon) syncIcon.classList.add('spin');

                        google.script.run.withSuccessHandler(res => {
                            if (syncIcon) syncIcon.classList.remove('spin');

                            let data;
                            try { data = JSON.parse(res); } catch(e) {
                                if (miniBadge) { miniBadge.innerText = "Parse Error!"; miniBadge.style.background = "#fee2e2"; miniBadge.style.color = "#ef4444"; }
                                console.error('[Trend] JSON.parse failed:', e);
                                return;
                            }
                            if (data.error) {
                                if (miniBadge) { miniBadge.innerText = "Error!"; miniBadge.style.background = "#fee2e2"; miniBadge.style.color = "#ef4444"; }
                                return;
                            }

                            rawTrendStats = data;

                            let cities = new Set();
                            Object.values(rawTrendStats).forEach(dayData => Object.keys(dayData).forEach(c => cities.add(c)));
                            let cityOpts = '<option value="ALL">🏢 All Cities</option>' + Array.from(cities).sort().map(c => `<option value="${c}">${c}</option>`).join('');

                            let miniSelect = document.getElementById('mini-chart-city');
                            let fullSelect = document.getElementById('full-chart-city');
                            if (miniSelect) { let v = miniSelect.value; miniSelect.innerHTML = cityOpts; miniSelect.value = cities.has(v) ? v : "ALL"; }
                            if (fullSelect) { let v = fullSelect.value; fullSelect.innerHTML = cityOpts; fullSelect.value = cities.has(v) ? v : "ALL"; }

                            renderMiniChart();
                            const analyticsPage = document.getElementById('analyticsFullPage');
                            if (analyticsPage && analyticsPage.classList.contains('active')) renderFullChart();
                        }).withFailureHandler(err => {
                            if (syncIcon) syncIcon.classList.remove('spin');
                            if (miniBadge) { miniBadge.innerText = "Error!"; miniBadge.style.background = "#fee2e2"; miniBadge.style.color = "#ef4444"; }
                            console.error('[Trend] Backend error:', err);
                        }).getTrendAnalyticsData(start, end);
                    }

                    window.renderMiniChart = function () {
                        if (!rawTrendStats || rawTrendStats.error) return;

                        let city = document.getElementById('mini-chart-city').value || "ALL";
                        let allDates = Object.keys(rawTrendStats).sort((a, b) => new Date(a) - new Date(b));
                        let last7Dates = allDates.slice(-7);

                        let ppmcData = [], retailData = [], lineData = [], labels = [], totalWeek = 0;

                        last7Dates.forEach(dateStr => {
                            let dayData = rawTrendStats[dateStr];
                            let p = 0, r = 0;

                            if (city === "ALL") {
                                Object.values(dayData).forEach(cityStats => { p += cityStats.PPMC; r += cityStats.RETAIL; });
                            } else if (dayData[city]) { p = dayData[city].PPMC; r = dayData[city].RETAIL; }

                            ppmcData.push(p); retailData.push(r);
                            let totalDay = p + r; lineData.push(totalDay); totalWeek += totalDay;

                            let dObj = new Date(dateStr);
                            let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                            labels.push(`${days[dObj.getDay()]} ${dObj.getDate()}/${dObj.getMonth() + 1}`);
                        });

                        let badge = document.getElementById('mini-chart-badge');
                        if (badge) {
                            badge.innerText = `${totalWeek}`;
                            badge.style.background = "transparent";
                            badge.style.color = "#065f46";
                        }
                        // 🚀 Populate PPMC/Retail split badges in new widget
                        let totalPPMC7 = ppmcData.reduce((a, b) => a + b, 0);
                        let totalRetail7 = retailData.reduce((a, b) => a + b, 0);
                        let ppmcBadgeEl = document.getElementById('mini-ppmc-badge');
                        let retailBadgeEl = document.getElementById('mini-retail-badge');
                        if (ppmcBadgeEl) ppmcBadgeEl.innerText = totalPPMC7 > 0 ? totalPPMC7 : '0';
                        if (retailBadgeEl) retailBadgeEl.innerText = totalRetail7 > 0 ? totalRetail7 : '0';

                        // ── CHART.JS INIT GUARD ──────────────────────────────────
                        // Yield one animation frame so the browser finalises layout
                        // and the canvas reports correct offsetWidth/Height to Chart.js.
                        // This is the definitive fix for the "0-height chart" GSAP conflict.
                        requestAnimationFrame(() => {
                            let miniCanvas = document.getElementById('miniTrendChart');
                            if (!miniCanvas) return; // Tab may have been closed before RAF fired
                            let ctx = miniCanvas.getContext('2d');
                            if (miniChartObj) { miniChartObj.destroy(); miniChartObj = null; }

                            // ── Soft gradient fill under the total line ──
                            const lineGrad = ctx.createLinearGradient(0, 0, 0, 120);
                            lineGrad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
                            lineGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

                            miniChartObj = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: labels,
                                    datasets: [
                                        {
                                            type: 'line',
                                            label: 'Total',
                                            data: lineData,
                                            borderColor: '#10b981',
                                            backgroundColor: lineGrad,
                                            borderWidth: 2.5,
                                            tension: 0.45,
                                            pointRadius: 0,
                                            pointHoverRadius: 4,
                                            pointHoverBackgroundColor: '#10b981',
                                            fill: true,
                                            order: 0
                                        },
                                        {
                                            type: 'bar',
                                            label: 'Retail',
                                            data: retailData,
                                            backgroundColor: 'rgba(59, 130, 246, 0.55)',
                                            hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
                                            borderRadius: 4,
                                            borderSkipped: false,
                                            barPercentage: 0.55,
                                            order: 1
                                        },
                                        {
                                            type: 'bar',
                                            label: 'PPMC',
                                            data: ppmcData,
                                            backgroundColor: 'rgba(239, 68, 68, 0.55)',
                                            hoverBackgroundColor: 'rgba(239, 68, 68, 0.8)',
                                            borderRadius: 4,
                                            borderSkipped: false,
                                            barPercentage: 0.55,
                                            order: 2
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animation: { duration: 600, easing: 'easeOutQuart' },
                                    scales: {
                                        x: {
                                            stacked: true,
                                            grid: { display: false },
                                            border: { display: false },
                                            ticks: {
                                                font: { size: 8, family: 'Inter', weight: '600' },
                                                color: '#94a3b8',
                                                maxRotation: 0
                                            }
                                        },
                                        y: {
                                            stacked: true,
                                            border: { display: false },
                                            grid: { display: false },
                                            ticks: { display: false }
                                        }
                                    },
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: {
                                            mode: 'index',
                                            intersect: false,
                                            backgroundColor: 'rgba(15, 23, 42, 0.92)',
                                            titleFont: { size: 11, family: 'Inter', weight: '700' },
                                            bodyFont: { size: 11, family: 'Inter' },
                                            cornerRadius: 10,
                                            padding: { x: 12, y: 8 },
                                            boxPadding: 4
                                        }
                                    },
                                    interaction: { mode: 'index', intersect: false }
                                }
                            });
                        }); // end requestAnimationFrame
                    };

                    window.renderFullChart = function () {
                        if (!rawTrendStats || rawTrendStats.error) return;

                        let city = document.getElementById('full-chart-city').value || "ALL";
                        let targetDates = Object.keys(rawTrendStats).sort((a, b) => new Date(a) - new Date(b));
                        let totalDays = targetDates.length;

                        let ds1Data = [], ds2Data = [], lineData = [], labels = [];
                        let totalP = 0, totalR = 0, totalApi = 0, totalMan = 0, grandTotal = 0;

                        targetDates.forEach(dateStr => {
                            let dayData = rawTrendStats[dateStr];
                            let p = 0, r = 0, a = 0, m = 0;

                            if (city === "ALL") {
                                Object.values(dayData).forEach(cityStats => {
                                    p += cityStats.PPMC; r += cityStats.RETAIL;
                                    a += cityStats.API; m += cityStats.MANUAL;
                                });
                            } else if (dayData[city]) {
                                p = dayData[city].PPMC; r = dayData[city].RETAIL;
                                a = dayData[city].API; m = dayData[city].MANUAL;
                            }

                            totalP += p; totalR += r; totalApi += a; totalMan += m;
                            let totalDay = p + r;
                            grandTotal += totalDay;

                            lineData.push(totalDay);

                            if (currentChartMode === 'partner') { ds1Data.push(r); ds2Data.push(p); }
                            else { ds1Data.push(a); ds2Data.push(m); }

                            let dObj = new Date(dateStr);
                            let daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                            labels.push(`${daysArr[dObj.getDay()]} ${("0" + dObj.getDate()).slice(-2)}/${("0" + (dObj.getMonth() + 1)).slice(-2)}`);
                        });

                        // Update KPI Cards
                        document.getElementById('stat-total').innerText = grandTotal;
                        document.getElementById('stat-avg').innerText = totalDays > 0 ? Math.round(grandTotal / totalDays) : 0;
                        document.getElementById('stat-ppmc').innerText = totalP;
                        document.getElementById('stat-retail').innerText = totalR;
                        document.getElementById('stat-api').innerText = totalApi;
                        document.getElementById('stat-manual').innerText = totalMan;

                        let titleTxt = city === "ALL" ? `Overall Collections` : `${city} Collections`;
                        document.getElementById('full-chart-title').innerText = titleTxt;

                        if (targetDates.length > 0) {
                            let d1 = new Date(targetDates[0]); let d2 = new Date(targetDates[targetDates.length - 1]);
                            let mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            document.getElementById('chart-date-label').innerHTML = `📅 ${d1.getDate()} ${mNames[d1.getMonth()]}  ➔  ${d2.getDate()} ${mNames[d2.getMonth()]}`;
                        }

                        requestAnimationFrame(() => {
                            let fullCanvas = document.getElementById('fullTrendChart');
                            if (!fullCanvas) return; // Tab may have been closed before RAF fired
                            let ctx = fullCanvas.getContext('2d');
                            if (fullChartObj) { fullChartObj.destroy(); fullChartObj = null; }

                            // Line Chart Gradient (Green)
                            let gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
                            gradientLine.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
                            gradientLine.addColorStop(1, 'rgba(16, 185, 129, 0)');

                            let ds1Config = currentChartMode === 'partner'
                                ? { label: 'Retail / AHC', color: '#3b82f6' }
                                : { label: 'API Bookings', color: '#8b5cf6' };

                            let ds2Config = currentChartMode === 'partner'
                                ? { label: 'PPMC', color: '#ef4444' }
                                : { label: 'Manual Bookings', color: '#64748b' };

                            fullChartObj = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: labels,
                                    datasets: [
                                        {
                                            type: 'line', label: 'Total Volume', data: lineData,
                                            borderColor: '#10b981', backgroundColor: gradientLine,
                                            borderWidth: 3.5, tension: 0.45, pointRadius: 0,
                                            pointHoverRadius: 6, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#10b981', pointHoverBorderWidth: 3, fill: true
                                        },
                                        {
                                            type: 'bar', label: ds1Config.label, data: ds1Data,
                                            backgroundColor: ds1Config.color, borderRadius: 6, borderSkipped: false, barPercentage: 0.6
                                        },
                                        {
                                            type: 'bar', label: ds2Config.label, data: ds2Data,
                                            backgroundColor: ds2Config.color, borderRadius: 6, borderSkipped: false, barPercentage: 0.6
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true, maintainAspectRatio: false,
                                    scales: {
                                        x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#64748b' } },
                                        y: { stacked: true, grid: { color: '#f1f5f9', borderDash: [5, 5] }, border: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#94a3b8' } }
                                    },
                                    plugins: {
                                        legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true, font: { family: 'Inter', weight: 'bold', size: 12 }, color: '#334155' } },
                                        tooltip: { mode: 'index', intersect: false, backgroundColor: 'rgba(15, 23, 42, 0.95)', titleFont: { size: 14, family: 'Inter' }, bodyFont: { size: 13, family: 'Inter' }, padding: 14, cornerRadius: 10, boxPadding: 6 }
                                    },
                                    interaction: { mode: 'index', intersect: false }
                                }
                            });
                        }); // end requestAnimationFrame
                    };

                    const originalHideLoader = hideLoader;
                    hideLoader = function () {
                        try { originalHideLoader(); } catch(e) { console.warn('[hideLoader] original threw:', e); }
                        if (!rawTrendStats) fetchTrendStats();

                        if (window.gsap) {
                            gsap.from(".toolbar, .filter-row .search-wrapper, .filter-row .btn-apple, .segmented-control", {
                                opacity: 0,
                                x: -15,
                                duration: 0.8,
                                stagger: 0.05,
                                ease: "power3.out",
                                delay: 0.1,
                                clearProps: "all"
                            });
                        }
                    };

                    // ========================================================
                    // 🎨 THEME ENGINE LOGIC (Aggressive Global Rewrite)
                    // ========================================================

                    window.setUiTheme = function (themeClass, silent) {
                        // ✅ AGGRESSIVE: Surgically remove ONLY color theme classes, preserve everything else
                        const ALL_COLOR_THEMES = ['theme-ocean', 'theme-emerald', 'theme-sunset', 'theme-aurora', 'theme-green', 'theme-red', 'theme-orange'];
                        ALL_COLOR_THEMES.forEach(t => document.body.classList.remove(t));

                        // Add new color theme
                        document.body.classList.add(themeClass);

                        // ✅ Preserve dark-mode (was being nuked before by className = '')
                        if (localStorage.getItem('hg_darkMode') === 'true') {
                            if (!document.body.classList.contains('dark-mode')) document.body.classList.add('dark-mode');
                        }

                        // ✅ Preserve UI style class (glassmorphism, skeuomorphism etc.)
                        const savedStyle = localStorage.getItem('hyperGlassThemeStyle');
                        if (savedStyle && !document.body.classList.contains('style-' + savedStyle)) {
                            document.body.classList.add('style-' + savedStyle);
                        }

                        // ✅ Update --primary CSS variable + persist it
                        const root = document.documentElement;
                        const themeColorMap = {
                            'theme-aurora': '#8b5cf6',
                            'theme-sunset': '#ea580c',
                            'theme-emerald': '#059669',
                            'theme-ocean': '#0284c7',
                            'theme-green': '#059669',
                            'theme-orange': '#d97706',
                            'theme-red': '#dc2626'
                        };
                        const newPrimary = themeColorMap[themeClass] || '#4f46e5';
                        root.style.setProperty('--primary', newPrimary);
                        localStorage.setItem('hg_primary', newPrimary);

                        // ✅ Persist theme choice so refresh remembers it
                        // Mark auto-themes explicitly so updateThemeBackground knows they're manually chosen
                        localStorage.setItem('saved_premium_theme', themeClass);
                        // If user explicitly picks green/orange/red from dropdown, lock it for 10 min
                        // by tagging it so updateThemeBackground won't auto-switch away from it
                        if (['theme-green', 'theme-orange', 'theme-red'].includes(themeClass)) {
                            localStorage.setItem('hg_theme_locked_until', Date.now() + 600000);
                        } else {
                            localStorage.removeItem('hg_theme_locked_until');
                        }

                        // ── Save to Firebase (cross-device sync) ──
                        if (!silent && window.currentUser && typeof window.saveUserPreferences === 'function') {
                            window.saveUserPreferences({
                                themeClass: themeClass,
                                primaryColor: newPrimary,
                                darkMode: document.body.classList.contains('dark-mode'),
                                themeStyle: localStorage.getItem('hyperGlassThemeStyle') || 'glassmorphism',
                                cursorPreset: localStorage.getItem('hg_cursorPreset') || 'liquid-drop'
                            });
                        }

                        // Close dropdown
                        const dropdown = document.getElementById('theme-dropdown');
                        if (dropdown) dropdown.classList.remove('show');

                        if (!silent && typeof showToast === 'function') showToast('🎨 Theme saved & applied!');
                    };

                    window.setThemeStyle = function (styleName, element) {
                        // Remove existing style classes
                        document.body.className = document.body.className.replace(/\bstyle-[a-z0-9-]+\b/g, '');
                        document.body.classList.add('style-' + styleName);

                        // Update active state in UI
                        document.querySelectorAll('.theme-preset-card').forEach(c => c.classList.remove('active-theme'));
                        if (element) element.classList.add('active-theme');

                        // Save to localStorage
                        localStorage.setItem('hyperGlassThemeStyle', styleName);
                        if (window.saveUserPreferences) window.saveUserPreferences(); // ⚡ FIREBASE SAVE
                    };

                    window.applyCustomTheme = function () {
                        const primary = document.getElementById('tc-color-primary').value;
                        const danger = document.getElementById('tc-color-danger').value;
                        const bgUrl = document.getElementById('tc-bg-url').value;

                        if (primary) {
                            document.documentElement.style.setProperty('--primary', primary);
                            localStorage.setItem('hg_primary', primary);
                        }
                        if (danger) {
                            document.documentElement.style.setProperty('--danger', danger);
                            localStorage.setItem('hg_danger', danger);
                        }
                        if (bgUrl) {
                            document.body.style.backgroundImage = `url('${bgUrl}')`;
                            document.body.style.backgroundSize = 'cover';
                            document.body.style.backgroundPosition = 'center';
                            document.body.style.animation = 'none'; // Stop mesh liquid if custom bg
                            document.body.classList.remove('theme-green', 'theme-orange', 'theme-red');
                            localStorage.setItem('hg_bgUrl', bgUrl);
                        }

                        if (window.saveUserPreferences) window.saveUserPreferences(); // ⚡ FIREBASE SAVE
                        closeModal('themeCenterModal');
                        if (typeof showToast === 'function') showToast("🎨 Custom Engine Applied & Saved!");
                    };

                    window.toggleTheme = function () {
                        // Dark mode toggle intercept override
                        const isDark = document.body.classList.toggle('dark-mode');
                        localStorage.setItem('hg_darkMode', isDark);
                        // ✅ FIX: dark-light-btn is the moon/sun toggle; theme-btn is the ⚙️ settings
                        var dlBtn = document.getElementById('dark-light-btn');
                        if (dlBtn) dlBtn.innerHTML = isDark ? '☀️' : '🌙';
                        // Persist dark mode to Firebase
                        if (window.currentUser && typeof window.saveUserPreferences === 'function') {
                            window.saveUserPreferences({
                                darkMode: isDark,
                                themeClass: localStorage.getItem('saved_premium_theme') || 'theme-green',
                                themeStyle: localStorage.getItem('hyperGlassThemeStyle') || 'glassmorphism',
                                primaryColor: localStorage.getItem('hg_primary') || '#4f46e5',
                                cursorPreset: localStorage.getItem('hg_cursorPreset') || 'liquid-drop'
                            });
                        }
                    };

                    // ── ☁️ FIREBASE USER PREFERENCES ENGINE ─────────────────────
                    // Email → safe Firebase key (Firebase keys cannot contain '.')
                    function _emailToKey(email) {
                        return email ? email.replace(/\./g, ',').replace(/@/g, '_at_') : 'anon';
                    }

                    window.saveUserPreferences = function (prefs) {
                        if (!window.firebaseDB || !window.currentUser || !window.currentUser.email) return;
                        try {
                            var key = _emailToKey(window.currentUser.email);
                            var prefRef = window.firebaseRef(window.firebaseDB, 'user_prefs/' + key);
                            window.firebaseSet(prefRef, Object.assign({}, prefs, { updatedAt: Date.now() }));
                        } catch (e) { console.warn('[Prefs] Save failed:', e); }
                    };

                    window.loadUserPreferences = function () {
                        if (!window.firebaseDB || !window.currentUser || !window.currentUser.email) return;
                        try {
                            var key = _emailToKey(window.currentUser.email);
                            var prefRef = window.firebaseRef(window.firebaseDB, 'user_prefs/' + key);
                            // onlyOnce: true → reads once, no persistent listener overhead
                            window.firebaseOnValue(prefRef, function (snapshot) {
                                var prefs = snapshot.val();
                                if (!prefs) return;

                                // 1. Dark mode
                                if (prefs.darkMode === true) {
                                    document.body.classList.add('dark-mode');
                                    localStorage.setItem('hg_darkMode', 'true');
                                    var dlBtn = document.getElementById('dark-light-btn');
                                    if (dlBtn) dlBtn.innerHTML = '☀️';
                                } else if (prefs.darkMode === false) {
                                    document.body.classList.remove('dark-mode');
                                    localStorage.setItem('hg_darkMode', 'false');
                                    var dlBtn2 = document.getElementById('dark-light-btn');
                                    if (dlBtn2) dlBtn2.innerHTML = '🌙';
                                }

                                // 2. Color theme (silent=true so no toast on load)
                                if (prefs.themeClass && typeof window.setUiTheme === 'function') {
                                    window.setUiTheme(prefs.themeClass, true);
                                }

                                // 3. UI style preset (glassmorphism, etc.)
                                if (prefs.themeStyle) {
                                    document.body.className = document.body.className.replace(/\bstyle-[a-z0-9-]+\b/g, '');
                                    document.body.classList.add('style-' + prefs.themeStyle);
                                    localStorage.setItem('hyperGlassThemeStyle', prefs.themeStyle);
                                }

                                // 4. Custom primary color
                                if (prefs.primaryColor) {
                                    document.documentElement.style.setProperty('--primary', prefs.primaryColor);
                                    localStorage.setItem('hg_primary', prefs.primaryColor);
                                }

                                // 5. Cursor preset (inject after GSAP IIFE)
                                if (prefs.cursorPreset && prefs.cursorPreset !== 'liquid-drop') {
                                    setTimeout(function () {
                                        if (typeof window.setCursorPreset === 'function') {
                                            var btn = document.getElementById('cursor-btn-' + prefs.cursorPreset);
                                            window.setCursorPreset(prefs.cursorPreset, btn);
                                        }
                                    }, 400);
                                }
                            }, { onlyOnce: true });
                        } catch (e) { console.warn('[Prefs] Load failed:', e); }
                    };

                    // ── CURSOR PRESET ENGINE ─────────────────────────────────────
                    window.setCursorPreset = function (preset, btnEl) {
                        const cursor = document.getElementById('custom-cursor');
                        if (!cursor) return;

                        // Strip all preset classes
                        cursor.classList.remove('preset-minimal-ring', 'preset-neon-dot');

                        // Apply new preset (liquid-drop is the default, no extra class needed)
                        if (preset === 'minimal-ring') cursor.classList.add('preset-minimal-ring');
                        if (preset === 'neon-dot') cursor.classList.add('preset-neon-dot');

                        // Update active button state in Theme Center
                        document.querySelectorAll('.tc-cursor-btn').forEach(b => {
                            b.style.borderColor = 'var(--border-light)';
                            b.style.background = 'var(--card-bg)';
                            b.style.color = 'var(--text-main)';
                        });
                        if (btnEl) {
                            btnEl.style.borderColor = 'var(--primary)';
                            btnEl.style.background = 'var(--primary-glow)';
                            btnEl.style.color = 'var(--primary)';
                        }

                        localStorage.setItem('hg_cursorPreset', preset);
                    };

                    // Restore persistent logic on load
                    document.addEventListener('DOMContentLoaded', () => {
                        // ✅ FIX: Restore color theme class FIRST on every refresh
                        const ALL_COLOR_THEMES = ['theme-ocean', 'theme-emerald', 'theme-sunset', 'theme-aurora', 'theme-green', 'theme-red', 'theme-orange'];
                        const savedColorTheme = localStorage.getItem('saved_premium_theme');
                        if (savedColorTheme && ALL_COLOR_THEMES.indexOf(savedColorTheme) !== -1) {
                            ALL_COLOR_THEMES.forEach(t => document.body.classList.remove(t));
                            document.body.classList.add(savedColorTheme);
                            // Restore matching --primary variable
                            const themeColorMap = { 'theme-aurora': '#8b5cf6', 'theme-sunset': '#ea580c', 'theme-emerald': '#059669', 'theme-ocean': '#0284c7', 'theme-green': '#059669', 'theme-orange': '#d97706', 'theme-red': '#dc2626' };
                            if (themeColorMap[savedColorTheme]) document.documentElement.style.setProperty('--primary', themeColorMap[savedColorTheme]);
                        }

                        const savedStyle = localStorage.getItem('hyperGlassThemeStyle');
                        if (savedStyle) {
                            document.body.classList.add('style-' + savedStyle);
                            const cards = document.querySelectorAll('.theme-preset-card');
                            cards.forEach(c => {
                                if (c.getAttribute('onclick') && c.getAttribute('onclick').includes(savedStyle)) {
                                    c.classList.add('active-theme');
                                } else {
                                    c.classList.remove('active-theme');
                                }
                            });
                        } else {
                            document.body.classList.add('style-glassmorphism');
                        }

                        if (localStorage.getItem('hg_darkMode') === 'true') {
                            document.body.classList.add('dark-mode');
                        }

                        const savedBg = localStorage.getItem('hg_bgUrl');
                        if (savedBg) {
                            document.body.style.backgroundImage = `url('${savedBg}')`;
                            document.body.style.backgroundSize = 'cover';
                            document.body.style.backgroundPosition = 'center';
                            document.body.style.animation = 'none';
                            document.body.classList.remove('theme-green', 'theme-orange', 'theme-red');
                        }
                        if (localStorage.getItem('hg_primary')) document.documentElement.style.setProperty('--primary', localStorage.getItem('hg_primary'));
                        if (localStorage.getItem('hg_danger')) document.documentElement.style.setProperty('--danger', localStorage.getItem('hg_danger'));

                        // ── Restore Cursor Preset ──
                        const savedCursor = localStorage.getItem('hg_cursorPreset');
                        if (savedCursor && savedCursor !== 'liquid-drop') {
                            // Cursor DOM is injected by GSAP IIFE; wait for it
                            setTimeout(() => {
                                const activeCursorBtn = document.getElementById('cursor-btn-' + savedCursor);
                                setCursorPreset(savedCursor, activeCursorBtn);
                            }, 200);
                        }

                        // ── Sync Theme Center: mark active cursor preset button ──
                        const activeCursorPreset = localStorage.getItem('hg_cursorPreset') || 'liquid-drop';
                        const activeCursorBtn = document.getElementById('cursor-btn-' + activeCursorPreset);
                        if (activeCursorBtn) {
                            activeCursorBtn.style.borderColor = 'var(--primary)';
                            activeCursorBtn.style.background = 'var(--primary-glow)';
                            activeCursorBtn.style.color = 'var(--primary)';
                        }
                    });

                    // ========================================================
                    // 🚀 HYPER-GLASS 2.0 PREMIUM MOTION ENGINE (Phase 2 & 3)
                    // All layers: pointer-events:none — zero click interference
                    // ========================================================
                    (function initHyperGlassMotion() {
                        if (typeof window.gsap === 'undefined') return;

                        // ── 0. Inject Custom Cursor DOM Payload ─────────────────
                        let customCursor = document.getElementById('custom-cursor');
                        if (!customCursor) {
                            customCursor = document.createElement('div');
                            customCursor.id = 'custom-cursor';
                            document.body.appendChild(customCursor);
                        }

                        // High-performance GSAP quickSetter for cursor
                        const xTo = gsap.quickTo(customCursor, "x", { duration: 0.15, ease: "power3" });
                        const yTo = gsap.quickTo(customCursor, "y", { duration: 0.15, ease: "power3" });

                        window.addEventListener("mousemove", e => {
                            xTo(e.clientX);
                            yTo(e.clientY);
                        });

                        // Hide when cursor leaves window
                        document.addEventListener('mouseout', e => {
                            if (!e.relatedTarget && !e.toElement) customCursor.classList.add('hidden');
                        });
                        document.addEventListener('mouseenter', () => customCursor.classList.remove('hidden'));

                        // Cursor hover interactions (event delegation)
                        document.addEventListener('mouseover', e => {
                            const isInteractable = e.target.closest('a, button, input, select, textarea, .glass-card, .theme-preset-card, .file-drop-area');
                            if (isInteractable) {
                                customCursor.classList.add('hovering');
                            }
                        });
                        document.addEventListener('mouseout', e => {
                            const isInteractable = e.target.closest('a, button, input, select, textarea, .glass-card, .theme-preset-card, .file-drop-area');
                            if (isInteractable) {
                                customCursor.classList.remove('hovering');
                            }
                        });

                        // ── 🚀 STAGGERED PREMIUM CARD ENTRANCE (GSAP) ───────────
                        function runEntranceAnimation() {
                            const kpiCards = document.querySelectorAll('.kpi-grid .glass-card');
                            if (kpiCards.length > 0 && window.gsap) {
                                gsap.fromTo(kpiCards,
                                    { y: 30, opacity: 0 }, // Animation yahan se shuru hogi
                                    {
                                        y: 0,
                                        opacity: 1,
                                        duration: 0.8,
                                        stagger: 0.1,
                                        ease: "power4.out",
                                        clearProps: "all" // Khatam hone par CSS normal ho jayegi
                                    }
                                );
                            }

                            // Animate Toolbar and Table Container as well for premium feel
                            if (window.gsap) {
                                gsap.fromTo(".toolbar, .table-container",
                                    { y: 40, opacity: 0 },
                                    { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out", stagger: 0.2 }
                                );
                            }

                            // ── CHART WRAPPER: Hard-guarantee visibility before Chart.js measures canvas ──
                            const chartWrapper = document.getElementById('miniTrendChart');
                            if (chartWrapper && window.gsap) {
                                const wrapper = chartWrapper.closest('div[style*="min-height"]') || chartWrapper.parentElement;
                                if (wrapper) {
                                    gsap.set(wrapper, { opacity: 1, visibility: 'visible', clearProps: "opacity,visibility" });
                                }
                            }
                        }

                        // ── 2. 3D CARD TILT + DEEP SPECULAR (RAF-throttled) ─────
                        // Using RAF for cursor tracking to guarantee 60fps, no jank
                        function attachCardTilt(card) {
                            if (card._hyper_tilt_attached) return;
                            card._hyper_tilt_attached = true;
                            card.style.transformStyle = "preserve-3d";

                            let cardRaf = null;
                            let cx = 0, cy = 0;

                            card.addEventListener('mousemove', (e) => {
                                const rect = card.getBoundingClientRect();
                                cx = e.clientX - rect.left;
                                cy = e.clientY - rect.top;

                                if (!cardRaf) {
                                    cardRaf = requestAnimationFrame(() => {
                                        // CSS var for specular highlight — no reflow cost
                                        card.style.setProperty('--mouse-x', cx + 'px');
                                        card.style.setProperty('--mouse-y', cy + 'px');
                                        cardRaf = null;
                                    });
                                }

                                // GSAP tilt — clamped to ±10 degrees for subtlety
                                const rect2 = card.getBoundingClientRect();
                                const rotX = -((cy / rect2.height) - 0.5) * 10;
                                const rotY = ((cx / rect2.width) - 0.5) * 10;
                                gsap.to(card, {
                                    rotationX: rotX,
                                    rotationY: rotY,
                                    transformPerspective: 900,
                                    scale: 1.025,
                                    duration: 0.35,
                                    ease: "power2.out",
                                    overwrite: "auto"
                                });
                            });

                            card.addEventListener('mouseleave', () => {
                                gsap.to(card, {
                                    rotationX: 0,
                                    rotationY: 0,
                                    scale: 1,
                                    duration: 0.9,
                                    ease: "elastic.out(1, 0.45)",
                                    overwrite: "auto"
                                });
                                // Fade specular back
                                card.style.setProperty('--mouse-x', '50%');
                                card.style.setProperty('--mouse-y', '50%');
                            });
                        }

                        // ── 3. PROXIMITY-BASED MAGNETIC BUTTONS ─────────────────
                        // Pull strength scales with cursor distance from center
                        function attachMagneticButton(btn) {
                            if (btn._hyper_mag_attached) return;
                            btn._hyper_mag_attached = true;

                            btn.addEventListener('mousemove', (e) => {
                                const rect = btn.getBoundingClientRect();
                                const cx = e.clientX - (rect.left + rect.width / 2);
                                const cy = e.clientY - (rect.top + rect.height / 2);
                                // Scale pull by proximity (max 12px displacement)
                                const strength = 0.38;
                                gsap.to(btn, {
                                    x: cx * strength,
                                    y: cy * strength,
                                    duration: 0.3,
                                    ease: "power2.out",
                                    overwrite: "auto"
                                });
                            });

                            btn.addEventListener('mouseleave', () => {
                                gsap.to(btn, {
                                    x: 0, y: 0,
                                    duration: 0.75,
                                    ease: "elastic.out(1.1, 0.4)",
                                    overwrite: "auto"
                                });
                            });
                        }

                        // ── 4. GLOBAL CURSOR SHEEN (RAF-throttled) ──────────────
                        const sheen = document.getElementById('global-sheen');
                        if (sheen) {
                            let sheenRaf = null;
                            let mx = window.innerWidth / 2;
                            let my = window.innerHeight / 2;
                            window.addEventListener('mousemove', (e) => {
                                mx = e.clientX;
                                my = e.clientY;
                                if (!sheenRaf) {
                                    sheenRaf = requestAnimationFrame(() => {
                                        sheen.style.setProperty('--mouse-x', mx + 'px');
                                        sheen.style.setProperty('--mouse-y', my + 'px');
                                        sheenRaf = null;
                                    });
                                }
                            });
                        }

                        // ── 5. INIT ALL STATIC ELEMENTS ─────────────────────────
                        function initAllElements() {
                            document.querySelectorAll('.glass-card').forEach(attachCardTilt);
                            document.querySelectorAll('.btn-apple, .seg-btn, .btn-modern-primary, .login-btn-google').forEach(attachMagneticButton);
                        }

                        document.addEventListener('DOMContentLoaded', () => {
                            initAllElements();
                            // Slight delay so data-rendered KPI cards are in DOM
                            setTimeout(runEntranceAnimation, 120);
                        });
                        // Also run now in case DOM already loaded (script deferred or inline)
                        if (document.readyState !== 'loading') {
                            initAllElements();
                            setTimeout(runEntranceAnimation, 120);
                        }

                        // ── 6. INTERSECTION OBSERVER for table rows ──────────────
                        const rowObserver = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting && !entry.target._gsap_in) {
                                    entry.target._gsap_in = true;
                                    gsap.fromTo(entry.target,
                                        { y: 16, opacity: 0 },
                                        { y: 0, opacity: 1, duration: 0.42, ease: "power2.out", overwrite: "auto" }
                                    );
                                }
                            });
                        }, { threshold: 0.08 });

                        // ── 7. MUTATION OBSERVER for dynamic rows + badges ───────
                        const mutConfig = { childList: true, subtree: true };
                        const mutCallback = (mutationList) => {
                            for (const mutation of mutationList) {
                                if (mutation.type === 'childList') {
                                    mutation.addedNodes.forEach(node => {
                                        if (node.nodeType !== 1) return;
                                        // New table rows — stagger entrance
                                        if (node.classList && node.classList.contains('compact-row')) {
                                            node.style.opacity = "0";
                                            rowObserver.observe(node);
                                        }
                                        // New glass cards in dynamic content
                                        if (node.classList && node.classList.contains('glass-card')) {
                                            attachCardTilt(node);
                                        }
                                        // Dynamic btn-apple buttons
                                        if (node.classList && node.classList.contains('btn-apple')) {
                                            attachMagneticButton(node);
                                        }
                                        // Data pulse on status badge flash
                                        if (node.classList && node.classList.contains('instant-action-badge')) {
                                            const row = node.closest('tr');
                                            if (row) {
                                                row.classList.remove('pulse-up');
                                                void row.offsetWidth;
                                                row.classList.add('pulse-up');
                                            }
                                        }
                                    });
                                }
                            }
                        };
                        new MutationObserver(mutCallback).observe(document.body, mutConfig);

                    })(); // End initHyperGlassMotion IIFE
                </script>
    </body>

    </html>
