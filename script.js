// State Management
const defaultState = {
    solvedProblems: [],
    tasks: [],
    streak: { current: 0, longest: 0, lastActiveDate: null, history: {} },
    theme: "dark",
};

let appState = JSON.parse(localStorage.getItem('dsa_hub_state'));
if (!appState) {
    appState = JSON.parse(JSON.stringify(defaultState));
}

const saveState = () => {
    localStorage.setItem('dsa_hub_state', JSON.stringify(appState));
    updateUI();
};

// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const htmlRoot = document.documentElement;
const navItems = document.querySelectorAll('.nav-item');
const pageSections = document.querySelectorAll('.page-section');
const pageTitle = document.getElementById('page-title');

// Initialize App
const initApp = () => {
    // Apply Theme
    if (appState.theme === 'dark') {
        htmlRoot.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i><span>Light Mode</span>';
    } else {
        htmlRoot.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';
    }

    // Populate Selects
    const topicSelect = document.getElementById('task-topic');
    dsaData.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.topic;
        option.textContent = topic.topic;
        topicSelect.appendChild(option);
    });

    setupEventListeners();
    checkStreakDetails();
    updateUI();
};

// Event Listeners
const setupEventListeners = () => {
    // Theme Toggle
    themeBtn.addEventListener('click', () => {
        appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
        if (appState.theme === 'dark') {
            htmlRoot.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i><span>Light Mode</span>';
        } else {
            htmlRoot.setAttribute('data-theme', 'light');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';
        }
        saveState();
    });

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');

            navItems.forEach(nav => nav.classList.remove('active'));
            pageSections.forEach(sec => sec.classList.remove('active'));

            e.currentTarget.classList.add('active');
            document.getElementById(target).classList.add('active');

            // Update title
            const textContent = e.currentTarget.textContent.trim();
            pageTitle.textContent = textContent;

            if (target === 'analytics') renderAnalytics();
        });
    });

    // Task Form Submit
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('task-id').value;
        const name = document.getElementById('task-name').value;
        const topic = document.getElementById('task-topic').value;
        const diff = document.getElementById('task-difficulty').value;
        const platform = document.getElementById('task-platform').value;
        const date = document.getElementById('task-date').value;

        if (id) {
            // Edit existing
            const index = appState.tasks.findIndex(t => t.id === id);
            if (index > -1) {
                appState.tasks[index] = { ...appState.tasks[index], name, topic, difficulty: diff, platform, date };
            }
        } else {
            // Add new
            appState.tasks.push({
                id: 'task_' + Date.now(),
                name,
                topic,
                difficulty: diff,
                platform,
                date,
                completed: false
            });
        }

        // Reset form
        e.target.reset();
        document.getElementById('task-id').value = '';
        document.getElementById('task-submit-btn').textContent = 'Add Task';

        saveState();
    });

    // Topics Search
    document.getElementById('topic-search').addEventListener('input', (e) => {
        renderTopics(e.target.value.toLowerCase());
    });

    // Modal Close
    const closeBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('topic-modal');
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
};

/* Core Functions */

function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

function checkStreakDetails() {
    const today = getTodayString();
    const lastActive = appState.streak.lastActiveDate;

    if (!lastActive) return;

    const todayDate = new Date(today);
    const lastDate = new Date(lastActive);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Streak broken
        appState.streak.current = 0;
        saveState();
    }
}

function registerActivity() {
    const today = getTodayString();

    // Increment history map for heatmap
    if (!appState.streak.history[today]) {
        appState.streak.history[today] = 0;
    }
    appState.streak.history[today] += 1;

    // Streak logic
    const lastActive = appState.streak.lastActiveDate;
    if (lastActive !== today) {
        const todayDate = new Date(today);
        let diffDays = 0;

        if (lastActive) {
            const lastDate = new Date(lastActive);
            const diffTime = Math.abs(todayDate - lastDate);
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        if (diffDays === 1) {
            // Consecutive day
            appState.streak.current += 1;
        } else if (diffDays > 1 || !lastActive) {
            // Broken streak or first day
            appState.streak.current = 1;
        }

        if (appState.streak.current > appState.streak.longest) {
            appState.streak.longest = appState.streak.current;
        }

        appState.streak.lastActiveDate = today;

        // Show motivational toast or update message
        const messages = ["Consistency beats intensity 🚀", "Great job! Keep your streak alive 🔥", "You are unstoppable! 💫"];
        document.getElementById('motivational-message').textContent = messages[Math.floor(Math.random() * messages.length)];
    }
}

function handleProblemCompletion(problemId, isChecked) {
    if (isChecked) {
        if (!appState.solvedProblems.includes(problemId)) {
            appState.solvedProblems.push(problemId);
            registerActivity();
        }
    } else {
        appState.solvedProblems = appState.solvedProblems.filter(id => id !== problemId);
        // We rarely decrease streak history, just removing it from solved
    }
    saveState();
}

function handleTaskCompletion(taskId, isChecked) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = isChecked;
        if (isChecked) {
            registerActivity();
        }
        saveState();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        appState.tasks = appState.tasks.filter(t => t.id !== taskId);
        saveState();
    }
}

