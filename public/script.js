

window.onload = () => {
    fetch('/breeds')
      .then(res => res.json())
      .then(breeds => {
        const dropdown = document.getElementById('breedSelect');
        dropdown.innerHTML = '';
  
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed;
          option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
          dropdown.appendChild(option);
        });
      })
      .catch(err => {
        console.error('Error loading breeds:', err);
        alert('Failed to load dog breeds.');
      });
  };
  
  function fetchImage() {
    const breed = document.getElementById('breedSelect').value;
  
    if (!breed) {
      alert('Please select a breed first!');
      return;
    }
  
    fetch(`/image/${breed}`)
      .then(res => res.json())
      .then(data => {
        const img = document.getElementById('dogImage');
        img.src = data.image;
        img.alt = `${breed} dog`;
      })
      .catch(err => {
        console.error('Error fetching image:', err);
        alert('Failed to load image.');
      });
  }
  