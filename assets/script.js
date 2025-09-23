// Captcha rendering (only alphabets, both cases, styled and noisy for realism)
let currentCaptcha = "";
function generateCaptcha(len = 6) {
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let cap = "";
  for (let i = 0; i < len; i++) {
    cap += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }
  currentCaptcha = cap;
  return cap;
}
function renderCaptcha(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "italic bold 28px Arial";
  const cap = generateCaptcha();
  // Draw text with random rotation/skew/spacing for "unreadable" effect
  for (let i = 0; i < cap.length; i++) {
    ctx.save();
    ctx.translate(12 + i*16, 28);
    ctx.rotate(Math.random() * 0.6 - 0.3);
    ctx.fillStyle = `hsl(${Math.random()*360},80%,${55+Math.random()*35}%)`;
    ctx.shadowColor="#222e44";
    ctx.shadowBlur = 5 + Math.random()*6;
    ctx.fillText(cap[i], 0, 0);
    ctx.restore();
  }
  // Random lines for extra noise
  for (let i=0;i<5;i++) {
    ctx.strokeStyle = `rgba(60,60,${220+Math.random()*35},.4)`;
    ctx.beginPath();
    ctx.moveTo(Math.random()*canvas.width, Math.random()*canvas.height);
    ctx.lineTo(Math.random()*canvas.width, Math.random()*canvas.height);
    ctx.stroke();
  }
}

// Clock widget for dashboard
function drawClock(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), r = canvas.width/2;
  setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(r, r);
    //Circle
    ctx.beginPath(); ctx.arc(0,0, r-3, 0, 2 * Math.PI); ctx.strokeStyle="#79eee4"; ctx.lineWidth=5; ctx.stroke();
    //Numbers
    ctx.font = "bold 11px Arial";
    for(let n=1;n<=12;n++){
      let angle = n * Math.PI/6;
      ctx.fillText(n, Math.sin(angle)*(r-22)-6, -Math.cos(angle)*(r-22)+7);
    }
    //Hands
    const date = new Date();
    let hr = ((date.getHours()%12) + date.getMinutes()/60) * Math.PI/6;
    let mn = (date.getMinutes()+date.getSeconds()/60) * Math.PI/30;
    let sc = date.getSeconds() * Math.PI/30;
    ctx.strokeStyle="#8aff80";
    ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.sin(hr)*(r-40), -Math.cos(hr)*(r-40)); ctx.stroke();
    ctx.strokeStyle="#fff"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.sin(mn)*(r-25), -Math.cos(mn)*(r-25)); ctx.stroke();
    ctx.strokeStyle="#7deedd"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.sin(sc)*(r-18), -Math.cos(sc)*(r-18)); ctx.stroke();
    ctx.restore();
  }, 1000);
}

// Admin Logic
function handleAdminLogin() {
  const user = document.getElementById('adminUser').value,
    pass = document.getElementById('adminPass').value,
    cap = document.getElementById('captchaInput').value;
  if (user !== "Ishan Vaidya" || pass !== "010207") {
    document.getElementById('adminError').innerText = "Invalid Username or Password!";
    return false;
  }
  if (cap !== currentCaptcha) {
    document.getElementById('adminError').innerText = "Captcha Incorrect!";
    renderCaptcha('adminCaptcha');
    return false;
  }
  // Log admin login
  const info = getDeviceInfo();
  logActivity({user, action: 'ADMIN LOGIN', ...info});
  window.location.href = "dashboard.html";
}

// Dashboard info
function loadAdminInfo() {
  document.getElementById('sysname').innerText = navigator.userAgent.split(")")[0]+")";
  getIpAndLocation().then(info => {
    document.getElementById('ip').innerText = info.ip;
    document.getElementById('location').innerText = info.location;
    document.getElementById('region').innerText = info.region;
  });
}

// Maintenance Mode (localStorage as static-site workaround)
function toggleMaintainance(cb) {
  if (cb.checked) localStorage.setItem('maintenance', 'on');
  else localStorage.setItem('maintenance', 'off');
}
function isMaintenanceMode() {
  return localStorage.getItem('maintenance') === 'on';
}

// Guest Account Creation
function handleRegister() {
  const user = document.getElementById('regUser').value.trim(),
    pass = document.getElementById('regPass').value,
    pass2 = document.getElementById('regPass2').value,
    dob = document.getElementById('regDOB').value,
    email = document.getElementById('regEmail').value,
    cap = document.getElementById('captchaInput').value;
  if (pass !== pass2) {
    document.getElementById('regError').innerText = "Passwords do not match!";
    return false;
  }
  if (cap !== currentCaptcha) {
    document.getElementById('regError').innerText = "Captcha Incorrect!";
    renderCaptcha('regCaptcha');
    return false;
  }
  // Simulate registration (for static site, store users in localStorage)
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[user]) {
    document.getElementById('regError').innerText = "User already exists!";
    return false;
  }
  users[user] = {pass, dob, email};
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('current_user', user);
  // Logging activity
  const info = getDeviceInfo();
  logActivity({user, action:'ACCOUNT CREATED', email, ...info});
  // Email sending (placeholder)
  alert("Account created! (Email sending simulated)");
  window.location.href = "home.html";
}

