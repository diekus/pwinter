//Sharing (file) logo
let shareLogo = () => {
    let filesArray = [];
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
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
}

//app share
let sharePWinter = () => {
    const shareData = {
        title: 'PWinter',
        text: 'Design your own PWA Logo.',
        url: 'https://diek.us/pwinter',
    };

    navigator.share(shareData)
    .then(() => console.log('PWinter shared!'))
    .catch((error) => console.error(error))
};

