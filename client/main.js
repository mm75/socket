var nickName = document.getElementById('nick_name');
var entryText = document.getElementById('entry_text');
var showText = document.getElementById('show_text');
var url = 'ws://192.168.34.215:8080';


var ws = new WebSocket(url);

ws.onopen = function (e) {
    showText.value = 'Conexão estabelecida. ';
};

ws.onerror = function (e) {
    showText.value += e;
};

ws.onmessage = function (e) {
    var message = JSON.parse(e.data);

    showText.value = showText.value + '\n\n[' + message.nickName + '] diz:\n' + message.message;

    showText.scrollTop = showText.scrollHeight;
};

ws.onclose = function (e) {
    showText.value += 'Conexão fechada. ';
};

entryText.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault(false);

        if (nickName.value === '') {
            alert('Informe o nick');
            return;
        }

        if (entryText.value === '') {
            alert('Informe a mensagem');
            return;
        }

        var message = {
            nickName: nickName.value,
            message: entryText.value
        };

        ws.send(JSON.stringify(message));

        showText.value = showText.value + '\n\n[' + message.nickName + '] diz:\n' + message.message;

        entryText.value = '';

        showText.scrollTop = showText.scrollHeight;
    }
});