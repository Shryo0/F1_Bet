document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.getElementById("game-board");
  const balanceDisplay = document.getElementById("balance-value");
  const betAmountInput = document.getElementById("bet-amount");
  const driverSelect = document.getElementById("driver-select");
  const placeBetButton = document.getElementById("place-bet");
  const restartRaceButton = document.getElementById("restart-race");

  let balance = 100;
  let carsPosition = [0, 0, 0, 0, 0]; // Posição inicial de cada carro
  const carColor = ["#FFB6C1", "blue", "purple", "black", "white"];
  let raceInterval;
  let raceStarted = false; // Acompanha se a corrida começou

  // Atualiza o estado do botão "Place Bet" com base no valor da aposta e no saldo
  function updatePlaceBetButtonState() {
    const betAmount = parseInt(betAmountInput.value);
    if (betAmount < 5 || betAmount > balance) {
      placeBetButton.disabled = true; // Desabilita o botão se a aposta for menor que 5 ou maior que o saldo
    } else {
      placeBetButton.disabled = false; // Habilita o botão se a aposta for de pelo menos 5 e o saldo for suficiente
    }
  }

  // Atualiza o estado do botão inicialmente
  updatePlaceBetButtonState();

  // Adiciona um ouvinte de evento ao input da aposta para atualizar o estado do botão
  betAmountInput.addEventListener("input", updatePlaceBetButtonState);

  // Função para iniciar a corrida
  function startRace() {
    raceInterval = setInterval(moveCars, 50);
  }

  // Adiciona um ouvinte de evento ao botão de reiniciar a corrida
  restartRaceButton.addEventListener("click", function () {
    clearInterval(raceInterval); // Limpa o intervalo da corrida atual, se houver
    restartPosition(); // Reseta a posição dos carros
    const cars = document.querySelectorAll(".car");
    cars.forEach((car, index) => {
      car.style.marginLeft = "0px"; // Reinicia a posição visual dos carros
    });
    raceStarted = false; // Define que a corrida não começou
  });

  // Função para reiniciar a posição dos carros
  function restartPosition() {
    carsPosition = [0, 0, 0, 0, 0]; // Reinicia a posição dos carros
  }

  // Função para mover os carros
  function moveCars() {
    for (let i = 0; i < carsPosition.length; i++) {
      if (i === 0) {
        carsPosition[i] += Math.random() * 15; // Aumenta a velocidade do primeiro carro
      } else {
        carsPosition[i] += Math.random() * 10; // Mantém a velocidade padrão para os outros carros
      }
      const carElement = document.getElementById("car-" + (i + 1));
      carElement.style.marginLeft = carsPosition[i] + "px"; // Atualiza a posição do carro
      if (carsPosition[i] >= 900) { // Ajustado para 900 para garantir que o carro vença quando chegar à linha de chegada
        clearInterval(raceInterval); // Para a corrida
        announceResult(i + 1); // Mostra o resultado
        carElement.style.marginLeft = "900px"; // Posição final dos carros
      }
    }
  }

  // Função para anunciar o resultado da corrida
  function announceResult(winningDriver) {
    const selectedDriver = parseInt(driverSelect.value);
    const betAmount = parseInt(betAmountInput.value);
    if (winningDriver === selectedDriver) {
      balance += betAmount * 2; // Ganha o dobro do valor da aposta
      alert("Congratulations! Your driver won the race. You won $" + (betAmount * 2));
    } else {
      balance -= betAmount; // Perde o valor da aposta
      alert("Sorry! Your driver didn't win the race. You lost $" + betAmount);
    }
    balanceDisplay.textContent = balance; // Atualiza o saldo
    restartPosition();
    updatePlaceBetButtonState(); // Atualiza o estado do botão após a corrida
  }

  // Adiciona um ouvinte de evento ao botão de apostar
  placeBetButton.addEventListener("click", function () {
    const betAmount = parseInt(betAmountInput.value);
    if (!raceStarted && betAmount >= 5 && betAmount <= balance) { // Verifica se a corrida ainda não começou, se a aposta é de pelo menos 5 e se o saldo é suficiente
      startRace(); // Inicia a corrida se a aposta for válida
      raceStarted = true; // Marca que a corrida começou
    } else if (raceStarted) {
      alert("Race already started!"); // Avisa que a corrida já começou
    } else if (betAmount < 5) {
      alert("Minimum bet amount is 5."); // Avisa que a aposta mínima é 5
    } else if (betAmount > balance) {
      alert("You don't have enough balance to place this bet."); // Avisa que o saldo é insuficiente
    }
  });
  
  // Adiciona os carros ao tabuleiro
  for (let i = 0; i < 5; i++) {
    const car = document.createElement("div");
    car.className = "car";
    car.id = "car-" + (i + 1);
    car.style.backgroundColor = carColor[i];
    gameBoard.appendChild(car);
  }
});
