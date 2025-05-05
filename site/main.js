let allOfficeHours = [];

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');

  toast.textContent = message;
  toast.style.background = type === 'success' ? '#28a745'
                   : type === 'error' ? '#dc3545'
                   : type === 'warning' ? '#ffc107'
                   : '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 15px';
  toast.style.marginTop = '10px';
  toast.style.borderRadius = '4px';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  toast.style.opacity = '0.95';
  toast.style.fontSize = '14px';
  toast.style.transition = 'opacity 0.5s ease';

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => container.removeChild(toast), 500);
  }, 3000);
}

function fetchOfficeHours() {
  fetch('https://officehourshub-api.alielhadi7.workers.dev/api/office-hours')
    .then(res => res.json())
    .then(data => {
      allOfficeHours = data;
      applyFilters();
    })
    .catch(err => {
      console.error('Fetch error:', err);
      showToast('Failed to load office hours.', 'error');
    });
}

function applyFilters() {
  const query = document.getElementById('search').value.toLowerCase();
  const selectedDay = document.getElementById('day-filter').value;
  const container = document.getElementById('hours-container');
  container.innerHTML = '';

  const filtered = allOfficeHours.filter(hour => {
    const matchesSearch = hour.professor.toLowerCase().includes(query) ||
                          hour.course.toLowerCase().includes(query);
    const matchesDay = selectedDay ? hour.day === selectedDay : true;
    return matchesSearch && matchesDay;
  });

  if (filtered.length === 0) {
    container.innerText = 'No matching office hours found.';
    showToast('No matching office hours.', 'warning');
    return;
  }

  filtered.forEach(hour => {
    const div = document.createElement('div');
    div.className = 'office-hour';
    div.innerHTML = `
      <strong>${hour.professor}</strong> (${hour.course})<br>
      <b>${hour.day} @ ${hour.time}</b><br>
      Location: ${hour.location} | Format: ${hour.format}<br>
      ${hour.notes}<br>
      <button data-id="${hour.id}" class="delete-btn">Delete</button>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      if (!confirm('Are you sure you want to delete this entry?')) return;

      try {
        const res = await fetch(`https://officehourshub-api.alielhadi7.workers.dev/api/office-hours/${id}`, {
          method: 'DELETE'
        });
        const result = await res.json();
        if (result.success) {
          showToast('Office hour deleted.', 'success');
          fetchOfficeHours();
        } else {
          showToast('Failed to delete office hour.', 'error');
        }
      } catch (err) {
        console.error('Delete error:', err);
        showToast('Error deleting office hour.', 'error');
      }
    });
  });
}

document.getElementById('office-hours-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://officehourshub-api.alielhadi7.workers.dev/api/office-hours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      showToast('Office hour added successfully!', 'success');
      form.reset();
      document.getElementById('form-panel').classList.remove('active');
      fetchOfficeHours();
    } else {
      showToast('Failed to add office hour.', 'error');
    }
  } catch (err) {
    console.error('POST error:', err);
    showToast('Error adding office hour.', 'error');
  }
});

document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('day-filter').addEventListener('change', applyFilters);

document.getElementById('toggle-form').addEventListener('click', () => {
  document.getElementById('form-panel').classList.toggle('active');
});

fetchOfficeHours();