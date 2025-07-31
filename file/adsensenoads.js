  var PuSet = {
    adsenseAds: {
      publisherId: '6914268720032307',
    }
  };

  function adsError(){
    var aEcss = document.createElement('style');
    aEcss.textContent = '.adsbygoogle, .blogAd, .ancrA, HTML91, HTML92, HTML93, HTML94, HTML95, HTML96 { display: none !important }';
    document.head.appendChild(aEcss);
  }

  // ❌ Không chạy nếu URL có chứa "no-ads"
  if (!location.href.includes('no-ads') && PuSet.adsenseAds.publisherId != '') {
    (function(){
      var adAdsense = document.createElement('script');
      adAdsense.setAttribute('crossorigin', 'anonymous');
      adAdsense.async = true;
      adAdsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-' + PuSet.adsenseAds.publisherId;

      adAdsense.onload = function(){
        typeof adScript == "function" && adScript();
      };

      adAdsense.onerror = function(){
        typeof adError == "function" && adError();
        adsError();
      };

      var adPar = document.getElementsByTagName('script')[0];
      adPar.parentNode.insertBefore(adAdsense, adPar);
    })();
  }