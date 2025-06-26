(async function() {
  const mainPageDomain = window.location.origin;
  console.log(mainPageDomain);
  const iframeURL = 'https://vue-frontend-ruddy.vercel.app/';
  const fetchURL = "https://next-backend-pi-six.vercel.app/api/fData";
  let fData = [];
  let cssData = {};

  try {
    const response = await fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mainPageDomain })
    });

    if (!response.ok) {
      throw new Error('Fehlerhafte Serverantwort: ' + response.status);
    }

    const data = await response.json();
    console.log(data);
    fData = data.fData;
    cssData = data.cssData || {};
    iconSrc = data.iconSrc || 'https://cdn-icons-png.flaticon.com/512/2462/2462719.png';
  } catch (error) {
    console.error('Fehler beim Abrufen:', error);
  }

  if(!fData || fData.length === 0) {
    console.log('Chat konte nicht laden werden');
    return;
  }
  // Create iframe after fetch is complete
  const iframe = document.createElement('iframe');
  iframe.src = iframeURL;
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '-100px'; // Initial position
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.background = 'transparent';
  iframe.allowTransparency = 'true';
  iframe.style.pointerEvents = 'auto';
  iframe.style.transition = 'right 0.5s ease'; // Add transition

  document.body.appendChild(iframe);

  setTimeout(() => {
    iframe.style.right = '20px'; // Update position after mount
  }, 700);

  iframe.onload = function() {
    iframe.contentWindow.postMessage(
      { 
        fData: fData,
        cssData: cssData,
        iconSrc: iconSrc,
      },
      iframeURL
    );
  };

  window.addEventListener('message', function(event) {
    if (event.data.type === 'getWidth') {
      // Sende Fensterbreite zurück ans iframe
      iframe.contentWindow.postMessage({
        type: 'parentWidth',
        width: window.innerWidth
      }, '*');
    }
    if (event.data && event.data.type === 'resize') {
      iframe.style.width = event.data.width + 'px';
      if( event.data.height > window.innerHeight) {
        iframe.style.height = this.window.innerHeight - 40 + 'px';
      }
      else{
        iframe.style.height = event.data.height + 'px';
      }
    }
  });
})();
