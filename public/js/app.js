const stockAAPL = document.querySelector('#AAPL')
const stockAMZN = document.querySelector('#AMZN')
const stockMSFT = document.querySelector('#MSFT')

const socket = new WebSocket('wss://ws.finnhub.io?token=c0g00d748v6rp6j6ei0g');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const currentPrices = JSON.parse(event.data).data

    currentPrices.forEach((item, index) => {
        if(item.s === 'AAPL'){
            stockAAPL.textContent = "Current Stock: $" + item.p
        }else if(item.s === 'AMZN'){
            stockAMZN.textContent = "Current Stock: $" + item.p
        }else if(item.s === 'MSFT'){
            stockMSFT.textContent = "Current Stock: $" + item.p
        }
    })
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
