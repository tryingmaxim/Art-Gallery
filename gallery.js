class Gallery {
    constructor() {
      this.gallery = document.getElementById('gallery');
      this.colorThief = new ColorThief();
      this.positions = [];
      this.init();
    }
  
    calculatePositions() {
      const minDistance = 200;
      const maxWidth = window.innerWidth * 1.75;
      const maxHeight = window.innerHeight * 1.75;
  
      artData.forEach(() => {
        let attempts = 0;
        let position;
  
        while (attempts < 50) {
          const x = Math.random() * maxWidth;
          const y = Math.random() * maxHeight;
          
          const isValid = this.positions.every(pos => {
            const dx = pos.x - x;
            const dy = pos.y - y;
            return Math.sqrt(dx * dx + dy * dy) > minDistance;
          });
  
          if (isValid) {
            position = { x, y };
            break;
          }
          attempts++;
        }
  
        this.positions.push(position || { x: 0, y: 0 });
      });
    }
  
    async createArtPiece(piece, position, index) {
      const artElement = document.createElement('div');
      artElement.className = 'art-piece';
      artElement.style.left = `${position.x}px`;
      artElement.style.top = `${position.y}px`;
      
   
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = piece.imageUrl;
      
      img.onload = () => {
        const [r, g, b] = this.colorThief.getColor(img);
        artElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      };
  

      artElement.addEventListener('mouseenter', () => {
        artElement.style.backgroundImage = `url(${piece.imageUrl})`;
        artElement.style.backgroundSize = 'cover';
        artElement.style.backgroundPosition = 'center';
      });
  
      artElement.addEventListener('mouseleave', () => {
        artElement.style.backgroundImage = 'none';
      });
      
      artElement.addEventListener('click', () => {
        window.location.href = `artDetail.html?id=${piece.id}`;
      });
    
      
      return artElement;
    }
  
    handleMouseMove(e) {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
      
      requestAnimationFrame(() => {
        this.gallery.style.transform = `translate(${-xPercent * 20}vw, ${-yPercent * 20}vh)`;
      });
    }
  
    async init() {
      this.calculatePositions();
      
      const fragments = document.createDocumentFragment();
      const pieces = await Promise.all(
        artData.map((piece, index) => 
          this.createArtPiece(piece, this.positions[index], index)
        )
      );
      
      pieces.forEach(piece => fragments.appendChild(piece));
      this.gallery.appendChild(fragments);
  
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
  }
  
  new Gallery();