const apiUrl = 'https://api.github.com';
const apiKey = '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';
const repoOwner = 'toolmap';
const repoName = 'uploade';

const uploadForm = document.getElementById('upload-form');
const uploadBtn = document.getElementById('upload-btn');
const photoGallery = document.getElementById('photo-gallery');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const photoInput = document.getElementById('photo');
  const photoFile = photoInput.files[0];
  const formData = new FormData();
  formData.append('photo', photoFile);

  fetch(`${apiUrl}/repos/${repoOwner}/${repoName}/contents/photos/${photoFile.name}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Upload photo ${photoFile.name}`,
      content: btoa(photoFile),
      branch: 'main'
    })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(`Photo uploaded successfully: ${data.commit.html_url}`);
    displayPhotos();
  })
  .catch((error) => console.error(`Error uploading photo: ${error}`));
});

const displayPhotos = () => {
  fetch(`${apiUrl}/repos/${repoOwner}/${repoName}/contents/photos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    const photos = data.map((file) => file.download_url);
    photoGallery.innerHTML = '';
    photos.forEach((photoUrl) => {
      const img = document.createElement('img');
      img.src = photoUrl;
      photoGallery.appendChild(img);
    });
  })
  .catch((error) => console.error(`Error retrieving photos: ${error}`));
};

displayPhotos();
