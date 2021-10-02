var list = document.getElementsByClassName('fp-filename-icon');
var http = new XMLHttpRequest();

(function process(index) {
    if (index >= list.length) {
        return;
    }

    if (list[index].tagName.toLowerCase() != 'span') {
        process(index + 1);
        return;
    }

    var url = list[index].getElementsByTagName('a')[0].getAttribute('href').split('?')[0];

    http.open('HEAD', url);
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            var head = http.getAllResponseHeaders().match(/last-modified:.*\r\n/i);
            var date = new Date(head[0].substring(14).trim());
            var lastModified = ' (' + formatDate(date) + ')';

            list[index].getElementsByTagName('a')[0].getElementsByClassName('fp-filename')[0].innerText += lastModified;

            process(index + 1);
        }
    }
    http.send();
})(0);


function formatDate(d) {
    var str = pad(d.getDate()) + '/' + pad(d.getMonth()+1) + '/' + trim(d.getFullYear());
    str += ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    return str;
}

function pad(val) {
    return String(val).padStart(2,'0');
}

function trim(year) {
    return String(year).slice(-2);
}