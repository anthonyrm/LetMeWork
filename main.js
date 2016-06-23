var listaPaginas = [
    {id: 'facebook', url: 'facebook.com'},
    {id: 'facebook', url: 'facebook.es'},
    {id: 'youtube', url: 'youtube.com'}
];
function activar () {
    if (!localStorage.flag)
        localStorage.flag = true;
    var queryInfo = {
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = '';
        for(var i = 0; i < tabs.length; i++) {
            for(var j = 0; j < listaPaginas.length; j++) {
                console.log('Url: ' + tabs[i].url + ' -- pagina: ' + listaPaginas[j].id);
                if(tabs[i].url.search(listaPaginas[j].url) > -1)
                {
                    //activar contador de alarma
                    chrome.alarms.create(listaPaginas[j].id, {delayInMinutes: 0.15});
                    chrome.alarms.onAlarm.addListener(function(alarma) {
                        alert("Lleva mas de xx tiempo!" + alarma.name);
                    });
                } 
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    //Evento activar alarmas si existe paginas abiertas validas 
    document.getElementById("btn").addEventListener('click', activar);
});