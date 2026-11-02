// 首頁搜尋：網址 ?q=關鍵字，比對中文頁名和日文原頁名
(function () {
  var q = new URLSearchParams(location.search).get("q");
  var box = document.querySelector(".sf input");
  if (!q) return;
  if (box) box.value = q;
  var out = document.getElementById("results");
  out.textContent = "搜尋中…";
  fetch("search.json").then(function (r) { return r.json(); }).then(function (all) {
    var k = q.toLowerCase();
    var hit = all.filter(function (p) { return p[1].toLowerCase().indexOf(k) >= 0 || p[2].toLowerCase().indexOf(k) >= 0; });
    out.innerHTML = "";
    var h = document.createElement("h2");
    h.textContent = "「" + q + "」找到 " + hit.length + " 頁";
    out.appendChild(h);
    var ul = document.createElement("ul");
    hit.slice(0, 300).forEach(function (p) {
      var li = document.createElement("li"), a = document.createElement("a"), s = document.createElement("span");
      a.href = "p/" + p[0] + ".html"; a.textContent = p[1];
      s.className = "cat"; s.textContent = p[3] + "｜" + p[2];
      li.appendChild(a); li.appendChild(s); ul.appendChild(li);
    });
    out.appendChild(ul);
  }).catch(function () { out.textContent = "搜尋要放在網站上才能用（直接開檔案時瀏覽器會擋）。"; });
})();
