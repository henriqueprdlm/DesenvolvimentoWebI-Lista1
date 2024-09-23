const video = document.querySelector('video');
const galeria = document.querySelector('div.galeria');
const tituloFoto = document.getElementById('tituloFoto');
const descricaoFoto = document.getElementById('descricaoFoto');

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
    video.srcObject = stream;
    video.play();
})
.catch(error => {
    console.log(error);
})

function obterLocalizacao() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve({latitude, longitude});
            }, (error) => {
                reject(error);
            });
        } else {
            reject(new Error('Geolocalização não disponível'));
        }
    });
}

async function tirarFoto() {
    if (tituloFoto.value === '') {
        alert('Você deve dar um título à foto!');
        return;
    } else {
        let divImg = document.createElement('div');
        divImg.classList.add('row');
        galeria.appendChild(divImg);

        let divColumn1 = document.createElement('div');
        divColumn1.classList.add('column');
        divImg.appendChild(divColumn1);

        let canvas = document.createElement('canvas');
        divColumn1.appendChild(canvas);
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);
        
        let imagemBase64 = canvas.toDataURL();

        let divColumn2 = document.createElement('div');
        divColumn2.classList.add('column');
        divImg.appendChild(divColumn2);

        let divElementId = document.createElement('div');
        divElementId.classList.add('element');
        divColumn2.appendChild(divElementId);
        let titleId = document.createElement('h4');
        titleId.innerHTML = 'ID:';
        divElementId.appendChild(titleId);
        let textId = document.createElement('p');
        let idAtual = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 1;
        textId.innerHTML = idAtual;
        localStorage.setItem('id', idAtual+1);
        divElementId.appendChild(textId);

        let divElementTitulo = document.createElement('div');
        divElementTitulo.classList.add('element');
        divColumn2.appendChild(divElementTitulo);
        let titleTitulo = document.createElement('h4');
        titleTitulo.innerHTML = 'Título:';
        divElementTitulo.appendChild(titleTitulo);
        let textTitulo = document.createElement('p');
        textTitulo.innerHTML = tituloFoto.value;
        divElementTitulo.appendChild(textTitulo);

        if (descricaoFoto.value) {
            let divElementDescricao = document.createElement('div');
            divElementDescricao.classList.add('element');
            divColumn2.appendChild(divElementDescricao);
            let titleDescricao = document.createElement('h4');
            titleDescricao.innerHTML = 'Descrição:';
            divElementDescricao.appendChild(titleDescricao);
            let textDescricao = document.createElement('p');
            textDescricao.innerHTML = descricaoFoto.value;
            divElementDescricao.appendChild(textDescricao);
        }

        let divElementData = document.createElement('div');
        divElementData.classList.add('element');
        divColumn2.appendChild(divElementData);
        let titleData = document.createElement('h4');
        titleData.innerHTML = 'Data:';
        divElementData.appendChild(titleData);
        let textData = document.createElement('p');
        let agora = new Date();
        textData.innerHTML = (agora.getDate() + '/' + agora.getMonth() + '/' + agora.getFullYear());
        divElementData.appendChild(textData);

        try {
            const { latitude, longitude } = await obterLocalizacao(); 
            let divElementLocalizacao = document.createElement('div');
            divElementLocalizacao.classList.add('element');
            divColumn2.appendChild(divElementLocalizacao);
            
            let titleLocalizacao = document.createElement('h4');
            titleLocalizacao.innerHTML = 'Localização:';
            divElementLocalizacao.appendChild(titleLocalizacao);
            
            let textLocalizacao = document.createElement('p');
            textLocalizacao.innerHTML = `(${latitude}, ${longitude})`;
            divElementLocalizacao.appendChild(textLocalizacao);
        } catch (error) {
            console.error('Erro ao obter localização:', error);
        }

        let botaoDeletar = document.createElement('button');
        botaoDeletar.classList.add('btnDeletar');
        botaoDeletar.innerHTML = 'Deletar';
        divColumn2.appendChild(botaoDeletar);

        botaoDeletar.addEventListener('click', () => {
            galeria.removeChild(divImg); 
        });

        tituloFoto.value = '';
        descricaoFoto.value = '';

        salvarDados();
    }
}

function salvarDados() {
    
}

function carregarDados() {
    
}

carregarDados();
