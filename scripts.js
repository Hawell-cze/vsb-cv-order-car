document.querySelector('#orderForm').addEventListener('submit', event => {
  const email = document.querySelector('#email').value;
  if (!email.includes('@')) {
    alert('Email musí obsahovat znak zavináče (@)');
    event.preventDefault();
  }
});

const znackaCeny = {
  mercedes: 1500000,
  volvo: 1200000,
  audi: 1350000,
  bmw: 1400000,
};

const updatePrice = () => {
  const znacka = document.querySelector('#brand').value;
  const cena = znackaCeny[znacka];
  document.querySelector('#price').textContent = `${cena.toLocaleString()} Kč`;

  const cenaBurnished = (cena * 0.05).toLocaleString();
  const cenaMetallic = (cena * 0.07).toLocaleString();

  document.querySelector('#basePrice').textContent = `(0 Kč)`;
  document.querySelector(
    '#burnishedPrice'
  ).textContent = `(${cenaBurnished} Kč)`;
  document.querySelector('#metallicPrice').textContent = `(${cenaMetallic} Kč)`;
};

const vypocitatCenu = () => {
  const znacka = document.querySelector('#brand').value;
  const zakladniCena = znackaCeny[znacka];

  const barvaRadios = document.querySelectorAll('input[name="color"]');
  let barvaExtra = 0;
  for (const radio of barvaRadios) {
    if (radio.checked) {
      switch (radio.value) {
        case 'burnished':
          barvaExtra = 0.05;
          break;
        case 'metallic':
          barvaExtra = 0.07;
          break;
        default:
          barvaExtra = 0;
      }
      break;
    }
  }

  const vybavaCheckboxy = document.querySelectorAll(
    'input[name="equipment"]:checked'
  );
  let celkovaCenaVybavy = 0;
  let tuningExtra = 0;
  vybavaCheckboxy.forEach(checkbox => {
    const hodnota = parseFloat(checkbox.value);
    if (checkbox.id === 'tuning') {
      tuningExtra = hodnota;
    } else {
      celkovaCenaVybavy += hodnota;
    }
  });

  const cenaBarvy = zakladniCena * barvaExtra;
  const cenaTuningu = zakladniCena * tuningExtra;
  const celkovaCena =
    zakladniCena + cenaBarvy + celkovaCenaVybavy + cenaTuningu;

  const cenaTotal = document.querySelector('#total');
  cenaTotal.textContent = `Celková cena vozu: ${celkovaCena.toLocaleString()} Kč`;
};

const vyhodnotitRozpocet = () => {
  const celkovaCena = parseFloat(
    document.querySelector('#total').textContent.replace(/[^0-9]/g, '')
  );
  const rozpocet = parseInt(document.querySelector('#budget').value);
  const rozpocetElement = document.querySelector('#rozpocet');
  rozpocetElement.textContent =
    rozpocet >= celkovaCena
      ? 'Vešel jste se do rozpočtu: Ano'
      : 'Vešel jste se do rozpočtu: Ne';
  rozpocetElement.classList.toggle('rozpocet', rozpocet >= celkovaCena);
};

document.querySelector('#brand').addEventListener('change', () => {
  updatePrice();
  vypocitatCenu();
});

document.querySelectorAll('input[name="color"]').forEach(radio => {
  radio.addEventListener('change', vypocitatCenu);
});

document.querySelectorAll('input[name="equipment"]').forEach(checkbox => {
  checkbox.addEventListener('change', vypocitatCenu);
});

document
  .querySelector('#rozpocetKontrola')
  .addEventListener('click', vyhodnotitRozpocet);

// Inicializace ceny při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
  updatePrice();
  vypocitatCenu();
});
