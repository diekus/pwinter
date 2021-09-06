const reHexColor = /#[a-fA-F0-9]{6}/;

document.addEventListener('DOMContentLoaded', function() {
    

    //gets the query string
    let qs = new URLSearchParams(document.URL.substring(document.URL.indexOf('?')));
    if(qs.has('randomize')) {
        setRandomColors();
    } else {
        if(qs.has('colors')) {
            let palette = extractColors(qs.get('colors'));
            setLogoColors(palette[0], palette[1], palette[2]);
        }
        else {
            if(qs.has('shared-color')) {
                let qs_aux = qs.toString().replace('%23', '#');
                if(qs_aux.search(reHexColor) != -1) {
                    let col_aux = qs_aux.match(reHexColor)[0];
                    setLogoColors(col_aux, col_aux, col_aux)
                }
                else 
                    alert('No color was found!');
            }
        }
    }

    init();
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
    });

    document.getElementById('btnNew').addEventListener('click', newLogo, false);
    document.getElementById('btnSave').addEventListener('click', saveLogo, false);
    document.getElementById('btnShare').addEventListener('click', shareLogo, false);
    document.getElementById('btnShareApp').addEventListener('click', sharePWinter, false);
};

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
    return  '#' + Math.floor(Math.random()*16777215).toString(16);
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
            document.getElementById('canvasPreview').style.backgroundColor = 'var(--colorDark)';
            break;
        case 'btnLight': 
            document.getElementById('canvasPreview').style.backgroundColor = 'var(--colorLight)';
            break;
    }
};