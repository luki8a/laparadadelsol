// Módulo del mapa interactivo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la sección de mapa existe
    const mapaContainer = document.getElementById('mapa-interactivo');
    if (!mapaContainer) return;

    // Definir coordenadas de los kioscos
    const locations = [
        {
            id: 1,
            title: "La Parada del Sol 1",
            address: "Av. Rodríguez Peña 4706, B1672 Villa Lynch, Provincia de Buenos Aires",
            position: { lat: -34.5753, lng: -58.4818 }, // Villa Lynch
            url: "https://www.google.com/maps?sca_esv=df20c8600aa448fe&output=search&q=la+parada+del+sol",
            color: "#4CAF50", // Verde para Villa Lynch
            barrio: "Villa Lynch"
        },
        {
            id: 2,
            title: "La Parada del Sol 2",
            address: "Santiago Bonifacini 3795, B1676 Santos Lugares, Provincia de Buenos Aires",
            position: { lat: -34.5895, lng: -58.4835 }, // Santos Lugares
            url: "https://www.google.com/maps/place/La+parada+del+sol+2/@-34.6000657,-58.5505683,17z/",
            color: "#2196F3", // Azul para Santos Lugares
            barrio: "Santos Lugares"
        },
        {
            id: 3,
            title: "La Parada del Sol 3",
            address: "Dr. Amadeo Sabattini 4251, B1676BAI Caseros, Provincia de Buenos Aires",
            position: { lat: -34.5710, lng: -58.4954 }, // Caseros
            url: "https://www.google.com/maps/place/La+Parada+Del+Sol+3+Kiosco+24+hs/@-34.6024568,-58.5577301,17z/",
            color: "#FF9800", // Naranja para Caseros
            barrio: "Caseros"
        }
    ];
    
    // Implementar mapa como iframe para evitar problemas con API Key
    function mostrarMapa() {
        mapaContainer.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/d/embed?mid=1LfnO_r0VVYcpI59v6g6ibZiQTA4yjnc&ehbc=2E312F"
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Kioscos La Parada del Sol en Buenos Aires">
            </iframe>
        `;
    }
    
    // Agregar funcionalidad a los tooltips
    const tooltips = document.querySelectorAll('.mapa-tooltip');
    const closeButtons = document.querySelectorAll('.tooltip-close');
    
    // Manejar botones de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tooltip = this.closest('.mapa-tooltip');
            tooltip.classList.remove('active');
        });
    });
    
    // Manejar clicks en los puntos de ruta
    document.querySelectorAll('.ruta-punto').forEach((punto, index) => {
        punto.addEventListener('click', function() {
            // Remover la clase active de todos los puntos
            document.querySelectorAll('.ruta-punto').forEach(p => {
                p.classList.remove('active');
            });
            
            // Añadir la clase active al punto actual
            this.classList.add('active');
            
            // Ocultar todos los tooltips
            tooltips.forEach(tooltip => {
                tooltip.classList.remove('active');
            });
            
            // Mostrar el tooltip correspondiente
            if (index < tooltips.length) {
                tooltips[index].classList.add('active');
            }
        });
    });
    
    // Agregar cartel de colectivo
    const bondiSign = document.createElement('div');
    bondiSign.className = 'bondi-sign bondi-blue';
    const bondiNumber = document.createElement('span');
    bondiNumber.className = 'bondi-number';
    bondiNumber.textContent = '123';
    bondiSign.appendChild(bondiNumber);
    mapaContainer.appendChild(bondiSign);
    
    // Mostrar el mapa
    mostrarMapa();
    
    // Tabs para cambiar el iframe del mapa
    const buttons = document.querySelectorAll('.mapa-tabs button');
    const iframe = document.querySelector('.mapa iframe');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lugar = btn.dataset.lugar;
        switch (lugar) {
          case 'villa':
            iframe.src = 'https://www.google.com/maps?q=Av.+Rodr%C3%ADguez+Pe%C3%B1a+4706,+Villa+Lynch,+Provincia+de+Buenos+Aires&output=embed';
            break;
          case 'santos':
            iframe.src = 'https://www.google.com/maps?q=9FX2+XR+Santos+Lugares,+Provincia+de+Buenos+Aires&output=embed';
            break;
          case 'caseros':
            iframe.src = 'https://www.google.com/maps?q=Dr.+Amadeo+Sabattini+4251,+Caseros,+Provincia+de+Buenos+Aires&output=embed';
            break;
          default:
            console.warn('Ubicación no reconocida:', lugar);
        }
      });
    });
});