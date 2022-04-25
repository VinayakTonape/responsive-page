function createListWithTemplate(sections) {
  const articleTemplate = document.getElementById("article-template");
  sections.forEach((article) => {
    const articleCard = document.importNode(articleTemplate.content, true);
    articleCard.querySelector(".card").id = article.sectionId;
    articleCard.getElementById("artImg").src = article.sectionUrl;
    articleCard.querySelector(".card-header").textContent = article.sectionName;

    //fetch the section details
    fetch("section.json")
      .then((response) => response.json())
      .then((section) => {
        console.log(section);

        section.articleList.forEach((item, index) => {
          if (index < 4) {
            articleCard.getElementById("art" + (index + 1)).textContent =
              item.articleTitle;
          }
        });
        contentPlaceHolder.appendChild(articleCard);
      });
  });
}

function createListWithSideTemplate(response) {
  const sideArticleTemplate = document.getElementById("side-article-template");
  response.articleList.forEach((article) => {
    const articleCard = document.importNode(sideArticleTemplate.content, true);
    articleCard.querySelector(".side-item-label").textContent =
      article.articleTitle;
    articleCard.getElementById("artSideImg").src = article.articleUrl;
    sidebarContainer.appendChild(articleCard);
  });
}

window.onload = function () {
  //fetch the section list
  fetch("sectionList.json")
    .then((response) => response.json())
    .then((sectionList) => {
      console.log(sectionList);
      createListWithTemplate(sectionList);
    });

  //fetch the side item list
  fetch("sideItems.json")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      createListWithSideTemplate(response);
    });
};