function editTask(taskId) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-name').value = task.name;
        document.getElementById('task-topic').value = task.topic;
        document.getElementById('task-difficulty').value = task.difficulty;
        document.getElementById('task-platform').value = task.platform;
        document.getElementById('task-date').value = task.date;
        document.getElementById('task-submit-btn').textContent = 'Update Task';

        // Switch to tracker tab if not already
        document.querySelector('[data-target="tracker"]').click();
    }
}

/* UI Rendering */

const updateUI = () => {
    renderDashboard();
    renderTopics();
    renderTasks();
    if (document.getElementById('analytics').classList.contains('active')) renderAnalytics();
};

const renderDashboard = () => {
    const totalSolved = appState.solvedProblems.length;
    // Calculate today's solved count from history
    const today = getTodayString();
    const todayCount = appState.streak.history[today] || 0;

    // Update Cards
    document.getElementById('dash-total').textContent = `${totalSolved} / ${totalProblemsCount}`;
    document.getElementById('dash-streak').textContent = `${appState.streak.current} Days`;
    document.getElementById('dash-longest').textContent = `${appState.streak.longest} Days`;
    document.getElementById('dash-today').textContent = `${todayCount} Problems`;

    // Update Progress Bars
    const overallPct = Math.min(100, Math.round((totalSolved / totalProblemsCount) * 100)) || 0;
    document.getElementById('overall-progress').style.width = `${overallPct}%`;
    document.getElementById('overall-text').textContent = `${overallPct}% Completed`;

    const goalPct = Math.min(100, Math.round((todayCount / 2) * 100)) || 0;
    document.getElementById('daily-progress').style.width = `${goalPct}%`;
    document.getElementById('daily-text').textContent = `${todayCount}/2 Solved`;
};

const renderTopics = (searchQuery = "") => {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';

    dsaData.forEach((topicData, index) => {
        // Filter problems if search is active
        const filteredProblems = searchQuery 
            ? topicData.problems.filter(p => p.name.toLowerCase().includes(searchQuery))
            : topicData.problems;

        // If searching and no problems match in this topic, skip rendering it
        if (searchQuery && filteredProblems.length === 0) return;

        // Calculate progress based on total problems in topic
        const solvedInTopic = topicData.problems.filter(p => appState.solvedProblems.includes(p.id)).length;
        const totalInTopic = topicData.problems.length;
        const progressPct = Math.round((solvedInTopic / totalInTopic) * 100) || 0;

        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `
            <div class="topic-header">
                <div class="topic-title">${topicData.topic}</div>
                <div class="topic-count">${solvedInTopic}/${totalInTopic}</div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Problems</p>
            <div class="topic-progress">
                <div class="topic-progress-fill" style="width: ${progressPct}%"></div>
            </div>
        `;

        // Open modal with the optionally filtered list
        card.addEventListener('click', () => openTopicModal(topicData, filteredProblems));
        
        container.appendChild(card);
    });
};

const openTopicModal = (topicData, problems) => {
    const modalTitle = document.getElementById('modal-title');
    const modalProblems = document.getElementById('modal-problems');
    const modalOverlay = document.getElementById('topic-modal');

    modalTitle.textContent = topicData.topic;
    modalProblems.innerHTML = '';

    problems.forEach(p => {
        const isSolved = appState.solvedProblems.includes(p.id);
        const diffClass = `diff-${p.difficulty.toLowerCase()}`;

        const div = document.createElement('div');
        div.className = `problem-item ${isSolved ? 'solved' : ''}`;
        div.innerHTML = `
            <div class="problem-info">
                <input type="checkbox" class="problem-checkbox" ${isSolved ? 'checked' : ''}>
                <div>
                    <div class="problem-name">${p.name}</div>
                    <div class="problem-meta">
                        <span class="badge-tag ${diffClass}">${p.difficulty}</span>
                        <span class="badge-tag platform-tag">${p.platform}</span>
                    </div>
                </div>
            </div>
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="problem-link">
                Solve <i class="fa-solid fa-external-link-alt"></i>
            </a>
        `;

        // Add event listener to checkbox
        const checkbox = div.querySelector('.problem-checkbox');
        checkbox.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                div.classList.add('solved');
            } else {
                div.classList.remove('solved');
            }
            handleProblemCompletion(p.id, checked);
        });

        modalProblems.appendChild(div);
    });

    modalOverlay.classList.add('active');
};

