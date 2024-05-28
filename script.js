document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url');
    const downloadButton = document.getElementById('downloadButton');
    const downloadProgress = document.getElementById('downloadProgress');
    const status = document.getElementById('status');
  
    downloadButton.addEventListener('click', function() {
      const url = urlInput.value;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/download?url=' + encodeURIComponent(url));
      xhr.responseType = 'blob';
  
      xhr.onloadstart = function() {
        downloadProgress.style.width = '0%';
        status.textContent = 'Downloading...';
      };
  
      xhr.onprogress = function(event) {
        const progress = (event.loaded / event.total) * 100;
        downloadProgress.style.width = progress + '%';
      };
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'video.mp4';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          status.textContent = 'Download completed!';
        } else {
          status.textContent = 'Error downloading video!';
        }
      };
  
      xhr.onerror = function() {
        status.textContent = 'Error downloading video!';
      };
  
      xhr.send();
    });
  });
  