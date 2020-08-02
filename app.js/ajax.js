// Promesse GET //
function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

// Promesse POST //
function postAjaxCall(url, data) {

  return new Promise(function (resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('post', url);

    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function () {
      reject(Error("Network Error"));
    };

    data = JSON.stringify(data);

    req.send(data);
  });
};

function effetFondu() {
  // // Effet apparition //
  const ratio = 0.1;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratio,
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > ratio) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(
    handleIntersect,
    options
  );
  document
    .querySelectorAll(".reveal, .reveal-2")
    .forEach(function (r) {
      observer.observe(r);
    });

}