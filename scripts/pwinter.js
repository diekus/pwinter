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

    document.querySelectorAll('.bgBtn').forEach(themeBgBtn => {
        themeBgBtn.addEventListener('click', function() {
            setBackgroundTheme(this.id);
        }, false);
    });
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