// Archivo principal de JavaScript
function setInputError(isError) {
  const input = document.getElementById('cardNumber');
  if (isError) {
    input.classList.add('input-error');
  } else {
    input.classList.remove('input-error');
  }
}

export async function verificarTNE() {
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const resultado = document.getElementById('resultado');
  setInputError(false);
  if (!cardNumber || cardNumber.length < 7) {
    setInputError(true);
    resultado.innerHTML = '<span class="novalida">Ingrese un número de TNE válido</span>';
    return;
  }
  resultado.innerHTML = '<span class="spinner"></span>Consultando...';

  console.log('verificarTNE llamada');
  console.log('Número de tarjeta:', cardNumber);

  try {
    const response = await fetch('https://prod-tne.kupos.cl/api/v1/external/tne/get-card-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-name': 'URBAN_BUS',
        'x-client-key': '90840856141878188075943717361345',
        'User-Agent': 'PostmanRuntime/7.45.0'
      },
      body: JSON.stringify({ card_number: cardNumber })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.valid === true) {
        setInputError(false);
        resultado.innerHTML = '<span class="valida">TNE válida <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="vertical-align:middle"><circle cx="10" cy="10" r="10" fill="#1bb76e"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      } else {
        setInputError(true);
        resultado.innerHTML = '<span class="novalida">TNE no válida <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="vertical-align:middle"><circle cx="10" cy="10" r="10" fill="#e14d4d"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span>';
      }
    } else {
      setInputError(true);
      resultado.innerHTML = '<span class="novalida">TNE no válida <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="vertical-align:middle"><circle cx="10" cy="10" r="10" fill="#e14d4d"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span>';
    }
  } catch (error) {
    setInputError(true);
    resultado.innerHTML = '<span class="novalida">Error al consultar la API</span>';
  }

  console.log('verificarTNE ejecutándose correctamente');
}

window.verificarTNE = verificarTNE;

document.addEventListener('DOMContentLoaded', () => {
  window.verificarTNE = verificarTNE;
  console.log('verificarTNE asignada al objeto window:', typeof window.verificarTNE);
});

console.log('script.js cargado correctamente');

(function() {
  const btn = document.getElementById('verificarBtn');
  const input = document.getElementById('cardNumber');
  const classes = [
    'dodge-left', 'dodge-right', 'dodge-up', 'dodge-down',
    'dodge-up-left', 'dodge-up-right', 'dodge-down-left', 'dodge-down-right'
  ];
  let lastClass = '';

  function dodge(e) {
    if (!input.value.trim()) {
      console.log('Campo vacío, esquivando botón');
      // Elige una clase aleatoria distinta a la anterior
      let idx;
      do {
        idx = Math.floor(Math.random() * classes.length);
      } while (classes[idx] === lastClass);
      btn.classList.remove(...classes);
      btn.classList.add(classes[idx]);
      lastClass = classes[idx];
      setTimeout(() => {
        btn.classList.remove(...classes);
      }, 350);
      e.preventDefault();
    } else {
      console.log('Campo lleno, botón no esquiva');
    }
  }

  btn.addEventListener('mouseenter', dodge);
  btn.addEventListener('touchstart', dodge);
  btn.addEventListener('click', function(e) {
    if (!input.value.trim()) {
      dodge(e);
    } else {
      console.log('Botón clickeado con campo lleno');
    }
  });
})();


