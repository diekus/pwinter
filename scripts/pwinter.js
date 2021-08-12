document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener('input', function() {
            document.documentElement.style.setProperty("--" + this.name, this.value);
        }, false);
    });
});