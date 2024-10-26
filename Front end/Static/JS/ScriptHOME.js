
document.getElementById('buscar').addEventListener('click', () => {
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    
    
    console.log(`Buscando passagens para ${data} às ${horario}`);
  });
  
  
  document.getElementById('filtrar').addEventListener('click', () => {
    const preco = document.getElementById('preco').value;
    const classe = document.getElementById('classe').value;
    
    
    console.log(`Filtrando passagens por ${preco} e ${classe}`);
  });
  
  
  const mapa = L.map('mapa').setView([-23.55052, -46.633308], 13);
  L.tileLayer('https://{s}.(link unavailable)', {
    attribution: '&copy; <a href="(link unavailable)">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
  }).addTo(mapa);
  
  
  document.getElementById('carrinho').addEventListener('click', () => {
    
    console.log('Carrinho clicado');
  });
  