const PREFIX_OF_LOCALSTORAGE = 'credentias_app_';
var form = document.getElementById('login-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // 改用 AJAX 进行表单提交
  debugger;
  var formData = new FormData(form);
  // fetch
  fetch('/user/login/site/api', {
    method: 'POST',
    body: formData
  })
    .then((res) => {
      debugger;
      if (res.status === 200) {
        return Promise.resolve(res.json());
      } else {
        return Promise.reject();
      }
    })
    .then((data) => {
      // 后续操作
      storeCredentials(data);
    })
    .catch((err) => {
      // 错误处理
    });
});

function storeCredentials(data) {
  if (!data) return;
  if (navigator.credentials) {
    // var cred = new PasswordCredential({
    //   id: data.id,
    //   password: data.password,
    //   name: data.name,
    //   iconURL: data.iconURL
    // });
    var cred = new PasswordCredential({
      id: 'TEST_ID_NUMBER',
      password: 'TEST_PASSWORD',
      name: 'TEST_NICK_NAME',
      // iconURL: 'path/to/icon'
  });
    navigator.credentials.store(cred).then((cred) => {
      // 后续操作
      localStorage.setItem(PREFIX_OF_LOCALSTORAGE + 'id', data.id);
      console.log('cred is stored : ', cred);
    });
  }
}

if (navigator.credentials) {
  navigator.credentials
    .get({
      password: true
    })
    .then((cred) => {
      console.log('get cred : ', cred);
      console.log('time to go to home page')
    });
}

function logout() {
  // 处理登出流程
  if (navigator.credentials.requireUserMediation) {
    navigator.credentials.requireUserMediation();
  } else if (navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
}

// 点击按钮触发注销凭证事件
document.getElementById('logout-btn').addEventListener('click', () => {
  // 注销凭证
  navigator.credentials
    .preventSilentAccess()
    .then(() => {
      console.log('注销成功')
    })
    .catch(err => {
      console.log('注销失败',err)
    });
});
