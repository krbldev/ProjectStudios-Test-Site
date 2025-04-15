const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

function displayLatestUploads() {
    const apiKey = 'AIzaSyDA_fc5_0ZPUF12ut2C4msU2u9L2EQMYa8';
    const channelId = 'UCh74b6IJKEZIaC15BxK-ZiA';
    const maxResults = 6;

  gapi.client.youtube.search.list({
    key: apiKey,
    channelId: channelId,
    part: 'snippet',
    order: 'date',
    maxResults: maxResults
  }).then(response => {
    const uploadsContainer = document.getElementById('uploads-container');
    uploadsContainer.classList.add('uploads-container');

    response.result.items.forEach(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnailUrl = item.snippet.thumbnails.medium.url;

      const uploadCard = document.createElement('div');
      uploadCard.classList.add('upload-card');

      const link = document.createElement('a');
      link.href = `https://www.youtube.com/watch?v=${videoId}`;
      link.target = '_blank';

      const thumbnail = document.createElement('img');
      thumbnail.src = thumbnailUrl;
      thumbnail.alt = title;

      const uploadCardContent = document.createElement('div');
      uploadCardContent.classList.add('upload-card-content');

      const heading = document.createElement('h4');
      heading.textContent = title;

      const watchLink = document.createElement('a');
      watchLink.href = `https://www.youtube.com/watch?v=${videoId}`;
      watchLink.target = '_blank';
      watchLink.textContent = 'Watch Now';

      watchLink.style.textDecoration = 'none';

      uploadCardContent.appendChild(heading);
      uploadCardContent.appendChild(watchLink);
      link.appendChild(thumbnail);
      link.appendChild(uploadCardContent);
      uploadCard.appendChild(link);
      uploadsContainer.appendChild(uploadCard);
    });
  }, error => {
    console.error('Error fetching YouTube uploads:', error);
  });
}

function loadYouTubeAPI() {
  gapi.load('client', () => {
    gapi.client.init({
      'apiKey': 'AIzaSyDA_fc5_0ZPUF12ut2C4msU2u9L2EQMYa8',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
      displayLatestUploads();
    }, error => {
      console.error('Error initializing YouTube API:', error);
    });
  });
}

window.addEventListener('load', loadYouTubeAPI);