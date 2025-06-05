import { useThemeStore } from "@/stores/themeStore";

export function showToast(message, type = 'info', duration = 3000, autoClose = true, onView = null) {
    const toastArea = document.querySelector('.toast-custom-area');

    const toast = document.createElement('div');
    toast.className = `toast-custom ${type}`;

    const icon = document.createElement('i');
    if (type === 'success') {
        icon.className = 'fa-solid fa-circle-check';
    } else if (type === 'error') {
        icon.className = 'fa-solid fa-circle-xmark';
    } else if (type === 'warning') {
        icon.className = 'fa-solid fa-triangle-exclamation';
    } else if (type === 'info') {
        icon.className = 'fa-solid fa-circle-info';
    }

    const text = document.createElement('p');
    text.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close-button';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    });

    toast.appendChild(icon);
    toast.appendChild(text);

    if (!autoClose && typeof onView === 'function') {
        const viewButton = document.createElement('button');
        toast.className += ' document-alert';
        viewButton.className = 'button-primary mr-1 ml-1';
        viewButton.textContent = 'Visualizar';
        viewButton.addEventListener('click', () => {
            onView();
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        });
        toast.appendChild(viewButton);
    }

    toast.appendChild(closeButton);

    let progressBar;
    if (autoClose) {
        progressBar = document.createElement('div');
        progressBar.className = 'toast-progress-bar';
        toast.appendChild(progressBar);
    }

    toastArea.prepend(toast);

    let startTime = Date.now();
    let elapsedTime = 0;
    let interval;

    const updateProgressBar = () => {
        if (!progressBar) return;
        const progress = Math.max(0, 100 - (elapsedTime / duration) * 100);
        progressBar.style.width = `${progress}%`;
    };

    const startInterval = () => {
        startTime = Date.now();
        interval = setInterval(() => {
            const now = Date.now();
            elapsedTime += now - startTime;
            startTime = now;
            updateProgressBar();

            if (elapsedTime >= duration) {
                clearInterval(interval);
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }
        }, 50);
    };

    const stopInterval = () => {
        clearInterval(interval);
    };

    if (autoClose) {
        toast.addEventListener('mouseover', stopInterval);
        toast.addEventListener('mouseleave', startInterval);
    }

    const themeStore = useThemeStore()

    if (type === 'success' && themeStore.notificationSound) {
        const audio = new Audio('/audio/notification-4.mp3');
        audio.play().catch((err) => {
            console.warn('Falha ao tocar áudio de notificação:', err);
        });
    }

    setTimeout(() => {
        toast.classList.add('show');
        if (autoClose) {
            setTimeout(() => {
                startInterval();
            }, 1000);
        }
    }, 10);
}
