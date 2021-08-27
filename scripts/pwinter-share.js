//Sharing (file) logo
let shareLogo = () => {
    let fileToShare = createFileForSharing(preparePWALogoforSVG());
    let filesArray = [];
    filesArray[0] = fileToShare;
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({
            files: filesArray,
            title: 'My PWA Logo',
            text: 'Custom PWA logo from The PWinter.'
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
        }
        else {
            console.log(`System doesn't support sharing.`);
    }
};

let createFileForSharing = (svgContent) => {
    const myBlob = new Blob([svgContent], {type: 'image/svg+xml'});
    const myFile = new File([myBlob], "custom pwa logo.svg", {type:myBlob.type});
    return myFile;
};

//app share
let sharePWinter = () => {
    const shareData = {
        title: 'PWinter',
        text: 'Design your own PWA Logo.',
        url: 'https://diek.us/pwinter',
    };

    await navigator.share(shareData)
    .then(() => console.log('PWinter shared!'))
    .catch((error) => console.error(error));

    
};

