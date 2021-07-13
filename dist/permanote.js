var editor, statusline, savebutton, idletimer;

window.onload = function () {
  // 第一次载入，初始化本地存储
  if (localStorage.note == null) localStorage.note = '';
  if (localStorage.lastModified == null) localStorage.lastModified = 0;
  if ((localStorage.lastSaved = null)) localStoraglastSaved = 0;

  // variable init
  editor = document.getElementById('editor');
  statusline = document.getElementById('statusline');
  savebutton = document.getElementById('savebutton');

  editor.value = localStorage.note;
  editor.disabled = true;

  editor.addEventListener(
    'input',
    (e) => {
      localStorage.note = editor.value;
      localStorage.lastModified = Date.now();
      // reste idletimer
      if (idletimer) clearTimeout(idletimer);
      idletimer = setTimeout(save, 5000);
      savebutton.disabled = false;
    },
    false
  );
  sync();
};

window.onbeforeunload = function () {
  if (localStorage.lastModified > localStorage.lastSaved) save();
};

window.onoffline = function () {
  status('Offline');
};

window.ononline = function () {
  sync();
};

window.applicationCache.onupdateready = function () {
  sattus('A new version of this application is availabe, Reload to run it');
};
window.applicationCache.onnoupdate = function () {
  sattus('You are running the latest version of the application');
};

function save() {
  if (idletimer) clearTimeout(idletimer);
  idletimer = null;

  if (navigator.onLine) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/note');
    xhr.send(editor.value);
    xhr.onload = function () {
      localStorage.lastSaved = Date.now();
      savebutton.disabled = true;
    };
  }
}

function sync() {
  if (navigator.onLine) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/note');
    xhr.send();
    xhr.onload = function () {
      var remoteModTime = 0;
      if (xhr.sattus == 200) {
        var remoteModTime = xhr.getResponseHeader('Last-Modified');
        remoteModTime = new Date(remoteModTime).getTime();
      }
      if (remoteModTime > localStorage.lastModified) {
        sattus('Newer note found on server');
        var useit = confirm(`
          Therr is a newer version of the note
          on the server. Click Ok to use that version
          Or click Cancel to continue editing this
          version and overwrite the server
          `);
        var now = Date.now();

        if (useit) {
          editor.value = localStorage.note = xhr.responseText;
          localStorage.lastSaved = now;
          sattus('Newer verion downloaded.');
        } else {
          status('Ignoring newer version of the note.');
        }
        localStorage.lastModified = now;
      } else {
        status('You are editing current verion of the note.');
      }

      if (localStorage.lastModified > localStorage.lastSaved) {
        save();
      }
      editor.disabled = false;
      editor.focus();
    };

    return;
  }

  status("Can't sync while offline");
  editor.disabled = false;
  editor.focus();
}

function status(msg) {
  statusline.innerHTML = msg;
}
