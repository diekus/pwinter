const reHexColor = /#[a-fA-F0-9]{6}/;

document.addEventListener('DOMContentLoaded', async function() {

    init();
    setRandomColors(); 
    
    //gets the query string
    let qs = new URLSearchParams(document.URL.substring(document.URL.indexOf('?')));
    if(qs.keys().length != 0) {
        let entry_method = qs.keys();
        switch(entry_method.next().value) {
            case 'colors': //entry via protocol handlers
                let palette = extractColors(qs.get('colors'));
                setLogoColors(palette[0], palette[1], palette[2]);
                break;
            case 'shared-color': //entry via web share target
                let qs_aux = qs.toString().replace('%23', '#');
                if(qs_aux.search(reHexColor) != -1) {
                    let col_aux = qs_aux.match(reHexColor)[0];
                    setLogoColors(col_aux, col_aux, col_aux)
                }
                else 
                    alert('No color was found!');
                break;
            case 'blank': //entry via shortcut
                setLogoColors('#808080', '#808080', '#808080');
                break;
        }

        await handleFile(); //entry via file handler

        
    }    
});

let init = () => {
    //sets events on color pickers
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener('input', function() {
            document.querySelector(':root').style.setProperty("--" + this.name, this.value);
        }, false);
    });

    //sets the backgroundToggle events
    document.querySelectorAll('.bgBtn').forEach(themeBgBtn => {
        themeBgBtn.addEventListener('click', function() {
            setBackgroundTheme(this.id);
        }, false);

    //enables the device posture API for samsung internet 16 beta
    if(navigator.devicePosture != undefined)
        navigator.devicePosture.type;
    });

    document.getElementById('btnNew').addEventListener('click', newLogo, false);
    document.getElementById('btnSave').addEventListener('click', saveLogo, false);
    document.getElementById('btnShare').addEventListener('click', shareLogo, false);
    document.getElementById('btnShareApp').addEventListener('click', sharePWinter, false);
};

async function handleFile() {
    if ('launchQueue' in window) {
        launchQueue.setConsumer(async (launchParams) => {
            if(!launchParams.files.length) { return; }

            const fileHandle = launchParams.files[0];
            const file = await fileHandle.getFile();
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                const colorsFromFile = event.target.result.split(';');
                setLogoColors(colorsFromFile[0], colorsFromFile[1], colorsFromFile[2]);
                alert(`Loading colors from ${file.name}`);
              });
            reader.readAsText(file);
            
        });
    }
}

let newLogo = () => {
    setLogoColors( '#808080' , '#808080', '#808080');
};

let setLogoColors = (colP, colW, colA) => {
    document.getElementById('colorPickerP').value = colP;
    document.querySelector(':root').style.setProperty("--colorP", colP);
    document.getElementById('colorPickerW').value = colW;
    document.querySelector(':root').style.setProperty("--colorW", colW);
    document.getElementById('colorPickerA').value = colA;
    document.querySelector(':root').style.setProperty("--colorA", colA);
};

let setRandomColors = () => {
    let randColorP = getRandomColor();    
    let randColorW = getRandomColor();    
    let randColorA = getRandomColor();
    setLogoColors(randColorP, randColorW, randColorA);
};

let getRandomColor = () => {
    let randCol = '#' + Math.floor(Math.random()*16777215).toString(16);
    if (randCol.length < 7)
        randCol += '5';
    return  randCol;
};

let extractColors = (urlPassed) => {
    pcolors = urlPassed.replace('web+pwinter://', '');
    pcolors = pcolors.replace('/', '');
    pcolors = pcolors.split('-');
    pcolors[0] = '#' + pcolors[0];
    pcolors[1] = '#' + pcolors[1];
    pcolors[2] = '#' + pcolors[2];
    return pcolors;
};

let setBackgroundTheme = (theme) => {
    switch(theme) {
        case 'btnDark': 
            document.getElementById('previewPane').style.backgroundColor = 'var(--colorDark)';
            document.getElementById('colorSelectionPane').style.backgroundColor = 'var(--colorDark)';
            break;
        case 'btnLight': 
            document.getElementById('previewPane').style.backgroundColor = 'var(--colorLight)';
            document.getElementById('colorSelectionPane').style.backgroundColor = 'var(--colorLight)';
            break;
    }
};