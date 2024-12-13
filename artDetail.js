document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  
    const piece = artData.find(item => item.id === id);
  
    if (piece) {
      document.getElementById('artist-name').innerText = `${piece.artist}`;
      document.getElementById('art-image').src = piece.imageUrl;
    } else {
      document.body.innerHTML = '<h1>Artwork not found</h1>';
    }
  });
  