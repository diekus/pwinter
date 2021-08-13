document.addEventListener('DOMContentLoaded', function() {
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

    //
    document.getElementById('btnSave').addEventListener('click', saveLogo, false);
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

async function saveLogo () {
    //prepares the logo
    let s = window.getComputedStyle(document.querySelector(':root'));
    let content = document.getElementById('pwaLogo').innerHTML;
    content = content.replace('var(--colorP)', s.getPropertyValue('--colorP'));
    content = content.replace('var(--colorW)', s.getPropertyValue('--colorW'));
    content = content.replace('var(--colorA)', s.getPropertyValue('--colorA'));
    
    //prepares the file
    let fileHandle;
    try {
        fileHandle = await getNewFileHandle();
    } catch (ex) {
        if (ex.name === 'AbortError') {
            return;
        }
        const msg = 'An error occured trying to open the file.';
        console.error(msg, ex);
        alert(msg);
        return;
    }
    try {
        await writeFile(fileHandle, content);
    }
    catch (ex) {
        const msg = 'Unable to save file.';
        console.error(msg, ex);
        alert(msg);
        return;
    }
}

async function getNewFileHandle() {
    const options = {
        startIn: 'pictures',
        suggestedName: 'custom PWA logo.svg',
        types: [
            {
                description: 'SVG Files',
                accept: {
                    'image/svg+xml': ['.svg'],
                },
            },
        ],
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
}

async function writeFile (fileHandle, contents) {
    const writable = await fileHandle.createWritable();
    writable.write(contents);
    writable.close();
}