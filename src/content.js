var list = document.getElementsByClassName('fp-filename-icon');
var http = new XMLHttpRequest();

(function process(index) {
    if (index >= list.length) {
        // show last edit when all dates have been loaded
        showLastEdit();
        return;
    }

    if (list[index].tagName.toLowerCase() != 'span') {
        process(index + 1);
        return;
    }

    // get url of the linked file
    var url = list[index].getElementsByTagName('a')[0].getAttribute('href').split('?')[0];

    http.open('HEAD', url);
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            var head = http.getAllResponseHeaders().match(/last-modified:.*\r\n/i);
            var date = new Date(head[0].substring(14).trim());

            var edit = document.createElement('i');
            edit.className = 'last-edit-date'
            edit.innerText = formatDate(date);
            list[index].getElementsByTagName('a')[0].appendChild(edit);

            process(index + 1);
        }
    }
    http.send();
})(0);

function showLastEdit() {
    Array.from(document.getElementsByClassName('last-edit-date')).forEach((e) => {
        e.classList.add('last-edit-date-show');
    });
}

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