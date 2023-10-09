async function enviarMensagensTelegram(messages) {
    const lines = messages.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector(".input-message-container"),
    textarea = main.querySelector(`div[contenteditable="true"]`);

    if (!textarea) throw new Error("Não há uma conversa aberta");

    for (const line of lines) {
        textarea.focus();
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        await new Promise(resolve => setTimeout(resolve, 100));

        const sendButton = document.querySelector('.btn-send');
        if (sendButton) {
            sendButton.click();
        }

        if (lines.indexOf(line) !== lines.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }

    return lines.length;
}

enviarMensagensTelegram(`
Texto para spammar
`).then(count => console.log(`Código finalizado, ${count} mensagens enviadas`)).catch(console.error);