// After successful registration
sendWelcomeEmail(
  email,           // user's email
  user,            // username
  dob,             // date of birth
  info.device,     // getDeviceInfo()
  info.ip,
  info.location,
  info.region
);



// Guest Sign in
// After successful registration
sendWelcomeEmail(
  email,           // user's email
  user,            // username
  dob,             // date of birth
  info.device,     // getDeviceInfo()
  info.ip,
  info.location,
  info.region
);

function handleSignin() {
  const user = document.getElementById('signinUser').value.trim(),
    pass = document.getElementById('signinPass').value;
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (isMaintenanceMode()) {
    document.getElementById('signinError').innerText = "Site under maintenance. Only admin login allowed!";
    return false;
  }
  if (!users[user] || users[user].pass !== pass) {
    document.getElementById('signinError').innerText = "Wrong username or password!";
    return false;
  }
  localStorage.setItem('current_user', user);

  // Logging activity (adds login to activity_log.csv)
  const info = getDeviceInfo();
  logActivity({
    user,
    action: 'GUEST LOGIN',
    email: users[user].email,
    dob: users[user].dob,
    device: info.device,
    ip: info.ip,
    location: info.location,
    region: info.region
  });

  // Proceed as usual
  alert("Signed in! (Email notification simulated)");
  window.location.href = "home.html";
}


// Activity Log (CSV, static site emulated with localStorage)
function logActivity(obj) {
  let logs = JSON.parse(localStorage.getItem('activity_log')) || [];
  obj.time = new Date().toLocaleString();
  logs.push(obj);
  localStorage.setItem('activity_log', JSON.stringify(logs));
}
function downloadLog() {
  let logs = JSON.parse(localStorage.getItem('activity_log')) || [];
  if (logs.length === 0) { alert("No logs!"); return; }
  let csv = "User,Action,Email,Device,IP,Location,Region,Time\n";
  logs.forEach(log => {
    csv += `${log.user||''},${log.action||''},${log.email||''},${log.device||''},${log.ip||''},${log.location||''},${log.region||''},${log.time||''}\n`;
  });
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url; a.download = 'activity_log.csv'; a.click();
  URL.revokeObjectURL(url);
}

// For contributors (dynamic load)
function loadContributors() {
  fetch('assets/contributors.json')
    .then(res => res.json())
    .then(contribs => {
      let html = "";
      contribs.forEach(c => {
        html += `<div class="contributor">
          <img src="images/${c.photo}" alt="${c.name} photo" style="width:64px;height:64px;border-radius: 11px;">
          <h4>${c.name}</h4>
          <p>${c.role}</p>
        </div>`;
      });
      document.getElementById('contributors').innerHTML = html;
    });
}

// Device/IP/Location Info
function getDeviceInfo() {
  return {
    device: navigator.userAgent.split(")")[0]+")"
  };
}
function getIpAndLocation() {
  return fetch('https://ipapi.co/json/') // No API key needed for demo; replace with paid IP API if needed
    .then(res=>res.json())
    .then(data=>{
      return {
        ip:data.ip,
        location: `${data.city||''}, ${data.region||''}`,
        region: data.country_name||''
      };
    })
    .catch(()=>({ip:'-',location:'-',region:'-'}));
}

// Confetti (pure JS, <1KB)
function burstConfetti(x=window.innerWidth/2, y=window.innerHeight/2, color="#8aff80") {
  for (let i=0; i<30; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    document.body.appendChild(conf);
    let angle = Math.random()*2*Math.PI;
    let dx = Math.cos(angle)*Math.random()*120;
    let dy = Math.sin(angle)*Math.random()*90;

    conf.style.left = x + "px";
    conf.style.top = y + "px";
    conf.style.background = `linear-gradient(90deg,${color},#80ffea)`;
    conf.style.transform = `rotate(${Math.random()*360}deg)`;
    conf.style.setProperty('--dx', dx+'px');
    conf.style.setProperty('--dy', dy+'px');
    setTimeout(()=>conf.remove(), 800);
  }
}

// Call in your handlers: For example at the end of handleRegister or handleSignin
// burstConfetti(window.innerWidth/2, window.innerHeight/2, "#8aff80");



// ----- Ripple effect on all .btn -----
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    let size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(ripple);
    setTimeout(()=>ripple.remove(), 540);
  });
});

function downloadUsersCSV() {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  let csv = "Username,Password,Date of Birth,Email\n";
  Object.keys(users).forEach(user => {
    csv += `${user},${users[user].pass},${users[user].dob},${users[user].email}\n`;
  });
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url; a.download = 'user_credentials.csv'; a.click();
  URL.revokeObjectURL(url);
}

function sendWelcomeEmail(toEmail, username, dob, device, ip, location, region) {
  emailjs.send(service_so37itq, template_e9pwhte, {
    to_email: toEmail,
    username: username,
    dob: dob,
    device: device,
    ip: ip,
    location: location,
    region: region
  })
  .then(function(response) {
    console.log("SUCCESS!", response.status, response.text);
    // Show message if you want!
  }, function(error) {
    console.log("FAILED...", error);
  });
}



