chrome.tabs.executeScript({
    code: `
    let container = document.getElementsByClassName('style-scope ytd-video-primary-info-renderer')[0];
    let slider = document.getElementById('speedSlider');
    let video = document.getElementsByTagName('video')[0];
    if (!slider){
        let br = document.createElement('br');

        let div = document.createElement('div');
        div.id = 'sliderContainer';
        div.style.cssText = 'position: relative; margin: 0 auto 3rem';


        let title = document.createElement('span');
        title.id = 'sliderTitle';
        title.innerText = 'Change video speed';
        title.style.cssText = 'color: rgb(221, 149, 15); font-size: 1.5em; text-align: center;'

        let sliderLabel = document.createElement('output');
        sliderLabel.id = 'sliderLabel';
        sliderLabel.innerText = '1';
        sliderLabel.style.cssText = 'position: absolute; background-color: rgb(221, 149, 15); color: white; font-size: 1.5em; text-align: center; padding: 3px 8px; top: 105%;'

        let resetButton = document.createElement('button');
        resetButton.id = 'resetButton';
        resetButton.innerText = 'Reset'
        resetButton.style.cssText = 'float: right; color: rgb(221, 149, 15); background: none; font-size: 1.5em; text-align: center; border: 1px solid grey; border-radius: 1px; margin-bottom: 3px;'

        range = document.createElement('input');
        range.type = 'range';
        range.id = 'speedSlider';
        range.setAttribute('min', '0.1');
        range.setAttribute('max', '10');
        range.setAttribute('step', '0.1');
        range.setAttribute('value', '1');
        range.style.cssText = '-webkit-appearance: none; background-color: rgb(221, 149, 15); opacity: 0.9; width: 100%;'

        div.prepend(br);
        div.appendChild(title);
        div.appendChild(resetButton);
        div.appendChild(sliderLabel);
        div.appendChild(br);
        div.appendChild(range);
        div.appendChild(br);
        container.prepend(div);
    } 

    slider = document.getElementById('speedSlider');
    let resetButton = document.getElementById('resetButton');

    function updateSpeed(){
        video.playbackRate = slider.value;
        updateSliderLabel(video.playbackRate)
    }

    function resetSpeed(){
        slider.value = 1.0;
        video.playbackRate = 1;
        updateSliderLabel(video.playbackRate)
    }

    function updateSliderLabel(speed){
        let sliderLabel = document.getElementById('sliderLabel');
        let currentSpeed = speed.toString();
        if (currentSpeed.length === 1){
            currentSpeed = currentSpeed + '.0';
        }
        let sliderVal = speed * 10
        sliderLabel.innerText = currentSpeed;
        sliderLabel.style.left = 'calc(' + sliderVal + '% + (' + (8 - sliderVal * 0.4) + 'px))';
    }

    function changeSpeedWithKeys(event){
        if (event.keyCode ===  187 && video.playbackRate < 10){
            video.playbackRate = (video.playbackRate += 0.1).toFixed(1)
        }
        if (event.keyCode === 189 && video.playbackRate > 0.1){
            video.playbackRate = (video.playbackRate -= 0.1).toFixed(1)
        }
        if (event.keyCode  === 8){
            video.playbackRate = 1.0
        }
        updateSliderLabel(video.playbackRate.toFixed(1))
        slider.value = video.playbackRate.toFixed(1)
    }               

    slider.addEventListener('mouseup', updateSpeed)
    resetButton.addEventListener('click', resetSpeed)
    document.addEventListener('keydown', changeSpeedWithKeys)
    updateSliderLabel(1)

    `
})
