function popupmenu() {
  let menu = document.getElementById("menu--mobile");
  menu.classList.add("active");
}

function closemenu() {
  let menu = document.getElementById("menu--mobile");
  menu.classList.remove("active");
}

async function convertMarkdown(markdown) {
  const result = await fetch("https://api.github.com/markdown/raw", {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: markdown
  });
  if (!result) {
    return;
  }

  return result.text();
}

async function getAbout() {
  const result = await fetch("https://raw.githubusercontent.com/m3yevn/ftp-seer/master/README.md");
  if (!result) {
    return;
  }

  const resultText = await result.text();
  const htmlText = await convertMarkdown(resultText)

  if (!htmlText) {
    return;
  }
  let about = document.getElementById("about");
  if (htmlText.includes("API rate limit exceeded for")) {
    about.innerHTML = await fetch("about.html").then(result => {
      return result.text();
    });
    return;
  }

  about.innerHTML = htmlText;
}

function gotoroutes() {
  window.location.href = "/ftpseer";
}

function hideNavbar() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}

async function fetchDirectory() {
  let input_directory = document.getElementById("input__directory").value;
  let json_result = document.getElementById("textarea__json__result");
  let btn_file = document.getElementById("btn__fetch__file");
  window.location = '#response';

  try {
    btn_file.setAttribute('disabled', true);
    json_result.innerText = "Fetching...";
    const result = await fetch("ftpseer/directory?" + input_directory);
    if (!result) {
      return;
    }
    const innerText = await result.json();
    json_result.innerText = JSON.stringify(innerText);
  } catch (ex) {
    json_result.innerText = ex.message;
  } finally {
    btn_file.removeAttribute('disabled');
  }
}

async function fetchFile() {
  let input_file = document.getElementById("input__file").value;
  let json_result = document.getElementById("textarea__json__result");
  let btn_directory = document.getElementById("btn__fetch__directory");
  window.location.href = '#response';

  try {
    btn_directory.setAttribute('disabled', true);
    json_result.innerText = "Fetching...";
    const result = await fetch("ftpseer/file?" + input_file);
    if (!result) {
      return;
    }
    const innerText = await result.json();
    json_result.innerText = JSON.stringify(innerText);
  } catch (ex) {
    json_result.innerText = ex.message;
  } finally {
    btn_directory.removeAttribute('disabled');
  }
}

async function getContributors() {
  let contributors = document.getElementById("list__contributors");
  const result = await fetch("https://api.github.com/repos/m3yevn/ftp-seer/contributors");
  if (!result) {
    return;
  }
  const contributor_list = await result.json();
  let innerHTML = "";
  contributor_list.forEach(contributor => {
    if (contributor.type !== "Bot") {
    const col_item = `<div class="avatar pure-u-2-12">`+
    `<img src="${contributor.avatar_url}" alt="${contributor.login}" onclick="routeToGithub('${contributor.html_url}')" />`+
    `</div>`;
    innerHTML += col_item;
    }
  });
  contributors.innerHTML  = innerHTML;
}


let prevScrollpos = window.pageYOffset;

window.onload = () => {
  getAbout();
  getContributors();
}

window.onscroll = () => {
  hideNavbar();
}

window.onhashchange = () => {
  closemenu();
}