const renderTasks = () => {
    const container = document.getElementById('tasks-list');
    container.innerHTML = '';

    // Sort by date (newest first)
    const sortedTasks = [...appState.tasks].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedTasks.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); padding: 16px;">No recent tasks added.</p>';
        return;
    }

    sortedTasks.forEach(task => {
        const diffClass = `diff-${task.difficulty.toLowerCase()}`;

        const div = document.createElement('div');
        div.className = `task-list-item ${task.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <div class="task-details">
                <div class="task-title">${task.name}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; gap: 8px;">
                    <span class="badge-tag platform-tag">${task.topic}</span> •
                    <span class="badge-tag ${diffClass}">${task.difficulty}</span> •
                    <span>${task.platform}</span> •
                    <span>${task.date}</span>
                </div>
            </div>
            <div class="task-controls">
                <button class="icon-btn check" title="Mark Complete">
                    <i class="fa-regular ${task.completed ? 'fa-square-check' : 'fa-square'}"></i>
                </button>
                <button class="icon-btn edit" title="Edit">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="icon-btn delete" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        // Check button
        div.querySelector('.check').addEventListener('click', () => {
            handleTaskCompletion(task.id, !task.completed);
        });

        // Edit button
        div.querySelector('.edit').addEventListener('click', () => {
            editTask(task.id);
        });

        // Delete button
        div.querySelector('.delete').addEventListener('click', () => {
            deleteTask(task.id);
        });

        container.appendChild(div);
    });
};

/* Analytics & Gamification */
const renderAnalytics = () => {
    // 1. Topic Progress Bars
    const topicContainer = document.getElementById('topic-progress-list');
    topicContainer.innerHTML = '';

    dsaData.forEach(topicData => {
        const solved = topicData.problems.filter(p => appState.solvedProblems.includes(p.id)).length;
        const total = topicData.problems.length;
        if (solved === 0) return; // Only show topics we have started

        const pct = Math.round((solved / total) * 100) || 0;
        const div = document.createElement('div');
        div.className = 'topic-progress-item';
        div.innerHTML = `
            <div class="topic-progress-info">
                <span>${topicData.topic}</span>
                <span>${solved}/${total}</span>
            </div>
            <div class="topic-mini-bar-bg">
                <div class="topic-mini-bar-fill" style="width: ${pct}%"></div>
            </div>
        `;
        topicContainer.appendChild(div);
    });

    if (topicContainer.innerHTML === '') {
        topicContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Start solving problems to see your progress here.</p>';
    }

    // 2. Gamification Badges
    const totalSolved = appState.solvedProblems.length;
    const currentStreak = appState.streak.current;

    // Evaluate First Blood
    if (totalSolved >= 1) {
        const badge = document.getElementById('badge-first');
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
    }

    // Evaluate 7 Day Streak
    if (currentStreak >= 7) {
        const badge = document.getElementById('badge-streak7');
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
    }

    // Evaluate 30 Day Streak
    if (currentStreak >= 30) {
        const badge = document.getElementById('badge-streak30');
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
    }

    // Evaluate 50 Solved
    if (totalSolved >= 50) {
        const badge = document.getElementById('badge-solved50');
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
    }

    // Evaluate Topic Master (at least 1 topic 100%)
    const hasMasteredTopic = dsaData.some(topicData => {
        const solved = topicData.problems.filter(p => appState.solvedProblems.includes(p.id)).length;
        return solved === topicData.problems.length && totalSolved > 0;
    });

    if (hasMasteredTopic) {
        const badge = document.getElementById('badge-master');
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
    }

    // 3. Heatmap
    renderHeatmap();
};

const renderHeatmap = () => {
    const container = document.getElementById('heatmap');
    container.innerHTML = '';

    // Generate last 100 days roughly for display
    const days = 365;
    const today = new Date();

    // Start generating from past to present
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];

        const count = appState.streak.history[dateStr] || 0;
        let level = 0;
        if (count === 1) level = 1;
        else if (count === 2) level = 2;
        else if (count >= 3 && count <= 5) level = 3;
        else if (count > 5) level = 4;

        const cell = document.createElement('div');
        cell.className = `heatmap-cell ${level > 0 ? 'level-' + level : ''}`;

        // Tooltip detail
        const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        cell.setAttribute('title', `${count} problems on ${displayDate}`);

        container.appendChild(cell);
    }
};

// Start
document.addEventListener('DOMContentLoaded', initApp);
