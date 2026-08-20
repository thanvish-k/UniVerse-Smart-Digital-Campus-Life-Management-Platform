// Data Arrays
let tasks = [];
let finances = [];
let profiles = [];
let events = [];

// Section Switching
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active-section');
        sections[i].classList.add('hidden-section');
    }
    document.getElementById(sectionId).classList.remove('hidden-section');
    document.getElementById(sectionId).classList.add('active-section');
}

// Module 1: Academic Hub
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskName = document.getElementById('taskName').value.trim();
    const subject = document.getElementById('taskSubject').value;
    const priority = document.getElementById('taskPriority').value;
    const deadline = document.getElementById('taskDeadline').value;
    
    if (!taskName || !subject || !priority || !deadline) {
        alert("Please fill all task fields.");
        return;
    }
    
    const task = { id: Date.now(), title: taskName, subject, priority, deadline };
    tasks.push(task);
    
    this.reset();
    renderTasks();
});

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    // Using for loop as requested
    for (let i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div>
                <strong>${t.title}</strong> (${t.subject})<br>
                <small>Priority: ${t.priority} | Due: ${t.deadline}</small>
            </div>
            <button class="btn btn-danger" type="button" onclick="deleteTask(${t.id})">Delete</button>
        `;
        list.appendChild(div);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Module 2: Finance Manager
document.getElementById('financeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('financeAmount').value;
    const category = document.getElementById('financeCategory').value;
    const typeElement = document.querySelector('input[name="financeType"]:checked');
    const note = document.getElementById('financeNote').value.trim();
    
    if (!amount || !category || !typeElement || !note) {
        alert("Please fill all finance fields.");
        return;
    }
    
    const finance = { id: Date.now(), amount, category, type: typeElement.value, note };
    finances.push(finance);
    
    this.reset();
    renderFinances();
});

function renderFinances() {
    const tbody = document.getElementById('financeBody');
    tbody.innerHTML = '';
    
    // Using while loop somewhere in logic as requested
    let i = 0;
    while (i < finances.length) {
        const f = finances[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>$${f.amount}</td>
            <td>${f.category}</td>
            <td>${f.type}</td>
            <td>${f.note}</td>
            <td><button class="btn btn-danger" type="button" onclick="deleteFinance(${f.id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
        i++;
    }
}

function deleteFinance(id) {
    finances = finances.filter(f => f.id !== id);
    renderFinances();
}

// Module 3: Skill & Peer Learning Zone
document.getElementById('skillForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    const reg = document.getElementById('studentReg').value.trim();
    const branch = document.getElementById('studentBranch').value;
    const year = document.getElementById('studentYear').value;
    const gender = document.querySelector('input[name="studentGender"]:checked');
    const bio = document.getElementById('studentBio').value.trim();
    
    if (!name || !reg || !branch || !year || !gender || !bio) {
        alert("Please fill all required profile fields.");
        return;
    }

    // Get checked skills
    const knownNodes = document.querySelectorAll('input[name="skillsKnown"]:checked');
    const wantedNodes = document.querySelectorAll('input[name="skillsWanted"]:checked');
    
    let known = [];
    for(let i=0; i<knownNodes.length; i++) known.push(knownNodes[i].value);
        
    let wanted = [];
    for(let i=0; i<wantedNodes.length; i++) wanted.push(wantedNodes[i].value);

    // Get multi-select values
    const levelSelect = document.getElementById('skillLevel');
    let levels = [];
    for (let i = 0; i < levelSelect.options.length; i++) {
        if (levelSelect.options[i].selected) {
            levels.push(levelSelect.options[i].value);
        }
    }
    
    const photoInput = document.getElementById('studentPhoto');
    let photoUrl = 'https://via.placeholder.com/80';
    if (photoInput.files && photoInput.files[0]) {
        photoUrl = URL.createObjectURL(photoInput.files[0]);
    }
    
    const profile = {
        id: Date.now(), name, reg, branch, year, gender: gender.value,
        known, wanted, levels, bio, photoUrl
    };
    
    profiles.push(profile);
    this.reset();
    showSection('profiles');
    renderProfiles();
});

function renderProfiles() {
    const grid = document.getElementById('profilesGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < profiles.length; i++) {
        const p = profiles[i];
        const div = document.createElement('div');
        div.className = 'profile-card';
        div.innerHTML = `
            <img src="${p.photoUrl}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p><strong>Reg:</strong> ${p.reg} | <strong>Branch:</strong> ${p.branch}</p>
            <p><strong>Year:</strong> ${p.year} | <strong>Gender:</strong> ${p.gender}</p>
            <p><strong>Knows:</strong> ${p.known.join(', ') || 'None'}</p>
            <p><strong>Wants:</strong> ${p.wanted.join(', ') || 'None'}</p>
            <p><strong>Levels:</strong> ${p.levels.join(', ')}</p>
            <p><strong>Bio:</strong> ${p.bio}</p>
            <div class="card-actions">
                <button class="btn btn-danger" type="button" onclick="deleteProfile(${p.id})">Delete</button>
            </div>
        `;
        grid.appendChild(div);
    }
}

function deleteProfile(id) {
    profiles = profiles.filter(p => p.id !== id);
    renderProfiles();
}

// Module 4: Campus Events
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;
    const desc = document.getElementById('eventDesc').value.trim();
    
    if (!name || !date || !type || !desc) {
        alert("Please fill all event fields.");
        return;
    }
    
    const ev = { id: Date.now(), name, date, type, desc };
    events.push(ev);
    
    this.reset();
    renderEvents();
});

function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    grid.innerHTML = '';
    
    if (events.length === 0) return;
    
    // Using do-while loop somewhere to fulfill requirements
    let i = 0;
    do {
        const e = events[i];
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `
            <h3>${e.name}</h3>
            <p><strong>Date:</strong> ${e.date}</p>
            <p><strong>Type:</strong> ${e.type}</p>
            <p>${e.desc}</p>
            <div class="card-actions">
                <button class="btn btn-danger" type="button" onclick="deleteEvent(${e.id})">Delete</button>
            </div>
        `;
        grid.appendChild(div);
        i++;
    } while (i < events.length);
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    renderEvents();
}
