function popupmenu() {
  document.getElementById("menu--mobile").classList.add("active");
}

function closemenu() {
  document.getElementById("menu--mobile").classList.remove("active");
}

async function convertMarkdown(markdown) {
  const result = await fetch("https://api.github.com/markdown/raw", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: markdown,
  });
  if (!result.ok) return null;
  return result.text();
}

async function getAbout() {
  const about = document.getElementById("about-content");
  if (!about) return;

  try {
    const result = await fetch(
      "https://raw.githubusercontent.com/m3yevn/ftp-seer-api/master/README.md"
    );
    if (!result.ok) throw new Error("README fetch failed");

    const markdown = await result.text();
    const html = await convertMarkdown(markdown);

    if (!html || html.includes("API rate limit exceeded")) {
      about.innerHTML = await fetch("/about.html").then((r) => r.text());
      return;
    }

    about.innerHTML = html;
  } catch {
    about.innerHTML = await fetch("/about.html").then((r) => r.text());
  }
}

function gotoroutes() {
  window.location.href = "/api";
}

function updateFormInputs() {
  const selected = document.querySelector('input[name="ftp-server"]:checked').value;
  const directoryInput = document.getElementById("input__directory");
  const fileInput = document.getElementById("input__file");

  const presets = {
    drivehq: {
      dir: "host=ftp.drivehq.com&path=.",
      file: "host=ftp.drivehq.com&path=readme.txt",
    },
    rebex: {
      dir: "host=test.rebex.net&path=.",
      file: "host=test.rebex.net&path=readme.txt",
    },
    custom: {
      dir: "host=your-ftp-server.com&path=.",
      file: "host=your-ftp-server.com&path=filename.txt",
    },
  };

  const p = presets[selected];
  directoryInput.value = p.dir;
  fileInput.value = p.file;
}

function hideNavbar() {
  const navbar = document.getElementById("navbar");
  const current = window.pageYOffset;
  if (prevScrollpos > current) {
    navbar.classList.remove("hidden");
  } else if (current > 80) {
    navbar.classList.add("hidden");
  }
  prevScrollpos = current;
}

async function fetchDirectory() {
  const input = document.getElementById("input__directory").value;
  const output = document.getElementById("textarea__json__result");
  const btnDir = document.getElementById("btn__fetch__directory");
  const btnFile = document.getElementById("btn__fetch__file");
  location.hash = "response";

  try {
    btnDir.disabled = true;
    btnFile.disabled = true;
    btnDir.textContent = "Fetching…";
    output.value = "Fetching…";
    const res = await fetch("/api/directory?" + input);
    const data = await res.json();
    output.value = JSON.stringify(data, null, 2);
  } catch (ex) {
    output.value = ex.message;
  } finally {
    btnDir.disabled = false;
    btnFile.disabled = false;
    btnDir.textContent = "Fetch";
    btnFile.textContent = "Fetch";
  }
}

async function fetchFile() {
  const input = document.getElementById("input__file").value;
  const output = document.getElementById("textarea__json__result");
  const btnDir = document.getElementById("btn__fetch__directory");
  const btnFile = document.getElementById("btn__fetch__file");
  location.hash = "response";

  try {
    btnDir.disabled = true;
    btnFile.disabled = true;
    btnFile.textContent = "Fetching…";
    output.value = "Fetching…";
    const res = await fetch("/api/file?" + input);
    const data = await res.json();
    output.value = JSON.stringify(data, null, 2);
  } catch (ex) {
    output.value = ex.message;
  } finally {
    btnDir.disabled = false;
    btnFile.disabled = false;
    btnDir.textContent = "Fetch";
    btnFile.textContent = "Fetch";
  }
}

function routeToGithub(url) {
  window.open(url, "_blank", "noopener");
}

async function getContributors() {
  const list = document.getElementById("list__contributors");
  if (!list) return;

  try {
    const res = await fetch(
      "https://api.github.com/repos/m3yevn/ftp-seer-api/contributors"
    );
    if (!res.ok) return;
    const contributors = await res.json();
    list.innerHTML = contributors
      .filter((c) => c.type !== "Bot")
      .map(
        (c) =>
          `<div class="avatar"><img src="${c.avatar_url}" alt="${c.login}" onclick="routeToGithub('${c.html_url}')" /></div>`
      )
      .join("");
  } catch {
    /* contributors optional */
  }
}

let prevScrollpos = window.pageYOffset;

window.addEventListener("load", () => {
  getAbout();
  getContributors();
});

window.addEventListener("scroll", hideNavbar);
window.addEventListener("hashchange", closemenu);
