const Toast = (title: string) => {
    const target = document.createElement('div');
    target.innerText = title;
    target.style.color = '#fff';
    target.style.backgroundColor = '#4c4c4c';
    target.style.fontSize = '14px';
    target.style.padding = '8px';
    target.style.borderRadius = '4px';
    document.getElementsByClassName('toast-info')[0].appendChild(target);
    // @ts-ignore
    document.getElementsByClassName('toast-info')[0].style.zIndex = 99999;
    setTimeout(() => {
        document.getElementsByClassName('toast-info')[0].removeChild(target);
        // @ts-ignore
        document.getElementsByClassName('toast-info')[0].style.zIndex = -1;
    }, 1500)
}

export default Toast;