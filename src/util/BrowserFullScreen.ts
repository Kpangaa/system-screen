export const browserFullScreen = (container: any) => {
    if (container.requestFullscreen) {    //Empezando por la estándar
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {    //Webkit (Safari, Chrome y Opera 15+)
        container.webkitRequestFullscreen();
    } else if (container.mozRequestFullScreen) {   //Firefox
        container.mozRequestFullScreen();
    } else if (container.msRequestFullscreen) {    //Internet Explorer 11+
        container.msRequestFullscreen();
    } else if (container.webkitEnterFullScreen) { //Safari iOS
        container.webkitEnterFullScreen();
    }
}