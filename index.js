document.getElementById('calcForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const xp = parseInt(document.getElementById('xp').value);
    const pointsPerMessage = parseInt(document.getElementById('pointsPerMessage').value);
    const interval = parseInt(document.getElementById('interval').value);

    
    const messagesRequired = Math.ceil(xp / pointsPerMessage);
    const timeRequired = messagesRequired * interval;

    
    document.getElementById('messagesRequired').textContent = messagesRequired;
    document.getElementById('timeRequired').textContent = `${Math.floor(timeRequired / 60)} minutos e ${timeRequired % 60} segundos`;

    
    document.getElementById('result').classList.remove('hidden');

  
    const sound = document.getElementById('notificationSound');
    sound.play();

    
    if (Notification.permission === 'granted') {
        new Notification('Cálculo concluído!', {
            body: `Você precisa de ${messagesRequired} mensagens em ${Math.floor(timeRequired / 60)} minutos e ${timeRequired % 60} segundos.`,
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Cálculo concluído!', {
                    body: `Você precisa de ${messagesRequired} mensagens em ${Math.floor(timeRequired / 60)} minutos e ${timeRequired % 60} segundos.`,
                });
            }
        });
    }
});
